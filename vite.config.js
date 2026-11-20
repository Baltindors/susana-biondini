import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'

const bufferShim = fileURLToPath(new URL('./src/shims/buffer.js', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: '/susana-biondini/',
  resolve: {
    alias: {
      buffer: bufferShim,
    },
  },
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      headEnabled: false,
      wrapperClasses: 'prose prose-neutral max-w-none dark:prose-invert',
    }),
    tailwindcss(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        copyFileSync('dist/index.html', 'dist/404.html')
      },
    },
    {
      name: 'serve-admin-cms',
      configureServer(server) {
        // Vite SPA fallback steals /admin/ and returns the Vue shell; force the CMS HTML.
        server.middlewares.use((req, _res, next) => {
          const raw = req.url || ''
          const pathOnly = raw.split('?')[0]
          if (
            pathOnly === '/susana-biondini/admin' ||
            pathOnly === '/susana-biondini/admin/'
          ) {
            req.url = raw.replace(pathOnly, '/susana-biondini/admin/index.html')
          }
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          const raw = req.url || ''
          const pathOnly = raw.split('?')[0]
          if (
            pathOnly === '/susana-biondini/admin' ||
            pathOnly === '/susana-biondini/admin/'
          ) {
            req.url = raw.replace(pathOnly, '/susana-biondini/admin/index.html')
          }
          next()
        })
      },
    },
  ],
})
