/**
 * Theme Provider Component
 * Provides theme context and runtime theme switching capabilities
 */

'use client'

import * as React from 'react'
import { themes, Theme } from '@/lib/themes'
import { ThemeManager, initializeThemeManager } from '@/lib/themes/theme-system'

interface ThemeContextType {
  theme: Theme | undefined
  themeId: string
  mode: 'light' | 'dark' | 'system'
  effectiveMode: 'light' | 'dark'
  availableThemes: Theme[]
  setTheme: (themeId: string) => void
  setMode: (mode: 'light' | 'dark' | 'system') => void
  isTransitioning: boolean
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  defaultMode?: 'light' | 'dark' | 'system'
  storageKey?: string
  enableTransitions?: boolean
  transitionDuration?: number
}

export function ThemeProvider({
  children,
  defaultTheme = 'default',
  defaultMode = 'dark',
  storageKey = 'radix-ui-lab-theme',
  enableTransitions = true,
  transitionDuration = 300,
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const [themeId, setThemeId] = React.useState(defaultTheme)
  const [mode, setMode] = React.useState<'light' | 'dark' | 'system'>(defaultMode)
  const [effectiveMode, setEffectiveMode] = React.useState<'light' | 'dark'>('dark')
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  
  const themeManagerRef = React.useRef<ThemeManager | null>(null)

  // Initialize theme manager
  React.useEffect(() => {
    if (!themeManagerRef.current) {
      const allThemes = Object.values(themes)
      themeManagerRef.current = initializeThemeManager(allThemes, {
        storageKey,
        defaultTheme,
        defaultMode,
        enableTransitions,
        transitionDuration,
      })
      
      // Subscribe to theme changes
      themeManagerRef.current.subscribe((newThemeId, newMode) => {
        setEffectiveMode(newMode)
      })
    }
    
    setMounted(true)
  }, [storageKey, defaultTheme, defaultMode, enableTransitions, transitionDuration])

  // Load saved preferences
  React.useEffect(() => {
    if (!mounted) return
    
    try {
      const savedTheme = localStorage.getItem(`${storageKey}-theme`)
      const savedMode = localStorage.getItem(`${storageKey}-mode`) as 'light' | 'dark' | 'system' | null
      
      if (savedTheme && themes[savedTheme]) {
        setThemeId(savedTheme)
      }
      if (savedMode) {
        setMode(savedMode)
      }
    } catch {
      // Ignore storage errors
    }
  }, [mounted, storageKey])

  // Get effective mode
  React.useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        setEffectiveMode(mediaQuery.matches ? 'dark' : 'light')
      }
      
      setEffectiveMode(mediaQuery.matches ? 'dark' : 'light')
      mediaQuery.addEventListener('change', handleChange)
      
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      setEffectiveMode(mode)
    }
  }, [mode])

  // Handle theme changes
  const handleSetTheme = React.useCallback((newThemeId: string) => {
    if (!themes[newThemeId]) {
      console.warn(`Theme "${newThemeId}" not found`)
      return
    }
    
    setIsTransitioning(true)
    setThemeId(newThemeId)
    
    if (themeManagerRef.current) {
      themeManagerRef.current.setTheme(newThemeId)
    }
    
    try {
      localStorage.setItem(`${storageKey}-theme`, newThemeId)
    } catch {
      // Ignore storage errors
    }
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, transitionDuration)
  }, [storageKey, transitionDuration])

  // Handle mode changes
  const handleSetMode = React.useCallback((newMode: 'light' | 'dark' | 'system') => {
    setIsTransitioning(true)
    setMode(newMode)
    
    if (themeManagerRef.current) {
      themeManagerRef.current.setMode(newMode)
    }
    
    try {
      localStorage.setItem(`${storageKey}-mode`, newMode)
    } catch {
      // Ignore storage errors
    }
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, transitionDuration)
  }, [storageKey, transitionDuration])

  const value = React.useMemo(
    () => ({
      theme: themes[themeId],
      themeId,
      mode,
      effectiveMode,
      availableThemes: Object.values(themes),
      setTheme: handleSetTheme,
      setMode: handleSetMode,
      isTransitioning,
    }),
    [themeId, mode, effectiveMode, handleSetTheme, handleSetMode, isTransitioning]
  )

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = '${storageKey}';
                  const savedTheme = localStorage.getItem(storageKey + '-theme') || '${defaultTheme}';
                  const savedMode = localStorage.getItem(storageKey + '-mode') || '${defaultMode}';
                  const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const effectiveMode = savedMode === 'system' ? systemMode : savedMode;
                  
                  document.documentElement.classList.add(savedTheme);
                  document.documentElement.classList.add(effectiveMode);
                  document.documentElement.setAttribute('data-theme', savedTheme);
                  document.documentElement.setAttribute('data-mode', effectiveMode);
                } catch (e) {}
              })()
            `,
          }}
        />
        {children}
      </>
    )
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Client-side only theme wrapper to prevent hydration issues
 */
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeProvider>{children}</ThemeProvider>
}