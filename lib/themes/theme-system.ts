/**
 * Core Theme System Architecture
 * Provides a comprehensive theming solution with:
 * - Runtime theme switching
 * - CSS variable generation
 * - Type-safe theme creation
 * - Tailwind CSS integration
 * - Dark/light mode support
 * - System preference detection
 */

import { Theme } from './index'

export interface ThemeSystemConfig {
  storageKey?: string
  defaultTheme?: string
  defaultMode?: 'light' | 'dark' | 'system'
  enableTransitions?: boolean
  transitionDuration?: number
}

export interface ThemeToken {
  value: string
  _light?: string
  _dark?: string
}

export interface ThemeScale {
  50?: string
  100?: string
  200?: string
  300?: string
  400?: string
  500?: string
  600?: string
  700?: string
  800?: string
  900?: string
  950?: string
}

export interface SemanticColors {
  // Base
  background: ThemeToken
  foreground: ThemeToken
  
  // Surfaces
  surface: ThemeToken
  surfaceSubtle: ThemeToken
  surfaceStrong: ThemeToken
  
  // Overlays
  overlay: ThemeToken
  overlaySubtle: ThemeToken
  
  // Borders
  border: ThemeToken
  borderSubtle: ThemeToken
  borderStrong: ThemeToken
  
  // Interactive
  primary: ThemeToken
  primarySubtle: ThemeToken
  primaryStrong: ThemeToken
  primaryForeground: ThemeToken
  
  secondary: ThemeToken
  secondarySubtle: ThemeToken
  secondaryStrong: ThemeToken
  secondaryForeground: ThemeToken
  
  accent: ThemeToken
  accentSubtle: ThemeToken
  accentStrong: ThemeToken
  accentForeground: ThemeToken
  
  // States
  info: ThemeToken
  infoSubtle: ThemeToken
  infoForeground: ThemeToken
  
  success: ThemeToken
  successSubtle: ThemeToken
  successForeground: ThemeToken
  
  warning: ThemeToken
  warningSubtle: ThemeToken
  warningForeground: ThemeToken
  
  error: ThemeToken
  errorSubtle: ThemeToken
  errorForeground: ThemeToken
  
  // Special
  muted: ThemeToken
  mutedForeground: ThemeToken
  highlight: ThemeToken
  highlightForeground: ThemeToken
}

export interface ThemeTokens {
  colors: SemanticColors
  typography: {
    fonts: {
      sans: string
      serif: string
      mono: string
      display: string
    }
    sizes: ThemeScale
    weights: {
      thin: number
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
      extrabold: number
      black: number
    }
    lineHeights: {
      none: number
      tight: number
      snug: number
      normal: number
      relaxed: number
      loose: number
    }
    letterSpacing: {
      tighter: string
      tight: string
      normal: string
      wide: string
      wider: string
      widest: string
    }
  }
  spacing: {
    scale: ThemeScale
    radius: {
      none: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      full: string
    }
  }
  effects: {
    shadows: {
      none: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      inner: string
      outline: string
      glow: string
      neon: string
    }
    blurs: {
      none: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
    opacity: ThemeScale
  }
  motion: {
    durations: {
      instant: string
      fast: string
      normal: string
      slow: string
      slower: string
    }
    easings: {
      linear: string
      easeIn: string
      easeOut: string
      easeInOut: string
      bounce: string
      elastic: string
      back: string
    }
    transitions: {
      all: string
      colors: string
      opacity: string
      shadow: string
      transform: string
    }
  }
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
}

/**
 * CSS Variable Generator
 * Converts theme tokens to CSS custom properties
 */
export class CSSVariableGenerator {
  private prefix: string

  constructor(prefix = '') {
    this.prefix = prefix
  }

  /**
   * Generate CSS variables from theme tokens
   */
  generate(tokens: ThemeTokens, mode: 'light' | 'dark'): Record<string, string> {
    const variables: Record<string, string> = {}
    
    // Process colors
    Object.entries(tokens.colors).forEach(([key, token]) => {
      const value = mode === 'dark' && token._dark ? token._dark : token._light || token.value
      variables[`--${this.prefix}${this.kebabCase(key)}`] = value
    })
    
    // Process typography
    Object.entries(tokens.typography.fonts).forEach(([key, value]) => {
      variables[`--${this.prefix}font-${key}`] = value
    })
    
    Object.entries(tokens.typography.sizes).forEach(([key, value]) => {
      variables[`--${this.prefix}text-${key}`] = value
    })
    
    Object.entries(tokens.typography.weights).forEach(([key, value]) => {
      variables[`--${this.prefix}font-weight-${key}`] = String(value)
    })
    
    Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
      variables[`--${this.prefix}leading-${key}`] = String(value)
    })
    
