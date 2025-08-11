# Component Library Structure

## Folder Organization

```
components/
├── ui/
│   └── primitives/       # Wrapped Radix UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── dropdown.tsx
│       └── ...
├── showcase/            # Demo examples for each component
│   ├── button-showcase.tsx
│   ├── dialog-showcase.tsx
│   └── ...
└── README.md
```

## Component Pattern

Each primitive component follows this pattern:

### 1. Import Required Dependencies
```tsx
import * as React from 'react'
import * as RadixPrimitive from '@radix-ui/react-[component]'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
```

### 2. Define Variants (if applicable)
```tsx
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { /* ... */ },
      size: { /* ... */ }
    },
    defaultVariants: { /* ... */ }
  }
)
```

### 3. Create Component with ForwardRef
```tsx
const Component = React.forwardRef<
  React.ElementRef<typeof RadixPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadixPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadixPrimitive.Root
    ref={ref}
    className={cn("base-styles", className)}
    {...props}
  />
))
Component.displayName = "Component"
```

## Available Components

### Primitives (`/ui/primitives`)
- **Button** - Versatile button with variants and sizes
- **Dialog** - Modal dialog with overlay
- **Dropdown** - Dropdown menu with keyboard navigation
- **Select** - Custom select input
- **Tabs** - Tab navigation
- **Accordion** - Collapsible panels
- **Popover** - Floating content
- **Tooltip** - Hover tooltips
- **Switch** - Toggle switches
- **Checkbox** - Checkbox inputs
- **RadioGroup** - Radio button groups
- **Slider** - Range sliders
- **Progress** - Progress indicators
- **AlertDialog** - Confirmation dialogs
- **ContextMenu** - Right-click menus
- **NavigationMenu** - Navigation menus
- **Toggle** - Toggle buttons
- **ToggleGroup** - Grouped toggles
- **Separator** - Visual separators
- **ScrollArea** - Custom scrollbars
- **Toast** - Toast notifications

### Showcase (`/showcase`)
Demo components showing usage examples for each primitive.

## TypeScript Types

Common types are defined in `/types/components.ts`:
- `ComponentSize` - sm | md | lg
- `ComponentVariant` - default | secondary | destructive | outline | ghost | link
- `BaseComponentProps` - Base props for all components
- `PropsWithAsChild` - Props for polymorphic components

## Styling

- Uses Tailwind CSS classes
- Custom animations in `/styles/animations.css`
- Theme tokens in `/lib/theme.ts`
- `cn()` utility for className merging

## Usage Example

```tsx
import { Button } from '@/components/ui/primitives/button'

export function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  )
}
```