<script setup>
import { useTitle } from '@vueuse/core'
import AppCard from '../components/AppCard.vue'
import SocialLinks from '../components/SocialLinks.vue'
import { profile } from '../data/profile.js'

useTitle('Susana I. Biondini')

const rise = {
  initial: { opacity: 0, y: 12 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: { duration: 400 },
  },
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-5 py-12 md:py-20">
    <header
      v-motion
      class="grid gap-8 md:grid-cols-[minmax(0,13rem)_1fr] md:items-end"
      :initial="rise.initial"
      :visibleOnce="rise.visibleOnce"
    >
      <img
        :src="profile.portraits.hero.src"
        :alt="profile.portraits.hero.alt"
        class="aspect-[4/5] w-full max-w-[13rem] rounded-card object-cover object-top shadow-card ring-1 ring-line"
        width="208"
        height="260"
      />
      <div>
        <p v-if="profile.location" class="text-sm text-muted">{{ profile.location }}</p>
        <h1 class="mt-3 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {{ profile.name }}
        </h1>
        <p v-if="profile.title" class="mt-3 text-lg text-muted">{{ profile.title }}</p>
        <SocialLinks v-if="profile.socials.length" class="mt-4" />
      </div>
    </header>

    <section v-if="profile.currentFocus.summary" class="mt-14">
      <h2 class="font-serif text-2xl font-medium tracking-tight text-ink">
        {{ profile.currentFocus.label }}
      </h2>
      <AppCard
        v-motion
        class="mt-4"
        :initial="rise.initial"
        :visibleOnce="rise.visibleOnce"
      >
        <p class="text-lg leading-relaxed">{{ profile.currentFocus.summary }}</p>
      </AppCard>
    </section>

    <section
      v-if="profile.summary"
      v-motion
      class="mt-14"
      :initial="rise.initial"
      :visibleOnce="rise.visibleOnce"
    >
      <h2 class="font-serif text-2xl font-medium tracking-tight text-ink">Biografía</h2>
      <div class="mt-4 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start">
        <p class="text-lg leading-relaxed">{{ profile.summary }}</p>
        <figure>
          <img
            :src="profile.portraits.bio.src"
            :alt="profile.portraits.bio.alt"
            class="aspect-[4/5] w-full rounded-card object-cover object-[center_20%] shadow-card ring-1 ring-line"
            width="280"
            height="350"
          />
        </figure>
      </div>
    </section>

    <section class="mt-14">
      <h2 class="font-serif text-2xl font-medium tracking-tight text-ink">
        Trayectoria teatral y literaria
      </h2>

      <figure
        v-motion
        class="mt-4"
        :initial="rise.initial"
        :visibleOnce="rise.visibleOnce"
      >
        <img
          :src="profile.portraits.theater.src"
          :alt="profile.portraits.theater.alt"
          class="aspect-[16/10] w-full rounded-card object-cover object-center shadow-card ring-1 ring-line"
          width="720"
          height="450"
        />
        <figcaption class="mt-3 text-sm text-muted">
          Lecturas y microteatro: la escena como extensión natural de la escritura.
        </figcaption>
      </figure>

      <div v-if="profile.highlights.length" class="mt-6 space-y-4">
        <AppCard
          v-for="item in profile.highlights"
          :key="item.id"
          v-motion
          :initial="rise.initial"
          :visibleOnce="rise.visibleOnce"
        >
          <p class="text-sm text-muted">{{ item.dates }}</p>
          <h3 class="mt-1 font-serif text-lg font-medium tracking-tight">{{ item.role }}</h3>
          <p class="mt-1 text-sm text-accent">{{ item.org }}</p>
          <p class="mt-3 leading-relaxed">{{ item.summary }}</p>
        </AppCard>
      </div>
    </section>

    <section v-if="profile.books.length" class="mt-14">
      <h2 class="font-serif text-2xl font-medium tracking-tight text-ink">Obra publicada</h2>
      <p class="mt-3 text-muted">
        Libros y microteatro disponibles para lectura y compra.
      </p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <AppCard
          v-for="book in profile.books"
          :key="book.id"
          v-motion
          class="flex h-full flex-col"
          :initial="rise.initial"
          :visibleOnce="rise.visibleOnce"
        >
          <div class="overflow-hidden rounded-xl ring-1 ring-line">
            <img
              v-if="book.cover"
              :src="book.cover"
              :alt="`Portada de ${book.title}`"
              class="aspect-[2/3] w-full object-cover"
              width="320"
              height="480"
            />
            <div
              v-else
              class="flex aspect-[2/3] w-full flex-col items-center justify-center bg-paper px-6 text-center"
              aria-hidden="true"
            >
              <p class="font-serif text-2xl font-medium text-ink">{{ book.title }}</p>
              <p class="mt-2 text-sm text-muted">{{ book.year }}</p>
              <p class="mt-4 text-xs uppercase tracking-wide text-accent">{{ book.genre }}</p>
            </div>
          </div>

          <h3 class="mt-4 font-serif text-xl font-medium tracking-tight">{{ book.title }}</h3>
          <p class="mt-1 text-sm text-muted">{{ book.year }} · {{ book.genre }}</p>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{{ book.description }}</p>

          <a
            v-if="book.amazonUrl"
            :href="book.amazonUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Ver en Amazon
          </a>
          <p v-else class="mt-5 text-sm text-muted">Enlace de compra próximamente.</p>
        </AppCard>
      </div>
    </section>
  </main>
</template>
