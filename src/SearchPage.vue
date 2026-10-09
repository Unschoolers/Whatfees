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
    <FeeCalculator v-if="page === 'fees'" :lang="lang" />
    <a v-else-if="article.calculatorLink" class="button button-dark" :href="article.calculatorLink">{{ article.calculatorCta }} ↗</a>
    <a v-else class="button button-dark" href="https://app.whatfees.ca">{{ copy.cta }} ↗</a>
    <div class="search-article"><section v-for="section in article.sections" :key="section.title"><h2>{{ section.title }}</h2><p>{{ section.body }}</p>
      <div v-if="section.table" class="guide-table-wrap"><table class="guide-table"><caption>{{ section.table.caption }}</caption><thead><tr><th v-for="heading in section.table.headings" :key="heading" scope="col">{{ heading }}</th></tr></thead><tbody><tr v-for="row in section.table.rows" :key="row[0]"><th scope="row">{{ row[0] }}</th><td v-for="cell in row.slice(1)" :key="cell">{{ cell }}</td></tr></tbody></table></div>
      <a v-if="section.source" class="text-link" :href="section.source.href" target="_blank" rel="noreferrer">{{ section.source.label }} ↗</a>
    </section></div>
    <p v-if="article.checked" class="guide-checked">{{ article.checked }}</p>
    <a class="button button-dark" href="https://app.whatfees.ca">{{ copy.cta }} ↗</a>
  </article>
</template>
