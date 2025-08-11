/**
 * Glassmorphism Theme
 * Modern frosted glass aesthetic with depth and transparency
 * Features: Backdrop blur, transparency layers, vibrant gradients
 */

import { Theme } from './index'

export const glassmorphismTheme: Theme = {
  id: 'glassmorphism',
  name: 'Glassmorphism',
  colors: {
    light: {
      // Base colors - Light with transparency support
      background: 'hsl(220 40% 97%)',  // Slight blue tint
      foreground: 'hsl(220 40% 13%)',
      
      // Surface colors - Semi-transparent for glass effect
      card: 'hsla(0 0% 100% / 0.7)',
      cardForeground: 'hsl(220 40% 13%)',
      popover: 'hsla(0 0% 100% / 0.8)',
      popoverForeground: 'hsl(220 40% 13%)',
      
      // Primary - Vibrant gradient base
      primary: 'hsl(259 100% 65%)',     // Vivid purple
      primaryForeground: 'hsl(0 0% 100%)',
      
      // Secondary - Complementary gradient
      secondary: 'hsl(199 100% 60%)',   // Sky blue
      secondaryForeground: 'hsl(0 0% 100%)',
      
      // Muted - Frosted appearance
      muted: 'hsla(220 40% 96% / 0.6)',
      mutedForeground: 'hsl(220 20% 40%)',
      
      // Accent - Gradient accent
      accent: 'hsl(329 100% 65%)',      // Hot pink
      accentForeground: 'hsl(0 0% 100%)',
      
      // Destructive - Glass red
      destructive: 'hsl(349 100% 60%)',
      destructiveForeground: 'hsl(0 0% 100%)',
      
      // Borders and inputs - Glass edges
      border: 'hsla(220 40% 80% / 0.3)',
      input: 'hsla(220 40% 80% / 0.2)',
      ring: 'hsl(259 100% 65%)',
      
      // Semantic colors - Vibrant glass
      success: 'hsl(149 100% 50%)',     // Emerald
      successForeground: 'hsl(0 0% 100%)',
      warning: 'hsl(39 100% 57%)',      // Gold
      warningForeground: 'hsl(220 40% 13%)',
      info: 'hsl(189 100% 50%)',        // Cyan
      infoForeground: 'hsl(0 0% 100%)',
      
      // Chart colors - Gradient palette
      chart1: 'hsl(259 100% 65%)',      // Purple
      chart2: 'hsl(199 100% 60%)',      // Blue
      chart3: 'hsl(329 100% 65%)',      // Pink
      chart4: 'hsl(149 100% 50%)',      // Green
      chart5: 'hsl(39 100% 57%)',       // Gold
    },
    dark: {
      // Base colors - Dark with depth
      background: 'hsl(220 40% 8%)',     // Deep blue-black
      foreground: 'hsl(220 40% 95%)',
      
      // Surface colors - Dark glass
      card: 'hsla(220 40% 13% / 0.5)',
      cardForeground: 'hsl(220 40% 95%)',
      popover: 'hsla(220 40% 13% / 0.7)',
      popoverForeground: 'hsl(220 40% 95%)',
      
      // Primary - Neon purple
      primary: 'hsl(259 100% 70%)',
      primaryForeground: 'hsl(220 40% 8%)',
      
      // Secondary - Neon blue
      secondary: 'hsl(199 100% 65%)',
      secondaryForeground: 'hsl(220 40% 8%)',
      
      // Muted - Dark frosted
      muted: 'hsla(220 40% 20% / 0.5)',
      mutedForeground: 'hsl(220 20% 70%)',
      
      // Accent - Neon pink
      accent: 'hsl(329 100% 70%)',
      accentForeground: 'hsl(220 40% 8%)',
      
      // Destructive - Glowing red
      destructive: 'hsl(349 100% 65%)',
      destructiveForeground: 'hsl(220 40% 8%)',
      
      // Borders and inputs - Glass edges
      border: 'hsla(220 40% 50% / 0.2)',
      input: 'hsla(220 40% 50% / 0.15)',
      ring: 'hsl(259 100% 70%)',
      
      // Semantic colors - Neon glass
      success: 'hsl(149 100% 55%)',
      successForeground: 'hsl(220 40% 8%)',
      warning: 'hsl(39 100% 62%)',
      warningForeground: 'hsl(220 40% 8%)',
      info: 'hsl(189 100% 55%)',
      infoForeground: 'hsl(220 40% 8%)',
      
      // Chart colors - Neon gradient palette
      chart1: 'hsl(259 100% 70%)',      // Purple
      chart2: 'hsl(199 100% 65%)',      // Blue
      chart3: 'hsl(329 100% 70%)',      // Pink
      chart4: 'hsl(149 100% 55%)',      // Green
      chart5: 'hsl(39 100% 62%)',       // Gold
    }
  },
  typography: {
    fontFamily: {
      sans: ['SF Pro Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['SF Mono', 'Fira Code', 'Monaco', 'monospace'],
      heading: ['SF Pro Display', 'Inter', '-apple-system', 'sans-serif']
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
      relaxed: 1.65
    }
  },
  spacing: {
    borderRadius: {
      none: '0',
      sm: '0.5rem',     // 8px - Smooth glass edges
      md: '0.75rem',    // 12px
      lg: '1rem',       // 16px
      xl: '1.25rem',    // 20px
      full: '9999px'
    },
    spacing: {
      xs: '0.375rem',   // 6px
      sm: '0.75rem',    // 12px
      md: '1.25rem',    // 20px
      lg: '1.75rem',    // 28px
      xl: '2.5rem',     // 40px
      '2xl': '3.5rem'   // 56px
    }
  },
  effects: {
    shadows: {
      sm: '0 2px 8px 0 rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      md: '0 8px 16px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      lg: '0 16px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      xl: '0 24px 48px 0 rgba(0, 0, 0, 0.16), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
      '2xl': '0 32px 64px 0 rgba(0, 0, 0, 0.2), inset 0 2px 0 0 rgba(255, 255, 255, 0.14)',
      glow: '0 0 24px rgba(139, 92, 246, 0.3), 0 0 48px rgba(139, 92, 246, 0.1)'
    },
    blur: {
      sm: '8px',       // More blur for glass effect
      md: '12px',
      lg: '20px',
      xl: '30px'
    },
    animations: {
      duration: {
        fast: '0.25s',
        normal: '0.4s',
        slow: '0.6s'
      },
      easing: {
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',        // Smooth glass motion
        easeIn: 'cubic-bezier(0.43, 0.09, 0.83, 0.7)',
        easeOut: 'cubic-bezier(0.09, 0.43, 0.3, 1)',
        easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)'
      }
    }
  },
  custom: {
    glassmorphism: true,
    gradients: true
  }
}