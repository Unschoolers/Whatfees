<script setup>
import { computed, reactive } from 'vue'
import { calculateSale } from './calculator.js'
import { landingContent } from './landing-content.js'
const props = defineProps({ lang: { type:String, default:'en' }, compact: Boolean })
const copy = computed(() => landingContent[props.lang])
const inputs = reactive({ sale:100, cost:60, commission:8, processing:2.9, fixed:0.3, shipping:0, buyerTax:0, feeTax:0, target:0 })
const result = computed(() => calculateSale(inputs))
const money = value => new Intl.NumberFormat(props.lang === 'fr' ? 'fr-CA' : 'en-CA', {style:'currency',currency:'CAD'}).format(value)
const basicKeys = ['sale', 'cost', 'target']
const percentageKeys = ['commission', 'processing', 'feeTax', 'target']
const basicFields = computed(() => Object.entries(copy.value.fields).filter(([key]) => !props.compact || basicKeys.includes(key)))
const advancedFields = computed(() => Object.entries(copy.value.fields).filter(([key]) => !basicKeys.includes(key)))
</script>
<template>
  <section class="public-calculator" aria-labelledby="calculator-title">
    <h2 id="calculator-title">{{ copy.calculatorTitle }}</h2>
    <p>{{ copy.calculatorNote }}</p>
    <form class="calculator-fields" @submit.prevent>
      <div v-for="[key, label] in basicFields" :key="key" class="calculator-field">
        <label :for="`calc-${key}`">{{ label }}</label>
        <input :id="`calc-${key}`" v-model="inputs[key]" type="number" min="0" :step="percentageKeys.includes(key) ? '0.1' : '0.01'" inputmode="decimal" :aria-describedby="key === 'target' ? 'calc-target-help' : undefined" />
        <span v-if="key === 'target'" id="calc-target-help" class="calculator-field-help">{{ copy.targetHelp }}</span>
      </div>
    </form>
    <details v-if="compact" class="calculator-advanced"><summary>{{ copy.advanced }}</summary><div class="calculator-fields">
      <label v-for="[key, label] in advancedFields" :key="key" :for="`calc-${key}`">{{ label }}
        <input :id="`calc-${key}`" v-model="inputs[key]" type="number" min="0" :step="percentageKeys.includes(key) ? '0.1' : '0.01'" inputmode="decimal" />
      </label>
    </div></details>
    <div v-if="result" class="calculator-results" aria-live="polite">
      <div v-for="(label, key) in copy.results" :key="key"><span>{{ label }}</span><strong :data-result="key">{{ money(result[{fees:'fees',profit:'profit',breakEven:'breakEven',target:'targetPrice'}[key]]) }}</strong></div>
    </div>
    <p v-else role="alert">{{ copy.invalid }}</p>
    <p class="calculator-assumptions">{{ copy.assumptions }}</p>
    <a class="text-link" href="https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-seller-fees" target="_blank" rel="noreferrer">{{ copy.policy }}</a>
  </section>
</template>
