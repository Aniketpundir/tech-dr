# Deploying the indexing fixes on Render

Run `npm run build` and `npm run check:seo`. Deploy the resulting `dist` directory
using the existing Render static site's `npm run build` build command.

The build now creates HTML for all 180 indexable pages, so content, canonical tags,
descriptions and real links are available before JavaScript runs. React hydrates
those pages to retain navigation and forms. The booking calendar still renders in
the browser. Blog articles remain supplied by the existing external embed.

`public/sitemap.xml` is generated from route data during builds. It includes all
service detail pages and the canonical suburb URLs; duplicate suburb URLs and the
robots-blocked booking page are omitted. Do not hand-edit the generated sitemap.

## Required Render dashboard rules

In the existing static site's **Redirects/Rewrites**, add the exact rules in
[`render-redirects.json`](./render-redirects.json), with action **Redirect** (HTTP 301).
Place them above the existing `/*` -> `/index.html` **Rewrite** rule. Keep the SPA
rewrite so direct navigation to old URLs can also use the application's redirect
fallback until all dashboard rules are installed.

The rules cover both trailing-slash variants of:

| Source | Destination |
| --- | --- |
| `/computer-repair-service` | `/services/mac-windows-pc-repair` |
| `/cctv-setup` | `/services/cctv-setup-servicing` |
| `/suburbs-section/city/northern-suburbs/suburbs/carlingford` | `/suburbs-section/city/parramatta/suburbs/carlingford` |

These rules must be applied in Render. Client-side redirects in the repository
work for visitors but cannot return an HTTP 301 status. Render does not read a
Netlify `_redirects` file. Existing built files take precedence over Render
redirect/rewrite rules, so redirect-source HTML files are deliberately not emitted.

Unknown SPA routes now show a helpful page with `noindex, follow` rather than the
default React Router error. This does not change the server response to HTTP 404
while the catch-all Render rewrite is enabled. A prerendered `404.html` is also
included for hosts that support custom 404 documents.

## After deployment

### Serve each prerendered page at its public URL

Live verification found that Render's existing SPA fallback served the homepage
HTML for `/about-us`, even though `/about-us/index.html` served the correct page.
Add the three **Rewrite** rules in [`render-rewrites.json`](./render-rewrites.json)
in their listed order, after the existing six **Redirect** rules and before the
existing `/*` -> `/index.html` **Rewrite**. The final fallback still handles `/`.
The first new rule handles trailing-slash paths, the second top-level pages and
the third nested service/suburb pages. Existing assets and sitemap files keep
Render's file precedence. Missing pages can return a server 404 from these rules.

Verify after saving: `/about-us` must return the About Us title and canonical in
its raw HTML, and `/services/hardware-upgrades-repair` must return its own content.
Until the hosting rules are applied, the client safely mounts when the supplied
HTML belongs to a different route. Static head metadata is explicitly replaced
with React-managed metadata so fallback recovery and navigation leave one
canonical, not two. This was checked in Chrome for a direct prerendered load,
homepage fallback at `/about-us`, and navigation from About Us to Services.

Check the HTML source of a service and suburb page for their own title, content
and canonical. Confirm the old service URLs return 301 with the correct Location
after applying the dashboard rules. Run Search Console Live Test on the final
canonical URLs, then request indexing for important updated pages. Submit/check
`https://thetechdr.com.au/sitemap.xml` in the matching property.

The site uses `https://thetechdr.com.au` as its canonical host, matching the
Google-selected canonical shown in Search Console for About Us. Canonical tags,
social URLs, structured data, robots.txt and the sitemap use this same host.
Retain hosting's existing www-to-non-www redirect. Check the non-www property
after deployment; the trailing-slash About Us URL can remain an alternate while
the canonical `/about-us` page is indexed.

Technical fixes make pages accessible and consistent; Google still decides which
pages to index. Many suburb pages retain similar existing content. Meaningful,
verified local information may improve those pages; do not invent local offices,
testimonials, response times or jobs to make the pages appear different.

References: [Render redirects and rewrites](https://render.com/docs/redirects-rewrites),
[Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
