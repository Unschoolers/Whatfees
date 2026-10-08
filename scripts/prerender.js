import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname } from 'node:path'
import { render } from '../.prerender/entry-server.js'
import { publishedRoutes, siteUrl } from '../src/routes.js'
import { seoHead, sitemap } from '../src/seo.js'

const template = await readFile('dist/index.html', 'utf8')
const routes = publishedRoutes()
for (const route of [...routes,{id:'notFound',lang:'en',path:'/404.html'}]) {
  const body = await render({initialLanguage:route.lang,initialPage:route.id})
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`)
    .replace(/^\s*(?:<title>.*?<\/title>|<meta (?:name="description"|property="og:[^"]*")[^>]*>|<link rel="canonical"[^>]*>)\s*$/gm,'')
    .replace('</head>',()=>`${seoHead(route)}\n</head>`)
    .replace('<div id="app"></div>',()=>`<div id="app">${body}</div>`)
  const filename = route.id==='notFound' ? 'dist/404.html' : `dist${route.path}index.html`
  await mkdir(dirname(filename),{recursive:true})
  await writeFile(filename,html)
}
await writeFile('dist/sitemap.xml',sitemap(routes))
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
await rm('.prerender',{recursive:true})
console.log(`Prerendered ${routes.length} indexable pages, 404 page, sitemap and robots.txt.`)
