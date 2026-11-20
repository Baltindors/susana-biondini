<script setup>
import { RouterLink } from 'vue-router'
import { useTitle } from '@vueuse/core'
import AppCard from '../components/AppCard.vue'
import { posts } from '../content/posts.js'
import { profile } from '../data/profile.js'

useTitle('Blog · Susana I. Biondini')

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
      <h1 class="mt-5 font-serif text-4xl font-medium tracking-tight md:text-5xl">Blog</h1>
      <p class="mt-3 text-lg text-muted">
        Crónicas, poemas y novedades del universo literario y teatral de Susana I. Biondini.
      </p>
    </header>

    <div v-if="posts.length" class="mt-10 space-y-4">
      <RouterLink
        v-for="post in posts"
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

    <AppCard
      v-else
      v-motion
      class="mt-10"
      :initial="rise.initial"
      :visibleOnce="rise.visibleOnce"
    >
      <p class="leading-relaxed text-muted">
        Pronto habrá nuevas entradas. Mientras tanto, explore el perfil y la obra publicada.
      </p>
    </AppCard>
  </main>
</template>
