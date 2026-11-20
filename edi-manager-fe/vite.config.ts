import { fileURLToPath, URL } from 'node:url'
import { INTERNAL_FRONTEND_PORT, INTERNAL_BACKEND_PORT } from './src/config/network.config'

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
      '@backend': '/backend',
    },
  },
  server: {
    port: INTERNAL_FRONTEND_PORT,
    host: '0.0.0.0',
    hmr: {
      clientPort: +(process.env.APP_PORT ?? 8080),
    },
    watch: {
      usePolling: true,
      interval: 300,
    },
    fs: { allow: ['/app', '/backend'] },
    proxy: {
      '/api': {
        changeOrigin: true,
        target: `http://backend:${INTERNAL_BACKEND_PORT}`,
      },
    },
  },
})
