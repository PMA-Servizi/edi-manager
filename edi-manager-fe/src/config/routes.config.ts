import type { Route } from '@/types/routes.types'

export const RoutesConfig: Record<Route, { path: string; name: string }> = {
  HOME: { path: '/', name: 'home' },
  COMPANIES: { path: '/companies', name: 'companies' },
  CUSTOMERS: { path: '/customers', name: 'customers' },
}
