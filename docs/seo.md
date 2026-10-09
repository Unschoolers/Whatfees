# WhatFees search setup

The build renders ten canonical pages: homepage, fee calculator, TCG inventory guide, Canadian Whatnot fees guide and booster box versus pack profit guide in English and French. English URLs start at `/`; French equivalents start at `/fr/`. Language links preserve the current page. The retired English and French break-even pages redirect to their matching Whatnot fee calculator with immediate HTML refresh, a fallback link and canonical destination; they are noindex and excluded from the sitemap. All content, titles, descriptions, canonical URLs, hreflang and factual structured data are present without JavaScript.

Routes are declared in `src/routes.js`; page copy is in `src/content.js` and `src/landing-content.js`; metadata and sitemap markup are in `src/seo.js`. The build generates `sitemap.xml`, `robots.txt` and a noindex `404.html`. Assets use root paths for the www.whatfees.ca custom domain. Deploying to a repository subpath would require a corresponding base-path change.

`npm test` builds production output, checks crawl metadata/assets/formulas, and runs responsive browser, direct-entry, language persistence and interaction tests. GitHub Pages deploys only after those checks pass.

## Search Console (owner action)

1. In Google Search Console, add the domain property `whatfees.ca` and verify using the DNS TXT value Google supplies. This requires access to the domain's DNS; the repository cannot produce or apply your verification token.
2. Submit `https://www.whatfees.ca/sitemap.xml`.
3. Inspect the homepage and one English/French landing-page pair using URL Inspection. Confirm Google can read the rendered content and canonical URL. Request indexing for the homepage if useful.
4. Review indexing, queries, clicks, CTR and Core Web Vitals. Compare periods with enough traffic; no rank or traffic outcome is guaranteed by technical changes alone.

No analytics tracker or fake ownership token is installed. Search Console can measure Google search performance after ownership verification without a page analytics tracker.

## Fee examples

The public calculator uses editable illustrative assumptions, not a live rate lookup. Commission uses the item price; processing uses item price plus buyer-paid shipping and tax. Tax on fees is optional. The calculator links to the official Whatnot seller-fee policy. Target profit is a percentage of total cost, matching the app (20% of $60 means $12 profit after fees). Targets over 100% are valid returns on cost. Required prices round up to the next cent; actual marketplace settlement and rounding may differ. The site shows the owner-confirmed Pro price of US$10 as a one-time purchase. Update both languages if the purchase price changes. Canadian fee tiers cite Whatnot’s official policy and are dated; review them when that policy changes.
