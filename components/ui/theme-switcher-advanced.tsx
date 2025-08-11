/**
 * Advanced Theme Switcher Component
 * Provides a beautiful UI for theme selection with previews
 */

'use client'

import * as React from 'react'
import { useTheme } from './theme-provider'
import { Moon, Sun, Monitor, Palette, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeSwitcherProps {
  className?: string
  showLabels?: boolean
  showPreviews?: boolean
  compact?: boolean
}

export function ThemeSwitcherAdvanced({
  className,
  showLabels = true,
  showPreviews = true,
  compact = false,
}: ThemeSwitcherProps) {
  const { theme, themeId, mode, effectiveMode, availableThemes, setTheme, setMode } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const modeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }

  const ModeIcon = modeIcons[mode]

  if (compact) {
    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg',
            'border border-border bg-background',
            'hover:bg-accent hover:text-accent-foreground',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
          )}
          aria-label="Theme settings"
          aria-expanded={isOpen}
        >
          <Palette className="h-4 w-4" />
          {showLabels && <span className="text-sm font-medium">{theme?.name}</span>}
          <ChevronDown className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div
            className={cn(
              'absolute top-full mt-2 right-0 z-50',
              'min-w-[200px] p-2',
              'bg-popover border border-border rounded-lg shadow-lg',
              'animate-in fade-in-0 zoom-in-95'
            )}
          >
            {/* Theme Selection */}
            <div className="space-y-1 pb-2 mb-2 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground px-2 py-1">Theme</p>
              {availableThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-2 py-1.5 rounded-md',
                    'text-sm transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    themeId === t.id && 'bg-accent text-accent-foreground'
                  )}
                >
                  <span>{t.name}</span>
                  {themeId === t.id && <Check className="h-3 w-3" />}
                </button>
              ))}
            </div>

            {/* Mode Selection */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground px-2 py-1">Mode</p>
              {(['light', 'dark', 'system'] as const).map((m) => {
                const Icon = modeIcons[m]
                return (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m)
                      setIsOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-1.5 rounded-md',
                      'text-sm capitalize transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      mode === m && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="flex-1 text-left">{m}</span>
                    {mode === m && <Check className="h-3 w-3" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Theme Selection Grid */}
      <div>
        <h3 className="text-sm font-medium mb-3">Theme</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                'relative group',
                'border-2 rounded-lg p-3',
                'transition-all duration-200',
                'hover:shadow-md hover:scale-105',
                themeId === t.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              {showPreviews && (
                <div className="mb-2 h-16 rounded overflow-hidden bg-gradient-to-br from-background to-muted">
                  <div className="flex h-full">
                    <div
                      className="w-1/3 h-full"
                      style={{
                        background: `linear-gradient(135deg, ${
                          effectiveMode === 'dark'
                            ? t.colors.dark.primary
                            : t.colors.light.primary
                        } 0%, ${
                          effectiveMode === 'dark'
                            ? t.colors.dark.accent
                            : t.colors.light.accent
                        } 100%)`,
                      }}
                    />
                    <div className="flex-1 p-2 space-y-1">
                      <div className="h-1.5 bg-foreground/20 rounded-full w-full" />
                      <div className="h-1.5 bg-foreground/10 rounded-full w-3/4" />
                      <div className="h-1.5 bg-foreground/10 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t.name}</span>
                {themeId === t.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              {t.custom && (
                <div className="flex gap-1 mt-1">
                  {t.custom.glitch && (
                    <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                      Glitch
                    </span>
                  )}
                  {t.custom.neon && (
                    <span className="text-xs px-1.5 py-0.5 bg-accent/10 text-accent rounded">
                      Neon
                    </span>
                  )}
                  {t.custom.glassmorphism && (
                    <span className="text-xs px-1.5 py-0.5 bg-secondary/10 text-secondary-foreground rounded">
                      Glass
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selection */}
      <div>
        <h3 className="text-sm font-medium mb-3">Appearance</h3>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((m) => {
            const Icon = modeIcons[m]
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2',
                  'px-3 py-2 rounded-lg border-2',
                  'transition-all duration-200',
                  'hover:shadow-md',
                  mode === m
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Icon className="h-4 w-4" />
                {showLabels && (
                  <span className="text-sm font-medium capitalize">{m}</span>
                )}
              </button>
            )
          })}
        </div>
        {mode === 'system' && (
          <p className="text-xs text-muted-foreground mt-2">
            Currently using {effectiveMode} mode based on system preference
          </p>
        )}
      </div>
    </div>
  )
}