    Object.entries(tokens.typography.letterSpacing).forEach(([key, value]) => {
      variables[`--${this.prefix}tracking-${key}`] = value
    })
    
    // Process spacing
    Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
      variables[`--${this.prefix}space-${key}`] = value
    })
    
    Object.entries(tokens.spacing.radius).forEach(([key, value]) => {
      variables[`--${this.prefix}radius-${key}`] = value
    })
    
    // Process effects
    Object.entries(tokens.effects.shadows).forEach(([key, value]) => {
      variables[`--${this.prefix}shadow-${key}`] = value
    })
    
    Object.entries(tokens.effects.blurs).forEach(([key, value]) => {
      variables[`--${this.prefix}blur-${key}`] = value
    })
    
    Object.entries(tokens.effects.opacity).forEach(([key, value]) => {
      variables[`--${this.prefix}opacity-${key}`] = value
    })
    
    // Process motion
    Object.entries(tokens.motion.durations).forEach(([key, value]) => {
      variables[`--${this.prefix}duration-${key}`] = value
    })
    
    Object.entries(tokens.motion.easings).forEach(([key, value]) => {
      variables[`--${this.prefix}ease-${key}`] = value
    })
    
    Object.entries(tokens.motion.transitions).forEach(([key, value]) => {
      variables[`--${this.prefix}transition-${key}`] = value
    })
    
    return variables
  }

  /**
   * Generate CSS string from variables
   */
  generateCSS(tokens: ThemeTokens, mode: 'light' | 'dark'): string {
    const variables = this.generate(tokens, mode)
    const selector = mode === 'dark' ? ':root.dark' : ':root'
    
    const css = Object.entries(variables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')
    
    return `${selector} {\n${css}\n}`
  }

  /**
   * Generate Tailwind config extension
   */
  generateTailwindConfig(tokens: ThemeTokens): Record<string, any> {
    return {
      colors: this.generateColorConfig(tokens.colors),
      fontFamily: tokens.typography.fonts,
      fontSize: tokens.typography.sizes,
      fontWeight: tokens.typography.weights,
      lineHeight: tokens.typography.lineHeights,
      letterSpacing: tokens.typography.letterSpacing,
      spacing: tokens.spacing.scale,
      borderRadius: tokens.spacing.radius,
      boxShadow: tokens.effects.shadows,
      blur: tokens.effects.blurs,
      opacity: tokens.effects.opacity,
      transitionDuration: tokens.motion.durations,
      transitionTimingFunction: tokens.motion.easings,
      screens: tokens.breakpoints,
    }
  }

  private generateColorConfig(colors: SemanticColors): Record<string, any> {
    const config: Record<string, any> = {}
    
    Object.entries(colors).forEach(([key, token]) => {
      const kebabKey = this.kebabCase(key)
      config[kebabKey] = {
        DEFAULT: `var(--${this.prefix}${kebabKey})`,
        50: `var(--${this.prefix}${kebabKey}-50, var(--${this.prefix}${kebabKey}))`,
        100: `var(--${this.prefix}${kebabKey}-100, var(--${this.prefix}${kebabKey}))`,
        200: `var(--${this.prefix}${kebabKey}-200, var(--${this.prefix}${kebabKey}))`,
        300: `var(--${this.prefix}${kebabKey}-300, var(--${this.prefix}${kebabKey}))`,
        400: `var(--${this.prefix}${kebabKey}-400, var(--${this.prefix}${kebabKey}))`,
        500: `var(--${this.prefix}${kebabKey}-500, var(--${this.prefix}${kebabKey}))`,
        600: `var(--${this.prefix}${kebabKey}-600, var(--${this.prefix}${kebabKey}))`,
        700: `var(--${this.prefix}${kebabKey}-700, var(--${this.prefix}${kebabKey}))`,
        800: `var(--${this.prefix}${kebabKey}-800, var(--${this.prefix}${kebabKey}))`,
        900: `var(--${this.prefix}${kebabKey}-900, var(--${this.prefix}${kebabKey}))`,
        950: `var(--${this.prefix}${kebabKey}-950, var(--${this.prefix}${kebabKey}))`,
      }
    })
    
    return config
  }

  private kebabCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase()
  }
}

/**
 * Theme Manager
 * Handles theme switching, persistence, and application
 */
export class ThemeManager {
  private currentTheme: string
  private currentMode: 'light' | 'dark' | 'system'
  private themes: Map<string, Theme>
  private config: ThemeSystemConfig
  private cssGenerator: CSSVariableGenerator
  private listeners: Set<(theme: string, mode: 'light' | 'dark') => void>

