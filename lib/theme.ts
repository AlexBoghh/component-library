export const theme = {
  colors: {
    primary: {
      DEFAULT: 'hsl(var(--color-primary))',
      foreground: 'hsl(var(--color-primary-foreground))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--color-secondary))',
      foreground: 'hsl(var(--color-secondary-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--color-accent))',
      foreground: 'hsl(var(--color-accent-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--color-muted))',
      foreground: 'hsl(var(--color-muted-foreground))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--color-destructive))',
      foreground: 'hsl(var(--color-destructive-foreground))',
    },
    background: 'hsl(var(--color-background))',
    foreground: 'hsl(var(--color-foreground))',
    card: {
      DEFAULT: 'hsl(var(--color-card))',
      foreground: 'hsl(var(--color-card-foreground))',
    },
    popover: {
      DEFAULT: 'hsl(var(--color-popover))',
      foreground: 'hsl(var(--color-popover-foreground))',
    },
    border: 'hsl(var(--color-border))',
    input: 'hsl(var(--color-input))',
    ring: 'hsl(var(--color-ring))',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
  },
  animation: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

export type Theme = typeof theme