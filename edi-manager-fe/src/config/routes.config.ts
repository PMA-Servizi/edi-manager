import type { Route } from '@/types/routes.types'

export const RoutesConfig = {
  HOME: { path: '/', name: 'home' },
  FLOWS: { path: '/flows', name: 'flows' },
  COMPANIES: { path: '/companies', name: 'companies' },
  CUSTOMERS: { path: '/customers', name: 'customers' },
  RUNS: { path: '/runs', name: 'runs' },
} as const satisfies Record<Route, { path: string; name: string }>
