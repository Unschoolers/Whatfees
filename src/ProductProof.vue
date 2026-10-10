<script setup>
import { computed, ref } from 'vue'
import { productContent } from './product-content.js'
import PortfolioPreview from './PortfolioPreview.vue'
import ScenarioIllustration from './ScenarioIllustration.vue'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const p = computed(() => productContent[props.lang] || productContent.en)
const selected = ref(2)
const scenario = computed(() => p.value.scenarios[selected.value])
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
        <PortfolioPreview v-if="scenario.kind === 'chart'" :lang="lang" />
        <ScenarioIllustration v-else :key="scenario.kind" :kind="scenario.kind" :lang="lang" />
        <figcaption>{{ scenario.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>