  constructor(themes: Theme[], config: ThemeSystemConfig = {}) {
    this.themes = new Map(themes.map(t => [t.id, t]))
    this.config = {
      storageKey: 'radix-ui-lab-theme',
      defaultTheme: 'default',
      defaultMode: 'system',
      enableTransitions: true,
      transitionDuration: 300,
      ...config
    }
    this.cssGenerator = new CSSVariableGenerator()
    this.listeners = new Set()
    
    // Initialize theme
    this.currentTheme = this.loadThemeFromStorage() || this.config.defaultTheme!
    this.currentMode = this.loadModeFromStorage() || this.config.defaultMode!
    
    // Apply initial theme
    this.applyTheme()
    
    // Listen for system theme changes
    this.setupSystemThemeListener()
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): Theme | undefined {
    return this.themes.get(this.currentTheme)
  }

  /**
   * Get current effective mode (resolves 'system' to actual mode)
   */
  getCurrentMode(): 'light' | 'dark' {
    if (this.currentMode === 'system') {
      return this.getSystemPreference()
    }
    return this.currentMode
  }

  /**
   * Set theme
   */
  setTheme(themeId: string): void {
    if (!this.themes.has(themeId)) {
      console.warn(`Theme "${themeId}" not found`)
      return
    }
    
    this.currentTheme = themeId
    this.saveThemeToStorage(themeId)
    this.applyTheme()
    this.notifyListeners()
  }

  /**
   * Set mode
   */
  setMode(mode: 'light' | 'dark' | 'system'): void {
    this.currentMode = mode
    this.saveModeToStorage(mode)
    this.applyTheme()
    this.notifyListeners()
  }

  /**
   * Register a new theme
   */
  registerTheme(theme: Theme): void {
    this.themes.set(theme.id, theme)
  }

  /**
   * Unregister a theme
   */
  unregisterTheme(themeId: string): void {
    if (themeId === this.currentTheme) {
      console.warn('Cannot unregister current theme')
      return
    }
    this.themes.delete(themeId)
  }

  /**
   * Get all available themes
   */
  getAvailableThemes(): Theme[] {
    return Array.from(this.themes.values())
  }

  /**
   * Subscribe to theme changes
   */
  subscribe(listener: (theme: string, mode: 'light' | 'dark') => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  /**
   * Apply theme to DOM
   */
  private applyTheme(): void {
    const theme = this.getCurrentTheme()
    if (!theme) return
    
    const effectiveMode = this.getCurrentMode()
    const root = document.documentElement
    
    // Add transition class if enabled
    if (this.config.enableTransitions) {
      root.classList.add('theme-transitioning')
      setTimeout(() => {
        root.classList.remove('theme-transitioning')
      }, this.config.transitionDuration)
    }
    
    // Remove old theme classes
    root.classList.remove(...Array.from(this.themes.keys()))
    root.classList.remove('light', 'dark')
    
    // Add new theme classes
    root.classList.add(theme.id)
    root.classList.add(effectiveMode)
    root.setAttribute('data-theme', theme.id)
    root.setAttribute('data-mode', effectiveMode)
    
    // Apply CSS variables
    const variables = this.cssGenerator.generate(theme.colors[effectiveMode], effectiveMode)
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    
    // Apply typography
    root.style.setProperty('--font-sans', theme.typography.fontFamily.sans.join(', '))
    root.style.setProperty('--font-mono', theme.typography.fontFamily.mono.join(', '))
    root.style.setProperty('--font-heading', theme.typography.fontFamily.heading.join(', '))
    
    // Apply spacing
    Object.entries(theme.spacing.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value)
    })
    
    Object.entries(theme.spacing.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value)
    })
    
    // Apply effects
    Object.entries(theme.effects.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value)
    })
    
    // Apply animations
    Object.entries(theme.effects.animations.duration).forEach(([key, value]) => {
      root.style.setProperty(`--duration-${key}`, value)
    })
    
    Object.entries(theme.effects.animations.easing).forEach(([key, value]) => {
      root.style.setProperty(`--ease-${key}`, value)
    })
    
    // Apply custom theme features
    if (theme.custom) {
      Object.entries(theme.custom).forEach(([key, value]) => {
        if (value) {
          root.classList.add(`theme-${key}`)
        } else {
          root.classList.remove(`theme-${key}`)
        }
      })
    }
  }

  /**
   * Get system color preference
   */
  private getSystemPreference(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  /**
   * Setup system theme change listener
   */
  private setupSystemThemeListener(): void {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (this.currentMode === 'system') {
        this.applyTheme()
        this.notifyListeners()
      }
    })
  }

  /**
   * Notify all listeners of theme change
   */
  private notifyListeners(): void {
    const effectiveMode = this.getCurrentMode()
    this.listeners.forEach(listener => {
      listener(this.currentTheme, effectiveMode)
    })
  }

  /**
   * Load theme from storage
   */
  private loadThemeFromStorage(): string | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(`${this.config.storageKey}-theme`)
    } catch {
      return null
    }
  }

  /**
   * Save theme to storage
   */
  private saveThemeToStorage(theme: string): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(`${this.config.storageKey}-theme`, theme)
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Load mode from storage
   */
  private loadModeFromStorage(): 'light' | 'dark' | 'system' | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(`${this.config.storageKey}-mode`) as any
    } catch {
      return null
    }
  }

  /**
   * Save mode to storage
   */
  private saveModeToStorage(mode: 'light' | 'dark' | 'system'): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(`${this.config.storageKey}-mode`, mode)
    } catch {
      // Ignore storage errors
    }
  }
}

