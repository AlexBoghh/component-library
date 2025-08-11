'use client'

import { useAutoTheme } from '@/lib/hooks/use-auto-theme'

export function AutoThemeWrapper({ children }: { children: React.ReactNode }) {
  // This hook will automatically set the theme based on the route
  useAutoTheme()
  
  return <>{children}</>
}