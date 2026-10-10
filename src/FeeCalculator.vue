<script setup>
import { computed, reactive } from 'vue'
import { calculateSale } from './calculator.js'
import { landingContent } from './landing-content.js'
const props = defineProps({ lang: { type:String, default:'en' } })
const copy = computed(() => landingContent[props.lang])
const inputs = reactive({ cost:60, target:20, commission:8, processing:2.9, fixed:0.3, shipping:0, buyerTax:0, feeTax:0 })
const result = computed(() => {
  // Solve from cost + profit first, then estimate the fees at that selling price.
  const pricing = calculateSale({ ...inputs, sale:0 })
  return pricing ? calculateSale({ ...inputs, sale:pricing.targetPrice }) : null
})
const money = value => new Intl.NumberFormat(props.lang === 'fr' ? 'fr-CA' : 'en-CA', {style:'currency',currency:'CAD'}).format(value)
const basicKeys = ['cost', 'target']
const percentageKeys = ['commission', 'processing', 'feeTax', 'target']
const basicFields = computed(() => basicKeys.map(key => [key, copy.value.fields[key]]))
const advancedFields = computed(() => Object.entries(copy.value.fields).filter(([key]) => !basicKeys.includes(key)))
</script>
<template>
  <section class="public-calculator" aria-labelledby="calculator-title">
    <h2 id="calculator-title">{{ copy.calculatorTitle }}</h2>
    <p>{{ copy.calculatorNote }}</p>
    <form class="calculator-fields calculator-basic-fields" @submit.prevent>
      <div v-for="[key, label] in basicFields" :key="key" class="calculator-field">
        <label :for="`calc-${key}`">{{ label }}</label>
        <input :id="`calc-${key}`" v-model="inputs[key]" type="number" min="0" :step="percentageKeys.includes(key) ? '0.1' : '0.01'" inputmode="decimal" :aria-describedby="`calc-${key}-help`" />
        <span :id="`calc-${key}-help`" class="calculator-field-help">{{ key === 'target' ? copy.targetHelp : copy.fieldHelp[key] }}</span>
      </div>
    </form>
    <div v-if="result" class="calculator-results" aria-live="polite">
      <div class="calculator-price"><span>{{ copy.results.target }}</span><strong data-result="target">{{ money(result.targetPrice) }}</strong><small>{{ copy.rounding }}</small></div>
      <div><span>{{ copy.results.profit }}</span><strong data-result="profit">{{ money(result.profit) }}</strong></div>
      <div><span>{{ copy.results.fees }}</span><strong data-result="fees">{{ money(result.fees) }}</strong></div>
    </div>
    <p v-else role="alert">{{ copy.invalid }}</p>
    <details class="calculator-advanced"><summary>{{ copy.advanced }}</summary>
      <p class="calculator-assumptions">{{ copy.feeDefaults }}</p>
      <div class="calculator-fields">
        <div v-for="[key, label] in advancedFields" :key="key" class="calculator-field">
          <label :for="`calc-${key}`">{{ label }}</label>
          <input :id="`calc-${key}`" v-model="inputs[key]" type="number" min="0" :step="percentageKeys.includes(key) ? '0.1' : '0.01'" inputmode="decimal" :aria-describedby="`calc-${key}-help`" />
          <span :id="`calc-${key}-help`" class="calculator-field-help">{{ copy.fieldHelp[key] }}</span>
        </div>
      </div>
      <p v-if="result" class="calculator-assumptions">{{ copy.results.breakEven }}: <strong data-result="breakEven">{{ money(result.breakEven) }}</strong></p>
      <p class="calculator-assumptions">{{ copy.assumptions }}</p>
      <a class="text-link" href="https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-seller-fees" target="_blank" rel="noreferrer">{{ copy.policy }}</a>
    </details>
  </section>
</template>
