<script setup>
import { computed, useId } from 'vue'
import './portfolio-preview.css'

const props = defineProps({ lang: { type: String, default: 'en' } })
const id = useId()
// One illustrative lot: all figures are CAD, with no additional inventory purchases.
const invested = 800
const cumulativeNetSales = [0, 120, 310, 540, 780, 980, 1200]
const series = cumulativeNetSales.map((netSales, show) => ({ show, netSales, pnl: netSales - invested }))
const current = series[series.length - 1]
const recovered = Math.min(current.netSales, invested)
const recoveryShow = series.find(point => point.netSales >= invested).show
const y = value => (500 - value) / 1300 * 260
const zeroY = y(0)
const points = series.map(point => `${point.show * 100},${y(point.pnl)}`).join(' ')
const area = `0,${zeroY} ${points} 600,${zeroY}`
const ticks = [400, 0, -400, -800]
const copy = {
  en: {
    label: 'PORTFOLIO EXAMPLE · FICTIONAL DATA',
    title: 'See the recovery. Then the return.',
    current: 'Current P&L', period: 'ONE LOT · SIX SHOWS',
    trend: 'Profit trend', unit: 'CAD', netLine: 'Net sales − investment', zero: 'Break-even',
    start: 'Start', showAxis: 'Show number · 0 = start',
    investment: 'Original investment', netSales: 'Net sales to date',
    recovery: 'Investment recovered', recoveredAt: 'Recovered by show',
    definition: 'Net sales are sales after marketplace fees. P&L subtracts the original inventory investment; shipping, taxes and other expenses are excluded.',
    equation: '$1,200 net sales − $800 invested = +$400',
    data: 'View example data', tableCaption: 'Fictional cumulative results in CAD',
    show: 'Show', cumulative: 'Net sales', pnl: 'P&L',
    description: 'A fictional lot starts with an 800 Canadian dollar investment. Cumulative net sales rise from zero to 1,200 dollars over six shows. Current profit and loss rises from minus 800 to plus 400 dollars and first exceeds break-even at show five. Shipping, taxes and other expenses are excluded.',
  },
  fr: {
    label: 'EXEMPLE DE PORTEFEUILLE · DONNÉES FICTIVES',
    title: 'Voyez le coût récupéré, puis le gain.',
    current: 'Résultat actuel', period: 'UN LOT · SIX DIRECTS',
    trend: 'Évolution du résultat', unit: 'CAD', netLine: 'Ventes nettes − investissement', zero: 'Seuil de rentabilité',
    start: 'Départ', showAxis: 'Numéro du direct · 0 = départ',
    investment: 'Investissement initial', netSales: 'Ventes nettes cumulées',
    recovery: 'Investissement récupéré', recoveredAt: 'Récupéré au direct',
    definition: 'Les ventes nettes sont les ventes après frais de plateforme. Le résultat soustrait l’investissement initial en inventaire; livraison, taxes et autres dépenses sont exclues.',
    equation: '1 200 $ nets − 800 $ investis = +400 $',
    data: 'Voir les données de l’exemple', tableCaption: 'Résultats cumulés fictifs en CAD',
    show: 'Direct', cumulative: 'Ventes nettes', pnl: 'Résultat',
    description: 'Un lot fictif commence avec un investissement de 800 dollars canadiens. Les ventes nettes cumulées passent de zéro à 1 200 dollars en six directs. Le résultat passe de moins 800 à plus 400 dollars et dépasse le seuil de rentabilité au cinquième direct. Livraison, taxes et autres dépenses sont exclues.',
  },
}
const p = computed(() => copy[props.lang] || copy.en)
const formatter = computed(() => new Intl.NumberFormat(props.lang === 'fr' ? 'fr-CA' : 'en-CA', { style: 'currency', currency: 'CAD', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }))
const amount = value => formatter.value.format(value)
const signedAmount = value => `${value > 0 ? '+' : ''}${amount(value)}`
</script>

