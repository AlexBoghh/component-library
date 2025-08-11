/**
 * Centralized Configuration Management System
 * 
 * This module provides centralized configuration for the entire Radix UI Lab system,
 * managing themes, performance settings, feature flags, and integration parameters.
 */

// Theme Configuration
export interface ThemeConfig {
  defaultTheme: string
  defaultMode: 'light' | 'dark'
  enableTransitions: boolean
  transitionDuration: number
  storageKey: string
}

// Performance Configuration
export interface PerformanceConfig {
  enableMonitoring: boolean
  metricsReporting: boolean
  debugMode: boolean
  optimizeRenders: boolean
  lazyLoadComponents: boolean
}

// Component Configuration
export interface ComponentConfig {
  enableAnimations: boolean
  defaultAnimationDuration: number
  accessibilityMode: boolean
  reduceMotion: boolean
  highContrastMode: boolean
}

// Feature Flags
export interface FeatureFlags {
  cyberpunkEffects: boolean
  experimentalComponents: boolean
  advancedAnimations: boolean
  betaThemes: boolean
  developerMode: boolean
}

// Main Application Configuration
export interface ApplicationConfig {
  theme: ThemeConfig
  performance: PerformanceConfig
  components: ComponentConfig
  features: FeatureFlags
  environment: 'development' | 'production' | 'testing'
}

// Default Configuration
export const defaultConfig: ApplicationConfig = {
  theme: {
    defaultTheme: 'default',
    defaultMode: 'dark',
    enableTransitions: true,
    transitionDuration: 300,
    storageKey: 'radix-ui-lab-config'
  },
  performance: {
    enableMonitoring: true,
    metricsReporting: false,
    debugMode: process.env.NODE_ENV === 'development',
    optimizeRenders: true,
    lazyLoadComponents: true
  },
  components: {
    enableAnimations: true,
    defaultAnimationDuration: 200,
    accessibilityMode: false,
    reduceMotion: false,
    highContrastMode: false
  },
  features: {
    cyberpunkEffects: true,
    experimentalComponents: true,
    advancedAnimations: true,
    betaThemes: true,
    developerMode: process.env.NODE_ENV === 'development'
  },
  environment: (process.env.NODE_ENV as 'development' | 'production' | 'testing') || 'development'
}

// Configuration Management Class
class ConfigurationManager {
  private config: ApplicationConfig
  private listeners: Set<(config: ApplicationConfig) => void> = new Set()

  constructor(initialConfig: ApplicationConfig = defaultConfig) {
    this.config = this.loadConfiguration(initialConfig)
  }

  private loadConfiguration(defaultConfig: ApplicationConfig): ApplicationConfig {
    if (typeof window === 'undefined') return defaultConfig

    try {
      const stored = localStorage.getItem(defaultConfig.theme.storageKey)
      if (stored) {
        const parsedConfig = JSON.parse(stored)
        return this.mergeConfigs(defaultConfig, parsedConfig)
      }
    } catch (error) {
      console.warn('Failed to load configuration from localStorage:', error)
    }

    return defaultConfig
  }

  private mergeConfigs(base: ApplicationConfig, override: Partial<ApplicationConfig>): ApplicationConfig {
    return {
      theme: { ...base.theme, ...override.theme },
      performance: { ...base.performance, ...override.performance },
      components: { ...base.components, ...override.components },
      features: { ...base.features, ...override.features },
      environment: override.environment || base.environment
    }
  }

  private saveConfiguration() {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.config.theme.storageKey, JSON.stringify(this.config))
    } catch (error) {
      console.warn('Failed to save configuration to localStorage:', error)
    }
  }

  // Public API
  getConfig(): ApplicationConfig {
    return { ...this.config }
  }

  updateConfig(updates: Partial<ApplicationConfig>) {
    this.config = this.mergeConfigs(this.config, updates)
    this.saveConfiguration()
    this.notifyListeners()
  }

  resetConfig() {
    this.config = { ...defaultConfig }
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.config.theme.storageKey)
      } catch (error) {
        console.warn('Failed to clear configuration from localStorage:', error)
      }
    }
    
    this.notifyListeners()
  }

  subscribe(listener: (config: ApplicationConfig) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.config))
  }

  // Convenience methods for specific configurations
  updateTheme(themeUpdates: Partial<ThemeConfig>) {
    this.updateConfig({ theme: { ...this.config.theme, ...themeUpdates } })
  }

  updatePerformance(performanceUpdates: Partial<PerformanceConfig>) {
    this.updateConfig({ performance: { ...this.config.performance, ...performanceUpdates } })
  }

  updateComponents(componentUpdates: Partial<ComponentConfig>) {
    this.updateConfig({ components: { ...this.config.components, ...componentUpdates } })
  }

  updateFeatures(featureUpdates: Partial<FeatureFlags>) {
    this.updateConfig({ features: { ...this.config.features, ...featureUpdates } })
  }

  // Feature flag checks
  isFeatureEnabled(feature: keyof FeatureFlags): boolean {
    return this.config.features[feature]
  }

  // Environment checks
  isDevelopment(): boolean {
    return this.config.environment === 'development'
  }

  isProduction(): boolean {
    return this.config.environment === 'production'
  }

  isTesting(): boolean {
    return this.config.environment === 'testing'
  }
}

// Global configuration instance
export const configManager = new ConfigurationManager()

// React hook for configuration
export { useConfiguration } from './use-configuration'

// Utility functions
export const getConfig = () => configManager.getConfig()
export const updateConfig = (updates: Partial<ApplicationConfig>) => configManager.updateConfig(updates)
export const resetConfig = () => configManager.resetConfig()
export const isFeatureEnabled = (feature: keyof FeatureFlags) => configManager.isFeatureEnabled(feature)