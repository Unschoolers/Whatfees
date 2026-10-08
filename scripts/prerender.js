import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { render } from '../.prerender/entry-server.js'
import { publishedRoutes, siteUrl } from '../src/routes.js'
import { content } from '../src/content.js'
import { landingContent } from '../src/landing-content.js'

const template = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
for (const route of publishedRoutes()) {
  const metadata = route.id === 'home' ? content[route.lang] : landingContent[route.lang].pages[route.id]
  const url = siteUrl + route.path
  const body = await render({ initialLanguage:route.lang, initialPage:route.id })
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(metadata.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(metadata.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(metadata.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(metadata.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace('<div id="app"></div>', `<div id="app">${body}</div>`)
  const directory = `dist${route.path}`
  await mkdir(directory,{recursive:true})
  await writeFile(`${directory}index.html`,html)
}
await rm('.prerender', { recursive:true })
console.log(`Prerendered ${publishedRoutes().length} pages with Vue server rendering.`)
