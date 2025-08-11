'use client'

import React from 'react'
import { useTheme } from '@/lib/hooks/use-theme'
import { Button } from '@/components/ui/primitives/button'
import { RotateCcw, CheckCircle } from 'lucide-react'

export default function ResetThemePage() {
  const { resetTheme } = useTheme()
  const [isReset, setIsReset] = React.useState(false)

  const handleReset = () => {
    // Clear all theme-related localStorage items
    if (typeof window !== 'undefined') {
      localStorage.removeItem('radix-ui-theme-config')
      localStorage.removeItem('radix-ui-theme')
      // Reset to defaults
      resetTheme()
      setIsReset(true)
      // Reload to ensure clean state
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reset Theme Settings</h1>
        
        <div className="p-6 rounded-lg border bg-card">
          {!isReset ? (
            <>
              <p className="mb-4 text-muted-foreground">
                If the UI appears zoomed in or incorrectly sized, click the button below to reset all theme settings to defaults.
              </p>
              
              <Button onClick={handleReset} size="lg" className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Theme to Defaults
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <p className="font-semibold">Theme Reset Successfully!</p>
              <p className="text-sm text-muted-foreground">
                Redirecting to home page...
              </p>
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg bg-muted">
          <h2 className="font-semibold mb-2">What this does:</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Clears all stored theme preferences</li>
            <li>• Resets to default comfortable density</li>
            <li>• Sets font size back to normal (14px)</li>
            <li>• Removes any custom color schemes</li>
            <li>• Restores default border radius</li>
          </ul>
        </div>
      </div>
    </div>
  )
}