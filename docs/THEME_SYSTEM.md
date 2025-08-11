# Radix UI Lab - Advanced Theme System Documentation

## Overview

The enhanced theme system provides a comprehensive, scalable solution for managing visual themes in your Radix UI Lab component library. It features runtime theme switching, CSS variable generation, type-safe theme creation, and seamless Tailwind CSS integration.

## Core Features

### 1. Multiple Professional Themes
- **Default**: Clean, modern design suitable for most applications
- **Minimal**: Sophisticated with generous whitespace and subtle elegance
- **Glassmorphism**: Modern frosted glass aesthetic with transparency and blur effects
- **Cyberpunk**: Neon colors, glitch effects, and futuristic tech aesthetic
- **Brutalism**: Bold, raw design with sharp edges and strong contrasts

### 2. Runtime Theme Switching
- Instant theme changes without page reload
- Smooth transitions between themes
- Persistent theme preferences (localStorage)
- System preference detection for dark/light mode

### 3. Dark/Light Mode Support
- Each theme includes both light and dark variants
- System preference detection
- Manual mode override
- Automatic CSS variable switching

## Architecture

### Theme Structure

```typescript
interface Theme {
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
    glassmorphism?: boolean
    gradients?: boolean
  }
}
```

### Key Components

1. **ThemeProvider** (`components/ui/theme-provider.tsx`)
   - React context provider for theme state
   - Handles theme persistence and switching
   - Manages dark/light mode detection

2. **ThemeManager** (`lib/themes/theme-system.ts`)
   - Core theme management class
   - CSS variable generation
   - Theme validation and registration

3. **Theme Definitions** (`lib/themes/`)
   - Individual theme files with complete token definitions
   - Consistent structure for easy extension

## Usage

### Basic Setup

```tsx
import { ThemeProvider } from '@/components/ui/theme-provider'

function App() {
  return (
    <ThemeProvider 
      defaultTheme="minimal"
      defaultMode="system"
      enableTransitions={true}
    >
      {/* Your app content */}
    </ThemeProvider>
  )
}
```

### Using the Theme Hook

```tsx
import { useTheme } from '@/components/ui/theme-provider'

function MyComponent() {
  const { theme, themeId, mode, setTheme, setMode } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme?.name}</p>
      <button onClick={() => setTheme('glassmorphism')}>
        Switch to Glassmorphism
      </button>
      <button onClick={() => setMode('dark')}>
        Dark Mode
      </button>
    </div>
  )
}
```

### Theme Switcher Components

#### Compact Switcher
```tsx
import { ThemeSwitcherAdvanced } from '@/components/ui/theme-switcher-advanced'

<ThemeSwitcherAdvanced compact />
```

#### Full Switcher with Previews
```tsx
<ThemeSwitcherAdvanced 
  showLabels={true}
  showPreviews={true}
  compact={false}
/>
```

## Creating New Themes

### Method 1: Define a Complete Theme

```typescript
// lib/themes/my-theme.ts
import { Theme } from './index'

export const myTheme: Theme = {
  id: 'my-theme',
  name: 'My Custom Theme',
  colors: {
    light: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(0 0% 9%)',
      primary: 'hsl(262 83% 58%)',
      // ... all color tokens
    },
    dark: {
      background: 'hsl(0 0% 7%)',
      foreground: 'hsl(0 0% 95%)',
      primary: 'hsl(263 70% 50%)',
      // ... all color tokens
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
      heading: ['Inter', 'sans-serif']
    },
    // ... typography settings
  },
  spacing: {
    // ... spacing settings
  },
  effects: {
    // ... effects settings
  }
}

// Register the theme
import { themes } from './index'
themes['my-theme'] = myTheme
```

### Method 2: Use the Theme Creator Hook

```tsx
import { useThemeCreator } from '@/hooks/use-theme-creator'

function ThemeBuilder() {
  const { 
    theme, 
    createFromColor, 
    createFromBrand,
    updateThemeProperty,
    exportTheme 
  } = useThemeCreator()
  
  // Create theme from a single color
  const handleColorSelect = (color: string) => {
    createFromColor(color, 'My Color Theme')
  }
  
  // Create theme from brand colors
  const handleBrandCreate = () => {
    createFromBrand(
      'hsl(259 100% 65%)', // Primary
      'hsl(199 100% 60%)', // Secondary
      { 
        name: 'My Brand',
        style: 'modern' 
      }
    )
  }
  
  // Update specific properties
  const handleRadiusChange = (radius: string) => {
    updateThemeProperty('spacing.borderRadius.md', radius)
  }
  
  return (
    <div>
      {/* Theme builder UI */}
      <button onClick={exportTheme}>Export Theme</button>
    </div>
  )
}
```

## CSS Variables

The theme system automatically generates CSS variables for all theme tokens:

### Color Variables
```css
--background: hsl(0 0% 100%);
--foreground: hsl(0 0% 9%);
--primary: hsl(262 83% 58%);
--primary-foreground: hsl(0 0% 100%);
/* ... etc */
```

### Typography Variables
```css
--font-sans: 'Inter', sans-serif;
--font-mono: 'Fira Code', monospace;
--font-heading: 'Inter', sans-serif;
```

