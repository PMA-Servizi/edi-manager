import type { Routes } from '@/types/routes.types'

export const RoutesConfig: Record<Routes, { path: string; name: string }> = {
  HOME: { path: '/', name: 'home' },
}
