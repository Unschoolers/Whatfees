<script setup>
import { computed } from 'vue'
import { productContent } from './product-content.js'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const p = computed(() => productContent[props.lang] || productContent.en)
const src = `${import.meta.env.BASE_URL}screenshots/sales.webp`
</script>

<template>
  <figure class="hero-proof">
    <div class="proof-window-label"><span>{{ p.actualApp }}</span><span aria-hidden="true">↗</span></div>
    <a class="hero-proof-image" :href="src" target="_blank" rel="noreferrer" :aria-label="p.openImage">
      <img :src="src" :alt="p.heroAlt" width="1100" height="1050" fetchpriority="high" />
    </a>
    <figcaption><strong>{{ p.heroCaption }}</strong><span>{{ p.heroDetail }}</span></figcaption>
  </figure>
</template>
