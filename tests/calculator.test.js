import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculateSale } from '../src/calculator.js'
const base = { sale:100, cost:60, commission:8, processing:2.9, fixed:0.3, shipping:0, buyerTax:0, feeTax:0, target:0 }
test('fees use item commission and full-order processing bases', () => {
  const r = calculateSale({ ...base, shipping:10, buyerTax:5 })
  assert.ok(Math.abs(r.fees - 11.635) < 1e-9)
  assert.ok(Math.abs(r.profit - 28.365) < 1e-9)
})
test('suggested prices round up and meet the requested profit', () => {
  const r = calculateSale({ ...base, shipping:10, target:15 })
  assert.equal(r.targetPrice, 84.84)
  assert.ok(calculateSale({ ...base, shipping:10, sale:r.targetPrice }).profit >= 15)
})
test('fee tax is included in the required price', () => {
  const r = calculateSale({ ...base, feeTax:15, target:15 })
  assert.ok(calculateSale({ ...base, feeTax:15, sale:r.targetPrice }).profit >= 15)
})
test('empty, negative, non-finite and impossible rates return no misleading result', () => {
  for (const invalid of [{cost:''},{sale:-1},{commission:100},{processing:Infinity},{fixed:NaN}]) {
    assert.equal(calculateSale({...base,...invalid}), null)
  }
})
