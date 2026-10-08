<script setup>
import { computed } from 'vue'
import { landingContent } from './landing-content.js'
import FeeCalculator from './FeeCalculator.vue'
import './search.css'
const props = defineProps({ page:String, lang:String })
const copy = computed(() => landingContent[props.lang])
const article = computed(() => copy.value.pages[props.page])
</script>
<template>
  <article class="search-page section-wrap">
    <p class="eyebrow">WHATFEES / {{ lang === 'fr' ? 'OUTILS DE VENTE' : 'SELLER TOOLS' }}</p>
    <h1>{{ article.heading }}</h1>
    <p class="search-intro">{{ article.intro }}</p>
    <FeeCalculator v-if="page !== 'inventory'" :lang="lang" />
    <a v-else class="button button-dark" href="https://app.whatfees.ca">{{ copy.cta }} ↗</a>
    <div class="search-article"><section v-for="section in article.sections" :key="section.title"><h2>{{ section.title }}</h2><p>{{ section.body }}</p></section></div>
    <a class="button button-dark" href="https://app.whatfees.ca">{{ copy.cta }} ↗</a>
  </article>
</template>
