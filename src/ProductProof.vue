<script setup>
import { computed, ref } from 'vue'
import { productContent } from './product-content.js'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const p = computed(() => productContent[props.lang] || productContent.en)
const selected = ref(0)
const shot = computed(() => p.value.scenarios[selected.value])
const src = computed(() => `${import.meta.env.BASE_URL}screenshots/${shot.value.src}`)
</script>

<template>
  <section id="inside" class="product-proof section-wrap" aria-labelledby="proof-title">
    <div class="product-section-heading">
      <div><p class="eyebrow">{{ p.proofKicker }}</p><h2 id="proof-title">{{ p.proofTitle }}</h2></div>
      <p>{{ p.proofIntro }}</p>
    </div>
    <div class="product-proof-layout">
      <div class="seller-scenarios">
        <article v-for="(scenario, i) in p.scenarios" :key="scenario.src" class="seller-scenario" :class="{ 'is-selected': selected === i }">
          <p class="scenario-moment"><span>0{{ i + 1 }}</span>{{ scenario.moment }}</p>
          <h3><button type="button" :aria-pressed="selected === i" aria-controls="scenario-screen" @click="selected = i">{{ scenario.title }}<span aria-hidden="true">↗</span></button></h3>
          <p class="scenario-body">{{ scenario.body }}</p>
        </article>
      </div>
      <figure id="scenario-screen" class="scenario-screen">
        <div class="proof-window-label"><span>{{ p.actualApp }}</span><span aria-hidden="true">0{{ selected + 1 }} / 03</span></div>
        <a :href="src" target="_blank" rel="noreferrer" :aria-label="`${shot.caption}: ${p.openImage}`"><img :src="src" :alt="shot.alt" width="1100" height="1050" loading="lazy" /></a>
        <figcaption>{{ shot.caption }}<span aria-hidden="true">↗</span></figcaption>
      </figure>
    </div>
  </section>
</template>
