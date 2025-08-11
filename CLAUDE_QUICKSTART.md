# Claude Code Quick Start - Radix UI Lab

## 🚀 Session Setup (Start Here Every Time)

### 1. Start Development Server
```bash
cd "E:\My Web Projects\Component library\radix-ui-lab"
npm run dev
```
- Server runs on **http://localhost:3010**
- If port is busy, use: `npx next dev -p 3011` (or any available port)

### 2. Common Issues & Fixes
- **Webpack/favicon error**: Delete `app/favicon.ico` and restart
- **Port already in use**: Use a different port or kill the process
- **Module errors**: Clear cache with `rm -rf .next` and restart

## 📦 What Is This Project?

**Radix UI Lab** - A premium component library with multiple themed variants (currently Default + Cyberpunk, expanding to more themes).

### Core Purpose
- **Component Library**: 50+ reusable UI components
- **Multi-Theme System**: Each component has multiple themed versions
- **Showcase Platform**: Interactive demos and documentation
- **Theme Laboratory**: Testing ground for new design systems

## 🎨 Current Themes & Upcoming Work

### Existing Themes
1. **Default Theme** - Clean, professional, minimal
2. **Cyberpunk Theme** - Neon, glitch effects, terminal aesthetics

### Planned Themes (To Be Added)
- **Glassmorphism** - Frosted glass, blur effects, transparency
- **Neubrutalism** - Bold borders, stark contrasts, playful
- **Aurora/Northern Lights** - Gradient flows, soft glows
- **Retro/Synthwave** - 80s aesthetics, sunset gradients
- **Minimalist** - Ultra-clean, maximum whitespace
- **Dark Pro** - Developer-focused dark theme
- **Nature/Organic** - Soft edges, earth tones
- **Space/Cosmic** - Stars, nebulas, deep space vibes

## 📁 Key Files & Locations

### When Adding New Themes

**Component Locations**:
```
components/ui/primitives/
├── button.tsx              # Standard component
├── button-cyberpunk.tsx    # Cyberpunk variant
├── button-[newtheme].tsx   # Your new theme variant
```

**Theme Files**:
```
lib/
├── themes/                 # Theme definitions
│   ├── index.ts           # Export all themes
│   ├── default.ts         # Default theme
│   ├── cyberpunk.ts       # Cyberpunk theme
│   └── [newtheme].ts      # Add new theme here
styles/
├── cyberpunk.css          # Cyberpunk-specific styles
└── [newtheme].css         # Add new theme styles
```

**Demo Pages**:
```
app/
├── [theme]-buttons/       # Theme-specific demos
├── [theme]-forms/
└── [theme]-overlays/
```

## 🛠️ Working Commands

### Development
```bash
npm run dev          # Start dev server (port 3010)
npm run build        # Build for production
npm run lint         # Check code quality
```

### Quick Component Testing
1. Go to **http://localhost:3010/playground** - Interactive component testing
2. Visit **http://localhost:3010/components** - Component overview
3. Check **http://localhost:3010/themes-demo** - Theme comparison

## 📝 Adding a New Theme - Quick Guide

### Step 1: Create Theme Definition
```typescript
// lib/themes/mytheme.ts
export const myTheme = {
  name: "mytheme",
  colors: {
    background: "...",
    foreground: "...",
    primary: "...",
    // ... all color definitions
  },
  fonts: {
    sans: "...",
    mono: "..."
  },
  effects: {
    // Theme-specific effects
  }
}
```

### Step 2: Create Themed Component
```typescript
// components/ui/primitives/button-mytheme.tsx
import { Button } from "./button"

export function ButtonMyTheme(props) {
  return (
    <div className="mytheme-wrapper">
      <Button {...props} className={cn("mytheme-button", props.className)} />
      {/* Add theme-specific effects/wrappers */}
    </div>
  )
}
```

### Step 3: Add Theme Styles
```css
/* styles/mytheme.css */
.mytheme-wrapper {
  /* Theme-specific styles */
}

.mytheme-button {
  /* Button-specific theme styles */
}
```

### Step 4: Create Demo Page
```typescript
// app/mytheme-demo/page.tsx
export default function MyThemeDemo() {
  return (
    <div>
      {/* Showcase all components in new theme */}
    </div>
  )
}
```

## 🎯 Current Focus Areas

### Priority Components for New Themes
1. **Button** - Most used, needs all theme variants
2. **Card** - Container component, sets theme tone
3. **Input/Form** - Critical for user interaction
4. **Dialog/Modal** - Overlay effects showcase
5. **Select/Dropdown** - Complex interaction patterns

### Theme Requirements Checklist
- [ ] Color palette (background, foreground, primary, secondary, accent)
- [ ] Typography (fonts, sizes, weights)
- [ ] Spacing system
- [ ] Border radius values
- [ ] Shadow/elevation system
- [ ] Animation/transition styles
- [ ] Special effects (if any)
- [ ] Sound effects (optional)
- [ ] Accessibility considerations

## 💡 Quick Tips

### Performance
- Test animations at 60fps
- Use CSS transforms over position changes
- Lazy load heavy theme assets
- Keep bundle size under control

### Consistency
- Each theme should support ALL components
- Maintain same prop interfaces across themes
- Document theme-specific features
- Provide migration guides between themes

### Testing New Themes
1. Start with button component (simplest)
2. Test in both light/dark modes
3. Check responsive breakpoints
4. Verify accessibility (contrast ratios)
5. Test animations/transitions
6. Cross-browser testing

## 🔥 Quick Component Creation

### Fastest way to create themed component:
```bash
# 1. Copy existing themed component as template
# 2. Rename and modify for new theme
# 3. Test in playground
# 4. Add to demo page
```

## 📚 Resources

- **Main Docs**: `DOCUMENTATION.md`
- **Component Playground**: http://localhost:3010/playground
- **Theme Customizer**: http://localhost:3010/theme-demo
- **All Demos**: http://localhost:3010 (landing page)

## 🎪 Fun Features to Show Off

- **Konami Code** on landing page: ↑↑↓↓←→←→BA
- **3D Floating Components** on main page
- **Drag-and-drop builder** in component section
- **Sound effects** in cyberpunk theme (hover/click)
- **Glitch effects** in cyberpunk components
- **Performance metrics** dashboard on landing

## 🚧 Known Issues / TODOs

- Favicon.ico causes webpack errors (delete it)
- Some cyberpunk animations may be CPU intensive
- Theme switching can have brief flash
- Mobile responsive needs testing for some themes

## 💬 Session Context for Claude

When starting a session, tell Claude:
1. "We're working on the Radix UI Lab component library"
2. "We're adding new themes beyond default and cyberpunk"
3. "Focus on [specific theme name] theme today"
4. Any specific components or features to work on

## 🎨 Theme Development Workflow

1. **Research Phase**: Gather inspiration, create mood board
2. **Design Tokens**: Define colors, typography, spacing
3. **Base Components**: Start with button, card, input
4. **Effects Layer**: Add theme-specific animations/effects
5. **Demo Creation**: Build showcase page
6. **Testing**: Cross-browser, accessibility, performance
7. **Documentation**: Update docs with new theme

---

**Quick Start Summary**:
```bash
cd "E:\My Web Projects\Component library\radix-ui-lab"
npm run dev
# Open http://localhost:3010
# Start theming! 🎨
```

**Remember**: This is a theme laboratory - experiment, be creative, and have fun with it!