<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTitle } from '@vueuse/core'
import AppCard from '../components/AppCard.vue'
import { posts, postsByCategoria } from '../content/posts.js'
import { profile } from '../data/profile.js'

useTitle('Entrelíneas · Susana I. Biondini')

const rise = {
  initial: { opacity: 0, y: 12 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: { duration: 400 },
  },
}

const brandMark =
  profile.portraits?.hero?.src ?? `${import.meta.env.BASE_URL}images/susy_headshot_2.png`

const activeTab = ref('todas')

const tabs = [
  { id: 'todas', label: 'Todas' },
  { id: 'notas', label: 'Notas' },
  { id: 'reflexiones', label: 'Reflexiones' },
]

const filteredPosts = computed(() => {
  if (activeTab.value === 'notas') return postsByCategoria.notas
  if (activeTab.value === 'reflexiones') return postsByCategoria.reflexiones
  return posts
})
</script>

<template>
  <main class="mx-auto max-w-3xl px-5 py-12 md:py-20">
    <header v-motion :initial="rise.initial" :visibleOnce="rise.visibleOnce">
      <img
        :src="brandMark"
        alt=""
        class="size-16 rounded-full object-cover object-top ring-1 ring-line"
        width="64"
        height="64"
      />
      <h1 class="mt-5 font-serif text-4xl font-medium tracking-tight md:text-5xl">Entrelíneas</h1>
      <p class="mt-3 text-lg text-muted">
        Notas y reflexiones del universo literario y teatral de Susana I. Biondini.
      </p>

      <div
        class="mt-5 flex flex-wrap gap-x-5 gap-y-2"
        role="tablist"
        aria-label="Filtrar por tipo"
      >
        <button
          v-for="tab in tabs"
          :id="`tab-${tab.id}`"
          :key="tab.id"
          type="button"
          role="tab"
          class="text-sm transition-colors hover:text-ink"
          :class="activeTab === tab.id ? 'font-medium text-accent' : 'text-muted'"
          :aria-selected="activeTab === tab.id"
          :aria-controls="'entrelineas-lista'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </header>

    <div
      id="entrelineas-lista"
      role="tabpanel"
      :aria-labelledby="`tab-${activeTab}`"
      class="mt-10"
    >
      <div v-if="filteredPosts.length" class="space-y-4">
        <RouterLink
          v-for="post in filteredPosts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="block"
        >
          <AppCard
            v-motion
            :initial="rise.initial"
            :visibleOnce="rise.visibleOnce"
            class="transition-shadow hover:shadow-card"
          >
            <p class="text-sm text-muted">{{ post.dateLabel }}</p>
            <h2 class="mt-1 font-serif text-xl font-medium tracking-tight">{{ post.title }}</h2>
            <p class="mt-2 leading-relaxed text-muted">{{ post.description }}</p>
          </AppCard>
        </RouterLink>
      </div>

      <p v-else class="leading-relaxed text-muted">
        Pronto habrá nuevas entradas.
      </p>
    </div>
  </main>
</template>