<template>
  <div class="portfolio-preview">
    <p class="portfolio-demo-label">{{ p.label }}</p>
    <div class="portfolio-demo-heading"><h3>{{ p.title }}</h3><span>{{ p.period }}</span></div>
    <div class="portfolio-demo-result"><span>{{ p.current }}</span><strong>{{ signedAmount(current.pnl) }}</strong></div>

    <div class="portfolio-trend-header"><h4>{{ p.trend }}</h4><span>{{ p.unit }}</span></div>
    <div class="portfolio-trend-legend"><span><i class="portfolio-trend-key" aria-hidden="true"></i>{{ p.netLine }}</span><span><i class="portfolio-zero-key" aria-hidden="true"></i>{{ p.zero }}</span></div>
    <div class="portfolio-chart">
      <div class="portfolio-y-axis" aria-hidden="true"><span v-for="tick in ticks" :key="tick" :style="{ top: `${y(tick) / 260 * 100}%` }">{{ tick > 0 ? '+' : '' }}{{ tick }}</span></div>
      <div class="portfolio-chart-plot">
        <svg class="portfolio-chart-svg" viewBox="0 0 600 260" preserveAspectRatio="none" role="img" :aria-labelledby="`${id}-title ${id}-description`">
          <title :id="`${id}-title`">{{ p.trend }} — {{ p.unit }}</title>
          <desc :id="`${id}-description`">{{ p.description }}</desc>
          <defs>
            <linearGradient :id="`${id}-gold`" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d4a940" stop-opacity=".2"/><stop offset="100%" stop-color="#d4a940" stop-opacity=".015"/></linearGradient>
            <linearGradient :id="`${id}-green`" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#54cf89" stop-opacity=".28"/><stop offset="100%" stop-color="#54cf89" stop-opacity=".025"/></linearGradient>
            <clipPath :id="`${id}-positive`"><rect x="0" y="0" width="600" :height="zeroY"/></clipPath>
            <clipPath :id="`${id}-negative`"><rect x="0" :y="zeroY" width="600" :height="260 - zeroY"/></clipPath>
          </defs>
          <line v-for="tick in ticks.filter(value => value !== 0)" :key="tick" x1="0" x2="600" :y1="y(tick)" :y2="y(tick)" class="portfolio-grid-line"/>
          <polygon :points="area" :fill="`url(#${id}-gold)`" :clip-path="`url(#${id}-negative)`"/>
          <polygon :points="area" :fill="`url(#${id}-green)`" :clip-path="`url(#${id}-positive)`"/>
          <line x1="0" x2="600" :y1="zeroY" :y2="zeroY" class="portfolio-zero-line"/>
          <polyline :points="points" class="portfolio-data-line portfolio-data-gold"/>
          <polyline :points="points" class="portfolio-data-line portfolio-data-green" :clip-path="`url(#${id}-positive)`"/>
        </svg>
        <span v-for="point in series" :key="point.show" class="portfolio-data-point" :class="{ 'is-positive': point.pnl >= 0, 'is-last': point.show === 6 }" :style="{ left: `${point.show / 6 * 100}%`, top: `${y(point.pnl) / 260 * 100}%` }" aria-hidden="true"></span>
        <div class="portfolio-x-axis" aria-hidden="true"><span v-for="point in series" :key="point.show" :style="{ left: `${point.show / 6 * 100}%` }">{{ point.show }}</span></div>
      </div>
    </div>
    <p class="portfolio-chart-axis-title">{{ p.showAxis }}</p>

    <dl class="portfolio-demo-metrics"><div><dt>{{ p.investment }}</dt><dd>{{ amount(invested) }}</dd></div><div><dt>{{ p.netSales }}</dt><dd>{{ amount(current.netSales) }}</dd></div></dl>
    <div class="portfolio-demo-recovery"><div><span>{{ p.recovery }}</span><strong>{{ amount(recovered) }} · 100%</strong></div><div class="portfolio-recovery-track" aria-hidden="true"><span></span></div><p>{{ p.recoveredAt }} {{ recoveryShow }}</p></div>
    <p class="portfolio-demo-equation">{{ p.equation }}</p>
    <p class="portfolio-demo-definition">{{ p.definition }}</p>
    <details class="portfolio-demo-data"><summary>{{ p.data }}</summary><table><caption>{{ p.tableCaption }}</caption><thead><tr><th scope="col">{{ p.show }}</th><th scope="col">{{ p.cumulative }}</th><th scope="col">{{ p.pnl }}</th></tr></thead><tbody><tr v-for="point in series" :key="point.show"><th scope="row">{{ point.show === 0 ? p.start : point.show }}</th><td>{{ amount(point.netSales) }}</td><td>{{ signedAmount(point.pnl) }}</td></tr></tbody></table></details>
  </div>
</template>
