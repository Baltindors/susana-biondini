<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '../data/profile.js'

const STORAGE_KEY = 'susana-intro-seen'
const STEP = 1.4
const LIFE = 4.0
const FIRST = 0.12

const emblemSrc = `${import.meta.env.BASE_URL}favicon.svg`
const show = ref(false)

let timer = 0

const words = [
  { text: 'Aymara', accent: true },
  { text: 'Avatares', accent: true },
  { text: 'Hipocresía', accent: true },
  { text: 'Bohemia', accent: true },
]

const pictures = [
  profile.portraits.hero,
  // profile.portraits.theater,
  profile.portraits.bio,
].filter((picture) => picture?.src)

const zones = [
  { left: 0, top: 1 },
  { left: 42, top: 0 },
  // { left: 4, top: 32 },
  //{ left: 46, top: 26 },
 // { left: 0, top: 56 },
  { left: 34, top: 52 },
  { left: 16, top: 8 },
  { left: 22, top: 40 },
  { left: 8, top: 18 },
]

function shuffle(list) {
  const copy = [...list]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swap]] = [copy[swap], copy[index]]
  }
  return copy
}

function wordSize(text) {
  if (text.length < 10) return 'clamp(4.75rem, 16vw, 12rem)'
  if (text.length < 16) return 'clamp(3.4rem, 10vw, 8rem)'
  return 'clamp(2.8rem, 7.5vw, 6rem)'
}

function imageWidth() {
  const span = 50 + Math.round(Math.random() * 22)
  return `min(${span}vw, 42rem)`
}

function buildPieces() {
  const spoken = shuffle(words)
  const shown = shuffle(pictures)
  const sequence = []
  let wordIndex = 0
  let imageIndex = 0

  while (wordIndex < spoken.length || imageIndex < shown.length) {
    if (wordIndex < spoken.length) sequence.push({ kind: 'word', ...spoken[wordIndex] })
    wordIndex += 1
    if (wordIndex < spoken.length) sequence.push({ kind: 'word', ...spoken[wordIndex] })
    wordIndex += 1
    if (imageIndex < shown.length) {
      sequence.push({ kind: 'image', ...shown[imageIndex] })
      imageIndex += 1
    }
  }

  const places = shuffle(zones)

  return sequence.map((piece, index) => {
    const place = places[index % places.length]
    const left = Math.max(0, Math.min(48, place.left + Math.round(Math.random() * 8 - 4)))
    const top = Math.max(0, Math.min(62, place.top + Math.round(Math.random() * 8 - 4)))

    return {
      ...piece,
      id: `${piece.kind}-${index}`,
      fontSize: piece.kind === 'word' ? wordSize(piece.text) : undefined,
      width: piece.kind === 'image' ? imageWidth() : undefined,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        zIndex: piece.kind === 'word' ? 20 + index : index + 1,
        animationDelay: `${(FIRST + index * STEP).toFixed(2)}s`,
      },
    }
  })
}

const pieces = buildPieces()
const iconDelay = FIRST + Math.max(0, pieces.length - 1) * STEP + LIFE
const veilDelay = iconDelay + 0.85
const INTRO_MS = Math.round((veilDelay + 0.7) * 1000)
const timing = {
  '--life': `${LIFE}s`,
  '--icon-delay': `${iconDelay.toFixed(2)}s`,
  '--veil-delay': `${veilDelay.toFixed(2)}s`,
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Session storage can be unavailable in private browsing.
  }
}

function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

function close() {
  window.clearTimeout(timer)
  show.value = false
  lockScroll(false)
}

onMounted(() => {
  if (prefersReducedMotion() || hasSeenIntro()) return
  markSeen()
  show.value = true
  lockScroll(true)
  timer = window.setTimeout(close, INTRO_MS)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  lockScroll(false)
})
</script>

<template>
  <div
    v-if="show"
    class="veil fixed inset-0 z-[80] overflow-hidden bg-paper text-ink"
    :style="timing"
    role="region"
    aria-label="Introducción"
  >
    <button
      type="button"
      class="absolute top-5 right-5 z-50 text-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      @click="close"
    >
      Omitir
    </button>

    <div v-for="piece in pieces" :key="piece.id" class="piece" :style="piece.style">
      <p
        v-if="piece.kind === 'word'"
        class="piece-word max-w-[86vw] font-serif leading-[0.88] font-normal italic tracking-tight"
        :class="piece.accent ? 'text-accent' : 'text-ink'"
        :style="{ fontSize: piece.fontSize }"
      >
        {{ piece.text }}
      </p>
      <img
        v-else
        :src="piece.src"
        :alt="piece.alt"
        class="aspect-[4/5] rounded-card object-cover object-top shadow-card ring-1 ring-line"
        :style="{ width: piece.width }"
      />
    </div>

    <div class="icon-end">
      <img :src="emblemSrc" alt="" width="160" height="160" class="emblem-light size-40" />
      <svg class="emblem-dark size-40 text-accent" viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M25.6 5.2c-3.8-.4-8.2 1.6-11.6 5.1-2.4 2.5-4 5.4-4.6 7.8l-4.9 4.9a1.2 1.2 0 0 0 1.7 1.7l4.8-4.8c2.4-.5 5.3-2 7.8-4.5 3.6-3.5 5.6-8 5.1-11.7a1 1 0 0 0-.9-.9.9.9 0 0 0-.2 0z"
        />
        <path
          fill="none"
          stroke="var(--paper)"
          stroke-width="1.2"
          stroke-linecap="round"
          d="M8.2 22.6c2.6-2.8 7.4-8.2 13.8-12.4"
        />
        <path
          fill="none"
          stroke="var(--paper)"
          stroke-width="1"
          stroke-linecap="round"
          opacity="0.85"
          d="M12.4 16.8c1.4-.3 3.3-1.1 5.2-2.5M14.8 14.2c1.2-.2 2.8-.8 4.4-1.9"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.emblem-dark {
  display: none;
}

@media (prefers-color-scheme: dark) {
  .emblem-light {
    display: none;
  }

  .emblem-dark {
    display: block;
  }
}

.piece {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  animation: visit var(--life) ease forwards;
}

.piece-word {
  text-shadow:
    0 0 18px var(--paper),
    0 0 4px var(--paper);
}

.icon-end {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 40;
  pointer-events: none;
  opacity: 0;
  animation: icon-in 0.55s ease var(--icon-delay) forwards;
}

.veil {
  animation: veil-out 0.65s ease var(--veil-delay) forwards;
}

@keyframes visit {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }

  30% {
    opacity: 1;
    transform: none;
  }

  40% {
    opacity: 1;
    transform: none;
  }

  100% {
    opacity: 0;
    transform: none;
  }
}

@keyframes icon-in {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 12px));
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes veil-out {
  to {
    opacity: 0;
  }
}
</style>