### Spacing Variables
```css
--radius-sm: 0.125rem;
--radius-md: 0.375rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
```

### Using in CSS
```css
.my-component {
  background: var(--background);
  color: var(--foreground);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}
```

### Using with Tailwind
```jsx
<div className="bg-background text-foreground rounded-md p-4">
  Content
</div>
```

## Theme Features

### Glassmorphism Effect
```css
.glass-surface {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Neon Glow Effect
```css
.neon-glow {
  text-shadow: 
    0 0 10px currentColor,
    0 0 20px currentColor,
    0 0 30px currentColor;
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Accessibility

### Contrast Validation
The theme system includes built-in contrast validation:

```typescript
import { ThemeValidator } from '@/lib/themes/theme-system'

const validation = ThemeValidator.validateTheme(myTheme)
if (!validation.valid) {
  console.error('Theme validation errors:', validation.errors)
}
if (validation.warnings.length > 0) {
  console.warn('Theme warnings:', validation.warnings)
}
```

### WCAG Compliance
- All themes are tested for WCAG AA compliance
- Primary text combinations meet 4.5:1 contrast ratio
- Large text meets 3:1 contrast ratio
- Interactive elements have sufficient contrast

## Performance Optimization

### Transition Management
```tsx
<ThemeProvider
  enableTransitions={true}
  transitionDuration={300}
>
```

### Lazy Loading Themes
```typescript
const loadTheme = async (themeId: string) => {
  const module = await import(`@/lib/themes/${themeId}-theme`)
  themeManager.registerTheme(module.default)
}
```

### CSS Variable Scoping
Themes only update relevant CSS variables, minimizing reflow and repaint.

## Best Practices

### 1. Theme Naming Convention
- Use lowercase with hyphens: `my-theme-name`
- Be descriptive: `ocean-breeze` not `theme-1`

### 2. Color Token Naming
- Use semantic names: `primary`, `secondary`, `accent`
- Include state variants: `primary-hover`, `primary-active`
- Provide foreground colors for all backgrounds

### 3. Testing Themes
- Test in both light and dark modes
- Verify contrast ratios
- Check all component states
- Test on different screen sizes

### 4. Documentation
- Document color decisions
- Explain the theme's intended use case
- Provide usage examples

## Extending the System

### Adding Custom Properties
```typescript
interface CustomThemeProperties {
  animations?: {
    glitch?: boolean
    parallax?: boolean
  }
  layouts?: {
    compact?: boolean
    spacious?: boolean
  }
}

// Extend the Theme interface
interface ExtendedTheme extends Theme {
  custom: CustomThemeProperties
}
```

### Creating Theme Variants
```typescript
const createVariant = (baseTheme: Theme, modifications: Partial<Theme>): Theme => {
  return {
    ...baseTheme,
    ...modifications,
    id: `${baseTheme.id}-variant`,
    name: `${baseTheme.name} Variant`
  }
}
```

## Troubleshooting

### Theme Not Applying
1. Ensure ThemeProvider wraps your app
2. Check localStorage for conflicting values
3. Verify theme ID matches registered themes

### Flash of Unstyled Content
- The system includes a script that applies theme before React hydration
- Ensure the ThemeProvider is high in your component tree

### Performance Issues
- Disable transitions during rapid theme switching
- Use CSS containment for complex themed components
- Consider lazy loading heavy themes

## API Reference

### ThemeProvider Props
```typescript
interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  defaultMode?: 'light' | 'dark' | 'system'
  storageKey?: string
  enableTransitions?: boolean
  transitionDuration?: number
}
```

### useTheme Hook
```typescript
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
```

### ThemeManager Methods
```typescript
class ThemeManager {
  setTheme(themeId: string): void
  setMode(mode: 'light' | 'dark' | 'system'): void
  registerTheme(theme: Theme): void
  unregisterTheme(themeId: string): void
  getAvailableThemes(): Theme[]
  getCurrentTheme(): Theme | undefined
  getCurrentMode(): 'light' | 'dark'
  subscribe(listener: Function): () => void
}
```

## Examples

### Complete Implementation
```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/ui/theme-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultTheme="minimal"
          defaultMode="system"
          enableTransitions={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// app/page.tsx
import { ThemeSwitcherAdvanced } from '@/components/ui/theme-switcher-advanced'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b border-border">
        <ThemeSwitcherAdvanced compact />
      </header>
      <main className="p-8">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Radix UI Lab
        </h1>
        <p className="mt-4 text-muted-foreground">
          Experience beautiful, accessible components with our advanced theme system.
        </p>
        <div className="mt-8 p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Theme Features
          </h2>
          <div className="grid gap-4">
            <div className="p-4 bg-primary/10 rounded-md">
              Primary accent
            </div>
            <div className="p-4 bg-secondary rounded-md text-secondary-foreground">
              Secondary surface
            </div>
            <div className="p-4 glass-surface rounded-md">
              Glass morphism effect
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
```

## Conclusion

The Radix UI Lab theme system provides a powerful, flexible foundation for creating beautiful, accessible user interfaces. With its comprehensive token system, runtime switching capabilities, and extensive customization options, you can create unique visual experiences while maintaining consistency and accessibility standards.