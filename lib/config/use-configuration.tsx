'use client'

import * as React from 'react'
import { configManager, ApplicationConfig, ThemeConfig, PerformanceConfig, ComponentConfig, FeatureFlags } from './index'

/**
 * React Hook for Configuration Management
 * 
 * Provides reactive access to application configuration with automatic
 * re-rendering when configuration changes occur.
 */
export function useConfiguration() {
  const [config, setConfig] = React.useState(() => configManager.getConfig())

  React.useEffect(() => {
    const unsubscribe = configManager.subscribe(setConfig)
    return unsubscribe
  }, [])

  const updateConfig = React.useCallback((updates: Partial<ApplicationConfig>) => {
    configManager.updateConfig(updates)
  }, [])

  const resetConfig = React.useCallback(() => {
    configManager.resetConfig()
  }, [])

  const updateTheme = React.useCallback((themeUpdates: Partial<ThemeConfig>) => {
    configManager.updateTheme(themeUpdates)
  }, [])

  const updatePerformance = React.useCallback((performanceUpdates: Partial<PerformanceConfig>) => {
    configManager.updatePerformance(performanceUpdates)
  }, [])

  const updateComponents = React.useCallback((componentUpdates: Partial<ComponentConfig>) => {
    configManager.updateComponents(componentUpdates)
  }, [])

  const updateFeatures = React.useCallback((featureUpdates: Partial<FeatureFlags>) => {
    configManager.updateFeatures(featureUpdates)
  }, [])

  const isFeatureEnabled = React.useCallback((feature: keyof FeatureFlags) => {
    return configManager.isFeatureEnabled(feature)
  }, [])

  return {
    config,
    updateConfig,
    resetConfig,
    updateTheme,
    updatePerformance,
    updateComponents,
    updateFeatures,
    isFeatureEnabled,
    // Convenience getters
    isDevelopment: configManager.isDevelopment(),
    isProduction: configManager.isProduction(),
    isTesting: configManager.isTesting(),
  }
}

/**
 * Hook for specific configuration sections
 */
export function useThemeConfig() {
  const { config, updateTheme } = useConfiguration()
  return {
    theme: config.theme,
    updateTheme
  }
}

export function usePerformanceConfig() {
  const { config, updatePerformance } = useConfiguration()
  return {
    performance: config.performance,
    updatePerformance
  }
}

export function useComponentConfig() {
  const { config, updateComponents } = useConfiguration()
  return {
    components: config.components,
    updateComponents
  }
}

export function useFeatureFlags() {
  const { config, updateFeatures, isFeatureEnabled } = useConfiguration()
  return {
    features: config.features,
    updateFeatures,
    isFeatureEnabled
  }
}