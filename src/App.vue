<script setup>
import { computed, ref, watch } from 'vue'
import { content } from './content.js'

const props = defineProps({ initialLanguage: { type: String, default: 'en' } })
const lang = ref(props.initialLanguage)
const c = computed(() => content[lang.value])
const copy = computed(() => lang.value === 'en' ? {
  gamesKicker: 'A LITTLE SHOWTIME ENERGY', gamesTitle: 'Keep your audience in the action.', gamesIntro: 'Use the shared spectator view to bring a little momentum to your next show.',
  games: [
    { mark: '↻', title: 'Wheel', body: 'Spin the wheel for your next show moment.' },
    { mark: '▦', title: 'Mystery grid', body: 'Let buyers pick a square and reveal a surprise.' },
    { mark: '⌘', title: 'Bracket battles', body: 'Put fan favourites head to head.' }
  ],
  appNote:'Your selling sidekick, on web and Android.', appLink:'app.whatfees.ca', appButton:'Open the web app', androidButton:'Google Play', close:'Close', navLabel:'Main navigation', homeLabel:'WhatFees home', fieldNotes:'WF / FIELD NOTES', saleNote:'SALE NOTE', costFeesProfit:'COST / FEES / PROFIT', showTool:'SHOW TOOL', openScreenshot:'Open full-size screenshot in a new tab', illustrationLabel:'Illustrative sale breakdown', collectPriceSell:'COLLECT · PRICE · SELL', toolkitIndex:'02 / TOOLKIT', benefitsLabel:'WhatFees benefits'
} : {
  gamesKicker: 'UN PEU D’ANIMATION EN DIRECT', gamesTitle: 'Faites participer votre public.', gamesIntro: 'La vue spectateur partagée donne du rythme à votre prochain direct.',
  games: [
    { mark: '↻', title: 'Roue', body: 'Faites tourner la roue pour animer votre prochain direct.' },
    { mark: '▦', title: 'Grille mystère', body: 'Laissez les acheteurs choisir une case surprise.' },
    { mark: '⌘', title: 'Tournoi à élimination', body: 'Faites s’affronter les favoris du public.' }
  ],
  appNote:'Votre allié de vente sur le Web et Android.', appLink:'app.whatfees.ca', appButton:'Ouvrir l’application Web', androidButton:'Google Play', close:'Fermer', navLabel:'Navigation principale', homeLabel:'Accueil WhatFees', fieldNotes:'WF / CARNET DE BORD', saleNote:'NOTE DE VENTE', costFeesProfit:'COÛT / FRAIS / PROFIT', showTool:'OUTIL DE DIRECT', openScreenshot:'Ouvrir la capture en taille réelle dans un nouvel onglet', illustrationLabel:'Exemple indicatif de vente', collectPriceSell:'COLLECTER · TARIFER · VENDRE', toolkitIndex:'02 / OUTILS', benefitsLabel:'Avantages WhatFees'
})
const androidUrl = 'https://play.google.com/store/apps/details?id=io.whatfees'
const appUrl = 'https://app.whatfees.ca'
const base = import.meta.env.BASE_URL
const assetUrl = (path) => `${base}${path.replace(/^\//, '')}`
watch(lang, (value) => {
  document.documentElement.lang = value
  document.title = c.value.title
  const description = document.querySelector('meta[name="description"]')
  const socialTitle = document.querySelector('meta[property="og:title"]')
  const socialDescription = document.querySelector('meta[property="og:description"]')
  if (description) description.content = c.value.description
  if (socialTitle) socialTitle.content = c.value.title
  if (socialDescription) socialDescription.content = c.value.description
})
</script>

