/**
 * Brutalism Theme Configuration
 * Raw, powerful, and unapologetically bold design tokens
 */

export const brutalismTheme = {
  name: 'brutalism',
  
  // Color palette - harsh contrasts, no gradients
  colors: {
    // Primary colors - bold and aggressive
    primary: {
      DEFAULT: 'hsl(45, 100%, 51%)', // Bright yellow
      foreground: 'hsl(0, 0%, 0%)', // Pure black
      hover: 'hsl(45, 100%, 45%)',
      active: 'hsl(45, 100%, 40%)',
    },
    
    // Secondary colors - industrial concrete
    secondary: {
      DEFAULT: 'hsl(0, 0%, 80%)', // Light gray
      foreground: 'hsl(0, 0%, 0%)',
      hover: 'hsl(0, 0%, 70%)',
      active: 'hsl(0, 0%, 60%)',
    },
    
    // Accent colors - danger red
    accent: {
      DEFAULT: 'hsl(0, 100%, 50%)', // Pure red
      foreground: 'hsl(0, 0%, 100%)',
      hover: 'hsl(0, 100%, 45%)',
      active: 'hsl(0, 100%, 40%)',
    },
    
    // Background colors - stark contrasts
    background: {
      DEFAULT: 'hsl(0, 0%, 95%)', // Off-white
      secondary: 'hsl(0, 0%, 100%)', // Pure white
      tertiary: 'hsl(0, 0%, 85%)', // Light gray
    },
    
    // Foreground colors
    foreground: {
      DEFAULT: 'hsl(0, 0%, 0%)', // Pure black
      secondary: 'hsl(0, 0%, 20%)', // Dark gray
      muted: 'hsl(0, 0%, 40%)', // Medium gray
    },
    
    // Destructive colors - warning orange
    destructive: {
      DEFAULT: 'hsl(25, 100%, 50%)', // Orange
      foreground: 'hsl(0, 0%, 0%)',
      hover: 'hsl(25, 100%, 45%)',
      active: 'hsl(25, 100%, 40%)',
    },
    
    // Border colors - thick and visible
    border: {
      DEFAULT: 'hsl(0, 0%, 0%)', // Black borders
      secondary: 'hsl(0, 0%, 50%)', // Gray borders
      accent: 'hsl(45, 100%, 51%)', // Yellow borders
    },
    
    // Special brutalism colors
    concrete: 'hsl(0, 0%, 70%)', // Concrete gray
    steel: 'hsl(210, 10%, 40%)', // Steel blue-gray
    rust: 'hsl(15, 80%, 40%)', // Rust orange
    industrial: 'hsl(120, 5%, 35%)', // Industrial green
  },
  
  // Typography - bold and imposing
  typography: {
    fonts: {
      heading: '"Arial Black", "Helvetica Bold", sans-serif',
      body: '"Arial", "Helvetica", sans-serif',
      mono: '"Courier New", "Courier", monospace',
    },
    
    weights: {
      normal: '400',
      bold: '900', // Extra bold
      black: '900',
    },
    
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3.5rem',
      '5xl': '5rem',
    },
    
    letterSpacing: {
      tight: '-0.05em',
      normal: '0',
      wide: '0.1em',
      wider: '0.2em',
      widest: '0.3em',
    },
    
    lineHeight: {
      tight: '1',
      normal: '1.2',
      relaxed: '1.4',
    },
  },
  
  // Spacing - chunky and decisive
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  
  // Borders - thick and prominent
  borders: {
    width: {
      none: '0',
      DEFAULT: '4px',
      thin: '2px',
      thick: '8px',
      massive: '12px',
    },
    
    radius: {
      none: '0', // No rounded corners in brutalism
      sm: '0',
      md: '0',
      lg: '0',
      full: '0',
    },
    
    style: {
      solid: 'solid',
      double: 'double',
      dotted: 'dotted',
      dashed: 'dashed',
    },
  },
  
  // Shadows - harsh and offset
  shadows: {
    none: 'none',
    sm: '2px 2px 0px rgba(0, 0, 0, 1)',
    md: '4px 4px 0px rgba(0, 0, 0, 1)',
    lg: '8px 8px 0px rgba(0, 0, 0, 1)',
    xl: '12px 12px 0px rgba(0, 0, 0, 1)',
    '2xl': '16px 16px 0px rgba(0, 0, 0, 1)',
    
    // Colored shadows
    yellow: '6px 6px 0px hsl(45, 100%, 51%)',
    purple: '6px 6px 0px hsl(260, 100%, 65%)',
    cyan: '6px 6px 0px hsl(180, 100%, 40%)',
    black: '6px 6px 0px rgba(0, 0, 0, 1)',
    
    // Inset shadows for pressed effect
    inset: 'inset 3px 3px 0px rgba(0, 0, 0, 0.5)',
    'inset-lg': 'inset 6px 6px 0px rgba(0, 0, 0, 0.5)',
  },
  
  // Transitions - no smooth transitions in brutalism
  transitions: {
    duration: {
      instant: '0ms',
      fast: '0ms',
      normal: '0ms',
      slow: '0ms',
    },
    
    timing: {
      linear: 'linear',
      ease: 'linear', // No easing
      'ease-in': 'linear',
      'ease-out': 'linear',
      'ease-in-out': 'linear',
    },
  },
  
  // Z-index layers
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    modal: '1200',
    popover: '1300',
    tooltip: '1400',
    notification: '1500',
  },
}

