import { expect, test } from '@playwright/test'

test('search visitors can identify the calculator and intended sellers', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Whatnot Fee Calculator & Seller Toolkit | WhatFees')
  await expect(page.locator('.hero-copy')).toContainText('Whatnot')
  await expect(page.locator('.hero-intro')).toContainText('TCG')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Know what you keep after the sale.')
  await page.getByRole('link', { name: 'Français' }).click()
  await expect(page).toHaveTitle('Calculateur de frais Whatnot et outils de vente | WhatFees')
  await expect(page.locator('.hero-copy')).toContainText('Whatnot')
  await expect(page.locator('.hero-intro')).toContainText('TCG')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Voyez ce qu’il vous reste après la vente.')
})
