<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { productContent } from './product-content.js'
import './product.css'
const props = defineProps({ lang: { type: String, default: 'en' } })
const p = computed(() => productContent[props.lang] || productContent.en)
const mode = ref('wheel')
const wheelTurn = ref(0)
const squares = ref(new Set())
const lastSquare = ref(null)
const round = ref(0)
const entries = ['A', 'B', 'C', 'D']
const wheelBusy = ref(false)
const wheelResult = ref(null)
let spinTimer
const wheelIndex = computed(() => (wheelTurn.value - 1) % entries.length)
const wheelRotation = computed(() => wheelTurn.value ? wheelTurn.value * 720 - (wheelIndex.value * 90 + 45) : -45)
const matches = [
  { players: ['A', 'B'], rolls: [5, 2], winner: 'A' },
  { players: ['C', 'D'], rolls: [4, 1], winner: 'C' },
  { players: ['A', 'C'], rolls: [6, 3], winner: 'A' },
]
const duel = computed(() => matches[Math.max(0, round.value - 1)])
const winner = computed(() => round.value === 3 ? matches[2].winner : null)
const status = computed(() => {
  if (mode.value === 'wheel') return wheelBusy.value ? p.value.spinning : wheelResult.value ? `${p.value.spinResult} ${wheelResult.value}` : p.value.previewPrompt
  if (mode.value === 'grid') return lastSquare.value ? p.value.revealed.replace('{n}', lastSquare.value) : p.value.gridPrompt
  if (!round.value) return p.value.bracketPrompt
  return round.value === 3 ? `${p.value.bracketResult} ${winner.value}` : p.value.matchResult.replace('{n}', round.value).replace('{winner}', duel.value.winner)
})
function finishSpin() {
  if (!wheelBusy.value) return
  clearTimeout(spinTimer)
  wheelResult.value = entries[wheelIndex.value]
  wheelBusy.value = false
}
function spin() {
  if (wheelBusy.value) return
  wheelBusy.value = true
  wheelResult.value = null
  wheelTurn.value++
  // The fallback also completes a spin if its surface is hidden by a format switch.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  spinTimer = setTimeout(finishSpin, reducedMotion ? 0 : 1300)
}
function reveal(n) { squares.value.add(n); lastSquare.value = n }
function playMatch() { if (round.value < matches.length) round.value++ }
function reset() {
  clearTimeout(spinTimer)
  wheelBusy.value = false
  wheelResult.value = null
  wheelTurn.value = 0
  squares.value = new Set()
  lastSquare.value = null
  round.value = 0
}
onBeforeUnmount(() => clearTimeout(spinTimer))
</script>

