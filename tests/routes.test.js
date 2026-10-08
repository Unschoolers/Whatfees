import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveRoute } from '../src/routes.js'

test('static index.html aliases resolve to the same canonical content', () => {
  for (const [path,id,lang] of [['/index.html','home','en'],['/fr/index.html','home','fr'],['/fr/whatnot-fee-calculator/index.html','fees','fr']]) {
    assert.deepEqual(resolveRoute(path),{id,lang})
  }
  assert.equal(resolveRoute('/unknown/index.html').id,'notFound')
})