<template>
  <a class="skip-link" href="#main">{{ c.skip }}</a>
  <header class="site-header">
    <a class="wordmark" href="#top" :aria-label="copy.homeLabel"><span class="wordmark-symbol">W</span><span>WHATFEES<span class="wordmark-period">.</span></span></a>
    <nav class="main-nav" :aria-label="copy.navLabel">
      <a href="#features">{{ c.nav[0] }}</a><a href="#inside">{{ c.nav[1] }}</a><a href="#faq">{{ c.nav[2] }}</a>
    </nav>
    <div class="header-actions">
      <button class="language-toggle" type="button" @click="lang = lang === 'en' ? 'fr' : 'en'">{{ c.language }}</button>
      <a class="header-cta" :href="appUrl">{{ c.cta }} <span aria-hidden="true">↗</span></a>
    </div>
  </header>

  <main id="main">
    <section id="top" class="hero section-wrap">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span>{{ c.eyebrow }}</p>
        <h1>{{ c.hero }}</h1>
        <p class="hero-intro">{{ c.intro }}</p>
        <div class="hero-actions">
          <a class="button button-dark" :href="appUrl">{{ c.cta }} <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="#features">{{ c.secondary }} <span aria-hidden="true">↓</span></a>
        </div>
        <p class="hero-note"><span class="note-rule"></span>{{ c.note }}</p>
      </div>
      <div class="hero-art" :aria-label="copy.illustrationLabel">
        <div class="hero-art-top"><span>{{ copy.fieldNotes }}</span><span>{{ lang === 'en' ? 'NO.' : 'Nº' }} 001</span></div>
        <div class="receipt">
          <div class="receipt-head"><span class="receipt-stamp">{{ copy.saleNote }}</span><span class="receipt-title">{{ c.demoLabel }}</span></div>
          <p class="receipt-kicker">{{ c.demoKicker }}</p>
          <p class="receipt-item">{{ c.demoItem }}</p>
          <div class="receipt-row"><span>{{ c.gross }}</span><strong>$100</strong></div>
          <div class="receipt-row fee"><span>− {{ c.platform }}</span><strong>−$11</strong></div>
          <div class="receipt-row fee"><span>− {{ c.cost }}</span><strong>−$60</strong></div>
          <div class="receipt-total"><span>{{ c.keep }}</span><strong>$29</strong></div>
          <p class="receipt-foot">{{ c.demoFoot }}</p>
        </div>
        <div class="art-index">{{ copy.costFeesProfit }}</div>
        <span class="art-star" aria-hidden="true">✳</span>
      </div>
      <div class="hero-rail"><span>{{ copy.collectPriceSell }}</span><span>01 — 03</span></div>
    </section>

    <section class="benefit-strip" :aria-label="copy.benefitsLabel"><div v-for="(item, i) in c.strip" :key="item" class="benefit-item"><span class="benefit-number">0{{ i + 1 }}</span><span>{{ item }}</span><span class="benefit-arrow">↗</span></div></section>

    <section class="workflow section-wrap">
      <div class="section-heading">
        <p class="eyebrow">{{ c.sectionKicker }}</p>
        <h2>{{ c.workflowTitle }}</h2>
        <p>{{ c.workflowIntro }}</p>
      </div>
      <div class="workflow-steps">
        <article v-for="step in c.steps" :key="step.n" class="workflow-step">
          <div class="step-top"><span>{{ step.n }}</span><span class="step-line"></span><span class="step-mark">✳</span></div>
          <h3>{{ step.title }}</h3><p>{{ step.body }}</p>
        </article>
      </div>
    </section>

    <section id="features" class="feature-section">
      <div class="section-wrap">
        <div class="features-header"><div><p class="eyebrow">{{ c.featuresKicker }}</p><h2>{{ c.featuresTitle }}</h2></div><span class="section-index">{{ copy.toolkitIndex }}</span></div>
        <div class="feature-list">
          <article v-for="feature in c.features" :key="feature.n" class="feature-row">
            <div class="feature-number">{{ feature.n }}</div>
            <div class="feature-main"><span class="feature-tag">{{ feature.tag }}</span><h3>{{ feature.title }}</h3></div>
            <p class="feature-description">{{ feature.body }}</p>
            <span class="feature-arrow" aria-hidden="true">↗</span>
          </article>
        </div>
        <div class="connections"><span class="connection-label">{{ c.connectedKicker }}</span><div class="connection-copy"><h3>{{ c.connectedTitle }}</h3><p>{{ c.connectedBody }}</p></div><div class="connection-chips"><span>{{ c.whatnot }}</span><span>{{ c.shopify }}</span></div></div>
      </div>
    </section>

    <section class="games-section section-wrap">
      <div class="games-heading"><div><p class="eyebrow">{{ copy.gamesKicker }}</p><h2>{{ copy.gamesTitle }}</h2></div><p>{{ copy.gamesIntro }}</p></div>
      <div class="games-grid"><article v-for="(game, i) in copy.games" :key="game.title" class="game-card" :class="`game-card-${i + 1}`"><span class="game-index">{{ copy.showTool }} / 0{{ i + 1 }}</span><span class="game-mark" aria-hidden="true">{{ game.mark }}</span><h3>{{ game.title }}</h3><p>{{ game.body }}</p></article></div>
    </section>

    <section id="inside" class="gallery-section">
      <div class="section-wrap">
        <div class="gallery-heading"><div><p class="eyebrow">{{ c.galleryKicker }}</p><h2>{{ c.galleryTitle }}</h2></div><p>{{ c.galleryIntro }}</p></div>
        <div class="gallery-grid"><article v-for="(shot, i) in c.gallery" :key="shot.src" class="gallery-card"><div class="shot-frame" :class="`shot-${i + 1}`"><a class="screenshot-link" :href="assetUrl(shot.src)" target="_blank" rel="noreferrer" :aria-label="`${shot.title}: ${copy.openScreenshot}`"><img :src="assetUrl(shot.src)" :alt="shot.alt" loading="lazy" /></a><span class="shot-counter">0{{ i + 1 }} / 03</span></div><div class="gallery-caption"><div><h3>{{ shot.title }}</h3><p>{{ shot.caption }}</p></div><span aria-hidden="true">↗</span></div></article></div>
      </div>
    </section>

    <section id="faq" class="faq-section section-wrap">
      <div class="faq-heading"><p class="eyebrow">{{ c.faqKicker }}</p><h2>{{ c.faqTitle }}</h2><div class="faq-aside"><span class="aside-star">✳</span><p>{{ copy.appNote }}</p></div></div>
      <div class="faq-list"><details v-for="(faq, i) in c.faqs" :key="faq.q" :open="i === 0"><summary><span class="faq-num">0{{ i + 1 }}</span><span>{{ faq.q }}</span><span class="faq-plus">+</span></summary><p>{{ faq.a }}</p></details></div>
    </section>

    <section class="final-cta section-wrap">
      <p class="eyebrow">{{ c.finalKicker }}</p><h2>{{ c.finalTitle }}</h2><p class="final-text">{{ c.finalText }}</p>
      <div class="final-actions"><a class="button button-cream" :href="appUrl">{{ c.finalCta }} <span aria-hidden="true">↗</span></a><a class="play-link" :href="androidUrl" target="_blank" rel="noreferrer"><span class="play-icon">▷</span>{{ c.android }}</a></div>
      <span class="final-spark" aria-hidden="true">✳</span>
    </section>
  </main>

  <footer class="site-footer section-wrap"><a class="wordmark footer-brand" href="#top"><span class="wordmark-symbol">W</span><span>WHATFEES<span class="wordmark-period">.</span></span></a><p>{{ c.footer }}</p><div><span>{{ c.legal }}</span></div><small>© {{ new Date().getFullYear() }} WhatFees</small></footer>
</template>
