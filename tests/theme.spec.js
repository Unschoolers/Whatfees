import { expect, test } from '@playwright/test'
import { publishedRoutes } from '../src/routes.js'

const pageColors = { light: 'rgb(246, 244, 238)', dark: 'rgb(25, 27, 29)' }
const viewportWidths = [320, 390, 768, 1440]

// Resolve translucent surfaces through their ancestors, then measure visible text.
// The wheel has a multicolor gradient: all four stop colors are checked separately.
async function contrastFailures(page) {
  return page.evaluate(() => {
    const parse = value => {
      const match = value.match(/rgba?\(([^)]+)\)/)
      return match ? match[1].split(/[ ,/]+/).map(Number) : [0, 0, 0, 0]
    }
    const blend = (fg, bg) => fg.slice(0, 3).map((channel, i) => channel * (fg[3] ?? 1) + bg[i] * (1 - (fg[3] ?? 1)))
    const luminance = rgb => rgb.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0)
    const ratio = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05)
    function background(element) {
      const layers = []
      for (let node = element; node; node = node.parentElement) layers.unshift(parse(getComputedStyle(node).backgroundColor))
      return layers.reduce((bg, fg) => blend(fg, bg), [255, 255, 255])
    }
    return [...document.querySelectorAll('body *')].flatMap(element => {
      if (['SCRIPT', 'STYLE', 'TITLE', 'DESC', 'OPTION'].includes(element.tagName) || !element.checkVisibility({checkOpacity:true, checkVisibilityCSS:true})) return []
      const text = [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join(' ').trim()
      if (!text && !element.matches('input,select,textarea')) return []
      const style = getComputedStyle(element)
      const size = parseFloat(style.fontSize)
      const large = size >= 24 || (size >= 18.66 && parseInt(style.fontWeight) >= 700)
      const glyphColor = element instanceof SVGElement ? style.fill : style.color
      const foreground = parse(glyphColor)
      let backgrounds = [background(element)]
      if (element.matches('[class^="wheel-entry-"],[class^="spectator-entry-"]')) {
        const index = Number(element.className.match(/\d$/)[0])
        const stops = [...new Set(getComputedStyle(element.parentElement).backgroundImage.match(/rgba?\([^)]+\)/g))]
        if (stops?.[index]) backgrounds = [parse(stops[index])]
      }
      const minimum = large ? 3 : 4.5
      const contrast = Math.min(...backgrounds.map(bg => ratio(blend(foreground, bg), bg)))
      if (contrast + .01 >= minimum) return []
      return [{text: text.slice(0, 90) || element.getAttribute('aria-label') || element.id, class:element.className, foreground:glyphColor, backgrounds, contrast: +contrast.toFixed(2), minimum}]
    })
  })
}

for (const colorScheme of ['light', 'dark']) {
  test(`automatic ${colorScheme} theme works before hydration without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled:false, colorScheme })
    const page = await context.newPage()
    await page.setViewportSize({ width:390, height:900 })
    await page.goto(publishedRoutes().find(route => route.id === 'home' && route.lang === 'en').path)
    await expect(page.locator('html')).toHaveCSS('background-color', pageColors[colorScheme])
    await expect(page.locator('body')).toHaveCSS('color', colorScheme === 'light' ? 'rgb(37, 39, 42)' : 'rgb(242, 240, 233)')
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('main h1')).not.toBeEmpty()
    await expect(page.locator('#calculator')).toBeVisible()
    expect(await page.locator('#calculator input').count()).toBeGreaterThan(0)
    expect((await page.locator('main').innerText()).length).toBeGreaterThan(200)
    expect(await contrastFailures(page)).toEqual([])
    await context.close()
  })
  for (const route of publishedRoutes()) {
    test(`${route.path} has readable ${colorScheme} text and focused fields`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      for (const width of viewportWidths) {
        await page.setViewportSize({ width, height:900 })
        await page.goto(route.path)
        await expect(page.locator('html')).toHaveCSS('background-color', pageColors[colorScheme])
        await expect(page.locator('select,button,a').filter({hasText:/^(System|Light|Dark|Appearance|Theme)$/i})).toHaveCount(0)
        await expect(page.locator('[data-theme-toggle], [aria-label*="theme" i], [aria-label*="appearance" i]')).toHaveCount(0)
        await page.locator('details').evaluateAll(elements => elements.forEach(element => {element.open = true}))
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
        expect(await contrastFailures(page)).toEqual([])
        if (width === 320) {
          const input = page.locator('input').first()
          if (await input.count()) {
            await input.focus()
            expect(await input.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
          }
        }
      }
      if (route.id === 'home') {
        const games = page.locator('#games')
        await games.getByRole('button', {name:route.lang === 'fr' ? 'Grille mystère' : 'Mystery grid', exact:true}).click()
        await games.locator('.demo-mystery-grid button').nth(3).click()
        await expect(games.locator('.demo-mystery-grid button').nth(3)).toBeDisabled()
        expect(await contrastFailures(page)).toEqual([])
        await games.getByRole('button', {name:route.lang === 'fr' ? 'Réinitialiser l’aperçu' : 'Reset preview', exact:true}).click()
        await expect(games.locator('.demo-mystery-grid button').nth(3)).toBeEnabled()
        await games.getByRole('button', {name:route.lang === 'fr' ? 'Tournoi' : 'Bracket battles', exact:true}).click()
        await games.locator('.demo-action').click()
        expect(await contrastFailures(page)).toEqual([])
        const proof = page.locator('#inside')
        await proof.getByRole('button', {name:route.lang === 'fr' ? 'Vous prévoyez un achat ?' : 'Planning your next buy?', exact:true}).click()
        await expect(proof.locator('.portfolio-preview svg[role="img"]')).toBeVisible()
        await expect(proof.locator('.portfolio-demo-label')).toBeVisible()
        expect(await contrastFailures(page)).toEqual([])
      }
    })
  }
}

test('OS theme changes update the same loaded page without a theme control', async ({ page }) => {
  await page.emulateMedia({ colorScheme:'light' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveCSS('background-color', pageColors.light)
  await page.emulateMedia({ colorScheme:'dark' })
  await expect(page.locator('html')).toHaveCSS('background-color', pageColors.dark)
  await page.emulateMedia({ colorScheme:'light' })
  await expect(page.locator('html')).toHaveCSS('background-color', pageColors.light)
  await expect(page.locator('select')).toHaveCount(0)
})

for (const colorScheme of ['light', 'dark']) {
  for (const width of viewportWidths) {
    test(`${colorScheme} expanded interfaces fit ${width}px in both languages`, async ({ page }) => {
      await page.emulateMedia({colorScheme})
      await page.setViewportSize({width, height:900})
      for (const path of ['/', '/fr/']) {
        await page.goto(path)
        await expect(page.locator('.pricing-nav')).toBeVisible()
        await page.locator('details').evaluateAll(elements => elements.forEach(element => {element.open = true}))
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
        expect(await contrastFailures(page)).toEqual([])
      }
    })
  }
}
