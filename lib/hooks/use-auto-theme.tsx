'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from './use-theme'

/**
 * Hook that automatically sets the theme based on the current route
 */
export function useAutoTheme() {
  const pathname = usePathname()
  const theme = useTheme()
  const previousPathRef = useRef<string>('')
  
  useEffect(() => {
    if (!theme) return
    
    // Check what type of page we're on
    const isCyberpunkPage = pathname.startsWith('/cyberpunk')
    const wasOnCyberpunkPage = previousPathRef.current.startsWith('/cyberpunk')
    
    // Standard component pages
    const standardPages = ['/button-demo', '/dialog-demo', '/select-demo', '/table-demo', '/toast-demo', '/form-builder']
    const isStandardPage = standardPages.some(page => pathname.startsWith(page))
    
    // Get the current theme
    const currentTheme = theme.themeId
    
    // Auto-switch to cyberpunk theme when entering cyberpunk pages
    if (isCyberpunkPage && !wasOnCyberpunkPage) {
      // Store the previous theme before switching
      if (currentTheme !== 'cyberpunk') {
        localStorage.setItem('radix-ui-lab-prev-theme', currentTheme)
        theme.setTheme('cyberpunk')
        // Also set dark mode for best cyberpunk experience
        if (theme.mode !== 'dark') {
          theme.setMode('dark')
        }
      }
    }
    // Restore previous theme when leaving cyberpunk pages
    else if (!isCyberpunkPage && wasOnCyberpunkPage) {
      const prevTheme = localStorage.getItem('radix-ui-lab-prev-theme') || 'default'
      if (currentTheme === 'cyberpunk') {
        theme.setTheme(prevTheme)
      }
    }
    
    // Update the previous path
    previousPathRef.current = pathname
  }, [pathname, theme])
  
  return theme
}