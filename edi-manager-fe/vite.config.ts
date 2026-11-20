import { fileURLToPath, URL } from 'node:url'
import { INTERNAL_PORT } from './src/config/network.config'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: INTERNAL_PORT,
    host: '0.0.0.0',
    hmr: {
      clientPort: +(process.env.APP_PORT ?? 8080),
    },
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
