export const siteUrl = 'https://www.whatfees.ca'
export const pageSlugs = {
  home: '',
  fees: 'whatnot-fee-calculator',
  inventory: 'tcg-inventory-tracker',
  canadaFees: 'whatnot-fees-canada',
  boxPricing: 'booster-box-vs-pack-profit',
}
export const pagePath = (id, lang = 'en') => `${lang === 'fr' ? '/fr' : ''}/${pageSlugs[id] ? `${pageSlugs[id]}/` : ''}`
export const resolveRoute = (pathname) => {
  const normalized = pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/'
  for (const lang of ['en', 'fr']) {
    for (const id of Object.keys(pageSlugs)) {
      if ((pagePath(id, lang).replace(/\/+$/, '') || '/') === normalized) return { id, lang }
    }
  }
  return { id: 'notFound', lang: normalized.startsWith('/fr/') ? 'fr' : 'en' }
}
export const publishedRoutes = () => ['en','fr'].flatMap(lang => Object.keys(pageSlugs).map(id => ({ id, lang, path:pagePath(id,lang) })))
export const redirectRoutes = () => ['en', 'fr'].map(lang => ({
  lang,
  path: `${lang === 'fr' ? '/fr' : ''}/break-even-calculator/`,
  destination: pagePath('fees', lang),
}))
