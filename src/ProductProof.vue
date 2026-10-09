<script setup>
import { computed, ref } from 'vue'
import { productContent } from './product-content.js'
import PortfolioPreview from './PortfolioPreview.vue'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const p = computed(() => productContent[props.lang] || productContent.en)
const selected = ref(2)
const shot = computed(() => p.value.scenarios[selected.value])
const src = computed(() => shot.value.src ? `${import.meta.env.BASE_URL}screenshots/${shot.value.src}` : null)
</script>

<template>
  <section id="inside" class="product-proof section-wrap" aria-labelledby="proof-title">
    <div class="product-section-heading">
      <div><p class="eyebrow">{{ p.proofKicker }}</p><h2 id="proof-title">{{ p.proofTitle }}</h2></div>
      <p>{{ p.proofIntro }}</p>
    </div>
    <div class="product-proof-layout">
      <div class="seller-scenarios">
        <article v-for="(scenario, i) in p.scenarios" :key="scenario.title" class="seller-scenario" :class="{ 'is-selected': selected === i }">
          <p class="scenario-moment"><span>0{{ i + 1 }}</span>{{ scenario.moment }}</p>
          <h3><button type="button" :aria-pressed="selected === i" aria-controls="scenario-screen" @click="selected = i">{{ scenario.title }}<span aria-hidden="true">↗</span></button></h3>
          <p class="scenario-body">{{ scenario.body }}</p>
        </article>
      </div>
      <figure id="scenario-screen" class="scenario-screen">
        <div v-if="shot.kind !== 'chart'" class="proof-window-label"><span>{{ shot.kind === 'chart' ? p.portfolioExample : p.actualApp }}</span><span aria-hidden="true">0{{ selected + 1 }} / 03</span></div>
        <PortfolioPreview v-if="shot.kind === 'chart'" :lang="lang" />
        <a v-else :class="{ 'sales-screen-crop': shot.src === 'sales.webp' }" :href="src" target="_blank" rel="noreferrer" :aria-label="`${shot.caption}: ${p.openImage}`"><img :src="src" :alt="shot.alt" width="1100" height="1050" loading="lazy" /></a>
        <figcaption>{{ shot.caption }}<span v-if="shot.kind !== 'chart'" aria-hidden="true">↗</span></figcaption>
      </figure>
    </div>
  </section>
</template>
