
# Performance, SEO and Deployment — Addis Eats

## Goals

- Provide useful initial content through server rendering.
- Avoid unnecessary client-side JavaScript.
- Debounce menu searches.
- Refresh order status without reloading the page.
- Provide page metadata and social previews.
- Publish a sitemap and crawler rules.
- Verify the production deployment directly.

## SEO implementation

Source files:

- `src/app/layout.js`: default metadata, title template, description,
  Open Graph metadata, Twitter card metadata, and metadata base URL.
- `src/app/opengraph-image.jsx`: generated social preview image.
- `src/app/sitemap.js`: sitemap containing public URLs.
- `src/app/robots.js`: crawler rules and sitemap URL.

Private pages must remain protected by server-side authorization. Excluding a
URL from the sitemap or robots rules does not make it private.

## Performance budget

| Metric | Target | Baseline | Final |
|---|---:|---|---|
| Lighthouse Performance | >= 90 | Not measured | Not measured |
| Largest Contentful Paint (LCP) | <= 2.5 s | Not measured | Not measured |
| Interaction to Next Paint (INP) | <= 200 ms | Not measured | Not measured |
| Cumulative Layout Shift (CLS) | <= 0.1 | Not measured | Not measured |
| First Contentful Paint (FCP) | <= 1.8 s | Not measured | Not measured |
| Total Blocking Time (TBT) | <= 200 ms | Not measured | Not measured |

These are targets, not claims about measured results. Record the test device,
network conditions, route, and date alongside each measurement.

## Measurement procedure

1. Run `npm run build`.
2. Run the production server or deploy the production build.
3. Open Chrome DevTools and run Lighthouse in mobile mode.
4. Test `/`, `/menu`, and an authenticated order page where possible.
5. Record the baseline before performance changes.
6. Apply optimizations and repeat under comparable conditions.
7. Record the final results and investigate regressions.

## Deployment verification

Set `SITE_URL` to the real public HTTPS deployment URL.

Verify these URLs return the expected content:

- `/`: home page
- `/menu`: public menu
- `/sitemap.xml`: valid XML containing public URLs
- `/robots.txt`: expected crawler rules and sitemap URL
- `/opengraph-image`: social preview image

Check the deployed HTML source for:

- Page title and description
- `og:title`, `og:description`, and `og:image`
- `twitter:card` and related preview metadata

Also verify that private routes and order APIs still enforce authentication.

## Deployment evidence

| Check | Expected result | Actual result |
|---|---|---|
| `npm run build` | Success | Not tested |
| Home page | HTTP 200 | Not tested |
| Menu page | HTTP 200 | Not tested |
| Sitemap | HTTP 200 and valid XML | Not tested |
| Robots | HTTP 200 and correct rules | Not tested |
| Social image | HTTP 200 and image/png | Not tested |
| Metadata | Correct deployed tags | Not tested |
| Order ownership | Cross-user access denied | Not tested |
| Lighthouse | Meets or documents budget | Not tested |

## Final summary

Complete this section after testing. Include the production URL, deployment
date, actual Lighthouse results, any unresolved budget misses, and links to
the source commit and deployment.

0
