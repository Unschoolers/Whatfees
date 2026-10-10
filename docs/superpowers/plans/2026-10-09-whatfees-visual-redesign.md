# WhatFees Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** Tasks 1–3 implementation, automated validation and rendered visual review are complete. Independent final review precedes publication.

**Goal:** Finish the approved WhatFees visual redesign with readable automatic light/dark themes, illustrated product proof, and intact bilingual routes and calculator behavior.

**Architecture:** Extend the existing Vue 3/Vite marketing site and its CSS rather than adding a design system or runtime dependency. CSS semantic tokens and `prefers-color-scheme` provide theme selection from first paint; explicitly scoped dark illustration/game panels retain their own palette. Keep routes, metadata, calculators, and game state in their current owners.

**Tech Stack:** Vue 3, Vite, plain CSS, Node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-09-whatfees-visual-redesign.md`

## Global Constraints

- Preserve every existing bilingual SEO route, metadata, calculator field/behavior, game interaction, app link, and inbound anchor or alias.
- Use automatic browser/OS theme only. Do not render a System/light/dark selector.
- Use semantic theme tokens, not inversion or opacity tricks; explicitly theme always-dark illustration/game surfaces.
- Normal text contrast is at least 4.5:1; large text contrast is at least 3:1. Supporting copy is typically at least 14px; labels are at least 12px.
- Avoid horizontal overflow at 320, 390, 768, and 1440px.
- Use HTML/CSS/SVG illustrations, not AI imagery or product screenshots; identify example/demo data as illustrative.
- Keep the exact Mark quote: “Easy to use and helped me be a lot more confident about setting my prices live”
- State Pro as US$10 once, no subscription. Target profit remains a percentage of total cost, not revenue margin.
- Keep the $100 sale / $60 cost / $11.20 fees / $28.80 profit example labeled illustrative, with CAD and example-rate/exclusion context where currency is implied.
- Use natural Quebec French and a small muted “Conçu au Québec” footer mark (English equivalent allowed); add no unsupported contact email or product claim.
- Add no library or dependency. Do not change `src/calculator.js` or calculator mathematics.
- The repository already has uncommitted, untested UI/content work in `index.html`, `src/App.vue`, `src/HeroProof.vue`, `src/ProductProof.vue`, `src/SellerFeedback.vue`, `src/content.js`, `src/product-content.js`, new `src/ScenarioIllustration.vue`, and `public/brand-icon.png`. Start from and review that WIP; it is not a completed or validated redesign. `src/style.css` has no finished theme implementation yet.
- This plan covers implementation and review only. Publication/deployment remains a separately gated step for the parent after the user resumes.

## Review Focus

- Initial dark/light render before JavaScript and after OS preference changes: test `automatic theme follows OS before and after hydration without a visible theme selector`.
- Long French strings, 320px viewport, and all ten canonical language/route combinations: test `canonical pages have no horizontal overflow at supported widths`.
- Muted labels, form help, focused controls, and foregrounds inside fixed-dark panels: test `visible text meets theme contrast thresholds across canonical pages`.
- Revealed grid outcomes and chart labels after a theme change: test `game and portfolio illustration remain readable after reveal in both themes`.
- Reduced-motion preference with game controls still usable: test `reduced motion keeps game preview interactions functional`.

---

## File Responsibilities

- `index.html`: automatic `color-scheme` declaration, media-qualified browser theme colours, and brand favicon; review the existing WIP.
- `src/style.css`: shared semantic light/dark tokens, global surfaces, navigation, forms, focus, footer, and responsive shell.
- `src/product.css`, `src/search.css`, `src/portfolio-preview.css`: theme-aware product, guide/search, chart, and game presentation; fixed-dark palette scopes.
- `src/App.vue`, `src/content.js`, `src/product-content.js`, `src/HeroProof.vue`, `src/ProductProof.vue`, `src/ScenarioIllustration.vue`, `src/SellerFeedback.vue`: homepage composition, bilingual copy, example illustrations, quote, and Quebec footer touch. Review existing WIP before changing these. `public/brand-icon.png` is a parent-supplied WIP asset; use it as-is.
- `tests/marketing.spec.js`, `tests/product-proof.spec.js`, and new `tests/theme.spec.js`: retain route/product coverage and pin automatic theme, contrast, responsive, illustration, and reduced-motion behavior.
- `docs/superpowers/plans/2026-10-09-whatfees-visual-redesign.md`: this execution plan; do not alter the approved spec as an implementation shortcut.

## Task 1: Automatic Theme and Readable Surfaces

**Files:**
- Modify: `index.html`
- Modify: `src/style.css`
- Modify: `src/product.css`
- Modify: `src/search.css`
- Modify: `src/portfolio-preview.css`
- Test: `tests/theme.spec.js`

**Interfaces:**
- Consumes: existing CSS variables and component class names; no new JS theme API.
- Produces: `--page-bg`, `--surface`, `--surface-raised`, `--text`, `--text-muted`, `--border`, `--accent`, `--accent-text`, `--button-bg`, and `--button-text` root tokens; retain compatible aliases for current `--paper`, `--paper-deep`, `--ink`, `--muted`, `--line`, `--red`, and `--gold` while consumers migrate; automatic `color-scheme` and `prefers-color-scheme` behavior.

- [x] **Step 1: Add failing theme tests** in `tests/theme.spec.js` for pre-hydration light/dark rendering, live OS preference changes, no visible theme selector, and text contrast on home, fee, inventory, Canada fee, and box-pricing routes in both languages. Assert the page background is `rgb(246, 244, 238)` in light preference and `rgb(25, 27, 29)` in dark preference, including a JavaScript-disabled browser context. On the same loaded page, switching `page.emulateMedia({ colorScheme: 'dark' })` must change the computed background without reload. Assert no appearance/theme selector is rendered. In the contrast assertion, require 4.5:1 for normal text and 3:1 for large text; inspect computed foreground/background pairs for visible text including form help and focused controls.
- [x] **Step 2: Run the focused tests and confirm failure.** Run: `npm run build && PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/theme.spec.js`. Expected: failures for dark mode, theme switching, contrast, or selector visibility until the theme CSS is complete.
- [x] **Step 3: Implement paired semantic tokens and component styling.** Start with paired values: page `#f6f4ee`/`#191b1d`, surface `#ffffff`/`#24272a`, text `#25272a`/`#f2f0e9`, muted text `#60666a`/`#b7babe`, border `#dfe0dc`/`#393e42`, accent text `#775b17`/`#e4bb52`, button background `#25272a`/`#e5bd56`, and button text `#ffffff`/`#202224` (light/dark respectively). Validate contrast on the actual rendered surfaces and adjust pairs where needed. Apply tokens to every text/background pair in global, product, guide, and chart CSS. Use `color-scheme: light dark` plus a `prefers-color-scheme: dark` token override so SSR/no-JS first paint and OS changes work without JS state or a visible control.
- [x] **Step 4: Scope fixed-dark surfaces explicitly.** In `src/product.css`, keep `.illustration-dark`, `.hero-proof`, `.scenario-screen`, `.game-preview`, and their descendants on explicit dark-panel foreground, muted, border, and accent values, including revealed grid cells and chart labels; do not let global `--paper`/`--ink` changes erase panel text. Preserve focus visibility and add reduced-motion CSS for transitions while keeping controls interactive.
- [x] **Step 5: Run theme tests and relevant existing tests.** Run: `npm run build && PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/theme.spec.js tests/marketing.spec.js tests/search-messaging.spec.js`. Expected: all pass in Chromium for light and dark preference, with no appearance selector and no contrast assertion failures.

