<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { getPost } from '../content/posts.js'
import { parseVtt } from '../utils/parseVtt.js'

const BLOCK_SELECTOR = 'p, li, h1, h2, h3, h4, h5, h6, blockquote'

const route = useRoute()
const post = computed(() => getPost(route.params.slug))

useTitle(computed(() => (post.value ? post.value.title : 'Entrada no encontrada')))

const articleBody = ref(null)
const audioEl = ref(null)
const currentTime = ref(0)
const cues = ref([])
let highlighted = null

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim().toLowerCase()
}

function clearHighlight() {
  if (!highlighted) return
  highlighted.classList.remove('active-audio')
  highlighted = null
}

function findBlock(cueText) {
  const root = articleBody.value
  if (!root) return null
  const needle = normalize(cueText)
  if (!needle) return null

  let exact = null
  let shortest = null
  let shortestLength = Infinity

  for (const el of root.querySelectorAll(BLOCK_SELECTOR)) {
    const hay = normalize(el.textContent ?? '')
    if (!hay) continue
    if (hay === needle) {
      exact = el
      break
    }
    if (hay.includes(needle) && hay.length < shortestLength) {
      shortest = el
      shortestLength = hay.length
    }
  }

  return exact ?? shortest
}

function syncHighlight() {
  const time = currentTime.value
  const cue = cues.value.find((item) => time >= item.start && time < item.end)
  if (!cue) {
    clearHighlight()
    return
  }

  const block = findBlock(cue.text)
  if (!block) {
    clearHighlight()
    return
  }
  if (block === highlighted) return

  clearHighlight()
  block.classList.add('active-audio')
  highlighted = block
}

function onTimeUpdate(event) {
  currentTime.value = event.target.currentTime
  syncHighlight()
}

watch(
  () => [post.value?.slug, post.value?.audio, post.value?.vtt],
  async ([slug, audio, vtt]) => {
    clearHighlight()
    currentTime.value = 0
    cues.value = []
    if (!audio || !vtt) return

    const requested = slug
    await nextTick()
    try {
      const response = await fetch(vtt)
      if (!response.ok || post.value?.slug !== requested) return
      cues.value = parseVtt(await response.text())
      if (post.value?.slug !== requested) return
      if (audioEl.value) currentTime.value = audioEl.value.currentTime
      syncHighlight()
    } catch {
      cues.value = []
    }
  },
  { immediate: true },
)

onBeforeUnmount(clearHighlight)
</script>

<template>
  <main class="mx-auto max-w-3xl px-5 py-12 md:py-20">
    <article v-if="post">
      <RouterLink to="/blog" class="text-sm text-accent">Volver a Entrelíneas</RouterLink>
      <p class="mt-6 text-sm text-muted">
        <span>{{ post.categoriaLabel }}</span>
        <span aria-hidden="true"> · </span>
        <span>{{ post.dateLabel }}</span>
      </p>
      <h1 class="mt-2 font-serif text-4xl font-medium tracking-tight">{{ post.title }}</h1>
      <p class="mt-3 text-lg text-muted">{{ post.description }}</p>
      <audio
        v-if="post.audio"
        :key="post.slug"
        ref="audioEl"
        class="mt-8 w-full"
        controls
        :src="post.audio"
        @timeupdate="onTimeUpdate"
      />
      <div ref="articleBody" class="mt-10">
        <component :is="post.component" :key="post.slug" />
      </div>
    </article>

    <div v-else>
      <h1 class="font-serif text-3xl font-medium tracking-tight">Entrada no encontrada</h1>
      <p class="mt-3 text-muted">Esa página no forma parte de Entrelíneas.</p>
      <RouterLink to="/blog" class="mt-6 inline-block text-sm text-accent">Volver a Entrelíneas</RouterLink>
    </div>
  </main>
</template>
