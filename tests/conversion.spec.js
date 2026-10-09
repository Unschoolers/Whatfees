import { expect, test } from '@playwright/test'

test('homepage offers a calculator without sign-in and preserves advanced inputs', async ({ page }) => {
  await page.goto('/')
  await page.locator('.hero-actions').getByRole('link', { name: 'Try the free calculator', exact: true }).click()
  const calculator = page.locator('#calculator')
  await expect(calculator).toBeInViewport()
  await calculator.getByLabel('Item sale price', { exact: true }).fill('120')
  await expect(calculator.locator('[data-result="profit"]')).toContainText('46.62')
  await expect(calculator.getByLabel('Buyer-paid shipping', { exact: true })).not.toBeVisible()
  await calculator.getByText('Adjust fees, shipping and taxes', { exact: true }).click()
  await calculator.getByLabel('Buyer-paid shipping', { exact: true }).fill('10')
  await expect(calculator.locator('[data-result="fees"]')).toContainText('13.67')
  await calculator.getByText('Adjust fees, shipping and taxes', { exact: true }).click()
  await calculator.getByLabel('Target profit', { exact: true }).fill('15')
  await expect(calculator.locator('[data-result="target"]')).toContainText('84.84')
})
