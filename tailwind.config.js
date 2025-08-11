/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Safelist commonly used dynamic classes
  safelist: [
    // Animation classes
    'animate-elastic-in',
    'animate-spring-bounce',
    'animate-morph-expand',
    'animate-glass-emerge',
    'animate-particle-float',
    'animate-skeleton-shimmer',
    'animate-theme-flip',
    // Theme colors that might be dynamically applied
    {
      pattern: /^(bg|text|border|ring)-(primary|secondary|accent|destructive|muted)(-\d+)?$/,
      variants: ['hover', 'focus', 'active', 'dark'],
    },
  ],
  // Enable JIT mode for better performance
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Advanced animations
        'elastic-in': {
          '0%': {
            transform: 'scale(0) rotate(180deg)',
            opacity: '0',
          },
          '60%': {
            transform: 'scale(1.2) rotate(-10deg)',
            opacity: '1',
          },
          '80%': {
            transform: 'scale(0.95) rotate(5deg)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
          },
        },
        'spring-bounce': {
          '0%': {
            transform: 'translateY(-100%) scale(0.3)',
            opacity: '0',
          },
          '50%': {
            transform: 'translateY(-50%) scale(1.05)',
            opacity: '0.8',
          },
          '70%': {
            transform: 'translateY(-10%) scale(0.95)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(0%) scale(1)',
            opacity: '1',
          },
        },
        'morph-expand': {
          '0%': {
            borderRadius: '50%',
            transform: 'scale(0.1)',
            opacity: '0',
          },
          '50%': {
            borderRadius: '25%',
            transform: 'scale(1.05)',
            opacity: '0.8',
          },
          '100%': {
            borderRadius: 'var(--radius, 0.375rem)',
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'glass-emerge': {
          '0%': {
            opacity: '0',
            backdropFilter: 'blur(0px)',
            transform: 'scale(0.9) translateY(20px)',
            background: 'rgba(255, 255, 255, 0)',
          },
          '50%': {
            backdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, 0.05)',
          },
          '100%': {
            opacity: '1',
            backdropFilter: 'blur(12px)',
            transform: 'scale(1) translateY(0px)',
            background: 'rgba(255, 255, 255, 0.1)',
          },
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(100vh) translateX(0) scale(0)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100vh) translateX(200px) scale(1)',
            opacity: '0',
          },
        },
        'skeleton-shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        'theme-flip': {
          '0%': {
            transform: 'perspective(800px) rotateY(0deg)',
          },
          '50%': {
            transform: 'perspective(800px) rotateY(-90deg)',
          },
          '100%': {
            transform: 'perspective(800px) rotateY(0deg)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Advanced animations
        'elastic-in': 'elastic-in 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spring-bounce': 'spring-bounce 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'morph-expand': 'morph-expand 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'glass-emerge': 'glass-emerge 600ms cubic-bezier(0.23, 1, 0.320, 1)',
        'particle-float': 'particle-float 8s linear infinite',
        'skeleton-shimmer': 'skeleton-shimmer 2s ease-in-out infinite',
        'theme-flip': 'theme-flip 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        // Utility animations
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Custom plugin for optimized utilities
    function({ addUtilities, addBase, theme }) {
      // Add GPU acceleration utilities
      addUtilities({
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.transform-3d': {
          transformStyle: 'preserve-3d',
        },
      });
      
      // Add performance-optimized base styles
      addBase({
        '*': {
          scrollbarGutter: 'stable',
        },
        'img, video': {
          maxWidth: '100%',
          height: 'auto',
          verticalAlign: 'middle',
        },
        // Optimize font loading
        '@font-face': {
          fontDisplay: 'swap',
        },
      });
    },
  ],
  // Future flags for upcoming features
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
  },
}