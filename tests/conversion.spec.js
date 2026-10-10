import { expect, test } from '@playwright/test'

for (const [lang, paths] of [['en', ['/', '/whatnot-fee-calculator/']], ['fr', ['/fr/', '/fr/whatnot-fee-calculator/']]]) {
  for (const path of paths) {
    test(`${path} calculates a selling price from only cost and target profit`, async ({ page }) => {
      await page.goto(path)
      const calculator = page.locator('.public-calculator')
      await expect(calculator.locator('input:visible')).toHaveCount(2)
      await expect(calculator.locator('#calc-sale')).toHaveCount(0)
      await calculator.locator('#calc-cost').fill('60')
      await calculator.locator('#calc-target').fill('20')
      await expect(calculator.locator('.calculator-price [data-result="target"]')).toContainText(lang === 'fr' ? '81,15' : '81.15')
      await expect(calculator.locator('[data-result="profit"]')).toContainText(lang === 'fr' ? '12,00' : '12.00')
      await expect(calculator.locator('[data-result="fees"]')).toContainText(lang === 'fr' ? '9,15' : '9.15')
      await calculator.locator('#calc-cost').fill('120')
      await expect(calculator.locator('[data-result="target"]')).toContainText(lang === 'fr' ? '161,96' : '161.96')
      await calculator.locator('#calc-target').fill('0')
      await expect(calculator.locator('[data-result="target"]')).toContainText(lang === 'fr' ? '135,02' : '135.02')
    })
  }
}

test('homepage calculator preserves advanced assumptions after collapsing them', async ({ page }) => {
  await page.goto('/')
  await page.locator('.hero-actions').getByRole('link', { name: 'Try the free calculator', exact: true }).click()
  const calculator = page.locator('#calculator')
  await expect(calculator).toBeInViewport()
  await calculator.locator('#calc-target').fill('15')
  await expect(calculator.getByLabel('Buyer-paid shipping', { exact: true })).not.toBeVisible()
  await calculator.locator('.calculator-advanced summary').click()
  await calculator.getByLabel('Buyer-paid shipping', { exact: true }).fill('10')
  await expect(calculator.locator('[data-result="target"]')).toContainText('78.11')
  await expect(calculator.getByLabel('Buyer-paid shipping', { exact: true })).toHaveAccessibleDescription(/processing.*not.*revenue/i)
  await calculator.locator('.calculator-advanced summary').click()
  await expect(calculator.getByLabel('Buyer-paid shipping', { exact: true })).not.toBeVisible()
  await expect(calculator.locator('[data-result="target"]')).toContainText('78.11')
  await expect(calculator.locator('[data-result="profit"]')).toContainText('9.01')
})


test('advanced fee bases are reflected in the required price and its profit breakdown', async ({ page }) => {
  await page.goto('/whatnot-fee-calculator/')
  await page.locator('#calc-cost').fill('42')
  await page.locator('#calc-target').fill('25')
  await page.locator('.calculator-advanced summary').click()
  for (const [key, value] of Object.entries({ commission:50, processing:5, fixed:8, shipping:45, buyerTax:15, feeTax:15 })) {
    await page.locator(`#calc-${key}`).fill(String(value))
  }
  // Desired profit = 42 × 25% = 10.50. Fees include shipping/tax processing and tax on fees.
  await expect(page.locator('[data-result="target"]')).toContainText('177.28')
  await expect(page.locator('[data-result="fees"]')).toContainText('124.78')
  await expect(page.locator('[data-result="profit"]')).toContainText('10.50')
})

test('incomplete costs hide the required price and zero costs remain valid', async ({ page }) => {
  await page.goto('/')
  await page.locator('#calc-cost').fill('')
  await expect(page.locator('.public-calculator [role="alert"]')).toBeVisible()
  await expect(page.locator('[data-result="target"]')).toHaveCount(0)
  await page.locator('#calc-cost').fill('0')
  await page.locator('.calculator-advanced summary').click()
  for (const key of ['commission','processing','fixed']) await page.locator(`#calc-${key}`).fill('0')
  await expect(page.locator('[data-result="target"]')).toContainText('0.00')
  await expect(page.locator('[data-result="profit"]')).toContainText('0.00')
  await page.locator('#calc-cost').fill('60')
  await page.locator('#calc-target').fill('200')
  await expect(page.locator('[data-result="target"]')).toContainText('180.00')
})
