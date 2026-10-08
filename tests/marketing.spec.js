import { expect, test } from '@playwright/test'

const viewportWidths = [320, 390, 768, 1440]
const expected = {
  en: {
    toggle: 'Français',
    nextToggle: 'English',
    title: 'Whatnot Fee Calculator & Seller Toolkit | WhatFees',
    description: 'Estimate Whatnot fees, calculate profit and break-even prices, and track TCG inventory and sales with WhatFees. Available on web and Android.',
  },
  fr: {
    toggle: 'English',
    nextToggle: 'Français',
    title: 'Calculateur de frais Whatnot et outils de vente | WhatFees',
    description: 'Estimez les frais Whatnot, calculez vos profits et votre seuil de rentabilité, et suivez votre inventaire TCG avec WhatFees. Sur le Web et Android.',
  },
}

for (const width of viewportWidths) {
  test(`marketing page is readable and usable at ${width}px in English and French`, async ({ page }) => {
    const pageErrors = []
    page.on('pageerror', (error) => pageErrors.push(error.message))
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const languageToggle = page.getByRole('button', { name: expected.en.toggle })
    await expect(languageToggle).toBeVisible()
    await expect(page.locator('a[href="https://app.whatfees.ca"]')).toHaveCount(3)
    await expect(page.locator('a[href="https://play.google.com/store/apps/details?id=io.whatfees"]')).toHaveCount(1)

    for (const language of ['en', 'fr']) {
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page).toHaveTitle(expected[language].title)
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', expected[language].description)
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', expected[language].title)
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', expected[language].description)

      const dimensions = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        documentViewport: document.documentElement.clientWidth,
        body: document.body.scrollWidth,
        bodyViewport: document.body.clientWidth,
      }))
      expect(dimensions.document).toBeLessThanOrEqual(dimensions.documentViewport)
      expect(dimensions.body).toBeLessThanOrEqual(dimensions.bodyViewport)

      for (const image of await page.locator('.gallery-grid img').all()) {
        await image.evaluate(async (element) => {
          element.loading = 'eager'
          await element.decode()
        })
        expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0)
      }

      const secondFaq = page.locator('.faq-list details').nth(1)
      if (!(await secondFaq.evaluate((element) => element.open))) {
        await secondFaq.locator('summary').click()
      }
      await expect(secondFaq).toHaveJSProperty('open', true)

      if (language === 'en') {
        await languageToggle.click()
        await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
      }
    }

    expect(pageErrors).toEqual([])

    const activeToggle = page.getByRole('button', { name: expected.fr.toggle })
    await activeToggle.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })
}
