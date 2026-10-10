<script setup>
import { computed } from 'vue'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const copy = computed(() => props.lang === 'fr' ? {
  label: 'Exemple illustré · CAD', title: 'Une vente, après les frais.', sale: 'Prix de vente', cost: 'Coût de l’article', fees: 'Frais estimés', profit: 'Profit estimé',
  rates: 'Taux d’exemple : commission de 8 %, traitement de 2,9 % + 0,30 $.', exclusions: 'Une vente. Livraison et taxes exclues.'
} : {
  label: 'Illustrated example · CAD', title: 'A sale, after fees.', sale: 'Sale price', cost: 'Item cost', fees: 'Estimated fees', profit: 'Estimated profit',
  rates: 'Example rates: 8% commission, 2.9% processing + $0.30.', exclusions: 'One sale. Shipping and taxes excluded.'
})
const money = value => new Intl.NumberFormat(props.lang === 'fr' ? 'fr-CA' : 'en-CA', {style:'currency',currency:'CAD',currencyDisplay:'narrowSymbol'}).format(value)
</script>
<template>
  <figure class="hero-proof illustration-dark" aria-labelledby="sale-example-title">
    <p class="proof-window-label">{{ copy.label }}</p>
    <h2 id="sale-example-title">{{ copy.title }}</h2>
    <dl class="sale-example-rows"><div><dt>{{ copy.sale }}</dt><dd>{{ money(100) }}</dd></div><div><dt>{{ copy.cost }}</dt><dd>−{{ money(60) }}</dd></div><div><dt>{{ copy.fees }}</dt><dd>−{{ money(11.2) }}</dd></div></dl>
    <div class="sale-example-profit"><span>{{ copy.profit }}</span><strong>+{{ money(28.8) }}</strong></div>
    <figcaption>{{ copy.rates }}<br />{{ copy.exclusions }}</figcaption>
  </figure>
</template>
