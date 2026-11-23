import { RoutesConfig } from '@/config/routes.config'
import Companies from '@/views/Companies.vue'
import Customers from '@/views/Customers.vue'
import Flows from '@/views/Flows.vue'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: RoutesConfig.HOME.path, name: RoutesConfig.HOME.name, component: Home },
    { path: RoutesConfig.FLOWS.path, name: RoutesConfig.FLOWS.name, component: Flows },
    { path: RoutesConfig.COMPANIES.path, name: RoutesConfig.COMPANIES.name, component: Companies },
    { path: RoutesConfig.CUSTOMERS.path, name: RoutesConfig.CUSTOMERS.name, component: Customers },
  ],
})

export default router
