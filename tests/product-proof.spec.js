import { expect, test } from '@playwright/test'

const copy = {
  en: { path: '/', live: 'Building a bundle?', sales: 'Just closed a sale?', chart: 'Planning your next buy?', individual: 'Individual', bundle: 'Bundle', label: 'Illustrated example · CAD', fiction: /Fictional data/, cost: 'Item cost', fees: 'Estimated fees', rates: /Example rates: 8%.*2\.9%.*\$0\.30/, exclusions: 'Shipping and taxes excluded.' },
  fr: { path: '/fr/', live: 'Vous préparez un ensemble ?', sales: 'Vous venez de vendre ?', chart: 'Vous prévoyez un achat ?', individual: 'Individuel', bundle: 'Ensemble', label: 'Exemple illustré · CAD', fiction: /Données fictives/, cost: 'Coût de l’article', fees: 'Frais estimés', rates: /Taux d’exemple :.*8 %.*2,9 %.*0,30 \$/, exclusions: 'Livraison et taxes exclues.' },
}
const money = (lang, value) => new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { style: 'currency', currency: 'CAD', currencyDisplay: 'narrowSymbol' }).format(value)

for (const lang of ['en', 'fr']) {
  test(`${lang} illustrated pricing toggles individual and three-item bundle costs`, async ({ page }) => {
    const c = copy[lang]
    await page.goto(c.path)
    const proof = page.locator('#inside')
    const live = proof.getByRole('button', { name: c.live })
    await live.click()
    await expect(live).toHaveAttribute('aria-pressed', 'true')
    const illustration = proof.locator('[data-illustration="live"]')
    await expect(illustration.locator('.proof-window-label')).toHaveText(c.label)
    await expect(illustration.locator('.illustrated-items > div')).toHaveCount(3)
    await expect(illustration.locator('.illustrated-items strong')).toHaveText(Array(3).fill(money(lang, 20)))
    const individual = illustration.getByRole('button', { name: c.individual, exact: true })
    const bundle = illustration.getByRole('button', { name: c.bundle, exact: true })
    await expect(bundle).toHaveAttribute('aria-pressed', 'true')
    await expect(individual).toHaveAttribute('aria-pressed', 'false')
    await expect(illustration.locator('[data-illustrated-cost]')).toHaveText(money(lang, 60))
    await individual.focus()
    await page.keyboard.press('Enter')
    await expect(individual).toHaveAttribute('aria-pressed', 'true')
    await expect(bundle).toHaveAttribute('aria-pressed', 'false')
    await expect(illustration.locator('[data-illustrated-cost]')).toHaveText(money(lang, 20))
    await expect(illustration.locator('.pricing-sum')).toHaveAttribute('aria-live', 'polite')
    await bundle.click()
    await expect(illustration.locator('[data-illustrated-cost]')).toHaveText(money(lang, 60))
    await expect(illustration.locator('.illustration-note')).toContainText(c.fiction)
  })

  test(`${lang} scenario selection shows illustrative sale figures and the populated chart`, async ({ page }) => {
    const c = copy[lang]
    await page.goto(c.path)
    const proof = page.locator('#inside')
    const sales = proof.getByRole('button', { name: c.sales })
    const chart = proof.getByRole('button', { name: c.chart })
    await sales.click()
    await expect(sales).toHaveAttribute('aria-pressed', 'true')
    await expect(chart).toHaveAttribute('aria-pressed', 'false')
    const illustration = proof.locator('[data-illustration="sales"]')
    await expect(illustration.locator('.proof-window-label')).toHaveText(c.label)
    await expect(illustration.locator('.recorded-sale strong')).toHaveText(money(lang, 100))
    await expect(illustration.locator('.sale-example-rows > div').filter({ has: page.locator('dt', { hasText: c.cost }) }).locator('dd')).toHaveText(`−${money(lang, 60)}`)
    await expect(illustration.locator('.sale-example-rows > div').filter({ has: page.locator('dt', { hasText: c.fees }) }).locator('dd')).toHaveText(`−${money(lang, 11.2)}`)
    await expect(illustration.locator('.sale-example-profit strong')).toHaveText(`+${money(lang, 28.8)}`)
    await expect(illustration.locator('.illustration-note')).toContainText(c.rates)
    await expect(illustration.locator('.illustration-note')).toContainText(c.exclusions)
    await chart.click()
    await expect(chart).toHaveAttribute('aria-pressed', 'true')
    await expect(sales).toHaveAttribute('aria-pressed', 'false')
    await expect(proof.locator('.portfolio-preview svg[role="img"]')).toBeVisible()
    await expect(proof.locator('.portfolio-data-line').first()).toHaveAttribute('points', /0,.*600,/)
    await expect(proof.locator('.portfolio-demo-label')).toContainText(lang === 'fr' ? 'DONNÉES FICTIVES' : 'FICTIONAL DATA')
    await expect(proof.locator('[data-illustration]')).toHaveCount(0)
    await expect(page.locator('main img')).toHaveCount(0)
  })

  test(`${lang} immediate sale example retains the CAD assumptions and fixed amounts`, async ({ page }) => {
    const c = copy[lang]
    await page.goto(c.path)
    const example = page.locator('.hero-proof')
    await expect(example.locator('.proof-window-label')).toHaveText(c.label)
    await expect(example.locator('.sale-example-rows dd')).toHaveText([money(lang, 100), `−${money(lang, 60)}`, `−${money(lang, 11.2)}`])
    await expect(example.locator('.sale-example-profit strong')).toHaveText(`+${money(lang, 28.8)}`)
    await expect(example.locator('figcaption')).toContainText(c.rates)
    await expect(example.locator('figcaption')).toContainText(c.exclusions)
    await expect(page.locator('.seller-feedback blockquote')).toHaveText('Easy to use and helped me be a lot more confident about setting my prices live')
  })
}

test('illustrative mystery grid reveals a selected square and can reset', async ({ page }) => {
  await page.goto('/')
  const games = page.locator('#games')
  await games.locator('summary').click()
  await games.getByRole('button', { name: 'Mystery grid', exact: true }).click()
  await games.getByRole('button', { name: 'Reveal square 4', exact: true }).click()
  await expect(games.getByRole('status')).toContainText('Square 4 revealed')
  await games.getByRole('button', { name: 'Reset preview', exact: true }).click()
  await expect(games.getByRole('button', { name: 'Reveal square 4', exact: true })).toBeEnabled()
  await expect(games.getByRole('status')).not.toContainText('Square 4 revealed')
})
