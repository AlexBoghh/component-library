export interface ThemeColors {
  // Base colors
  background: string
  foreground: string
  
  // Surface colors
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  
  // Primary brand colors
  primary: string
  primaryForeground: string
  
  // Secondary colors
  secondary: string
  secondaryForeground: string
  
  // Muted colors
  muted: string
  mutedForeground: string
  
  // Accent colors
  accent: string
  accentForeground: string
  
  // Destructive/error colors
  destructive: string
  destructiveForeground: string
  
  // Border and input colors
  border: string
  input: string
  ring: string
  
  // Additional semantic colors
  success: string
  successForeground: string
  warning: string
  warningForeground: string
  info: string
  infoForeground: string
  
  // Chart colors (for data visualization)
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
}

export interface ThemeTypography {
  fontFamily: {
    sans: string[]
    mono: string[]
    heading: string[]
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

export interface ThemeSpacing {
  borderRadius: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
}

export interface ThemeEffects {
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    glow: string
  }
  blur: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  animations: {
    duration: {
      fast: string
      normal: string
      slow: string
    }
    easing: {
      ease: string
      easeIn: string
      easeOut: string
      easeInOut: string
    }
  }
}

export interface Theme {
  id: string
  name: string
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  typography: ThemeTypography
  spacing: ThemeSpacing
  effects: ThemeEffects
  custom?: {
    glitch?: boolean
    neon?: boolean
    scanlines?: boolean
    noise?: boolean
  }
}

// Default theme (polished dark theme)
const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  colors: {
    light: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(240 10% 3.9%)',
      
      card: 'hsl(0 0% 100%)',
      cardForeground: 'hsl(240 10% 3.9%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(240 10% 3.9%)',
      
      primary: 'hsl(280 70% 55%)', // Purple/pink
      primaryForeground: 'hsl(0 0% 100%)',
      
      secondary: 'hsl(240 4.8% 95.9%)',
      secondaryForeground: 'hsl(240 5.9% 10%)',
      
      muted: 'hsl(240 4.8% 95.9%)',
      mutedForeground: 'hsl(240 3.8% 46.1%)',
      
      accent: 'hsl(280 70% 55%)',
      accentForeground: 'hsl(0 0% 100%)',
      
      destructive: 'hsl(0 84.2% 60.2%)',
      destructiveForeground: 'hsl(0 0% 98%)',
      
      border: 'hsl(240 5.9% 90%)',
      input: 'hsl(240 5.9% 90%)',
      ring: 'hsl(280 70% 55%)',
      
      success: 'hsl(142.1 76.2% 36.3%)',
      successForeground: 'hsl(0 0% 100%)',
      warning: 'hsl(32.8 95% 44%)',
      warningForeground: 'hsl(0 0% 100%)',
      info: 'hsl(221.2 83.2% 53.3%)',
      infoForeground: 'hsl(0 0% 100%)',
      
      chart1: 'hsl(280 70% 55%)',
      chart2: 'hsl(173 58% 39%)',
      chart3: 'hsl(197 37% 24%)',
      chart4: 'hsl(43 74% 66%)',
      chart5: 'hsl(27 87% 67%)',
    },
    dark: {
      background: 'hsl(240 21% 4%)', // Deep dark #0a0a0f
      foreground: 'hsl(0 0% 95%)', // Light text
      
      card: 'hsl(240 15% 8%)', // Slightly lighter dark #16161d
      cardForeground: 'hsl(0 0% 95%)',
      popover: 'hsl(240 15% 8%)',
      popoverForeground: 'hsl(0 0% 95%)',
      
      primary: 'hsl(280 70% 55%)', // Vibrant purple/pink #a855f7
      primaryForeground: 'hsl(0 0% 100%)',
      
      secondary: 'hsl(240 10% 20%)', // Muted gray
      secondaryForeground: 'hsl(0 0% 95%)',
      
      muted: 'hsl(240 10% 15%)', // Dark muted
      mutedForeground: 'hsl(240 5% 65%)',
      
      accent: 'hsl(300 60% 50%)', // Pink accent
      accentForeground: 'hsl(0 0% 100%)',
      
      destructive: 'hsl(0 62.8% 30.6%)',
      destructiveForeground: 'hsl(0 0% 98%)',
      
      border: 'hsl(240 15% 18%)', // Subtle border #2a2a3e
      input: 'hsl(240 15% 18%)',
      ring: 'hsl(280 70% 55%)',
      
      success: 'hsl(142.1 70.6% 45.3%)',
      successForeground: 'hsl(0 0% 100%)',
      warning: 'hsl(38 92% 50%)',
      warningForeground: 'hsl(0 0% 100%)',
      info: 'hsl(217.2 91.2% 59.8%)',
      infoForeground: 'hsl(0 0% 100%)',
      
      chart1: 'hsl(280 70% 55%)',
      chart2: 'hsl(160 60% 45%)',
      chart3: 'hsl(30 80% 55%)',
      chart4: 'hsl(220 70% 50%)',
      chart5: 'hsl(340 75% 55%)',
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'Consolas', 'monospace'],
      heading: ['Inter', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7
    }
  },
  spacing: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    }
  },
  effects: {
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      glow: '0 0 20px rgba(0, 0, 0, 0.1)'
    },
    blur: {
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px'
    },
    animations: {
      duration: {
        fast: '0.15s',
        normal: '0.3s',
        slow: '0.5s'
      },
      easing: {
        ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }
}

