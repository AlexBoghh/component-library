'use client'

import * as React from 'react'
import {
  ThemeConfig,
  defaultTheme,
  colorSchemes,
  fontFamilies,
  radiusValues,
  densityValues,
  ThemeMode,
  ColorScheme,
  FontFamily,
  Radius,
  Density,
} from '@/lib/theme-config'

interface ThemeContextType {
  theme: ThemeConfig
  setTheme: (theme: Partial<ThemeConfig>) => void
  resetTheme: () => void
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
  defaultTheme?: Partial<ThemeConfig>
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme: customDefaultTheme,
  storageKey = 'radix-ui-theme-config',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeConfig>(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          return { ...defaultTheme, ...JSON.parse(stored) }
        }
      } catch (error) {
        console.error('Failed to load theme from localStorage:', error)
      }
    }
    return { ...defaultTheme, ...customDefaultTheme }
  })

  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>('light')

  // Detect system theme preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document
  React.useEffect(() => {
    const root = document.documentElement
    const effectiveMode = theme.mode === 'system' ? systemTheme : theme.mode

    // Remove previous theme classes
    root.classList.remove('light', 'dark')
    root.classList.add(effectiveMode)

    // Apply color scheme CSS variables
    const colors = colorSchemes[theme.colorScheme][effectiveMode]
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Apply font family
    root.style.setProperty('--font-family', fontFamilies[theme.font])
    root.style.fontFamily = fontFamilies[theme.font]

    // Apply radius
    root.style.setProperty('--radius', radiusValues[theme.radius])

    // Apply density
    const density = densityValues[theme.density]
    root.style.setProperty('--spacing', density.spacing)
    root.style.setProperty('--padding', density.padding)
    root.style.setProperty('--font-size-base', density.fontSize)
    root.style.setProperty('--line-height-base', density.lineHeight)

    // Apply density classes
    root.classList.remove('density-compact', 'density-comfortable', 'density-spacious')
    root.classList.add(`density-${theme.density}`)

    // Store in localStorage
    try {
      localStorage.setItem(storageKey, JSON.stringify(theme))
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error)
    }
  }, [theme, systemTheme, storageKey])

  const setTheme = React.useCallback((newTheme: Partial<ThemeConfig>) => {
    setThemeState((current) => ({ ...current, ...newTheme }))
  }, [])

  const resetTheme = React.useCallback(() => {
    setThemeState(defaultTheme)
    try {
      localStorage.removeItem(storageKey)
    } catch (error) {
      console.error('Failed to remove theme from localStorage:', error)
    }
  }, [storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      resetTheme,
    }),
    [theme, setTheme, resetTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const stored = localStorage.getItem('${storageKey}');
                const theme = stored ? JSON.parse(stored) : ${JSON.stringify({ ...defaultTheme, ...customDefaultTheme })};
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const effectiveMode = theme.mode === 'system' ? systemTheme : theme.mode;
                
                document.documentElement.classList.add(effectiveMode);
                
                // Apply color scheme
                const colorSchemes = ${JSON.stringify(colorSchemes)};
                const colors = colorSchemes[theme.colorScheme][effectiveMode];
                Object.entries(colors).forEach(([key, value]) => {
                  document.documentElement.style.setProperty('--' + key, value);
                });
                
                // Apply font
                const fontFamilies = ${JSON.stringify(fontFamilies)};
                document.documentElement.style.setProperty('--font-family', fontFamilies[theme.font]);
                document.documentElement.style.fontFamily = fontFamilies[theme.font];
                
                // Apply radius
                const radiusValues = ${JSON.stringify(radiusValues)};
                document.documentElement.style.setProperty('--radius', radiusValues[theme.radius]);
                
                // Apply density
                const densityValues = ${JSON.stringify(densityValues)};
                const density = densityValues[theme.density];
                document.documentElement.style.setProperty('--spacing', density.spacing);
                document.documentElement.style.setProperty('--padding', density.padding);
                document.documentElement.style.setProperty('--font-size-base', density.fontSize);
                document.documentElement.style.setProperty('--line-height-base', density.lineHeight);
                document.documentElement.classList.add('density-' + theme.density);
              } catch (e) {}
            })()
          `,
        }}
      />
      {children}
    </ThemeContext.Provider>
  )
}