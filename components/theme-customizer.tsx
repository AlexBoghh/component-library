'use client'

import * as React from 'react'
import { useTheme } from '@/lib/hooks/use-theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/primitives/select-modern'
import { Button } from '@/components/ui/primitives/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/primitives/popover'
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  Circle,
  Square,
  Maximize,
  RotateCcw,
  Settings,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const colorSchemeOptions = [
  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { value: 'green', label: 'Green', color: 'bg-green-500' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
  { value: 'rose', label: 'Rose', color: 'bg-rose-500' },
  { value: 'slate', label: 'Slate', color: 'bg-slate-500' },
]

const fontOptions = [
  { value: 'inter', label: 'Inter', className: 'font-inter' },
  { value: 'roboto', label: 'Roboto', className: 'font-roboto' },
  { value: 'system', label: 'System', className: '' },
]

const radiusOptions = [
  { value: 'none', label: 'None', icon: Square },
  { value: 'sm', label: 'Small', icon: Square },
  { value: 'md', label: 'Medium', icon: Square },
  { value: 'lg', label: 'Large', icon: Square },
  { value: 'full', label: 'Full', icon: Circle },
]

const densityOptions = [
  { value: 'compact', label: 'Compact', description: 'Dense layout with minimal spacing' },
  { value: 'comfortable', label: 'Comfortable', description: 'Balanced spacing for readability' },
  { value: 'spacious', label: 'Spacious', description: 'Generous spacing for clarity' },
]

interface ThemeCustomizerProps {
  className?: string
  asPopover?: boolean
}

export function ThemeCustomizer({ className, asPopover = true }: ThemeCustomizerProps) {
  const { theme, setTheme, resetTheme } = useTheme()

  const content = (
    <div className={cn("space-y-6", className)}>
      {/* Always Dark Mode - Info Only */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Moon className="h-4 w-4" />
          Theme Mode
        </label>
        <div className="p-3 bg-muted/30 rounded-md border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Moon className="h-4 w-4" />
            <span>Always Dark Mode</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This lab is designed for dark mode only. Enjoy the premium dark experience!
          </p>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Color Scheme
        </label>
        <div className="grid grid-cols-3 gap-2">
          {colorSchemeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme({ colorScheme: option.value as any })}
              className={cn(
                "flex items-center gap-2 rounded-md border p-2 text-sm transition-colors hover:bg-accent",
                theme.colorScheme === option.value && "border-primary bg-accent"
              )}
            >
              <div className={cn("h-4 w-4 rounded-full", option.color)} />
              <span>{option.label}</span>
              {theme.colorScheme === option.value && (
                <Check className="ml-auto h-3 w-3" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Type className="h-4 w-4" />
          Font Family
        </label>
        <Select
          value={theme.font}
          onValueChange={(value) => setTheme({ font: value as any })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className={option.className}>{option.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Border Radius */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Square className="h-4 w-4" />
          Border Radius
        </label>
        <div className="flex gap-2">
          {radiusOptions.map((option) => {
            const radiusClass = {
              none: 'rounded-none',
              sm: 'rounded-sm',
              md: 'rounded-md',
              lg: 'rounded-lg',
              full: 'rounded-full',
            }[option.value]
            
            return (
              <button
                key={option.value}
                onClick={() => setTheme({ radius: option.value as any })}
                className={cn(
                  "flex h-10 w-10 items-center justify-center border transition-colors hover:bg-accent",
                  radiusClass,
                  theme.radius === option.value && "border-primary bg-accent"
                )}
                title={option.label}
              >
                <option.icon className="h-5 w-5" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Density */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Maximize className="h-4 w-4" />
          Density
        </label>
        <div className="space-y-2">
          {densityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme({ density: option.value as any })}
              className={cn(
                "w-full rounded-md border p-3 text-left transition-colors hover:bg-accent",
                theme.density === option.value && "border-primary bg-accent"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
                {theme.density === option.value && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={resetTheme}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset to Defaults
      </Button>
    </div>
  )

  if (asPopover) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="mb-4">
            <h3 className="font-semibold">Theme Customization</h3>
            <p className="text-sm text-muted-foreground">
              Customize the appearance of the application
            </p>
          </div>
          {content}
        </PopoverContent>
      </Popover>
    )
  }

  return content
}

export function ThemeCustomizerTrigger() {
  return (
    <ThemeCustomizer asPopover />
  )
}