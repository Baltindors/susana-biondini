<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  intervalMs: {
    type: Number,
    default: 5000,
  },
})

const index = ref(0)
const userPaused = ref(false)
const hovering = ref(false)
const focused = ref(false)
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

let timer = null

const count = computed(() => props.items.length)
const current = computed(() => props.items[index.value] ?? null)
const canAutoplay = computed(
  () =>
    count.value > 1 &&
    !prefersReducedMotion.value &&
    !userPaused.value &&
    !hovering.value &&
    !focused.value,
)

function goTo(next) {
  if (count.value === 0) return
  index.value = ((next % count.value) + count.value) % count.value
}

function previous() {
  userPaused.value = true
  goTo(index.value - 1)
}

function next(fromAutoplay = false) {
  if (!fromAutoplay) userPaused.value = true
  goTo(index.value + 1)
}

function select(i) {
  userPaused.value = true
  goTo(i)
}

function clearTimer() {
  if (timer != null) {
    clearInterval(timer)
    timer = null
  }
}

function startTimer() {
  clearTimer()
  if (!canAutoplay.value) return
  timer = setInterval(() => next(true), props.intervalMs)
}

watch(canAutoplay, () => startTimer(), { immediate: true })
watch(count, () => {
  if (index.value >= count.value) index.value = 0
  startTimer()
})

onMounted(() => startTimer())
onUnmounted(() => clearTimer())
</script>

<template>
  <div
    v-if="count"
    class="gallery-carousel"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @focusin="focused = true"
    @focusout="focused = false"
  >
    <div
      class="relative flex h-[min(70vh,32rem)] min-h-[20rem] items-center justify-center overflow-hidden rounded-card bg-paper ring-1 ring-line"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Galería de imágenes"
    >
      <Transition name="gallery-fade" mode="out-in">
        <img
          :key="current.id"
          :src="current.src"
          :alt="current.alt"
          class="max-h-full max-w-full object-contain object-center"
        />
      </Transition>

      <button
        v-if="count > 1"
        type="button"
        class="absolute left-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink shadow-card ring-1 ring-line transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="Anterior"
        @click="previous"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M11 4L6 9l5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        v-if="count > 1"
        type="button"
        class="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink shadow-card ring-1 ring-line transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="Siguiente"
        @click="next(false)"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M7 4l5 5-5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <p
      v-if="current.caption"
      class="mt-4 font-serif text-lg leading-relaxed text-ink"
    >
      {{ current.caption }}
    </p>

    <div
      v-if="count > 1"
      class="mt-5 flex flex-wrap items-center justify-center gap-2"
      role="tablist"
      aria-label="Selector de imágenes"
    >
      <button
        v-for="(item, i) in items"
        :key="item.id"
        type="button"
        role="tab"
        class="size-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        :class="i === index ? 'bg-accent' : 'bg-line hover:bg-muted'"
        :aria-label="`Ir a la imagen ${i + 1}`"
        :aria-selected="i === index"
        @click="select(i)"
      />
    </div>

    <p class="sr-only" aria-live="polite">
      Imagen {{ index + 1 }} de {{ count }}{{ current.caption ? `: ${current.caption}` : '' }}
    </p>
  </div>
</template>

<style scoped>
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.35s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .gallery-fade-enter-active,
  .gallery-fade-leave-active {
    transition: none;
  }
}
</style>
