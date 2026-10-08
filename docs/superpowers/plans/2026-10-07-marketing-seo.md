# Marketing SEO implementation plan

Goal: make WhatFees discoverable for Whatnot fee, profit and inventory searches, while showing sellers the product clearly.
Architecture: retain Vue and GitHub Pages; generate static HTML at build time and hydrate for interactions. Use English root URLs and French equivalents under /fr/ with self-canonical and reciprocal language links.
Constraints: preserve cream/charcoal/gold/red design; 320/390/768/1440 layouts; real screenshots with fictional data; no fabricated social proof or unsupported product/price claims. User authorizes a push to main after each verified point. Astra owns design components; root owns SEO/integration/testing.

1. Search-focused messaging: update src/content.js and index.html titles/descriptions/hero/features. Assert both languages identify Whatnot and TCG sellers; run browser smoke suite; commit and push.
2. Static rendering: shared createSSRApp entry, Vite SSR build and build-time render script. Assert HTTP HTML contains the actual headings and FAQ without JavaScript; check hydration and existing interactions; commit and push.
3. Search landing pages: shared page registry and focused fee calculator, break-even and TCG inventory pages, linked from the homepage. Each has unique metadata, substantive examples and correct product links. Assert direct requests and refreshes render the correct page with working assets; commit and push.
4. Product proof: integrate Astra's real screenshots, concrete seller scenarios, honest Free/Pro expectations and labeled game illustration. Verify keyboard actions, image loading, mobile overflow and both languages; commit and push.
5. Bilingual indexing: generate all French equivalents, crawlable locale links, canonical/hreflang, sitemap/robots and factual structured data. Add build-output crawl tests and CI gate. Document Search Console ownership/submission steps (account verification needs owner's token). Run full suite, inspect deployment and push.

Review focus: nested-route assets; server/client locale agreement; sibling landing-page language switches; JS-disabled content; invalid routes returning real 404; fee examples labeled assumptions; unpublished pricing not asserted; route metadata and sitemap derived from one source.
