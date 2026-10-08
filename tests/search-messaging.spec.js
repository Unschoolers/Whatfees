import { expect, test } from '@playwright/test'

test('search visitors can identify the calculator and intended sellers', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Whatnot Fee Calculator & Seller Toolkit | WhatFees')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Whatnot')
  await expect(page.locator('.hero-intro')).toContainText('TCG')
  await page.getByRole('link', { name: 'Français' }).click()
  await expect(page).toHaveTitle('Calculateur de frais Whatnot et outils de vente | WhatFees')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Whatnot')
})
