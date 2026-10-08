export const siteUrl = 'https://www.whatfees.ca'
export const pageSlugs = {
  home: '',
  fees: 'whatnot-fee-calculator',
  breakEven: 'break-even-calculator',
  inventory: 'tcg-inventory-tracker',
}
export const pagePath = (id, lang = 'en') => `${lang === 'fr' ? '/fr' : ''}/${pageSlugs[id] ? `${pageSlugs[id]}/` : ''}`
export const resolveRoute = (pathname) => {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  for (const lang of ['en', 'fr']) {
    for (const id of Object.keys(pageSlugs)) {
      if ((pagePath(id, lang).replace(/\/+$/, '') || '/') === normalized) return { id, lang }
    }
  }
  return { id: 'notFound', lang: normalized.startsWith('/fr/') ? 'fr' : 'en' }
}
// French equivalents are enabled in the bilingual-indexing increment.
export const publishedRoutes = () => Object.keys(pageSlugs).map(id => ({ id, lang: 'en', path: pagePath(id) }))
