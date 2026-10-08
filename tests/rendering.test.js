import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('production HTML contains useful content without running JavaScript', () => {
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.match(html, /<h1>Know your profit before you sell on Whatnot\.<\/h1>/)
  assert.match(html, /What is WhatFees\?/)
  assert.match(html, /https:\/\/app\.whatfees\.ca/)
  assert.doesNotMatch(html, /<div id="app"><\/div>/)
})
