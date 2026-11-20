import { RoutesConfig } from '@/config/routes.config'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: RoutesConfig.HOME.path, name: RoutesConfig.HOME.name, component: Home }],
})

export default router
