import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('production HTML contains useful content without running JavaScript', () => {
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.match(html, /<h1>Whatnot profit, made clear\.<\/h1>/)
  assert.match(html, /What is WhatFees\?/)
  assert.match(html, /https:\/\/app\.whatfees\.ca/)
  assert.doesNotMatch(html, /<div id="app"><\/div>/)
})
