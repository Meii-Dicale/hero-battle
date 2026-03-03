import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // Évite CORS : /api/TOKEN/1 → https://superheroapi.com/api.php/TOKEN/1
      '/api': {
        target: 'https://superheroapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api.php'),
      },
    },
  },
}))
