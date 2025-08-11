/**
 * Radix UI Lab - Main Component Library Exports
 * 
 * Central barrel file for all UI components, organized by category.
 * This provides a clean import interface for consumers.
 */

// Re-export all primitives
export * from './primitives'

// Utility Components
export { ThemeProvider } from './theme-provider'
export { ThemeSwitcher } from './theme-switcher'
export { ThemeSwitcherAdvanced } from './theme-switcher-advanced'
export { Toaster } from './toaster'
export { useToast } from './use-toast'

// Form Components
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from './form'
export { FloatingInput } from './floating-input'
export { RadioCards } from './radio-cards'
export { SearchableSelect } from './searchable-select'
export { CheckboxGroup } from './checkbox-group'

// Date/Time Components
export { Calendar } from './calendar'
export { DatePicker } from './date-picker'

// Neubrutalism Components
export { NeubrutalismComponents } from './neubrutalism'

// Dialog Styling Variants
export { DialogCSSModules } from './dialog-styles/dialog-css-modules'
export { DialogEmotion } from './dialog-styles/dialog-emotion'
export { DialogInlineStyles } from './dialog-styles/dialog-inline-styles'
export { DialogTailwind } from './dialog-styles/dialog-tailwind'