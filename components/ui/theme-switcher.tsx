'use client'

import * as React from 'react'
import { Monitor, Moon, Sun, Palette, Zap, Sparkles, Square } from 'lucide-react'
import { Button } from '@/components/ui/primitives/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/primitives/dropdown-menu'
import { useTheme } from '@/lib/hooks/use-theme'
import { getThemeList } from '@/lib/themes'
import { cn } from '@/lib/utils'

const themeIcons = {
  default: Palette,
  cyberpunk: Zap,
  synthwave: Sparkles,
  vaporwave: Sparkles,
  brutalism: Square
}

const modeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor
}

export function ThemeSwitcher() {
  const { theme, themeId, mode, setTheme, setMode, isTransitioning } = useTheme()
  const themes = getThemeList()

  const CurrentThemeIcon = themeIcons[themeId as keyof typeof themeIcons] || Palette
  const CurrentModeIcon = modeIcons[mode as keyof typeof modeIcons] || Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "relative gap-2 transition-all duration-200",
            isTransitioning && "animate-pulse",
            theme.custom?.glitch && "hover:animate-bounce"
          )}
          disabled={isTransitioning}
        >
          <CurrentThemeIcon className="h-4 w-4" />
          <CurrentModeIcon className="h-4 w-4" />
          <span className="sr-only">Toggle theme and mode</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Theme Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Theme Selection */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <CurrentThemeIcon className="h-4 w-4" />
            Theme
            <span className="ml-auto text-xs text-muted-foreground">
              {theme.name}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={themeId} onValueChange={setTheme}>
              {themes.map((themeOption) => {
                const ThemeIcon = themeIcons[themeOption.id as keyof typeof themeIcons] || Palette
                return (
                  <DropdownMenuRadioItem 
                    key={themeOption.id} 
                    value={themeOption.id}
                    className="flex items-center gap-2"
                  >
                    <ThemeIcon className="h-4 w-4" />
                    {themeOption.name}
                    {(themeOption.id === 'cyberpunk' || themeOption.id === 'brutalism') && (
                      <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                        NEW
                      </span>
                    )}
                  </DropdownMenuRadioItem>
                )
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Mode Selection */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <CurrentModeIcon className="h-4 w-4" />
            Mode
            <span className="ml-auto text-xs text-muted-foreground capitalize">
              {mode}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={mode} onValueChange={(value) => setMode(value as 'light' | 'dark')}>
              <DropdownMenuRadioItem value="light" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Dark
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Theme Preview */}
        <div className="px-2 py-1.5">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Preview
          </div>
          <div className={cn(
            "grid grid-cols-4 gap-1 p-2 rounded-md border",
            theme.custom?.neon && "shadow-lg shadow-primary/20"
          )}>
            <div className="w-4 h-4 rounded bg-primary" />
            <div className="w-4 h-4 rounded bg-secondary" />
            <div className="w-4 h-4 rounded bg-accent" />
            <div className="w-4 h-4 rounded bg-muted" />
          </div>
          
          {/* Theme Effects Indicators */}
          {theme.custom && (
            <div className="flex gap-1 mt-2">
              {theme.custom.glitch && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500">
                  Glitch
                </span>
              )}
              {theme.custom.neon && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">
                  Neon
                </span>
              )}
              {theme.custom.scanlines && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500">
                  Scan
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => setTheme('cyberpunk')}
          className="flex items-center gap-2 text-primary"
        >
          <Zap className="h-4 w-4" />
          Try Cyberpunk
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Compact version for mobile/header use
export function ThemeSwitcherCompact() {
  const { theme, themeId, mode, setTheme, toggleMode, isTransitioning } = useTheme()
  const CurrentThemeIcon = themeIcons[themeId as keyof typeof themeIcons] || Palette
  
  return (
    <div className="flex items-center gap-1">
      {/* Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMode}
        disabled={isTransitioning}
        className={cn(
          "h-9 w-9 rounded-lg p-0 transition-all duration-200 hover:bg-accent/60 hover:shadow-sm",
          isTransitioning && "animate-pulse"
        )}
        title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {mode === 'dark' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* Theme Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-9 w-9 rounded-lg p-0 transition-all duration-200 hover:bg-accent/60 hover:shadow-sm",
              isTransitioning && "animate-pulse",
              theme.custom?.glitch && "hover:animate-bounce"
            )}
            disabled={isTransitioning}
            title="Change theme"
          >
            <CurrentThemeIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-52 rounded-xl border-border/50 bg-popover/95 backdrop-blur-lg shadow-2xl">
          <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
            <Sparkles className="h-4 w-4" />
            All Themes
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/60" />
          
          {getThemeList().map((themeOption) => {
            const ThemeIcon = themeIcons[themeOption.id as keyof typeof themeIcons] || Palette
            return (
              <DropdownMenuItem 
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-accent/60",
                  themeOption.id === themeId && "bg-accent/40 shadow-sm"
                )}
              >
                <ThemeIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="flex-1">{themeOption.name}</span>
                {themeOption.id === themeId && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
                {(themeOption.id === 'cyberpunk' || themeOption.id === 'brutalism') && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                    NEW
                  </span>
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Theme status indicator component
export function ThemeStatus() {
  const { theme, themeId, mode, isTransitioning } = useTheme()
  
  if (isTransitioning) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
        Switching theme...
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={cn(
        "w-2 h-2",
        themeId === 'cyberpunk' && "rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50",
        themeId === 'brutalism' && "bg-yellow-500",
        themeId === 'default' && "rounded-full bg-primary"
      )} />
      {theme.name} • {mode}
      {theme.custom?.glitch && <span className="text-red-500">⚡</span>}
      {theme.custom?.neon && <span className="text-cyan-500">✨</span>}
    </div>
  )
}