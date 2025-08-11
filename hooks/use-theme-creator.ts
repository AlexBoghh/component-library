/**
 * Theme Creator Hook
 * Utilities for creating and customizing themes programmatically
 */

import { useState, useCallback, useMemo } from 'react'
import { Theme, ThemeColors } from '@/lib/themes'

export interface ThemeCreatorOptions {
  baseTheme?: Theme
  name?: string
  id?: string
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  neutral: string
  success: string
  warning: string
  error: string
}

export function useThemeCreator(options: ThemeCreatorOptions = {}) {
  const [customTheme, setCustomTheme] = useState<Partial<Theme>>({
    id: options.id || 'custom',
    name: options.name || 'Custom Theme',
    ...options.baseTheme,
  })

  /**
   * Generate a complete color scheme from a base palette
   */
  const generateColorScheme = useCallback((palette: ColorPalette): { light: ThemeColors; dark: ThemeColors } => {
    // Helper to adjust lightness
    const adjustLightness = (hsl: string, amount: number): string => {
      const match = hsl.match(/hsl\(([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%\)/)
      if (!match) return hsl
      
      const [, h, s, l] = match.map(Number)
      const newL = Math.max(0, Math.min(100, l + amount))
      return `hsl(${h} ${s}% ${newL}%)`
    }

    // Helper to adjust saturation
    const adjustSaturation = (hsl: string, amount: number): string => {
      const match = hsl.match(/hsl\(([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%\)/)
      if (!match) return hsl
      
      const [, h, s, l] = match.map(Number)
      const newS = Math.max(0, Math.min(100, s + amount))
      return `hsl(${h} ${newS}% ${l}%)`
    }

    // Generate light mode colors
    const light: ThemeColors = {
      background: 'hsl(0 0% 100%)',
      foreground: adjustLightness(palette.neutral, -40),
      
      card: 'hsl(0 0% 100%)',
      cardForeground: adjustLightness(palette.neutral, -40),
      popover: 'hsl(0 0% 100%)',
      popoverForeground: adjustLightness(palette.neutral, -40),
      
      primary: palette.primary,
      primaryForeground: 'hsl(0 0% 100%)',
      
      secondary: adjustLightness(palette.secondary, 30),
      secondaryForeground: adjustLightness(palette.secondary, -40),
      
      muted: adjustLightness(palette.neutral, 45),
      mutedForeground: adjustLightness(palette.neutral, -10),
      
      accent: adjustLightness(palette.accent, 35),
      accentForeground: adjustLightness(palette.accent, -40),
      
      destructive: palette.error,
      destructiveForeground: 'hsl(0 0% 100%)',
      
      border: adjustLightness(palette.neutral, 40),
      input: adjustLightness(palette.neutral, 40),
      ring: palette.primary,
      
      success: palette.success,
      successForeground: 'hsl(0 0% 100%)',
      warning: palette.warning,
      warningForeground: adjustLightness(palette.warning, -50),
      info: adjustLightness(palette.primary, 10),
      infoForeground: 'hsl(0 0% 100%)',
      
      chart1: palette.primary,
      chart2: palette.secondary,
      chart3: palette.accent,
      chart4: palette.success,
      chart5: palette.warning,
    }

    // Generate dark mode colors
    const dark: ThemeColors = {
      background: adjustLightness(palette.neutral, -45),
      foreground: adjustLightness(palette.neutral, 45),
      
      card: adjustLightness(palette.neutral, -43),
      cardForeground: adjustLightness(palette.neutral, 45),
      popover: adjustLightness(palette.neutral, -43),
      popoverForeground: adjustLightness(palette.neutral, 45),
      
      primary: adjustLightness(palette.primary, 10),
      primaryForeground: adjustLightness(palette.primary, -50),
      
      secondary: adjustLightness(palette.secondary, -30),
      secondaryForeground: adjustLightness(palette.secondary, 45),
      
      muted: adjustLightness(palette.neutral, -35),
      mutedForeground: adjustLightness(palette.neutral, 20),
      
      accent: adjustLightness(palette.accent, -25),
      accentForeground: adjustLightness(palette.accent, 45),
      
      destructive: adjustLightness(palette.error, -10),
      destructiveForeground: adjustLightness(palette.error, 45),
      
      border: adjustLightness(palette.neutral, -30),
      input: adjustLightness(palette.neutral, -30),
      ring: adjustLightness(palette.primary, 15),
      
      success: adjustLightness(palette.success, 5),
      successForeground: adjustLightness(palette.success, -50),
      warning: adjustLightness(palette.warning, 5),
      warningForeground: adjustLightness(palette.warning, -50),
      info: adjustLightness(palette.primary, 15),
      infoForeground: adjustLightness(palette.primary, -50),
      
      chart1: adjustLightness(palette.primary, 15),
      chart2: adjustLightness(palette.secondary, 10),
      chart3: adjustLightness(palette.accent, 10),
      chart4: adjustLightness(palette.success, 10),
      chart5: adjustLightness(palette.warning, 10),
    }

    return { light, dark }
  }, [])

  /**
   * Create theme from a single color
   */
  const createFromColor = useCallback((color: string, name?: string) => {
    // Parse the color to HSL
    const parseColor = (color: string): { h: number; s: number; l: number } => {
      // Simple HSL parser (you might want to expand this for RGB/HEX support)
      const match = color.match(/hsl\(([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%\)/)
      if (match) {
        const [, h, s, l] = match.map(Number)
        return { h, s, l }
      }
      return { h: 0, s: 0, l: 50 } // Default gray
    }

    const { h, s, l } = parseColor(color)

    // Generate complementary colors
    const palette: ColorPalette = {
      primary: color,
      secondary: `hsl(${(h + 180) % 360} ${s}% ${l}%)`,        // Complementary
      accent: `hsl(${(h + 60) % 360} ${s}% ${l}%)`,            // Analogous
      neutral: `hsl(${h} ${Math.max(0, s - 70)}% ${l}%)`,      // Desaturated
      success: `hsl(142 70% 45%)`,                              // Green
      warning: `hsl(38 90% 50%)`,                               // Orange
      error: `hsl(0 84% 60%)`,                                  // Red
    }

    const colorScheme = generateColorScheme(palette)

    setCustomTheme((prev) => ({
      ...prev,
      name: name || `Theme from ${color}`,
      colors: colorScheme,
    }))

    return colorScheme
  }, [generateColorScheme])

  /**
   * Create theme from brand colors
   */
  const createFromBrand = useCallback((
    primaryColor: string,
    secondaryColor?: string,
    options?: {
      name?: string
      style?: 'modern' | 'classic' | 'bold' | 'soft'
    }
  ) => {
    const style = options?.style || 'modern'
    
    // Parse primary color
    const match = primaryColor.match(/hsl\(([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%\)/)
    if (!match) return null
    
    const [, h, s, l] = match.map(Number)
    
    // Style-based adjustments
    const styleAdjustments = {
      modern: { saturation: 0, lightness: 0, radius: '0.5rem' },
      classic: { saturation: -20, lightness: 5, radius: '0.375rem' },
      bold: { saturation: 20, lightness: -5, radius: '0.25rem' },
      soft: { saturation: -10, lightness: 10, radius: '0.75rem' },
    }
    
    const adj = styleAdjustments[style]
    
    const palette: ColorPalette = {
      primary: primaryColor,
      secondary: secondaryColor || `hsl(${(h + 180) % 360} ${Math.max(0, Math.min(100, s + adj.saturation))}% ${Math.max(0, Math.min(100, l + adj.lightness))}%)`,
      accent: `hsl(${(h + 30) % 360} ${Math.max(0, Math.min(100, s + adj.saturation / 2))}% ${l}%)`,
      neutral: `hsl(${h} 10% 50%)`,
      success: `hsl(142 ${70 + adj.saturation}% 45%)`,
      warning: `hsl(38 ${90 + adj.saturation}% 50%)`,
      error: `hsl(0 ${84 + adj.saturation}% 60%)`,
    }
    
    const colorScheme = generateColorScheme(palette)
    
    const newTheme: Partial<Theme> = {
      id: `brand-${Date.now()}`,
      name: options?.name || 'Brand Theme',
      colors: colorScheme,
      spacing: {
        borderRadius: {
          none: '0',
          sm: adj.radius,
          md: adj.radius,
          lg: adj.radius,
          xl: adj.radius,
          full: '9999px',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem',
        },
      },
    }
    
    setCustomTheme(newTheme)
    return newTheme
  }, [generateColorScheme])

  /**
   * Update specific theme properties
   */
  const updateThemeProperty = useCallback((path: string, value: any) => {
    setCustomTheme((prev) => {
      const keys = path.split('.')
      const updated = { ...prev }
      let current: any = updated
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        current[key] = { ...current[key] }
        current = current[key]
      }
      
      current[keys[keys.length - 1]] = value
      return updated
    })
  }, [])

  /**
   * Export theme as JSON
   */
  const exportTheme = useCallback(() => {
    const themeJson = JSON.stringify(customTheme, null, 2)
    const blob = new Blob([themeJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${customTheme.id || 'custom'}-theme.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [customTheme])

  /**
   * Import theme from JSON
   */
  const importTheme = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const theme = JSON.parse(e.target?.result as string)
        setCustomTheme(theme)
      } catch (error) {
        console.error('Failed to import theme:', error)
      }
    }
    reader.readAsText(file)
  }, [])

  /**
   * Generate CSS for the custom theme
   */
  const generateCSS = useMemo(() => {
    if (!customTheme.colors) return ''
    
    const generateCSSVariables = (colors: ThemeColors, prefix: string = '') => {
      return Object.entries(colors)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          return `  --${prefix}${cssKey}: ${value};`
        })
        .join('\n')
    }
    
    const lightCSS = customTheme.colors.light
      ? `:root {\n${generateCSSVariables(customTheme.colors.light)}\n}`
      : ''
    
    const darkCSS = customTheme.colors.dark
      ? `:root.dark {\n${generateCSSVariables(customTheme.colors.dark)}\n}`
      : ''
    
    return `${lightCSS}\n\n${darkCSS}`
  }, [customTheme])

  return {
    theme: customTheme,
    setTheme: setCustomTheme,
    createFromColor,
    createFromBrand,
    generateColorScheme,
    updateThemeProperty,
    exportTheme,
    importTheme,
    generateCSS,
  }
}