<template>
  <section id="games" class="product-games section-wrap" aria-labelledby="games-title">
    <div class="product-section-heading">
      <div><p class="eyebrow">{{ p.gamesKicker }}</p><h2 id="games-title">{{ p.gamesTitle }}</h2></div>
      <p>{{ p.gamesIntro }}</p>
    </div>
    <div class="games-overview"><article v-for="game in p.games" :key="game.id"><h3>{{ game.name }}</h3><p>{{ game.body }}</p></article></div>
    <details class="games-disclosure">
      <summary>{{ lang === 'fr' ? 'Essayer les trois démos' : 'Try the three demos' }}<span aria-hidden="true">+</span></summary>
    <div class="games-workbench">
      <div class="game-preview">
        <div class="game-preview-label"><span class="preview-dot" aria-hidden="true"></span>{{ p.previewLabel }}</div>
        <p class="demo-panel-label">{{ p.hostLabel }}</p>
        <div class="game-mode-switch" :aria-label="p.previewLabel">
          <button v-for="game in p.games" :key="game.id" type="button" :aria-pressed="mode === game.id" aria-controls="game-stage" @click="mode = game.id">{{ game.name }}</button>
        </div>
        <div id="game-stage" class="game-stage">
          <div v-if="mode === 'wheel'" class="demo-wheel-wrap" aria-hidden="true">
            <span class="wheel-pointer"></span>
            <div class="demo-wheel" :style="{ transform: `rotate(${wheelRotation}deg)`, transition: wheelTurn === 0 ? 'none' : undefined }" @transitionend.self="finishSpin"><span v-for="(entry, i) in entries" :key="entry" :class="`wheel-entry-${i}`" :style="{ transform: `rotate(${-wheelRotation}deg)`, transition: wheelTurn === 0 ? 'none' : undefined }">{{ entry }}</span><i :style="{ rotate: `${-wheelRotation}deg`, transition: wheelTurn === 0 ? 'none' : undefined }">W</i></div>
          </div>
          <div v-else-if="mode === 'grid'" class="demo-mystery-grid">
            <button v-for="n in 9" :key="n" type="button" :class="{ revealed: squares.has(n) }" :aria-label="squares.has(n) ? p.revealed.replace('{n}', n) : `${p.reveal} ${n}`" :disabled="squares.has(n)" @click="reveal(n)">{{ squares.has(n) ? entries[(n - 1) % entries.length] : String(n).padStart(2, '0') }}</button>
          </div>
          <div v-else class="demo-bracket-stage">
          <div class="demo-bracket" role="img" :aria-label="p.bracketLabel">
            <div class="bracket-round bracket-entrants"><span v-for="entry in entries" :key="entry" :class="{ 'bracket-winner': winner === entry }">{{ entry }}</span></div>
            <div class="bracket-connectors" aria-hidden="true"><i></i><i></i></div>
            <div class="bracket-round bracket-semifinal"><span>{{ round >= 1 ? matches[0].winner : '?' }}</span><span>{{ round >= 2 ? matches[1].winner : '?' }}</span></div>
            <div class="bracket-connectors final-connector" aria-hidden="true"><i></i></div>
            <div class="bracket-round bracket-final"><span :class="{ 'bracket-winner': winner }">{{ winner || '?' }}</span></div>
          </div>
          <div class="demo-duel" :aria-label="p.duelLabel">
            <template v-for="(entry, i) in duel.players" :key="i">
              <span v-if="i === 1" class="demo-duel-versus" aria-hidden="true">VS</span>
              <div class="demo-duel-player" :class="{ 'is-winner': round > 0 && duel.winner === entry }">
                <span>{{ entry }}</span><strong class="demo-die" :aria-label="p.dieResult">{{ round ? duel.rolls[i] : '–' }}</strong>
              </div>
            </template>
          </div>
          </div>
        </div>
        <div class="game-preview-controls">
          <p class="game-preview-status" role="status" aria-live="polite">{{ status }}</p>
          <button v-if="mode === 'wheel'" type="button" class="demo-action" :disabled="wheelBusy" @click="spin">{{ p.spin }}<span aria-hidden="true">↻</span></button>
          <button v-if="mode === 'bracket'" type="button" class="demo-action" :disabled="round === 3" @click="playMatch">{{ p.bracketAction }}<span aria-hidden="true">↗</span></button>
          <button type="button" class="demo-reset" @click="reset">{{ p.reset }}</button>
        </div>
        <p class="game-illustration-note">{{ p.previewNote }}</p>
      </div>
      <div class="spectator-copy">
        <div class="spectator-demo" role="region" :aria-label="p.spectatorLabel">
          <div class="spectator-demo-heading"><span>{{ p.spectatorLabel }}</span><span>{{ p.games.find(game => game.id === mode).name }}</span></div>
          <div v-if="mode === 'wheel'" class="spectator-wheel-wrap" aria-hidden="true"><span class="wheel-pointer"></span><div class="spectator-wheel" :style="{ transform: `rotate(${wheelRotation}deg)`, transition: wheelTurn === 0 ? 'none' : undefined }"><span v-for="(entry,i) in entries" :key="entry" :class="`spectator-entry-${i}`" :style="{ transform: `rotate(${-wheelRotation}deg)`, transition: wheelTurn === 0 ? 'none' : undefined }">{{ entry }}</span></div></div>
          <div v-else-if="mode === 'grid'" class="spectator-grid" :aria-label="p.spectatorGrid"><span v-for="n in 9" :key="n" :data-square="n" :data-revealed="squares.has(n)">{{ squares.has(n) ? entries[(n - 1) % entries.length] : String(n).padStart(2, '0') }}</span></div>
          <div v-else class="spectator-bracket" :aria-label="p.bracketLabel"><div><span v-for="entry in entries" :key="entry">{{ entry }}</span></div><div><span>{{ round >= 1 ? matches[0].winner : '?' }}</span><span>{{ round >= 2 ? matches[1].winner : '?' }}</span></div><div><strong>{{ winner || '?' }}</strong></div></div>
          <p class="spectator-status">{{ status }}</p>
        </div>

        <div class="spectator-sharing"><h3>{{ p.shareTitle }}</h3><ol><li v-for="step in p.shareSteps" :key="step.title"><strong>{{ step.title }}</strong><span>{{ step.body }}</span></li></ol></div>
      </div>
    </div>
    </details>
  </section>
</template>
