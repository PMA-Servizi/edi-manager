import type { RoutesConfig } from '@/config/routes.config'

export type Route = 'HOME' | 'COMPANIES' | 'CUSTOMERS' | 'FLOWS' | 'RUNS'
export type RouteName = (typeof RoutesConfig)[keyof typeof RoutesConfig]['name']
