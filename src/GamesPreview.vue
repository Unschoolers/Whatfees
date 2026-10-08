<script setup>
import { computed, ref } from 'vue'
import { productContent } from './product-content.js'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const p = computed(() => productContent[props.lang] || productContent.en)
const mode = ref('wheel')
const wheelTurn = ref(0)
const square = ref(null)
const round = ref(0)
const entries = ['A', 'B', 'C', 'D']
const wheelIndex = computed(() => (wheelTurn.value - 1) % entries.length)
const wheelRotation = computed(() => wheelTurn.value ? wheelTurn.value * 720 - (wheelIndex.value * 90 + 45) : 0)
const winner = computed(() => entries[(round.value - 1) % entries.length])
const status = computed(() => {
  if (mode.value === 'wheel') return wheelTurn.value ? `${p.value.spinResult} ${entries[wheelIndex.value]}` : p.value.previewPrompt
  if (mode.value === 'grid') return square.value ? p.value.revealed.replace('{n}', square.value) : p.value.gridPrompt
  return round.value ? `${p.value.bracketResult} ${winner.value}` : p.value.previewPrompt
})
function reset() { wheelTurn.value = 0; square.value = null; round.value = 0 }
</script>

<template>
  <section id="games" class="product-games section-wrap" aria-labelledby="games-title">
    <div class="product-section-heading">
      <div><p class="eyebrow">{{ p.gamesKicker }}</p><h2 id="games-title">{{ p.gamesTitle }}</h2></div>
      <p>{{ p.gamesIntro }}</p>
    </div>
    <div class="games-workbench">
      <div class="game-preview">
        <div class="game-preview-label"><span class="preview-dot" aria-hidden="true"></span>{{ p.previewLabel }}</div>
        <div class="game-mode-switch" :aria-label="p.previewLabel">
          <button v-for="game in p.games" :key="game.id" type="button" :aria-pressed="mode === game.id" aria-controls="game-stage" @click="mode = game.id">{{ game.name }}</button>
        </div>
        <div id="game-stage" class="game-stage">
          <div v-if="mode === 'wheel'" class="demo-wheel-wrap" aria-hidden="true">
            <span class="wheel-pointer"></span>
            <div class="demo-wheel" :style="{ transform: `rotate(${wheelRotation}deg)` }"><span v-for="(entry, i) in entries" :key="entry" :class="`wheel-entry-${i}`">{{ entry }}</span><i>W</i></div>
          </div>
          <div v-else-if="mode === 'grid'" class="demo-mystery-grid">
            <button v-for="n in 9" :key="n" type="button" :class="{ revealed: square === n }" :aria-label="square === n ? p.revealed.replace('{n}', n) : `${p.reveal} ${n}`" :disabled="square === n" @click="square = n">{{ square === n ? '✳' : String(n).padStart(2, '0') }}</button>
          </div>
          <div v-else class="demo-bracket" role="img" :aria-label="p.bracketLabel">
            <div class="bracket-round bracket-entrants"><span v-for="entry in entries" :key="entry" :class="{ 'bracket-winner': winner === entry }">{{ entry }}</span></div>
            <div class="bracket-connectors" aria-hidden="true"><i></i><i></i></div>
            <div class="bracket-round bracket-semifinal"><span>{{ round ? (winner === 'B' ? 'B' : 'A') : '?' }}</span><span>{{ round ? (winner === 'D' ? 'D' : 'C') : '?' }}</span></div>
            <div class="bracket-connectors final-connector" aria-hidden="true"><i></i></div>
            <div class="bracket-round bracket-final"><span :class="{ 'bracket-winner': round }">{{ round ? winner : '?' }}</span></div>
          </div>
        </div>
        <div class="game-preview-controls">
          <p class="game-preview-status" role="status" aria-live="polite">{{ status }}</p>
          <button v-if="mode === 'wheel'" type="button" class="demo-action" @click="wheelTurn++">{{ p.spin }}<span aria-hidden="true">↻</span></button>
          <button v-if="mode === 'bracket'" type="button" class="demo-action" @click="round++">{{ p.bracketAction }}<span aria-hidden="true">↗</span></button>
          <button type="button" class="demo-reset" @click="reset">{{ p.reset }}</button>
        </div>
        <p class="game-illustration-note">{{ p.previewNote }}</p>
      </div>
      <div class="spectator-copy">
        <div class="game-format-notes"><article v-for="game in p.games" :key="game.id"><h3>{{ game.name }}</h3><p>{{ game.body }}</p></article></div>
        <div class="spectator-sharing"><h3>{{ p.shareTitle }}</h3><ol><li v-for="step in p.shareSteps" :key="step.title"><strong>{{ step.title }}</strong><span>{{ step.body }}</span></li></ol></div>
      </div>
    </div>
  </section>
</template>
