'use client'

import * as React from 'react'
import { Theme, getTheme, generateCSSVariables } from '@/lib/themes'

export type ThemeMode = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  themeId: string
  mode: ThemeMode
  isTransitioning: boolean
  setTheme: (themeId: string) => void
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

// Alias for backward compatibility
export type ThemeContextType = ThemeContextValue

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  defaultMode?: ThemeMode
  enableTransitions?: boolean
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'default',
  defaultMode = 'dark',
  enableTransitions = true,
  storageKey = 'radix-ui-lab-theme'
}: ThemeProviderProps) {
  const [themeId, setThemeId] = React.useState(defaultTheme)
  const [mode, setMode] = React.useState<ThemeMode>(defaultMode)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  // Load theme from localStorage on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        const storedThemeId = parsed.themeId || defaultTheme
        const storedMode = parsed.mode || defaultMode
        
        // Ensure themeId is a string
        setThemeId(typeof storedThemeId === 'string' ? storedThemeId : defaultTheme)
        setMode(['light', 'dark'].includes(storedMode) ? storedMode : defaultMode)
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
      // Clear corrupted localStorage data
      try {
        localStorage.removeItem(storageKey)
      } catch (clearError) {
        // Silently fail if we can't clear localStorage
      }
    } finally {
      setIsLoaded(true)
    }
  }, [defaultTheme, defaultMode, storageKey])

  // Save theme to localStorage when changed
  React.useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return

    try {
      localStorage.setItem(storageKey, JSON.stringify({ themeId, mode }))
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }, [themeId, mode, storageKey, isLoaded])

  const theme = React.useMemo(() => getTheme(themeId), [themeId])

  // Apply CSS variables to document
  React.useEffect(() => {
    if (typeof window === 'undefined' || !isLoaded) return

    const root = document.documentElement
    const variables = generateCSSVariables(theme, mode)

    // Set CSS variables
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Set data attributes for theme-specific styling
    root.setAttribute('data-theme', themeId)
    root.setAttribute('data-mode', mode)
    
    // Set class for compatibility
    root.className = root.className.replace(/\b(light|dark)\b/g, '').trim()
    root.classList.add(mode)

    // Add theme-specific classes
    const themeClasses = ['default-theme', 'cyberpunk-theme', 'synthwave-theme', 'vaporwave-theme', 'brutalism-theme']
    root.classList.remove(...themeClasses)
    
    // Ensure themeId is a string before using it in className
    const themeString = typeof themeId === 'string' ? themeId : 'default'
    root.classList.add(`${themeString}-theme`)

    // Handle custom theme effects
    if (theme.custom?.glitch) {
      root.classList.add('theme-glitch')
    } else {
      root.classList.remove('theme-glitch')
    }

    if (theme.custom?.neon) {
      root.classList.add('theme-neon')
    } else {
      root.classList.remove('theme-neon')
    }

    if (theme.custom?.scanlines) {
      root.classList.add('theme-scanlines')
    } else {
      root.classList.remove('theme-scanlines')
    }

    if (theme.custom?.noise) {
      root.classList.add('theme-noise')
    } else {
      root.classList.remove('theme-noise')
    }
  }, [theme, themeId, mode, isLoaded])

  const handleSetTheme = React.useCallback(async (newThemeId: string) => {
    if (newThemeId === themeId || !enableTransitions) {
      setThemeId(newThemeId)
      return
    }

    setIsTransitioning(true)
    
    // Add transition class
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      root.classList.add('theme-transitioning')
      
      // Special cyberpunk glitch effect
      if (newThemeId === 'cyberpunk' || themeId === 'cyberpunk') {
        root.classList.add('theme-glitch-transition')
      }
    }

    // Small delay for transition to start
    await new Promise(resolve => setTimeout(resolve, 50))
    
    setThemeId(newThemeId)
    
    // Remove transition classes after animation
    setTimeout(() => {
      setIsTransitioning(false)
      if (typeof window !== 'undefined') {
        const root = document.documentElement
        root.classList.remove('theme-transitioning', 'theme-glitch-transition')
      }
    }, 500)
  }, [themeId, enableTransitions])

  const handleSetMode = React.useCallback(async (newMode: ThemeMode) => {
    // Force dark mode always - ignore mode changes
    if (newMode !== 'dark') {
      console.log('Forcing dark mode - light mode is disabled')
    }
    setMode('dark')
  }, [mode, enableTransitions])

  const toggleMode = React.useCallback(() => {
    // Force dark mode always - no toggling
    setMode('dark')
  }, [])

  const value: ThemeContextValue = {
    theme,
    themeId,
    mode,
    isTransitioning,
    setTheme: handleSetTheme,
    setMode: handleSetMode,
    toggleMode
  }

  // Don't render until theme is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return null
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Utility hook for component-specific theme values
export function useThemeValue<T>(getValue: (theme: Theme, mode: ThemeMode) => T): T {
  const { theme, mode } = useTheme()
  return React.useMemo(() => getValue(theme, mode), [theme, mode, getValue])
}

// Hook to get current theme colors
export function useThemeColors() {
  const { theme, mode } = useTheme()
  return React.useMemo(() => theme.colors[mode], [theme, mode])
}