// Cyberpunk theme
const cyberpunkTheme: Theme = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  colors: {
    light: {
      // Cyberpunk light mode (rare but possible - neon on white)
      background: 'hsl(0 0% 98%)',
      foreground: 'hsl(180 100% 5%)',
      
      card: 'hsl(0 0% 95%)',
      cardForeground: 'hsl(180 100% 5%)',
      popover: 'hsl(0 0% 95%)',
      popoverForeground: 'hsl(180 100% 5%)',
      
      primary: 'hsl(315 100% 50%)', // Hot pink
      primaryForeground: 'hsl(0 0% 100%)',
      
      secondary: 'hsl(180 100% 50%)', // Cyan
      secondaryForeground: 'hsl(180 100% 5%)',
      
      muted: 'hsl(240 5% 90%)',
      mutedForeground: 'hsl(240 10% 40%)',
      
      accent: 'hsl(60 100% 50%)', // Electric yellow
      accentForeground: 'hsl(60 100% 5%)',
      
      destructive: 'hsl(0 100% 45%)', // Neon red
      destructiveForeground: 'hsl(0 0% 100%)',
      
      border: 'hsl(315 50% 80%)',
      input: 'hsl(315 30% 90%)',
      ring: 'hsl(315 100% 50%)',
      
      success: 'hsl(120 100% 40%)', // Neon green
      successForeground: 'hsl(120 100% 5%)',
      warning: 'hsl(30 100% 50%)', // Neon orange
      warningForeground: 'hsl(30 100% 5%)',
      info: 'hsl(180 100% 50%)', // Neon cyan
      infoForeground: 'hsl(180 100% 5%)',
      
      chart1: 'hsl(315 100% 50%)',
      chart2: 'hsl(180 100% 50%)',
      chart3: 'hsl(60 100% 50%)',
      chart4: 'hsl(270 100% 60%)',
      chart5: 'hsl(120 100% 50%)',
    },
    dark: {
      // Main cyberpunk dark mode
      background: 'hsl(240 10% 3%)', // Deep dark blue-black
      foreground: 'hsl(180 100% 90%)', // Bright cyan text
      
      card: 'hsl(240 20% 8%)', // Dark card with blue tint
      cardForeground: 'hsl(180 100% 90%)',
      popover: 'hsl(240 30% 6%)', // Darker popover
      popoverForeground: 'hsl(180 100% 90%)',
      
      primary: 'hsl(315 100% 65%)', // Hot pink/magenta
      primaryForeground: 'hsl(240 10% 3%)',
      
      secondary: 'hsl(180 100% 60%)', // Electric cyan
      secondaryForeground: 'hsl(240 10% 3%)',
      
      muted: 'hsl(240 20% 15%)', // Muted dark blue
      mutedForeground: 'hsl(180 30% 70%)', // Muted cyan
      
      accent: 'hsl(60 100% 60%)', // Electric yellow
      accentForeground: 'hsl(240 10% 3%)',
      
      destructive: 'hsl(0 100% 60%)', // Neon red
      destructiveForeground: 'hsl(240 10% 3%)',
      
      border: 'hsl(315 50% 25%)', // Pink border
      input: 'hsl(240 30% 12%)', // Dark input with blue tint
      ring: 'hsl(315 100% 65%)', // Pink focus ring
      
      success: 'hsl(120 100% 50%)', // Neon green
      successForeground: 'hsl(240 10% 3%)',
      warning: 'hsl(30 100% 60%)', // Neon orange
      warningForeground: 'hsl(240 10% 3%)',
      info: 'hsl(180 100% 60%)', // Neon cyan
      infoForeground: 'hsl(240 10% 3%)',
      
      chart1: 'hsl(315 100% 65%)', // Hot pink
      chart2: 'hsl(180 100% 60%)', // Cyan
      chart3: 'hsl(60 100% 60%)',  // Yellow
      chart4: 'hsl(270 100% 70%)', // Purple
      chart5: 'hsl(120 100% 50%)', // Green
    }
  },
  typography: {
    fontFamily: {
      sans: ['JetBrains Mono', 'Roboto Mono', 'Courier New', 'monospace'],
      mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      heading: ['Orbitron', 'JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.1,
      normal: 1.4,
      relaxed: 1.6
    }
  },
  spacing: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.25rem', // Sharper corners
      lg: '0.375rem',
      xl: '0.5rem',
      full: '9999px'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    }
  },
  effects: {
    shadows: {
      sm: '0 0 2px rgba(255, 0, 255, 0.3)',
      md: '0 0 8px rgba(255, 0, 255, 0.4), 0 0 16px rgba(0, 255, 255, 0.2)',
      lg: '0 0 16px rgba(255, 0, 255, 0.5), 0 0 32px rgba(0, 255, 255, 0.3)',
      xl: '0 0 24px rgba(255, 0, 255, 0.6), 0 0 48px rgba(0, 255, 255, 0.4)',
      '2xl': '0 0 32px rgba(255, 0, 255, 0.7), 0 0 64px rgba(0, 255, 255, 0.5)',
      glow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor'
    },
    blur: {
      sm: '2px',
      md: '4px',
      lg: '8px',
      xl: '16px'
    },
    animations: {
      duration: {
        fast: '0.1s',
        normal: '0.2s',
        slow: '0.4s'
      },
      easing: {
        ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Snappy cyberpunk feel
        easeIn: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        easeInOut: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
      }
    }
  },
  custom: {
    glitch: true,
    neon: true,
    scanlines: true,
    noise: false
  }
}

