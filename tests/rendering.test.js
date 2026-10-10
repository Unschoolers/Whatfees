import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('production HTML contains useful content without running JavaScript', () => {
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.match(html, /<h1>Know what you keep after the sale\.<\/h1>/)
  assert.match(html, /What is WhatFees\?/)
  assert.match(html, /Estimate Whatnot fees, price your TCG/)
  assert.match(html, /Illustrated example · CAD/)
  assert.match(html, /https:\/\/app\.whatfees\.ca/)
  assert.doesNotMatch(html, /<div id="app"><\/div>/)
})
