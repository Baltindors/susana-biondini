<script setup>
import { useTitle } from '@vueuse/core'
import GalleryCarousel from '../components/GalleryCarousel.vue'
import { galleryItems } from '../data/gallery.js'

useTitle('Galería · Susana I. Biondini')

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
      :initial="rise.initial"
      :visibleOnce="rise.visibleOnce"
    >
      <h1 class="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
        Galería
      </h1>
      <p class="mt-3 text-lg text-muted">
        Imágenes de la trayectoria teatral y literaria.
      </p>
    </header>

    <section
      v-motion
      class="mt-10"
      :initial="rise.initial"
      :visibleOnce="rise.visibleOnce"
      aria-label="Carrusel de la galería"
    >
      <GalleryCarousel v-if="galleryItems.length" :items="galleryItems" />
      <p v-else class="text-muted">Todavía no hay imágenes en la galería.</p>
    </section>
  </main>
</template>
