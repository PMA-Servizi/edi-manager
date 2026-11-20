import type { RoutesConfig } from '@/config/routes.config'

export type Route = 'HOME' | 'COMPANIES' | 'CUSTOMERS'
export type RouteName = (typeof RoutesConfig)[keyof typeof RoutesConfig]['name']