// Brutalism theme
const brutalismTheme: Theme = {
  id: 'brutalism',
  name: 'Brutalism',
  colors: {
    light: {
      background: 'hsl(0 0% 95%)', // Off-white concrete
      foreground: 'hsl(0 0% 0%)', // Pure black
      
      card: 'hsl(0 0% 100%)', // White cards
      cardForeground: 'hsl(0 0% 0%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(0 0% 0%)',
      
      primary: 'hsl(45 100% 50%)', // Bold yellow
      primaryForeground: 'hsl(0 0% 0%)',
      
      secondary: 'hsl(0 100% 50%)', // Bright red
      secondaryForeground: 'hsl(0 0% 100%)',
      
      muted: 'hsl(0 0% 70%)', // Medium gray
      mutedForeground: 'hsl(0 0% 20%)',
      
      accent: 'hsl(210 100% 50%)', // Electric blue
      accentForeground: 'hsl(0 0% 100%)',
      
      destructive: 'hsl(350 80% 55%)', // Softer red-pink
      destructiveForeground: 'hsl(0 0% 100%)',
      
      border: 'hsl(0 0% 0%)', // Black borders
      input: 'hsl(0 0% 0%)',
      ring: 'hsl(45 100% 51%)', // Yellow focus
      
      success: 'hsl(120 100% 40%)', // Green
      successForeground: 'hsl(0 0% 0%)',
      warning: 'hsl(35 100% 50%)', // Orange-yellow
      warningForeground: 'hsl(0 0% 0%)',
      info: 'hsl(180 100% 40%)', // Cyan/Teal
      infoForeground: 'hsl(0 0% 0%)',
      
      chart1: 'hsl(45 100% 51%)',  // Yellow
      chart2: 'hsl(0 100% 50%)', // Red
      chart3: 'hsl(180 100% 40%)', // Cyan
      chart4: 'hsl(120 100% 40%)', // Green
      chart5: 'hsl(30 100% 50%)',  // Orange
    },
    dark: {
      background: 'hsl(0 0% 10%)', // Dark concrete
      foreground: 'hsl(0 0% 100%)', // White text
      
      card: 'hsl(0 0% 15%)', // Dark cards
      cardForeground: 'hsl(0 0% 100%)',
      popover: 'hsl(0 0% 15%)',
      popoverForeground: 'hsl(0 0% 100%)',
      
      primary: 'hsl(45 100% 51%)', // Bold yellow
      primaryForeground: 'hsl(0 0% 0%)',
      
      secondary: 'hsl(0 100% 50%)', // Bright red
      secondaryForeground: 'hsl(0 0% 100%)',
      
      muted: 'hsl(0 0% 25%)', // Medium dark gray
      mutedForeground: 'hsl(0 0% 70%)',
      
      accent: 'hsl(210 100% 50%)', // Electric blue
      accentForeground: 'hsl(0 0% 100%)',
      
      destructive: 'hsl(350 80% 60%)', // Softer red-pink
      destructiveForeground: 'hsl(0 0% 0%)',
      
      border: 'hsl(0 0% 100%)', // White borders in dark mode
      input: 'hsl(0 0% 100%)',
      ring: 'hsl(45 100% 51%)', // Yellow focus
      
      success: 'hsl(120 100% 50%)', // Bright green
      successForeground: 'hsl(0 0% 0%)',
      warning: 'hsl(35 100% 50%)', // Orange-yellow
      warningForeground: 'hsl(0 0% 0%)',
      info: 'hsl(210 100% 60%)', // Bright blue
      infoForeground: 'hsl(0 0% 0%)',
      
      chart1: 'hsl(45 100% 51%)',  // Yellow
      chart2: 'hsl(260 100% 70%)', // Purple
      chart3: 'hsl(180 100% 50%)', // Cyan  
      chart4: 'hsl(120 100% 50%)', // Green
      chart5: 'hsl(30 100% 55%)',  // Orange
    }
  },
  typography: {
    fontFamily: {
      sans: ['Arial Black', 'Helvetica Bold', 'sans-serif'],
      mono: ['Courier New', 'Courier', 'monospace'],
      heading: ['Arial Black', 'Helvetica Bold', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3.5rem'
    },
    fontWeight: {
      normal: 400,
      medium: 700,
      semibold: 900,
      bold: 900
    },
    lineHeight: {
      tight: 1,
      normal: 1.2,
      relaxed: 1.4
    }
  },
  spacing: {
    borderRadius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      full: '0'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
      xl: '3rem',
      '2xl': '4rem'
    }
  },
  effects: {
    shadows: {
      sm: '2px 2px 0px rgba(0, 0, 0, 1)',
      md: '4px 4px 0px rgba(0, 0, 0, 1)',
      lg: '8px 8px 0px rgba(0, 0, 0, 1)',
      xl: '12px 12px 0px rgba(0, 0, 0, 1)',
      '2xl': '16px 16px 0px rgba(0, 0, 0, 1)',
      glow: '6px 6px 0px rgba(0, 0, 0, 1)'
    },
    blur: {
      sm: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px'
    },
    animations: {
      duration: {
        fast: '0ms',
        normal: '0ms',
        slow: '0ms'
      },
      easing: {
        ease: 'linear',
        easeIn: 'linear',
        easeOut: 'linear',
        easeInOut: 'linear'
      }
    }
  },
  custom: {
    glitch: false,
    neon: false,
    scanlines: false,
    noise: false
  }
}

