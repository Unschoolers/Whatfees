import { content } from './content.js'
import { landingContent } from './landing-content.js'
import { pagePath, siteUrl } from './routes.js'

const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
export const pageMetadata = ({ id, lang }) => id === 'home' ? content[lang] : landingContent[lang].pages[id]
export function seoHead(route) {
  if (route.id === 'notFound') return '<title>Page not found | WhatFees</title>\n<meta name="robots" content="noindex" />'
  const { title, description } = pageMetadata(route)
  const url = siteUrl + pagePath(route.id,route.lang)
  const schema = {
    '@context':'https://schema.org',
    '@graph':[
      { '@type':'Organization', '@id':`${siteUrl}/#organization`, name:'WhatFees', url:siteUrl },
      { '@type':'WebSite', '@id':`${siteUrl}/#website`, name:'WhatFees', url:siteUrl, inLanguage:['en','fr'], publisher:{'@id':`${siteUrl}/#organization`} },
      { '@type':'WebPage', '@id':`${url}#webpage`, url, name:title, description, inLanguage:route.lang, isPartOf:{'@id':`${siteUrl}/#website`} },
      ...(route.id==='home' ? [{ '@type':'SoftwareApplication', name:'WhatFees', url:'https://app.whatfees.ca', applicationCategory:'BusinessApplication', operatingSystem:'Web, Android' }] : []),
    ],
  }
  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...['en','fr','x-default'].map(lang=>`<link rel="alternate" hreflang="${lang}" href="${siteUrl}${pagePath(route.id,lang==='x-default'?'en':lang)}" />`),
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:locale" content="${route.lang==='fr'?'fr_CA':'en_CA'}" />`,
    `<meta property="og:image" content="${siteUrl}/screenshots/sales.webp" />`,
    '<meta property="og:image:alt" content="WhatFees app with fictional demo sales data" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`,
  ].join('\n')
}
export function sitemap(routes) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + routes.map(route=>`<url><loc>${siteUrl}${route.path}</loc>${['en','fr','x-default'].map(lang=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl}${pagePath(route.id,lang==='x-default'?'en':lang)}" />`).join('')}</url>`).join('\n') + '\n</urlset>\n'
}
