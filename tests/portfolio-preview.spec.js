import { expect, test } from '@playwright/test'

test('portfolio scenario shows a populated graphic instead of an empty screenshot', async ({ page }) => {
  await page.goto('/')
  const proof = page.locator('#inside')
  await proof.getByRole('button',{name:/Planning your next buy/}).click()
  await expect(proof.locator('.portfolio-preview')).toBeVisible()
  await expect(proof.locator('img[src$="portfolio.webp"]')).toHaveCount(0)
  await expect(proof.locator('.portfolio-preview svg')).toBeVisible()
  await expect(proof.locator('.portfolio-preview')).toContainText('PORTFOLIO EXAMPLE')
  await page.getByRole('link',{name:'Français',exact:true}).click()
  await page.locator('#inside').getByRole('button',{name:/Vous prévoyez un achat/}).click()
  await expect(page.locator('.portfolio-preview')).toBeVisible()
  await expect(page.locator('#inside .portfolio-preview')).toContainText('EXEMPLE DE PORTEFEUILLE')
})
