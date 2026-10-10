import { expect, test } from '@playwright/test'
import { pagePath } from '../src/routes.js'
import { content } from '../src/content.js'
import { landingContent } from '../src/landing-content.js'

for (const id of ['home','fees','inventory','canadaFees','boxPricing']) {
  test(`language links preserve ${id} and survive refresh`, async ({ page }) => {
    const errors = []
    page.on('pageerror',e=>errors.push(e.message))
    page.on('console',m=>{if (/hydration/i.test(m.text()))errors.push(m.text())})
    await page.goto(pagePath(id))
    await page.getByRole('link',{name:'Français',exact:true}).click()
    await expect(page).toHaveURL(new RegExp(pagePath(id,'fr')+'$'))
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang','fr')
    const metadata = id==='home' ? content.fr : landingContent.fr.pages[id]
    await expect(page).toHaveTitle(metadata.title)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://www.whatfees.ca${pagePath(id,'fr')}`)
    await page.getByRole('link',{name:'English',exact:true}).click()
    await expect(page).toHaveURL(new RegExp(pagePath(id)+'$'))
    expect(errors).toEqual([])
  })
}

test('French landing page is useful with JavaScript disabled', async ({ browser }) => {
  const context=await browser.newContext({javaScriptEnabled:false})
  const page=await context.newPage()
  await page.goto('/fr/whatnot-fee-calculator/')
  await expect(page.getByRole('heading',{level:1})).toHaveText('Calculateur de frais Whatnot')
  await expect(page.getByRole('link',{name:'English',exact:true})).toHaveAttribute('href','/whatnot-fee-calculator/')
  await expect(page.locator('[data-result="target"]')).toContainText('81,15')
  await expect(page.locator('[data-result="profit"]')).toContainText('12,00')
  await expect(page.locator('.public-calculator input:visible')).toHaveCount(2)
  await context.close()
})

test('not-found page offers a route home without pretending to be indexable', async ({ page }) => {
  await page.goto('/404.html')
  await expect(page.getByRole('heading',{level:1})).toHaveText('Page not found')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex')
  await expect(page.getByRole('link',{name:'Return to WhatFees',exact:true})).toHaveAttribute('href','/')
})
