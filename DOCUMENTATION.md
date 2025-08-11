# Radix UI Lab - Component Library Documentation

## Project Overview

Radix UI Lab is a sophisticated, production-ready component library built on Next.js 15 and React 19, featuring both standard and cyberpunk-themed components. The library provides 50+ highly customizable UI components with advanced theming capabilities, accessibility features, and stunning visual effects.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Component Library](#component-library)
5. [Theme System](#theme-system)
6. [Demo Pages](#demo-pages)
7. [Key Features](#key-features)
8. [Development Guide](#development-guide)

## Tech Stack

### Core Technologies
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5** - Type safety and better DX
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Libraries
- **Radix UI** - Unstyled, accessible component primitives (22+ components)
- **Lucide React** - Beautiful & consistent icon library
- **Class Variance Authority (CVA)** - Component variant management
- **Emotion** - CSS-in-JS for dynamic styling

### Form & Validation
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **Date-fns** - Modern JavaScript date utility library

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **LightningCSS** - Fast CSS transformer and minifier

## Project Structure

```
radix-ui-lab/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page (1000+ lines showcase)
│   ├── providers.tsx            # App-wide providers
│   ├── globals.css              # Global styles & Tailwind
│   └── [demo-pages]/            # 15+ demo page directories
├── components/
│   ├── ui/
│   │   └── primitives/          # 50+ UI components
│   │       ├── [standard]/      # Standard components (39)
│   │       └── [cyberpunk]/     # Cyberpunk variants (11)
│   ├── showcase/                # Component showcases
│   ├── navigation.tsx           # App navigation
│   └── theme-*.tsx              # Theme-related components
├── lib/
│   ├── hooks/
│   │   └── use-theme.tsx        # Theme management hook
│   ├── themes/                  # Theme definitions
│   ├── theme-config.ts          # Theme configuration
│   ├── theme.ts                 # Theme utilities
│   └── utils.ts                 # Helper functions
├── styles/
│   ├── animations.css           # Custom animations
│   └── cyberpunk.css            # Cyberpunk-specific styles
└── types/
    └── components.ts            # TypeScript definitions
```

## Getting Started

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd radix-ui-lab

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3010`

### Available Scripts

- `npm run dev` - Start development server (port 3010)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Component Library

### Standard Components (39 total)

#### Form Controls
- **Button** - Multiple variants (default, destructive, outline, ghost, link)
- **Input** - Text input with floating labels support
- **Select** - Dropdown with search, multi-select variants
- **Checkbox** - Single and group configurations
- **Radio** - Radio buttons and radio cards
- **Switch** - Toggle switches
- **Slider** - Range input with custom styling

#### Layout & Navigation
- **Card** - Content containers with header/footer
- **Navigation Menu** - Multi-level navigation
- **Tabs** - Tabbed content organization
- **Collapsible** - Expandable content sections

#### Overlays & Modals
- **Dialog** - Modal dialogs with multiple styles
- **Sheet** - Side panels
- **Drawer** - Bottom sheets
- **Popover** - Floating content panels
- **Tooltip** - Hover tooltips
- **Alert Dialog** - Confirmation dialogs
- **Context Menu** - Right-click menus
- **Dropdown Menu** - Action menus

#### Data Display
- **Data Table** - Advanced tables with sorting/filtering
- **Badge** - Status indicators
- **Progress** - Progress bars
- **Separator** - Visual dividers

#### Advanced Components
- **Command** - Command palette interface
- **Command Palette** - Searchable command menu
- **Toast** - Notification system
- **Calendar** - Date picker component
- **Date Picker** - Advanced date selection
- **Multi-Select** - Multiple selection dropdown

### Cyberpunk Variants (11 components)

Each cyberpunk variant includes:
- Neon glow effects
- Glitch animations
- Terminal-style aesthetics
- Sound effects (optional)
- Custom color schemes
- Scan line overlays

Available cyberpunk components:
- `button-cyberpunk`
- `card-cyberpunk`
- `checkbox-cyberpunk`
- `dialog-cyberpunk`
- `input-cyberpunk`
- `popover-cyberpunk`
- `radio-cyberpunk`
- `select-cyberpunk`
- `switch-cyberpunk`
- `tooltip-cyberpunk`

## Theme System

### Architecture

The theme system uses CSS variables for dynamic theming with real-time updates:

```typescript
// Theme structure
interface Theme {
  name: string
  colors: {
    background: string
    foreground: string
    primary: string
    secondary: string
    accent: string
    // ... more colors
  }
  fonts: {
    sans: string
    mono: string
  }
  radius: string
  spacing: string
}
```

### Available Themes

#### 1. Default Theme
- Clean, professional design
- Neutral color palette
- System/Inter fonts
- Smooth transitions

#### 2. Cyberpunk Theme
- Neon color schemes (blue, green, purple, orange, rose)
- Glitch effects and animations
- Monospace fonts (JetBrains Mono, Orbitron)
- Scan lines and noise overlays
- Terminal-style cursor effects

### Theme Customization

```tsx
// Using the theme hook
import { useTheme } from '@/lib/hooks/use-theme'

function Component() {
  const { theme, setTheme, toggleDarkMode } = useTheme()
  
  // Change theme
  setTheme('cyberpunk')
  
  // Toggle dark mode
  toggleDarkMode()
}
```

### CSS Variables

The theme system generates CSS variables dynamically:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --radius: 0.5rem;
  /* ... more variables */
}
```

## Demo Pages

### Component Demos
- `/button-demo` - Button variants showcase
- `/dialog-demo` - Dialog styles comparison
- `/select-demo` - Select component features
- `/table-demo` - Data table functionality
- `/form-builder` - Dynamic form creation
- `/toast-demo` - Toast notifications

### Theme Demos
- `/theme-demo` - Theme switching interface
- `/themes-demo` - All theme variations
- `/reset-theme` - Theme reset functionality

### Cyberpunk Showcases
- `/cyberpunk-buttons` - Neon button effects
- `/cyberpunk-buttons-simple` - Basic cyberpunk buttons
- `/cyberpunk-forms` - Futuristic form components
- `/cyberpunk-overlays` - Glitch overlay effects

### Development Tools
- `/playground` - Component testing sandbox
- `/components` - Component library overview
- `/docs` - Documentation viewer
- `/styling-comparison` - CSS approach comparison

## Key Features

### 1. Interactive Landing Page
The main landing page (`app/page.tsx`) features:
- 3D floating component showcase
- Custom cursor with interactive states
- Parallax scrolling effects
- Component builder with drag-and-drop
- Performance metrics dashboard
- Easter eggs (Konami code)
- Sound effects integration

### 2. Advanced Animations
20+ custom animations including:
- Glitch effects (text, RGB, screen tear)
- Neon pulses and glows
- Terminal cursor blinks
- Matrix-style falling text
- Scan line overlays
- LED indicator patterns

### 3. Accessibility Features
- Full ARIA support
- Keyboard navigation
- Screen reader compatibility
- Focus management
- High contrast modes
- Reduced motion support

### 4. Performance Optimizations
- CSS transform animations
- React.memo optimization
- Dynamic imports
- CSS variable theming
- Efficient re-rendering

## Development Guide

### Creating a New Component

1. Create component file in `components/ui/primitives/`:

```tsx
// components/ui/primitives/my-component.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const myComponentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        md: "medium-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants }
```

2. Export from index file:

```tsx
// components/ui/primitives/index.ts
export * from './my-component'
```

3. Create demo page:

```tsx
// app/my-component-demo/page.tsx
import { MyComponent } from "@/components/ui/primitives"

export default function MyComponentDemo() {
  return (
    <div className="container mx-auto p-8">
      <h1>My Component Demo</h1>
      <MyComponent variant="default" size="md">
        Content
      </MyComponent>
    </div>
  )
}
```

### Adding Cyberpunk Variant

1. Create cyberpunk version:

```tsx
// components/ui/primitives/my-component-cyberpunk.tsx
import { MyComponent } from "./my-component"

export function MyComponentCyberpunk(props) {
  return (
    <div className="cyberpunk-wrapper">
      <div className="scanlines" />
      <div className="glitch" data-text={props.children}>
        <MyComponent 
          {...props} 
          className={cn("neon-glow", props.className)}
        />
      </div>
    </div>
  )
}
```

2. Add cyberpunk styles:

```css
/* styles/cyberpunk.css */
.cyberpunk-wrapper {
  position: relative;
  /* Add effects */
}
```

### Theme Integration

Components automatically adapt to the current theme through CSS variables:

```css
.my-component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border-radius: var(--radius);
}
```

## Best Practices

1. **Component Design**
   - Keep components focused and single-purpose
   - Use composition over configuration
   - Provide sensible defaults
   - Document all props

2. **Accessibility**
   - Include ARIA labels
   - Support keyboard navigation
   - Test with screen readers
   - Provide focus indicators

3. **Performance**
   - Use React.memo for expensive components
   - Lazy load heavy components
   - Optimize animations with transforms
   - Minimize re-renders

4. **Testing**
   - Test all component variants
   - Verify accessibility features
   - Check responsive behavior
   - Validate form inputs

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change port in package.json scripts
   - Or kill the process using the port

2. **Module not found errors**
   - Clear .next cache: `rm -rf .next`
   - Reinstall dependencies: `npm install`

3. **Theme not applying**
   - Check providers are wrapped correctly
   - Verify CSS variables are loading
   - Clear browser cache

4. **Build errors**
   - Update TypeScript definitions
   - Check for circular dependencies
   - Verify all imports are correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests
5. Update documentation
6. Submit a pull request

## License

[Add license information]

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review demo pages for examples

---

Built with ❤️ using Next.js, Radix UI, and Tailwind CSS