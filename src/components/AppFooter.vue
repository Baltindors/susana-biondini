<script setup>
import SocialLinks from './SocialLinks.vue'
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
const brandMark =
  profile.portraits?.hero?.src ?? `${import.meta.env.BASE_URL}images/susy_headshot_2.png`
</script>

<template>
  <footer class="border-t border-line bg-ink/[0.03]">
    <div class="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <div class="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex items-start gap-3.5">
          <img
            :src="brandMark"
            alt=""
            class="mt-0.5 size-12 shrink-0 rounded-full object-cover object-top ring-1 ring-line"
            width="48"
            height="48"
          />
          <div>
            <p class="font-serif text-lg font-medium tracking-tight">{{ profile.name }}</p>
            <p v-if="profile.title" class="mt-1 text-sm text-muted">{{ profile.title }}</p>
            <p v-if="profile.location" class="mt-0.5 text-sm text-muted">{{ profile.location }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-5 sm:items-end">
          <p v-if="profile.email" class="sm:text-right">
            <span class="text-xs font-medium text-muted">Correo</span>
            <a
              :href="`mailto:${profile.email}`"
              class="mt-1 block text-sm text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {{ profile.email }}
            </a>
          </p>
          <p v-if="profile.phone" class="sm:text-right">
            <span class="text-xs font-medium text-muted">Teléfono</span>
            <a
              :href="profile.phoneHref"
              class="mt-1 block text-sm text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {{ profile.phone }}
            </a>
          </p>
          <SocialLinks v-if="profile.socials.length" class="w-full sm:justify-end" />
        </div>
      </div>

      <p class="mt-10 border-t border-line pt-6 text-xs text-muted">
        © {{ year }} {{ profile.name }}
      </p>
    </div>
  </footer>
</template>
