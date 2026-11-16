import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const dist = path.resolve('dist');
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(await fs.readFile(path.join(dist, '.vite/manifest.json'), 'utf8'));
const assetMap = new Map(Object.entries(manifest).map(([source, asset]) => [`/${source}`, `/${asset.file}`]));
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll("'", '&apos;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

try {
    const { render, indexablePaths, legacyRedirects, siteOrigin } = await server.ssrLoadModule('/src/entry-server.jsx');
    for (const pathname of [...indexablePaths, '/suburbs-section', '/404']) {
        let markup = render(pathname);
        // SSR uses source asset URLs; production HTML must use the client build's hashed assets.
        markup = markup.replace(/\/src\/assets\/[^"\s<>]+/g, (source) => {
            const built = assetMap.get(decodeURI(source));
            assert.ok(built, `Missing built asset: ${source}`);
            return built;
        });
        const metadata = [];
        markup = markup.replace(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/?\s*>|<link\b[^>]*\/?\s*>/gi, (tag) => {
            metadata.push(tag);
            return '';
        });
        assert.equal(metadata.filter((tag) => tag.startsWith('<title')).length, 1, `Missing/duplicate title: ${pathname}`);
        if (indexablePaths.includes(pathname)) {
            const canonicals = metadata.filter((tag) => tag.includes('rel="canonical"'));
            assert.equal(canonicals.length, 1, `Missing/duplicate canonical: ${pathname}`);
            const canonical = canonicals[0].replaceAll('&#x27;', "'").replaceAll('&amp;', '&');
            assert.ok(canonical.includes(`href="${siteOrigin}${pathname === '/' ? '' : pathname}"`), `Incorrect canonical: ${pathname}`);
            assert.ok(metadata.some((tag) => tag.includes('name="description"')), `Missing description: ${pathname}`);
            assert.ok(!metadata.some((tag) => /name="robots"[^>]*noindex/.test(tag)), `Indexable page marked noindex: ${pathname}`);
            assert.ok(/<h[12]\b/.test(markup), `Missing page content: ${pathname}`);
        }
        const html = template.replace(/<title>.*?<\/title>/s, '')
            .replace('</head>', `${metadata.map((tag) => tag.replace(/^<(title|meta|link)\b/i, '<$1 data-prerender-head="true"')).join('\n')}\n</head>`)
            .replace('<div id="root"></div>', () => `<div id="root" data-prerender-path="${escapeXml(pathname)}">${markup}</div>`);
        const file = pathname === '/404' ? path.join(dist, '404.html') : path.join(dist, pathname, 'index.html');
        assert.ok(file.startsWith(`${dist}${path.sep}`));
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, html);
    }
    // Build the sitemap from the same data used by the routes, not a hand-maintained URL list.
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map((pathname) => `  <url><loc>${escapeXml(`${siteOrigin}${pathname === '/' ? '' : pathname}`)}</loc></url>`).join('\n')}\n</urlset>\n`;
    await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
    await fs.writeFile('public/sitemap.xml', sitemap);

    // Booking's calendar depends on today's date. Render it in the browser as before.
    await fs.mkdir(path.join(dist, 'book-now'), { recursive: true });
    await fs.writeFile(path.join(dist, 'book-now/index.html'), template);

    // Render config lives in its dashboard. Keep exact rules ready to apply there.
    const redirects = Object.entries(legacyRedirects).flatMap(([source, destination]) => [
        { source, destination, action: 'Redirect' },
        { source: `${source}/`, destination, action: 'Redirect' },
    ]);
    await fs.mkdir('docs', { recursive: true });
    await fs.writeFile('docs/render-redirects.json', `${JSON.stringify(redirects, null, 2)}\n`);
    console.log(`Prerendered and verified ${indexablePaths.length} indexable pages, legacy regions page and 404. Generated booking shell, sitemap and ${redirects.length} Render redirect rules.`);
} finally {
    await server.close();
}
