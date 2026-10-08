import { expect, test } from '@playwright/test'

test('seller scenarios show their matching product screen', async ({ page }) => {
  await page.goto('/')
  const proof = page.locator('#inside')
  await proof.getByRole('button', { name: /Building a bundle/ }).click()
  await expect(proof.locator('img')).toHaveAttribute('src', /live\.webp$/)
  await proof.getByRole('button', { name: /Planning your next buy/ }).click()
  await expect(proof.locator('img')).toHaveAttribute('src', /portfolio\.webp$/)
})

test('illustrative mystery grid reveals a selected square and can reset', async ({ page }) => {
  await page.goto('/')
  const games = page.locator('#games')
  await games.getByRole('button', { name: 'Mystery grid', exact: true }).click()
  await games.getByRole('button', { name: 'Reveal square 4', exact: true }).click()
  await expect(games.getByRole('status')).toContainText('Square 4 revealed')
  await games.getByRole('button', { name: 'Reset preview', exact: true }).click()
  await expect(games.getByRole('button', { name: 'Reveal square 4', exact: true })).toBeEnabled()
  await expect(games.getByRole('status')).not.toContainText('Square 4 revealed')
})
