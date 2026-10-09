import { expect, test } from '@playwright/test'

test('spectator illustration follows host reveals and reset without exposing controls', async ({ page }) => {
  await page.goto('/')
  const games = page.locator('#games')
  const spectator = games.getByRole('region', { name: 'SPECTATOR VIEW', exact: true })
  await games.getByRole('button', { name: 'Mystery grid', exact: true }).click()
  await games.getByRole('button', { name: 'Reveal square 4', exact: true }).click()
  await expect(spectator.locator('[data-revealed="true"]')).toHaveCount(1)
  await expect(spectator.locator('[data-square="4"]')).toHaveText('D')
  await expect(spectator.getByRole('button')).toHaveCount(0)
  await games.getByRole('button', { name: 'Reset preview', exact: true }).click()
  await expect(spectator.locator('[data-revealed="true"]')).toHaveCount(0)
})
