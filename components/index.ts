/**
 * Radix UI Lab - Main Component Exports
 * 
 * Root barrel file that provides a single entry point for all components,
 * utilities, providers, and configuration.
 */

// Re-export all UI components
export * from './ui'

// Application-level components
export { Navigation } from './navigation'
export { PerformanceProvider } from './performance-provider'
export { AutoThemeWrapper } from './auto-theme-wrapper'
export { ThemeConfigProvider } from './theme-config-provider'
export { ThemeCustomizer, ThemeCustomizerTrigger } from './theme-customizer'

// Showcase components
export { AdvancedAnimationsShowcase } from './showcase/advanced-animations-showcase'
export { ButtonShowcase } from './showcase/button-showcase'

// Re-export providers for easy access
export { ApplicationProviders } from '../app/providers'

// Library utilities and configuration
export * from '../lib/config'
export * from '../lib/hooks'
export * from '../lib/utils'
export * from '../lib/themes'