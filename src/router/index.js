import { createRouter, createWebHistory } from 'vue-router'
import BlogIndexView from '../views/BlogIndexView.vue'
import BlogPostView from '../views/BlogPostView.vue'
import HomeView from '../views/HomeView.vue'

const PAGE_TRANSITION_MS = 350

function scrollBehaviorForHash(to, from) {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'

  const resolveHash = () => {
    try {
      if (!document.querySelector(to.hash)) return { top: 0 }
    } catch {
      return { top: 0 }
    }
    return { el: to.hash, top: 0, behavior }
  }

  if (to.path === from.path) {
    return resolveHash()
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(resolveHash()), PAGE_TRANSITION_MS)
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return scrollBehaviorForHash(to, from)
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'profile', component: HomeView },
    { path: '/blog', name: 'blog', component: BlogIndexView },
    { path: '/blog/:slug', name: 'post', component: BlogPostView },
  ],
})

export default router
