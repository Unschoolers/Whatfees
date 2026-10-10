import { expect, test } from '@playwright/test'

for (const [path, heading] of [
  ['/whatnot-fee-calculator/', 'Whatnot fee calculator'],
  ['/tcg-inventory-tracker/', 'TCG inventory tracking for cards, boxes and packs'],
]) {
  test(`search page ${path} works on direct entry and refresh`, async ({ page, request }) => {
    const response = await request.get(path)
    expect(await response.text()).toContain(heading)
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
  })
}

test('public calculator estimates fees at the required price and reacts to advanced assumptions', async ({ page }) => {
  await page.goto('/whatnot-fee-calculator/')
  await expect(page.locator('[data-result="fees"]')).toContainText('9.15')
  await expect(page.locator('[data-result="profit"]')).toContainText('12.00')
  await page.locator('.calculator-advanced summary').click()
  await page.getByLabel('Buyer-paid shipping').fill('10')
  await expect(page.locator('[data-result="fees"]')).toContainText('9.47')
  await page.getByRole('spinbutton', { name: 'Target profit (%)', exact: true }).fill('15')
  await expect(page.locator('[data-result="target"]')).toContainText('78.11')
  await page.getByLabel('Commission rate (%)').fill('100')
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.locator('[data-result="target"]')).toHaveCount(0)
})

test('French calculator explains the percentage of cost and calculates its target price', async ({ page }) => {
  await page.goto('/fr/whatnot-fee-calculator/')
  const target = page.getByRole('spinbutton', { name: 'Profit cible (%)', exact: true })
  await expect(target).toHaveAccessibleDescription(/Pourcentage de votre coût total/)
  await target.fill('20')
  await expect(page.locator('[data-result="target"]')).toContainText('81,15')
})

for (const prefix of ['', '/fr']) {
  test(`retired ${prefix}/break-even-calculator/ redirects with or without JavaScript`, async ({ browser }) => {
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled })
      const page = await context.newPage()
      for (const suffix of ['/', '/index.html']) {
        await page.goto(`${prefix}/break-even-calculator${suffix}`)
        await expect(page).toHaveURL(new RegExp(`${prefix}/whatnot-fee-calculator/$`))
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(prefix ? 'Calculateur de frais Whatnot' : 'Whatnot fee calculator')
        await expect(page.locator('[data-result="breakEven"]')).toContainText(prefix ? '67,68' : '67.68')
      }
      await context.close()
    }
  })
}
