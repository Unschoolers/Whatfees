<script setup>
import { computed } from 'vue'
import { landingContent } from './landing-content.js'
import { pagePath } from './routes.js'
import './search.css'
const props = defineProps({ lang:{type:String,default:'en'} })
const copy = computed(() => landingContent[props.lang])
</script>
<template>
  <section class="search-links section-wrap" aria-labelledby="search-links-title">
    <h2 id="search-links-title">{{ copy.linksTitle }}</h2><p>{{ copy.linksIntro }}</p>
    <div class="search-link-grid"><a v-for="(page,id) in copy.pages" :key="id" :href="pagePath(id)"><span>{{ page.heading }}</span><span aria-hidden="true">↗</span></a></div>
  </section>
</template>
