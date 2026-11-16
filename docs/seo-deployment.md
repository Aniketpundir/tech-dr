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

Check the HTML source of a service and suburb page for their own title, content
and canonical. Confirm the old service URLs return 301 with the correct Location
after applying the dashboard rules. Run Search Console Live Test on the final
canonical URLs, then request indexing for important updated pages. Submit/check
`https://www.thetechdr.com.au/sitemap.xml` in the matching property.

The site consistently uses its existing `www` canonical host. Do not switch hosts
without auditing the hosting/domain redirects and Search Console properties.

Technical fixes make pages accessible and consistent; Google still decides which
pages to index. Many suburb pages retain similar existing content. Meaningful,
verified local information may improve those pages; do not invent local offices,
testimonials, response times or jobs to make the pages appear different.

References: [Render redirects and rewrites](https://render.com/docs/redirects-rewrites),
[Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
