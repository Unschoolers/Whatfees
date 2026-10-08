// Generic, editable assumptions: not a marketplace quote or fee-rate lookup.
export function calculateSale(input) {
  const values = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, Number(value)]))
  const required = ['sale','cost','commission','processing','fixed','shipping','buyerTax','feeTax','target']
  if (required.some(key => input[key] === '' || input[key] == null || !Number.isFinite(values[key]) || values[key] < 0)) return null
  const { sale, cost, commission, processing, fixed, shipping, buyerTax, feeTax, target } = values
  const taxFactor = 1 + feeTax / 100
  const rate = (commission + processing) / 100 * taxFactor
  if (rate >= 1) return null
  const constantFees = ((shipping + buyerTax) * processing / 100 + fixed) * taxFactor
  const fees = sale * rate + constantFees
  const requiredPrice = profit => Math.ceil(((cost + constantFees + profit) / (1 - rate) - 1e-10) * 100) / 100
  return { fees, profit: sale - cost - fees, breakEven: requiredPrice(0), targetPrice: requiredPrice(target) }
}
