'use client'

import * as React from 'react'
import { Button } from '@/components/ui/primitives/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives/card'
import { Badge } from '@/components/ui/primitives/badge'
import { ThemeSwitcher, ThemeStatus } from '@/components/ui/theme-switcher'
import { useTheme, useThemeColors } from '@/lib/hooks/use-theme'
import { getThemeList } from '@/lib/themes'
import { 
  Palette, 
  Zap, 
  Sparkles, 
  Monitor,
  Sun,
  Moon,
  Eye,
  Code,
  Layers,
  Settings,
  Wand2,
  Cpu
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemesDemoPage() {
  const { theme, themeId, mode, setTheme, setMode, isTransitioning } = useTheme()
  const colors = useThemeColors()
  const themes = getThemeList()

  const colorSamples = [
    { name: 'Primary', color: colors.primary, textColor: colors.primaryForeground },
    { name: 'Secondary', color: colors.secondary, textColor: colors.secondaryForeground },
    { name: 'Accent', color: colors.accent, textColor: colors.accentForeground },
    { name: 'Success', color: colors.success, textColor: colors.successForeground },
    { name: 'Warning', color: colors.warning, textColor: colors.warningForeground },
    { name: 'Error', color: colors.destructive, textColor: colors.destructiveForeground },
    { name: 'Info', color: colors.info, textColor: colors.infoForeground },
  ]

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className={cn(
          "text-4xl font-bold mb-4",
          theme.custom?.glitch && "glitchable",
        )} data-text="Advanced Theme System">
          Advanced Theme System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience our comprehensive theming system with multiple themes, smooth transitions, and advanced effects.
        </p>
        <div className="flex items-center justify-center gap-4">
          <ThemeStatus />
          <ThemeSwitcher />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selection */}
        <Card className={cn(
          "lg:col-span-1",
          theme.custom?.neon && "shadow-xl shadow-primary/20"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Available Themes
            </CardTitle>
            <CardDescription>
              Choose from our collection of carefully crafted themes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {themes.map((themeOption) => {
              const isActive = themeOption.id === themeId
              const ThemeIcon = themeOption.id === 'cyberpunk' ? Zap : 
                               themeOption.id === 'synthwave' ? Sparkles :
                               themeOption.id === 'vaporwave' ? Sparkles : Palette
              
              return (
                <div key={themeOption.id} className="space-y-2">
                  <Button
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "w-full justify-start gap-2 h-auto p-4",
                      isActive && "shadow-lg",
                      theme.custom?.glitch && isActive && "animate-pulse"
                    )}
                    onClick={() => setTheme(themeOption.id)}
                    disabled={isTransitioning}
                  >
                    <ThemeIcon className="h-5 w-5" />
                    <div className="text-left flex-1">
                      <div className="font-medium">{themeOption.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {themeOption.id === 'default' && 'Clean, professional design'}
                        {themeOption.id === 'cyberpunk' && 'Neon, glitch effects, futuristic'}
                        {themeOption.id === 'synthwave' && 'Retro 80s vibes'}
                        {themeOption.id === 'vaporwave' && 'Dreamy pastel aesthetics'}
                      </div>
                    </div>
                    {themeOption.id === 'cyberpunk' && (
                      <Badge variant="secondary" className="text-xs">NEW</Badge>
                    )}
                  </Button>
                  
                  {/* Light/Dark mode toggle for active theme */}
                  {isActive && (
                    <div className="flex gap-2">
                      <Button
                        variant={mode === 'light' ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setMode('light')}
                        disabled={isTransitioning}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={mode === 'dark' ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setMode('dark')}
                        disabled={isTransitioning}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Color Palette
            </CardTitle>
            <CardDescription>
              Current theme color system in {mode} mode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {colorSamples.map((sample) => (
                <div
                  key={sample.name}
                  className="group cursor-pointer rounded-lg overflow-hidden border hover:scale-105 transition-transform"
                  style={{ backgroundColor: sample.color }}
                >
                  <div className="h-20 flex items-center justify-center">
                    <div 
                      className="font-medium text-sm"
                      style={{ color: sample.textColor }}
                    >
                      {sample.name}
                    </div>
                  </div>
                  <div className="bg-background p-2 text-xs font-mono text-center border-t">
                    {sample.color}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Colors */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Chart Colors
              </h4>
              <div className="flex gap-2">
                {[colors.chart1, colors.chart2, colors.chart3, colors.chart4, colors.chart5].map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-background shadow-sm"
                    style={{ backgroundColor: color }}
                    title={`Chart ${index + 1}: ${color}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Effects */}
        <Card className="lg:col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Theme Effects & Features
            </CardTitle>
            <CardDescription>
              Special effects and capabilities of the current theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Theme Info */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configuration
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="font-medium">{theme.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mode:</span>
                    <span className="font-medium capitalize">{mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transitions:</span>
                    <span className="font-medium">Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={cn(
                      "font-medium",
                      isTransitioning ? "text-warning" : "text-success"
                    )}>
                      {isTransitioning ? "Switching" : "Ready"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Effects */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Effects
                </h4>
                <div className="space-y-2">
                  {theme.custom?.glitch && (
                    <Badge variant="outline" className="text-red-500 border-red-500/20">
                      ⚡ Glitch Effects
                    </Badge>
                  )}
                  {theme.custom?.neon && (
                    <Badge variant="outline" className="text-cyan-500 border-cyan-500/20">
                      ✨ Neon Glow
                    </Badge>
                  )}
                  {theme.custom?.scanlines && (
                    <Badge variant="outline" className="text-green-500 border-green-500/20">
                      📺 Scanlines
                    </Badge>
                  )}
                  {!theme.custom && (
                    <span className="text-muted-foreground text-sm">No special effects</span>
                  )}
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Typography
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Sans:</span>
                    <div className="font-sans font-medium truncate" title={theme.typography.fontFamily.sans.join(', ')}>
                      {theme.typography.fontFamily.sans[0]}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mono:</span>
                    <div className="font-mono font-medium truncate" title={theme.typography.fontFamily.mono.join(', ')}>
                      {theme.typography.fontFamily.mono[0]}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Heading:</span>
                    <div className="font-heading font-medium truncate" title={theme.typography.fontFamily.heading.join(', ')}>
                      {theme.typography.fontFamily.heading[0]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Components */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Demo
                </h4>
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    Primary Button
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full">
                    Secondary
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Outline
                  </Button>
                  <div className="p-2 rounded border bg-muted/50 text-center text-xs">
                    Card Preview
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">How to Use the Theme System</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Switch between themes to see the visual changes. The cyberpunk theme includes special effects like glitch animations, neon glows, and scanlines. 
              All themes support both light and dark modes with smooth transitions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}