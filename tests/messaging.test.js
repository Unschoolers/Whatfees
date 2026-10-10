import { test } from 'node:test'
import assert from 'node:assert/strict'
import { content } from '../src/content.js'

test('both languages explain Whatnot pricing and the intended sellers', () => {
  assert.match(content.en.title, /Whatnot Fee Calculator/)
  assert.match(content.fr.title, /Calculateur de frais Whatnot/)
  for (const language of ['en', 'fr']) {
    assert.match(content[language].intro, /Whatnot/)
    assert.ok(content[language].hero.length > 0)
    assert.match(content[language].intro, /TCG/)
    assert.ok(content[language].description.length <= 160)
  }
})
