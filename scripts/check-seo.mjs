import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
import { matchRoutes } from 'react-router-dom';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const decodeHtml = (value) => value.replaceAll('&#x27;', "'").replaceAll('&apos;', "'").replaceAll('&amp;', '&');
try {
    const { render, indexablePaths, legacyRedirects, siteOrigin } = await server.ssrLoadModule('/src/entry-server.jsx');
    assert.equal(siteOrigin, 'https://thetechdr.com.au', 'Canonical host must match the selected production domain');
    const { appRoutes } = await server.ssrLoadModule('/src/routes.jsx');
    const { serviceDetails } = await server.ssrLoadModule('/src/Components/Home_Section/Services/ServiceDetail/ServiceDetail.jsx');
    const servicesHtml = render('/services');
    const serviceLinks = [...servicesHtml.matchAll(/href="(\/services\/[^"?#]+)"/g)].map((match) => match[1]);
    assert.ok(serviceLinks.length >= 15, 'Service cards must expose real links');
    for (const link of serviceLinks) assert.ok(serviceDetails[link.split('/').pop()], `Missing service content: ${link}`);

    const reportPaths = [
        '/computer-repair-service/', '/cctv-setup/', '/services/hardware-upgrades-repair',
        ...[
            ['hills-district', 'round-corner'], ['northern-suburbs', 'putney'],
            ['parramatta', 'old-toongabbie'], ['lower-north-shore', 'mosman'],
            ['sydney-city', 'waterloo'], ['western-sydney', 'seven-hills'],
            ['northern-beaches', 'collaroy'], ['upper-north-shore', 'lane-cove'],
            ['hills-district', 'kellyville'], ['western-sydney', 'pendle-hill'],
            ['parramatta', 'woodville'], ['parramatta', 'carlingford'],
            ['western-sydney', 'wetherill-park'], ['northern-beaches', 'mona-vale'],
            ['hills-district', 'bella-vista'], ['northern-beaches', 'terrey-hills'],
            ['lower-north-shore', 'mcmahons-point'], ['northern-suburbs', 'marsfield'],
            ['sydney-city', 'woolloomooloo'], ['inner-west', 'cabarita'],
            ['northern-beaches', 'freshwater'], ['sydney-city', 'surry-hills'],
        ].map(([region, suburb]) => `/suburbs-section/city/${region}/suburbs/${suburb}`),
    ];
    assert.equal(reportPaths.length, 25);
    for (const pathname of reportPaths) {
        const target = legacyRedirects[pathname.replace(/\/$/, '')] || pathname;
        assert.ok(indexablePaths.includes(target), `Report URL has no valid target: ${pathname}`);
        assert.ok(render(target).includes('rel="canonical"'), `Missing metadata: ${target}`);
    }
    for (const [source, target] of Object.entries(legacyRedirects)) {
        const route = matchRoutes(appRoutes, source).at(-1).route;
        assert.equal(route.element.props.to, target, `Incorrect redirect: ${source}`);
        assert.ok(indexablePaths.includes(target));
    }
    for (const pathname of ['/does-not-exist', '/services/not-a-service', '/suburbs-section/city/not-a-region', '/suburbs-section/city/sydney-city/suburbs/not-a-suburb']) {
        assert.ok(render(pathname).includes('content="noindex, follow"'), `Missing error-page noindex: ${pathname}`);
    }
    for (const pathname of indexablePaths) {
        const html = await fs.readFile(path.join('dist', pathname, 'index.html'), 'utf8');
        const head = html.split('</head>')[0];
        assert.ok(!html.includes('https://www.thetechdr.com.au'), `Conflicting www URL on ${pathname}`);
        assert.equal((head.match(/<title\b/g) || []).length, 1, `Title count: ${pathname}`);
        assert.equal((head.match(/rel="canonical"/g) || []).length, 1, `Canonical count: ${pathname}`);
        assert.ok(!html.includes('/src/assets/'), `Source asset leaked: ${pathname}`);
        for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)"/g)) {
            const target = decodeHtml(match[1]);
            if (target.startsWith('/assets/')) {
                await fs.access(path.join('dist', target));
            } else if (!target.includes('.')) {
                const normalized = target === '/' ? target : target.replace(/\/$/, '');
                assert.ok(matchRoutes(appRoutes, normalized)?.at(-1).route.path !== '*', `Broken internal link on ${pathname}: ${target}`);
            }
        }
    }
    const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.equal(locations.length, indexablePaths.length);
    assert.equal(new Set(locations).size, locations.length);
    assert.ok(locations.every((url) => url === siteOrigin || url.startsWith(`${siteOrigin}/`)), 'Sitemap contains a conflicting host');
    const robots = await fs.readFile('dist/robots.txt', 'utf8');
    assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`), 'robots.txt points at the wrong sitemap host');
    assert.ok(!sitemap.includes('/book-now'));
    console.log(`PASS: all 25 reported URLs have valid targets; ${indexablePaths.length} built pages checked for metadata, links and assets; service cards, redirects, error pages and sitemap verified.`);
} finally {
    await server.close();
}