// Import new themes
import { minimalTheme } from './minimal-theme'
import { glassmorphismTheme } from './glassmorphism-theme'

// Theme registry
export const themes: Record<string, Theme> = {
  default: defaultTheme,
  cyberpunk: cyberpunkTheme,
  brutalism: brutalismTheme,
  minimal: minimalTheme,
  glassmorphism: glassmorphismTheme
}

// Helper functions
export const getTheme = (id: string): Theme => {
  return themes[id] || themes.default
}

export const getThemeList = (): { id: string; name: string }[] => {
  return Object.values(themes).map(theme => ({
    id: theme.id,
    name: theme.name
  }))
}

export const generateCSSVariables = (theme: Theme, mode: 'light' | 'dark'): Record<string, string> => {
  const colors = theme.colors[mode]
  const variables: Record<string, string> = {}
  
  // Generate color variables
  Object.entries(colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    variables[`--${cssKey}`] = value
  })
  
  // Generate typography variables
  variables['--font-sans'] = theme.typography.fontFamily.sans.join(', ')
  variables['--font-mono'] = theme.typography.fontFamily.mono.join(', ')
  variables['--font-heading'] = theme.typography.fontFamily.heading.join(', ')
  
  // Generate spacing variables
  Object.entries(theme.spacing.borderRadius).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value
  })
  
  // Generate effect variables
  Object.entries(theme.effects.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value
  })
  
  return variables
}