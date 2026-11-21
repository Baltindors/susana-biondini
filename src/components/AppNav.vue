<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useMediaQuery, useWindowScroll } from '@vueuse/core'
import { profile } from '../data/profile.js'

const route = useRoute()
const open = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 0)

const links = [
  { id: 'perfil', to: { path: '/' }, label: 'Perfil' },
  { id: 'obra', to: { path: '/', hash: '#obra' }, label: 'Obra' },
  { id: 'galeria', to: { path: '/galeria' }, label: 'Galería' },
  { id: 'escritos', to: { path: '/blog' }, label: 'Escritos' },
]

const brandMark = computed(
  () => profile.portraits?.hero?.src ?? `${import.meta.env.BASE_URL}images/susy_headshot_2.png`,
)

function isLinkActive(link) {
  if (link.id === 'obra') return route.path === '/' && route.hash === '#obra'
  if (link.id === 'perfil') return route.path === '/' && route.hash !== '#obra'
  if (link.id === 'galeria') return route.path.startsWith('/galeria')
  if (link.id === 'escritos') return route.path.startsWith('/blog')
  return false
}

watch(isDesktop, (desktop) => {
  if (desktop) open.value = false
})

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-line bg-paper/70 backdrop-blur-xl"
    :class="scrolled ? 'shadow-card' : ''"
  >
    <div class="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
      <RouterLink to="/" class="flex items-center gap-2.5 text-sm font-medium tracking-tight text-ink">
        <img
          :src="brandMark"
          alt=""
          class="size-7 rounded-full object-cover object-top ring-1 ring-line"
          width="28"
          height="28"
        />
        <span class="font-serif">Susana I. Biondini</span>
      </RouterLink>

      <nav class="hidden items-center gap-6 md:flex" aria-label="Navegación principal">
        <RouterLink
          v-for="link in links"
          :key="link.id"
          v-slot="{ href, navigate }"
          :to="link.to"
          custom
        >
          <a
            :href="href"
            class="text-sm transition-colors"
            :class="isLinkActive(link) ? 'text-accent' : 'text-muted hover:text-ink'"
            @click="navigate"
          >
            {{ link.label }}
          </a>
        </RouterLink>
      </nav>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
        @click="open = !open"
      >
        <svg
          v-if="!open"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 5.5h14M3 10h14M3 14.5h14"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <nav
      v-show="open"
      id="mobile-nav"
      class="border-t border-line px-5 py-2 md:hidden"
      aria-label="Navegación móvil"
    >
      <RouterLink
        v-for="link in links"
        :key="link.id"
        v-slot="{ href, navigate }"
        :to="link.to"
        custom
      >
        <a
          :href="href"
          class="block py-3 text-base"
          :class="isLinkActive(link) ? 'text-accent' : 'text-ink'"
          @click="navigate"
        >
          {{ link.label }}
        </a>
      </RouterLink>
    </nav>
  </header>
</template>
