# Task 3 regression report

Baseline: `3c907497e1831edf83e4ef77acd8be51189f3b89` (Task 2)

Task 3 adds route × locale × viewport × theme regression coverage without changing production code. `tests/theme.spec.js` now visits every canonical route (`home`, `fees`, `inventory`, `canadaFees`, `boxPricing`) in English and French at 320, 390, 768, and 1440px in light and dark preferences. At each combination it checks document overflow, visible text contrast (4.5:1 normal / 3:1 large, including composited translucent surfaces and the wheel gradient), absence of appearance controls, and expanded disclosure content. Existing contrast checks run again after revealing/resetting a game cell, taking a bracket action, and selecting the populated portfolio chart in both themes/locales.

The JavaScript-disabled check now loads the actual prerendered English homepage and requires a visible H1, calculator inputs, and substantial main content alongside the pre-hydration theme colors. Existing French no-JavaScript, route metadata/language switching, SEO, calculator, and anchor coverage remains intact. The reduced-motion wheel test now asserts its transition duration is zero and its interaction control remains enabled before verifying the result sequence.

Changed files:
- `tests/theme.spec.js`
- `tests/games-preview.spec.js`
- `docs/superpowers/plans/2026-10-09-whatfees-visual-redesign.md`
- `docs/superpowers/specs/2026-10-09-whatfees-visual-redesign.md`
- `.superpowers/sdd/whatfees-visual-redesign/task-3-report.md`

Verification:
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/theme.spec.js`: **31 passed** after adding the route × width × theme checks.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/games-preview.spec.js -g 'wheel honors reduced motion'`: **1 passed**.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npm test`: Vite client build, SSR build and prerender passed; Node suite **12 passed, 0 failed**; Playwright suite **64 passed, 0 failed**.
- `git diff --check`: passed before commit.

Remaining review: no Task 3 guide/search screenshots were captured. Automated overflow and contrast checks cover every required width/theme/locale; the controller's earlier home visual review covers 12 mobile/desktop light/dark English/French cases. The controller retains representative guide/search visual review and publication.

No dependency or production behavior changed. No calculator code, deployment, or push was touched.

Review follow-up: the no-JavaScript theme fixture also runs the contrast helper against its actual prerendered form input and text. Focused check after this follow-up, `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/theme.spec.js -g 'automatic .* theme works before hydration without JavaScript'`: **2 passed** (light and dark). The full suite above was completed before this assertion-only addition; only the requested focused no-JavaScript checks were rerun.
