<script setup>
import { computed } from 'vue'
import { productContent } from './product-content.js'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const p = computed(() => productContent[props.lang] || productContent.en)
</script>

<template>
  <section id="plans" class="product-plans" aria-labelledby="plans-title">
    <div class="section-wrap">
      <div class="product-section-heading"><div><p class="eyebrow">{{ p.plansKicker }}</p><h2 id="plans-title">{{ p.plansTitle }}</h2></div></div>
      <div class="plan-comparison">
        <article class="plan-card"><div class="plan-name"><h3>{{ p.free }}</h3><span aria-hidden="true">01</span></div><p>{{ p.freeIntro }}</p><ul><li v-for="item in p.freeItems" :key="item">{{ item }}</li></ul></article>
        <article class="plan-card plan-card-pro"><div class="plan-name"><h3>{{ p.pro }}</h3><span aria-hidden="true">✳</span></div><p>{{ p.proIntro }}</p><ul><li v-for="item in p.proItems" :key="item">{{ item }}</li></ul></article>
      </div>
      <div class="plan-next"><div><p>{{ p.pricingNote }}</p><p>{{ p.signIn }}</p></div><a class="button button-dark" href="https://app.whatfees.ca">{{ p.plansCta }}<span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
</template>
