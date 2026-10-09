<script setup>
defineProps({ lang: { type: String, default: 'en' } })
</script>

<template>
  <section class="seller-feedback section-wrap" :aria-label="lang === 'fr' ? 'Avis d’un vendeur' : 'Seller feedback'">
    <p class="eyebrow">{{ lang === 'fr' ? 'AVIS D’UN VENDEUR' : 'SELLER FEEDBACK' }}</p>
    <figure>
      <blockquote lang="en">Easy to use and helped me be a lot more confident about setting my prices live</blockquote>
      <figcaption>— Mark</figcaption>
    </figure>
  </section>
</template>
