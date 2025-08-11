/**
 * Minimal Theme
 * A clean, sophisticated theme with subtle elegance
 * Features: Generous whitespace, refined typography, subtle shadows
 */

import { Theme } from './index'

export const minimalTheme: Theme = {
  id: 'minimal',
  name: 'Minimal',
  colors: {
    light: {
      // Base colors - Clean whites and soft grays
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(0 0% 9%)',
      
      // Surface colors - Subtle elevation
      card: 'hsl(0 0% 100%)',
      cardForeground: 'hsl(0 0% 9%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(0 0% 9%)',
      
      // Primary - Sophisticated black
      primary: 'hsl(0 0% 9%)',
      primaryForeground: 'hsl(0 0% 98%)',
      
      // Secondary - Soft gray
      secondary: 'hsl(0 0% 96%)',
      secondaryForeground: 'hsl(0 0% 9%)',
      
      // Muted - Very light gray
      muted: 'hsl(0 0% 96%)',
      mutedForeground: 'hsl(0 0% 45%)',
      
      // Accent - Subtle blue-gray
      accent: 'hsl(215 20% 95%)',
      accentForeground: 'hsl(215 20% 25%)',
      
      // Destructive - Muted red
      destructive: 'hsl(0 60% 50%)',
      destructiveForeground: 'hsl(0 0% 98%)',
      
      // Borders and inputs - Very light
      border: 'hsl(0 0% 90%)',
      input: 'hsl(0 0% 90%)',
      ring: 'hsl(0 0% 60%)',
      
      // Semantic colors - Muted palette
      success: 'hsl(142 50% 45%)',
      successForeground: 'hsl(0 0% 98%)',
      warning: 'hsl(38 70% 50%)',
      warningForeground: 'hsl(0 0% 9%)',
      info: 'hsl(206 70% 50%)',
      infoForeground: 'hsl(0 0% 98%)',
      
      // Chart colors - Monochromatic with accent
      chart1: 'hsl(0 0% 20%)',
      chart2: 'hsl(0 0% 40%)',
      chart3: 'hsl(0 0% 60%)',
      chart4: 'hsl(215 20% 50%)',
      chart5: 'hsl(0 0% 80%)',
    },
    dark: {
      // Base colors - Deep blacks
      background: 'hsl(0 0% 7%)',
      foreground: 'hsl(0 0% 95%)',
      
      // Surface colors - Slightly elevated
      card: 'hsl(0 0% 9%)',
      cardForeground: 'hsl(0 0% 95%)',
      popover: 'hsl(0 0% 9%)',
      popoverForeground: 'hsl(0 0% 95%)',
      
      // Primary - Clean white
      primary: 'hsl(0 0% 95%)',
      primaryForeground: 'hsl(0 0% 9%)',
      
      // Secondary - Dark gray
      secondary: 'hsl(0 0% 14%)',
      secondaryForeground: 'hsl(0 0% 95%)',
      
      // Muted - Medium dark gray
      muted: 'hsl(0 0% 14%)',
      mutedForeground: 'hsl(0 0% 60%)',
      
      // Accent - Subtle blue-gray
      accent: 'hsl(215 15% 20%)',
      accentForeground: 'hsl(215 20% 85%)',
      
      // Destructive - Muted red
      destructive: 'hsl(0 50% 40%)',
      destructiveForeground: 'hsl(0 0% 95%)',
      
      // Borders and inputs - Subtle
      border: 'hsl(0 0% 18%)',
      input: 'hsl(0 0% 18%)',
      ring: 'hsl(0 0% 40%)',
      
      // Semantic colors - Muted palette
      success: 'hsl(142 40% 40%)',
      successForeground: 'hsl(0 0% 95%)',
      warning: 'hsl(38 60% 45%)',
      warningForeground: 'hsl(0 0% 9%)',
      info: 'hsl(206 60% 45%)',
      infoForeground: 'hsl(0 0% 95%)',
      
      // Chart colors - Monochromatic with accent
      chart1: 'hsl(0 0% 80%)',
      chart2: 'hsl(0 0% 60%)',
      chart3: 'hsl(0 0% 40%)',
      chart4: 'hsl(215 20% 60%)',
      chart5: 'hsl(0 0% 20%)',
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2rem',    // 32px
      '4xl': '2.5rem'   // 40px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.6,
      relaxed: 1.75
    }
  },
  spacing: {
    borderRadius: {
      none: '0',
      sm: '0.25rem',    // 4px - Subtle rounding
      md: '0.5rem',     // 8px
      lg: '0.75rem',    // 12px
      xl: '1rem',       // 16px
      full: '9999px'
    },
    spacing: {
      xs: '0.5rem',     // 8px - More generous spacing
      sm: '1rem',       // 16px
      md: '1.5rem',     // 24px
      lg: '2rem',       // 32px
      xl: '3rem',       // 48px
      '2xl': '4rem'     // 64px
    }
  },
  effects: {
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 2px 4px 0 rgb(0 0 0 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.04)',
      lg: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -1px rgb(0 0 0 / 0.03)',
      xl: '0 8px 10px -2px rgb(0 0 0 / 0.04), 0 4px 6px -2px rgb(0 0 0 / 0.02)',
      '2xl': '0 12px 16px -4px rgb(0 0 0 / 0.03), 0 4px 8px -2px rgb(0 0 0 / 0.02)',
      glow: '0 0 0 1px rgba(0, 0, 0, 0.05)'
    },
    blur: {
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px'
    },
    animations: {
      duration: {
        fast: '0.2s',
        normal: '0.35s',
        slow: '0.5s'
      },
      easing: {
        ease: 'cubic-bezier(0.32, 0, 0.67, 0)',          // Smooth and elegant
        easeIn: 'cubic-bezier(0.50, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
        easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)'
      }
    }
  }
}