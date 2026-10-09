import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { publishedRoutes, pagePath, siteUrl } from '../src/routes.js'

const read = path => readFileSync(new URL(`../dist${path}`, import.meta.url), 'utf8')
test('all language variants have indexable content and reciprocal metadata', () => {
  const routes = publishedRoutes()
  assert.equal(routes.length, 10)
  const titles = new Set()
  for (const {id,lang,path} of routes) {
    const html = read(`${path}index.html`)
    assert.ok(html.includes(`<html lang="${lang}">`))
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}${path}"`))
    for (const locale of ['en','fr']) assert.ok(html.includes(`hreflang="${locale}" href="${siteUrl}${pagePath(id,locale)}"`))
    assert.ok(html.includes(`hreflang="x-default" href="${siteUrl}${pagePath(id)}"`))
    assert.match(html, /<h1[^>]*>[^<]+<\/h1>/)
    assert.doesNotMatch(html, /noindex/)
    assert.doesNotMatch(html, /href="(?:\/fr)?\/break-even-calculator\//)
    const title = html.match(/<title>(.*?)<\/title>/)[1]
    assert.ok(!titles.has(title), `Duplicate title: ${title}`)
    titles.add(title)
    for (const [,src] of html.matchAll(/(?:src|href)="(\/(?:assets|screenshots)\/[^"#]+)"/g)) assert.ok(existsSync(new URL(`../dist${src}`,import.meta.url)),src)
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
    assert.equal(schema['@context'],'https://schema.org')
    assert.ok(schema['@graph'].some(node => node['@type']==='WebPage' && node.url===siteUrl+path))
  }
})
test('crawl files list only real canonical pages', () => {
  const sitemap = read('/sitemap.xml')
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  assert.deepEqual(locations.sort(),publishedRoutes().map(r=>siteUrl+r.path).sort())
  assert.match(read('/robots.txt'), /Allow: \/\n/)
  assert.ok(read('/robots.txt').includes(`Sitemap: ${siteUrl}/sitemap.xml`))
  assert.match(read('/404.html'), /name="robots" content="noindex"/)
  assert.doesNotMatch(read('/404.html'), /rel="canonical"/)
})

test('retired break-even URLs redirect to the matching Whatnot calculator without duplicate content', () => {
  for (const prefix of ['', '/fr']) {
    const target = `${prefix}/whatnot-fee-calculator/`
    const html = read(`${prefix}/break-even-calculator/index.html`)
    assert.match(html, /name="robots" content="noindex, follow"/)
    assert.ok(html.includes(`http-equiv="refresh" content="0; url=${target}"`))
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}${target}"`))
    assert.ok(html.includes(`href="${target}"`))
    assert.doesNotMatch(html, /<form|<input/)
  }
  assert.doesNotMatch(read('/sitemap.xml'), /break-even-calculator/)
})
