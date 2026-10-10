<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  kind: { type: String, default: 'live', validator: value => ['live', 'sales'].includes(value) },
  lang: { type: String, default: 'en' },
})
const bundle = ref(true)
// Fictional three-item inventory example. Individual mode prices one item.
const items = [{ id: '01', cost: 20 }, { id: '02', cost: 20 }, { id: '03', cost: 20 }]
const illustratedCost = computed(() => bundle.value ? items.reduce((total, item) => total + item.cost, 0) : items[0].cost)
const copy = computed(() => props.lang === 'fr' ? {
 label:'Exemple illustré · CAD', live:'Préparez votre prix.', individual:'Individuel', bundle:'Ensemble', item:'Coût par article', lot:'3 articles sélectionnés', total:'Coût de l’ensemble', cost:'Coût de l’article', fees:'Frais estimés', profit:'Profit estimé', sales:'Suivez ce que vous gardez.', sold:'Vente enregistrée', net:'Ventes nettes', rates:'Taux d’exemple : 8 % + 2,9 % + 0,30 $. Livraison et taxes exclues.', liveNote:'Données fictives. Choisissez le mode pour voir le coût individuel ou total. Le calculateur ci-dessus inclut les frais et le profit cible.'
} : {
 label:'Illustrated example · CAD', live:'Prepare your price.', individual:'Individual', bundle:'Bundle', item:'Cost per item', lot:'3 selected items', total:'Bundle cost', cost:'Item cost', fees:'Estimated fees', profit:'Estimated profit', sales:'Track what you keep.', sold:'Recorded sale', net:'Net sales', rates:'Example rates: 8% + 2.9% + $0.30. Shipping and taxes excluded.', liveNote:'Fictional data. Choose a mode to see individual or combined cost. The calculator above includes fees and your target profit.'
})
const money = value => new Intl.NumberFormat(props.lang === 'fr' ? 'fr-CA' : 'en-CA', {style:'currency',currency:'CAD',currencyDisplay:'narrowSymbol'}).format(value)
</script>
<template>
 <div class="scenario-illustration illustration-dark" :data-illustration="kind">
  <p class="proof-window-label">{{ copy.label }}</p>
  <template v-if="kind === 'live'">
   <h3>{{ copy.live }}</h3>
   <div class="pricing-mode" role="group" :aria-label="lang === 'fr' ? 'Mode de prix illustré' : 'Illustrated pricing mode'"><button type="button" :aria-pressed="!bundle" @click="bundle = false">{{ copy.individual }}</button><button type="button" :aria-pressed="bundle" @click="bundle = true">{{ copy.bundle }}</button></div>
   <p class="illustration-caption">{{ copy.lot }}</p>
   <div class="illustrated-items" aria-hidden="true"><div v-for="item in items" :key="item.id"><span>{{ item.id }}</span><i></i><strong>{{ money(item.cost) }}</strong></div></div>
   <div class="pricing-sum" aria-live="polite" aria-atomic="true"><span>{{ bundle ? copy.total : copy.item }}</span><strong data-illustrated-cost>{{ money(illustratedCost) }}</strong></div>
   <p class="illustration-note">{{ copy.liveNote }}</p>
  </template>
  <template v-else>
   <h3>{{ copy.sales }}</h3>
   <div class="recorded-sale"><span class="sale-check" aria-hidden="true">✓</span><div><span>{{ copy.sold }}</span><strong>{{ money(100) }}</strong></div></div>
   <dl class="sale-example-rows"><div><dt>{{ copy.fees }}</dt><dd>−{{ money(11.2) }}</dd></div><div><dt>{{ copy.net }}</dt><dd>{{ money(88.8) }}</dd></div><div><dt>{{ copy.cost }}</dt><dd>−{{ money(60) }}</dd></div></dl>
   <div class="sale-example-profit"><span>{{ copy.profit }}</span><strong>+{{ money(28.8) }}</strong></div>
   <p class="illustration-note">{{ copy.rates }}</p>
  </template>
 </div>
</template>