// CSS Variables for brutalism theme
export const brutalismCSSVariables = `
  /* Brutalism Theme Variables */
  [data-theme="brutalism"] {
    /* Colors */
    --color-background: 240 240 240;
    --color-foreground: 0 0 0;
    --color-card: 255 255 255;
    --color-card-foreground: 0 0 0;
    --color-popover: 255 255 255;
    --color-popover-foreground: 0 0 0;
    --color-primary: 255 204 0;
    --color-primary-foreground: 0 0 0;
    --color-secondary: 204 204 204;
    --color-secondary-foreground: 0 0 0;
    --color-muted: 179 179 179;
    --color-muted-foreground: 51 51 51;
    --color-accent: 255 0 0;
    --color-accent-foreground: 255 255 255;
    --color-destructive: 255 128 0;
    --color-destructive-foreground: 0 0 0;
    --color-border: 0 0 0;
    --color-input: 0 0 0;
    --color-ring: 255 204 0;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    
    /* Borders */
    --border-width: 4px;
    --border-radius: 0;
    
    /* Shadows */
    --shadow-sm: 2px 2px 0px rgba(0, 0, 0, 1);
    --shadow-md: 4px 4px 0px rgba(0, 0, 0, 1);
    --shadow-lg: 8px 8px 0px rgba(0, 0, 0, 1);
    --shadow-xl: 12px 12px 0px rgba(0, 0, 0, 1);
    
    /* Typography */
    --font-sans: "Arial Black", "Helvetica Bold", sans-serif;
    --font-mono: "Courier New", "Courier", monospace;
    --font-weight-normal: 400;
    --font-weight-bold: 900;
    --font-weight-black: 900;
    
    /* No transitions in brutalism */
    --transition-duration: 0ms;
  }
`

// Brutalism-specific utility classes
export const brutalismUtilities = `
  /* Brutalism Utility Classes */
  .brutalism-border {
    border: var(--border-width) solid var(--color-border);
  }
  
  .brutalism-shadow {
    box-shadow: var(--shadow-md);
  }
  
  .brutalism-shadow-lg {
    box-shadow: var(--shadow-lg);
  }
  
  .brutalism-shadow-xl {
    box-shadow: var(--shadow-xl);
  }
  
  .brutalism-shadow-yellow {
    box-shadow: 6px 6px 0px hsl(45, 100%, 51%);
  }
  
  .brutalism-shadow-red {
    box-shadow: 6px 6px 0px hsl(0, 100%, 50%);
  }
  
  .brutalism-text-shadow {
    text-shadow: 3px 3px 0px rgba(0, 0, 0, 1);
  }
  
  .brutalism-hover-lift:hover {
    transform: translate(-2px, -2px);
    box-shadow: 10px 10px 0px rgba(0, 0, 0, 1);
  }
  
  .brutalism-hover-press:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 1);
  }
  
  .brutalism-active-press:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
  
  /* No smooth transitions */
  .brutalism-no-transition {
    transition: none !important;
  }
  
  /* Uppercase text */
  .brutalism-uppercase {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 900;
  }
  
  /* Brutal grid */
  .brutalism-grid {
    display: grid;
    gap: 0;
    border: 4px solid black;
  }
  
  .brutalism-grid > * {
    border: 4px solid black;
    margin: -2px;
  }
`

// Export all brutalism theme configurations
export default {
  theme: brutalismTheme,
  cssVariables: brutalismCSSVariables,
  utilities: brutalismUtilities,
}