/**
 * Theme validator
 * Ensures themes meet accessibility and design standards
 */
export class ThemeValidator {
  /**
   * Validate color contrast
   */
  static validateContrast(foreground: string, background: string): {
    ratio: number
    passesAA: boolean
    passesAAA: boolean
  } {
    const ratio = this.getContrastRatio(foreground, background)
    return {
      ratio,
      passesAA: ratio >= 4.5,
      passesAAA: ratio >= 7
    }
  }

  /**
   * Calculate contrast ratio between two colors
   */
  private static getContrastRatio(color1: string, color2: string): number {
    const l1 = this.getRelativeLuminance(color1)
    const l2 = this.getRelativeLuminance(color2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  }

  /**
   * Get relative luminance of a color
   */
  private static getRelativeLuminance(color: string): number {
    // Parse HSL color
    const match = color.match(/hsl\(([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%\)/)
    if (!match) return 0
    
    const [, h, s, l] = match.map(Number)
    
    // Convert HSL to RGB
    const { r, g, b } = this.hslToRgb(h, s / 100, l / 100)
    
    // Calculate relative luminance
    const rsRGB = r / 255
    const gsRGB = g / 255
    const bsRGB = b / 255
    
    const r2 = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
    const g2 = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
    const b2 = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)
    
    return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2
  }

  /**
   * Convert HSL to RGB
   */
  private static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h = h / 360
    
    let r, g, b
    
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
  }

  /**
   * Validate theme completeness
   */
  static validateTheme(theme: Theme): {
    valid: boolean
    errors: string[]
    warnings: string[]
  } {
    const errors: string[] = []
    const warnings: string[] = []
    
    // Check required fields
    if (!theme.id) errors.push('Theme must have an id')
    if (!theme.name) errors.push('Theme must have a name')
    if (!theme.colors) errors.push('Theme must have colors')
    if (!theme.colors.light) errors.push('Theme must have light mode colors')
    if (!theme.colors.dark) errors.push('Theme must have dark mode colors')
    
    // Check contrast ratios for key combinations
    if (theme.colors.light) {
      const lightChecks = [
        { fg: theme.colors.light.foreground, bg: theme.colors.light.background, name: 'foreground/background' },
        { fg: theme.colors.light.primaryForeground, bg: theme.colors.light.primary, name: 'primary text' },
        { fg: theme.colors.light.secondaryForeground, bg: theme.colors.light.secondary, name: 'secondary text' },
      ]
      
      lightChecks.forEach(({ fg, bg, name }) => {
        const contrast = this.validateContrast(fg, bg)
        if (!contrast.passesAA) {
          warnings.push(`Light mode ${name} fails AA contrast (${contrast.ratio.toFixed(2)}:1)`)
        }
      })
    }
    
    if (theme.colors.dark) {
      const darkChecks = [
        { fg: theme.colors.dark.foreground, bg: theme.colors.dark.background, name: 'foreground/background' },
        { fg: theme.colors.dark.primaryForeground, bg: theme.colors.dark.primary, name: 'primary text' },
        { fg: theme.colors.dark.secondaryForeground, bg: theme.colors.dark.secondary, name: 'secondary text' },
      ]
      
      darkChecks.forEach(({ fg, bg, name }) => {
        const contrast = this.validateContrast(fg, bg)
        if (!contrast.passesAA) {
          warnings.push(`Dark mode ${name} fails AA contrast (${contrast.ratio.toFixed(2)}:1)`)
        }
      })
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  }
}

/**
 * Export singleton instance for easy use
 */
let themeManagerInstance: ThemeManager | null = null

export function initializeThemeManager(themes: Theme[], config?: ThemeSystemConfig): ThemeManager {
  if (!themeManagerInstance) {
    themeManagerInstance = new ThemeManager(themes, config)
  }
  return themeManagerInstance
}

export function getThemeManager(): ThemeManager | null {
  return themeManagerInstance
}