import { RoutesConfig } from '@/config/routes.config'
import CompaniesView from '@/views/CompaniesView.vue'
import CustomersView from '@/views/CustomersView.vue'
import FlowsView from '@/views/FlowsView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: RoutesConfig.HOME.path, name: RoutesConfig.HOME.name, component: HomeView },
    { path: RoutesConfig.FLOWS.path, name: RoutesConfig.FLOWS.name, component: FlowsView },
    {
      path: RoutesConfig.COMPANIES.path,
      name: RoutesConfig.COMPANIES.name,
      component: CompaniesView,
    },
    {
      path: RoutesConfig.CUSTOMERS.path,
      name: RoutesConfig.CUSTOMERS.name,
      component: CustomersView,
    },
  ],
})

export default router