## Task 2: Bilingual Illustrated Homepage and Brand Treatment

**Files:**
- Modify: `src/App.vue`
- Modify: `src/content.js`
- Modify: `src/product-content.js`
- Modify: `src/HeroProof.vue`
- Modify: `src/ProductProof.vue`
- Modify: `src/ScenarioIllustration.vue`
- Modify: `src/SellerFeedback.vue`
- Modify: `src/style.css`
- Modify: `src/product.css`
- Test: `tests/product-proof.spec.js`, `tests/marketing.spec.js`, `tests/bilingual.spec.js`

**Interfaces:**
- Consumes: Task 1 CSS token pairs; existing `lang` props, `productContent` scenario `kind` values, `FeeCalculator`, `PortfolioPreview`, current route/anchor IDs.
- Produces: `ScenarioIllustration({ kind: 'live' | 'sales', lang: 'en' | 'fr' })`; `ProductProof` selects `live`, `sales`, or existing `chart` scenarios. The live example toggles between CAD20 individual cost and CAD60 bundle cost for three CAD20 items, with accessible pressed-state buttons and `data-illustrated-cost` output. Sale examples use the fixed numbers in Global Constraints with clearly marked fictional/example data.

- [x] **Step 1: Update illustration assertions** in `tests/product-proof.spec.js`: replace screenshot-source expectations with checks for the illustrative bundle controls and computed individual/bundle cost, selected scenario switching, chart SVG, and example-data labels. Pin the sale example to $100 sale, $60 cost, $11.20 estimated fees, and $28.80 estimated profit (localized CAD display).
- [x] **Step 2: Run the focused product test and record which new behavior assertions fail or already pass against the partial WIP; do not manufacture a failure for behavior already implemented.** Run: `npm run build && PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/product-proof.spec.js`.
- [x] **Step 3: Complete the approved homepage composition in existing components.** Keep compact pricing navigation available on mobile; organize intro and immediate example, calculator/pricing, product benefits, games, real testimonial, creator/FAQ, final CTA, and guides. Use illustration components rather than screenshot assets; preserve scenario buttons and their accessible pressed state, game expansion, portfolio chart, and existing IDs/aliases.
- [x] **Step 4: Finalize bilingual copy and brand cues.** Use the parent-supplied brand icon and concept wordmark; preserve Mark’s quote verbatim, US$10 once/no subscription, the percentage-of-cost explanation, and illustrative CAD/rates/exclusions. Keep claims aligned with current verified content, use natural Quebec French, and keep the muted Quebec origin mark small in the footer.
- [x] **Step 5: Run product and content checks.** Run: `npm run build && PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/product-proof.spec.js tests/bilingual.spec.js tests/marketing.spec.js`. Expected: illustration behavior passes in both languages, page metadata and language navigation remain intact, and responsive layouts have no overflow.

