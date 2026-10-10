<script setup>
defineProps({ lang: String })
</script>

<template>
  <figure class="inventory-illustration" aria-hidden="true">
    <svg viewBox="0 0 540 300" fill="none" focusable="false">
      <!-- Shared palette variables keep the vector consistent with both themes. -->
      <ellipse cx="270" cy="258" rx="235" ry="18" class="inventory-art-shadow" />
      <path d="M24 80H516M24 170H516M105 30V270M270 30V270M435 30V270" class="inventory-art-grid" />
      <g stroke-linejoin="round" stroke-width="2">
        <!-- Sealed booster box. -->
        <path d="M38 93L148 59L212 90L102 125Z" class="inventory-art-top" />
        <path d="M38 93L102 125V247L38 213Z" class="inventory-art-side" />
        <path d="M102 125L212 90V211L102 247Z" class="inventory-art-surface" />
        <path d="M38 127L102 159L212 124" class="inventory-art-outline" />
        <path d="M137 162L165 143L191 151L163 197Z" class="inventory-art-gold" />
        <path d="M150 177L166 166L179 171L162 191Z" class="inventory-art-cutout" />
        <path d="M121 213L182 194M121 223L164 209" class="inventory-art-detail" />
        <!-- Foil packs, offset to show depth. -->
        <g transform="rotate(9 299 163)">
          <path d="M274 79H343V238H274Z" class="inventory-art-side" />
          <path d="M274 91H343M274 225H343" class="inventory-art-detail" />
        </g>
        <g transform="rotate(-8 280 168)">
          <path d="M241 88H310V248H241Z" class="inventory-art-surface" />
          <path d="M241 101H310M241 235H310" class="inventory-art-outline" />
          <path d="M249 95H302M249 241H302" class="inventory-art-detail" />
          <path d="M276 124L298 161L276 208L254 171Z" class="inventory-art-gold" />
          <path d="M264 171L276 151L288 165L276 190Z" class="inventory-art-cutout" />
          <path d="M258 218H294" class="inventory-art-detail" />
        </g>
        <!-- Individual cards with original geometric artwork. -->
        <rect x="387" y="57" width="100" height="145" rx="8" transform="rotate(12 437 129)" class="inventory-art-side" />
        <rect x="372" y="71" width="100" height="145" rx="8" transform="rotate(4 422 143)" class="inventory-art-top" />
        <g transform="rotate(-8 407 164)">
          <rect x="355" y="91" width="104" height="151" rx="8" class="inventory-art-surface" />
          <rect x="364" y="102" width="86" height="94" rx="4" class="inventory-art-top" />
          <path d="M407 111L417 139L443 150L417 160L407 187L396 160L371 150L396 139Z" class="inventory-art-gold" />
          <path d="M407 138L418 150L407 162L396 150Z" class="inventory-art-cutout" />
          <path d="M368 211H441M368 224H414" class="inventory-art-detail" />
          <circle cx="436" cy="224" r="4" class="inventory-art-gold" />
        </g>
      </g>
      <path d="M229 42V56M222 49H236M488 225V241M480 233H496" class="inventory-art-spark" />
    </svg>
    <figcaption>
      <span>{{ lang === 'fr' ? 'Boîtes' : 'Boxes' }}</span>
      <span>{{ lang === 'fr' ? 'Paquets' : 'Packs' }}</span>
      <span>{{ lang === 'fr' ? 'Cartes' : 'Cards' }}</span>
    </figcaption>
  </figure>
</template>
