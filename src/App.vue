<script setup>
import { computed, ref } from 'vue'
import { content } from './content.js'
import SearchPage from './SearchPage.vue'
import HeroProof from './HeroProof.vue'
import ProductProof from './ProductProof.vue'
import GamesPreview from './GamesPreview.vue'
import PlanExpectations from './PlanExpectations.vue'
import SearchLinks from './SearchLinks.vue'
import FeeCalculator from './FeeCalculator.vue'
import './search.css'
import SellerFeedback from './SellerFeedback.vue'
import CreatorNote from './CreatorNote.vue'
import { pagePath } from './routes.js'

const props = defineProps({ initialLanguage: { type: String, default: 'en' }, initialPage: { type: String, default: 'home' } })
const lang = ref(props.initialLanguage)
const c = computed(() => content[lang.value])
const copy = computed(() => lang.value === 'en' ? {
  appNote:'Available on web and Android.', navLabel:'Main navigation', homeLabel:'WhatFees home', collectPriceSell:'INVENTORY · PRICING · SALES', toolkitIndex:'02 / TOOLS', benefitsLabel:'WhatFees benefits'
} : {
  appNote:'Sur le Web et Android.', navLabel:'Navigation principale', homeLabel:'Accueil WhatFees', collectPriceSell:'INVENTAIRE · PRIX · VENTES', toolkitIndex:'02 / OUTILS', benefitsLabel:'Avantages WhatFees'
})
const androidUrl = 'https://play.google.com/store/apps/details?id=io.whatfees'
const appUrl = 'https://app.whatfees.ca'
const homePath = computed(() => pagePath('home',lang.value))
</script>

<template>
  <a class="skip-link" href="#main">{{ c.skip }}</a>
  <header class="site-header">
    <a class="wordmark" :href="homePath + '#top'" :aria-label="copy.homeLabel"><span class="wordmark-symbol">W</span><span>WHATFEES<span class="wordmark-period">.</span></span></a>
    <nav class="main-nav" :aria-label="copy.navLabel">
      <a :href="homePath + '#games'">{{ lang === 'fr' ? 'Jeux' : 'Games' }}</a><a :href="homePath + '#inside'">{{ c.nav[1] }}</a><a :href="homePath + '#faq'">{{ c.nav[2] }}</a>
    </nav>
    <div class="header-actions">
      <a class="pricing-nav" :href="homePath + '#plans'">{{ lang === 'fr' ? 'Tarifs' : 'Pricing' }}</a>
      <a class="language-toggle" :href="pagePath(initialPage === 'notFound' ? 'home' : initialPage, lang === 'en' ? 'fr' : 'en')" :hreflang="lang === 'en' ? 'fr' : 'en'">{{ c.language }}</a>
      <a class="header-cta" :href="appUrl">{{ c.cta }} <span aria-hidden="true">↗</span></a>
    </div>
  </header>

  <main id="main">
    <section v-if="initialPage === 'notFound'" class="search-page section-wrap"><h1>Page not found</h1><p>The page you requested does not exist.</p><a class="button button-dark" href="/">Return to WhatFees</a></section>
    <SearchPage v-else-if="initialPage !== 'home'" :page="initialPage" :lang="lang" />
    <template v-else>
    <section id="top" class="hero section-wrap">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span>{{ c.eyebrow }}</p>
        <h1>{{ c.hero }}</h1>
        <p class="hero-intro">{{ c.intro }}</p>
        <div class="hero-actions">
          <a class="button button-dark" href="#calculator">{{ c.tryCalculator }} <span aria-hidden="true">↓</span></a>
          <a class="text-link" :href="appUrl">{{ c.cta }} <span aria-hidden="true">↗</span></a>
        </div>
        <p class="hero-note"><span class="note-rule"></span>{{ c.note }}</p>
      </div>
      <HeroProof :lang="lang" />
      <div class="hero-rail"><span>{{ copy.collectPriceSell }}</span><span>01 — 03</span></div>
    </section>

    <section class="benefit-strip" :aria-label="copy.benefitsLabel"><div v-for="(item, i) in c.strip" :key="item" class="benefit-item"><span class="benefit-number">0{{ i + 1 }}</span><span>{{ item }}</span><span class="benefit-arrow">↗</span></div></section>

    <div class="homepage-calculator section-wrap"><FeeCalculator id="calculator" :lang="lang" compact /><p class="calculator-access-note">{{ c.calculatorAccess }}</p></div>

    <PlanExpectations :lang="lang" />
    <SellerFeedback :lang="lang" />

    <ProductProof :lang="lang" />

    <section id="features" class="connections-section section-wrap">
        <div class="connections"><span class="connection-label">{{ c.connectedKicker }}</span><div class="connection-copy"><h3>{{ c.connectedTitle }}</h3><p>{{ c.connectedBody }}</p></div><div class="connection-chips"><span>{{ c.whatnot }}</span><span>{{ c.shopify }}</span></div></div>
    </section>

    <GamesPreview :lang="lang" />
    <CreatorNote :lang="lang" />

    <section id="faq" class="faq-section section-wrap">
      <div class="faq-heading"><p class="eyebrow">{{ c.faqKicker }}</p><h2>{{ c.faqTitle }}</h2><div class="faq-aside"><span class="aside-star">✳</span><p>{{ copy.appNote }}</p></div></div>
      <div class="faq-list"><details v-for="(faq, i) in c.faqs" :key="faq.q" :open="i === 0"><summary><span class="faq-num">0{{ i + 1 }}</span><span>{{ faq.q }}</span><span class="faq-plus">+</span></summary><p>{{ faq.a }}</p></details></div>
    </section>

    <section class="final-cta section-wrap">
      <p class="eyebrow">{{ c.finalKicker }}</p><h2>{{ c.finalTitle }}</h2><p class="final-text">{{ c.finalText }}</p>
      <div class="final-actions"><a class="button button-cream" :href="appUrl">{{ c.finalCta }} <span aria-hidden="true">↗</span></a><a class="play-link" :href="androidUrl" target="_blank" rel="noreferrer"><span class="play-icon">▷</span>{{ c.android }}</a></div>
      <span class="final-spark" aria-hidden="true">✳</span>
    </section>
    </template>
    <SearchLinks :lang="lang" />
  </main>

  <footer class="site-footer section-wrap"><a class="wordmark footer-brand" :href="homePath + '#top'"><span class="wordmark-symbol">W</span><span>WHATFEES<span class="wordmark-period">.</span></span></a><p>{{ c.footer }}</p><div class="footer-links"><a href="https://app.whatfees.ca/privacy.html">{{ lang === 'fr' ? 'Confidentialité' : 'Privacy' }}</a><span>{{ c.legal }}</span></div><small>© {{ new Date().getFullYear() }} WhatFees</small></footer>
</template>
