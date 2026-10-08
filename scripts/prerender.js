import { readFile, writeFile, rm } from 'node:fs/promises'
import { render } from '../.prerender/entry-server.js'

const template = await readFile('dist/index.html', 'utf8')
const html = await render({ initialLanguage: 'en' })
await writeFile('dist/index.html', template.replace('<div id="app"></div>', `<div id="app">${html}</div>`))
await rm('.prerender', { recursive: true })
console.log('Prerendered homepage with Vue server rendering.')
