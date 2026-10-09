<script setup>
defineProps({ lang: { type: String, default: 'en' } })
</script>

<template>
  <section id="about" class="creator-note section-wrap" aria-labelledby="creator-title">
    <div><p class="eyebrow">{{ lang === 'fr' ? 'LE CRÉATEUR' : 'THE DEVELOPER' }}</p><h2 id="creator-title">{{ lang === 'fr' ? 'Julien développe WhatFees.' : 'Julien builds WhatFees.' }}</h2></div>
    <div class="creator-copy">
      <p>{{ lang === 'fr' ? 'Julien est développeur logiciel et vendeur TCG. Il vend des cartes et des boîtes sous le nom Jule’s Arena.' : 'Julien is a software developer and TCG seller. He sells cards and boxes through Jule’s Arena.' }}</p>
    </div>
  </section>
</template>