## Task 3: Full Regression Matrix and Review Gate

**Files:**
- Modify: `tests/theme.spec.js`
- Modify: `tests/marketing.spec.js`
- Modify: `tests/product-proof.spec.js`
- Modify: `tests/rendering.test.js` only if generated HTML assertions need to describe the illustrative markup rather than removed screenshot markup.

**Interfaces:**
- Consumes: finished theme and homepage behavior from Tasks 1–2; existing route helpers and the current Playwright preview server.
- Produces: regression evidence for all canonical routes, locales, widths, themes, examples, and game states; no production API changes.

- [x] **Step 1: Add the complete matrix assertions.** Cover all five canonical route IDs (`home`, `fees`, `inventory`, `canadaFees`, `boxPricing`) in `en` and `fr`; widths 320, 390, 768, and 1440; light and dark OS preference. Check no overflow and visible text contrast. Verify game reveal/reset and chart labels in both themes; verify reduced-motion preference disables nonessential motion without disabling controls. Verify no visible appearance selector.
- [x] **Step 2: Preserve existing SEO, calculation, and hydration expectations.** Keep language-switch/canonical metadata checks, no-JavaScript SSR content checks, calculator values including the landing example and separate Canada guide assumptions, and existing route/anchor behavior. Do not edit calculator implementation to make tests pass.
- [x] **Step 3: Run focused browser coverage.** Theme matrix passed (31 tests before final additions; also included in the full suite). Earlier focused product, bilingual, and marketing coverage passed (19 tests).
- [x] **Step 4: Run the repository suite and production build.** `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npm test` passed: Vite client/SSR/prerender, 12 Node tests, and all 64 Playwright tests.
- [x] **Step 5: Review rendered pages in light/dark at desktop/mobile sizes.** Automated contrast and overflow assertions now cover all routes/locales at all four widths and both themes. The controller inspected 12 light/dark English/French home renders and representative French Canada fee tables at 390px light, English calculator at 1440px dark, and French booster guide at 390px dark. They were readable with no document overflow.
- [x] **Step 6: Report the validated result to the parent.** Recorded files, actual test/build output, and the remaining visual-review item in `.superpowers/sdd/whatfees-visual-redesign/task-3-report.md`. Do not publish or deploy from this plan; that decision is reserved for a later, separate parent/user gate.

## Check and Commit Boundaries

Prepare `/tmp/chromium` once if absent before focused browser checks; use Node Brotli decompression of `../browser-tools/node_modules/@sparticuz/chromium/bin/chromium.br` and executable permissions. Focused commands rebuild generated HTML so the preview server cannot validate stale output. Contrast checks must composite translucent backgrounds up the ancestor chain, include visible SVG chart text, and inspect revealed game states; assertions against CSS token strings alone are insufficient.

When execution resumes, finish and review each task before its local commit. Stage only task files (including any already-written WIP that belongs to that task), leaving unrelated partial work untouched. Proposed commits: `feat: add automatic readable site themes`, `feat: refresh WhatFees brand and product illustrations`, and `test: cover redesigned pages across themes and languages`. The earlier planning-only stopping point is superseded by the user’s explicit instruction to implement. The controller validates and publishes after review.

## Execution Recommendation

Use Sol 6.1 for an integrated implementation pass and Luna for read-only copy and contrast review. The three tasks share CSS tokens and homepage component contracts, so keep implementation integrated; run the Luna review after the rendered regression matrix and before any publication decision. Keep the user-requested Sol 6.1 implementation and Luna review roles when execution resumes. The user has asked to resume implementation.
