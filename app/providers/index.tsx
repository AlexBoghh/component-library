'use client'

import * as React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProvider as RadixThemeProvider } from '@/lib/hooks/use-theme'
import { PerformanceProvider } from '@/components/performance-provider'
import { AutoThemeWrapper } from '@/components/auto-theme-wrapper'
import { Toaster } from '@/components/ui/toaster'
import { ComponentRegistryProvider } from '@/lib/integration/component-registry'
import { ThemeIntegrationProvider } from '@/lib/integration/theme-integration'

/**
 * Performance-Optimized Application Provider System
 * 
 * This component provides a centralized, performance-optimized provider hierarchy that:
 * 1. Resolves conflicts between multiple theme systems
 * 2. Implements optimal provider order for minimal re-renders
 * 3. Manages global application state efficiently
 * 4. Provides performance monitoring and optimization
 * 5. Ensures consistent theme propagation
 * 6. Enables seamless component integration
 * 7. Uses React 18 concurrent features for optimal performance
 */

interface ApplicationProvidersProps {
  children: React.ReactNode
}

// Memoized provider components for performance
const MemoizedPerformanceProvider = React.memo(PerformanceProvider)
const MemoizedComponentRegistryProvider = React.memo(ComponentRegistryProvider)
const MemoizedThemeIntegrationProvider = React.memo(ThemeIntegrationProvider)
const MemoizedAutoThemeWrapper = React.memo(AutoThemeWrapper)

export function ApplicationProviders({ children }: ApplicationProvidersProps) {
  // Use React 18's useDeferredValue for non-critical updates
  const deferredChildren = React.useDeferredValue(children)
  
  return (
    <MemoizedPerformanceProvider>
      {/* Component registry at the root for maximum accessibility */}
      <MemoizedComponentRegistryProvider>
        {/* Next.js theme provider for system-level theme management */}
        <NextThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="radix-ui-lab-next-theme"
        >
          {/* Radix theme provider for component-level theming */}
          <RadixThemeProvider 
            defaultTheme="default" 
            defaultMode="dark"
            enableTransitions={true}
            storageKey="radix-ui-lab-theme"
          >
            {/* Theme integration layer for seamless theme application */}
            <MemoizedThemeIntegrationProvider>
              {/* Auto theme wrapper for dynamic theme switching */}
              <MemoizedAutoThemeWrapper>
                {/* Suspense boundary for better loading states */}
                <React.Suspense fallback={<div>Loading...</div>}>
                  {deferredChildren}
                </React.Suspense>
                {/* Toast system at root level for global notifications */}
                <Toaster />
              </MemoizedAutoThemeWrapper>
            </MemoizedThemeIntegrationProvider>
          </RadixThemeProvider>
        </NextThemeProvider>
      </MemoizedComponentRegistryProvider>
    </MemoizedPerformanceProvider>
  )
}

// Performance monitoring hook for provider hierarchy
export function useProviderPerformance() {
  const [renderCount, setRenderCount] = React.useState(0)
  const [lastRenderTime, setLastRenderTime] = React.useState(Date.now())
  
  React.useEffect(() => {
    setRenderCount(count => count + 1)
    setLastRenderTime(Date.now())
  })
  
  return {
    renderCount,
    lastRenderTime,
    getPerformanceMetrics: () => ({
      totalRenders: renderCount,
      lastRender: new Date(lastRenderTime).toISOString(),
      averageRenderTime: renderCount > 0 ? (Date.now() - lastRenderTime) / renderCount : 0
    })
  }
}

// Export individual providers for granular usage if needed
export { PerformanceProvider } from '@/components/performance-provider'
export { ThemeProvider } from '@/lib/hooks/use-theme'
export { AutoThemeWrapper } from '@/components/auto-theme-wrapper'
export { ComponentRegistryProvider } from '@/lib/integration/component-registry'
export { ThemeIntegrationProvider } from '@/lib/integration/theme-integration'