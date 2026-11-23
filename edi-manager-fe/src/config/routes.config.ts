import type { Route } from '@/types/routes.types'

export const RoutesConfig = {
  HOME: { path: '/', name: 'home' },
  FLOWS: { path: '/flows', name: 'flows' },
  COMPANIES: { path: '/companies', name: 'companies' },
  CUSTOMERS: { path: '/customers', name: 'customers' },
} as const satisfies Record<Route, { path: string; name: string }>
