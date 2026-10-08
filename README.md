# WhatFees marketing website

Mobile-first English/French prerendered Vue marketing site for **www.whatfees.ca**. The application remains at **https://app.whatfees.ca**.

## Development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Verify responsive English/French layouts and basic interactions:

```sh
npx playwright install chromium
npm run test:smoke
```

## GitHub Pages

The included workflow builds and deploys pushes to `main`. In the repository's **Settings → Pages**, select **GitHub Actions** as the source. Set the custom domain to `www.whatfees.ca`, then configure a `www` CNAME pointing to `unschoolers.github.io` at your DNS provider. Enable HTTPS once GitHub validates the domain. Do not change the `app` DNS record.

`public/CNAME` preserves the desired hostname in the output. The build uses root asset paths for the custom domain and prerenders each route to its own HTML file. No environment secrets are required.

The screenshot gallery uses real WhatFees UI with fictional demo data. Fee breakdowns are illustrative, not live fee quotes. Content lives in `src/content.js`, `src/landing-content.js` and `src/product-content.js`; product design decisions are in `docs/design.md`. See `docs/seo.md` for routes, crawl files and Search Console setup.
The marketing website
