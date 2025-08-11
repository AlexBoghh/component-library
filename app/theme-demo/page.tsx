'use client'

import React from 'react'
import { ThemeCustomizer } from '@/components/theme-customizer'
import { useTheme } from '@/lib/hooks/use-theme'
import { Button } from '@/components/ui/primitives/button'
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/primitives/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/primitives/select-modern'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  Square,
  Circle,
  Maximize,
  Settings,
  Sparkles,
  Zap,
  Heart,
  Star,
  Bell,
  Mail,
  User,
  Home,
  Search,
  Filter,
  ChevronRight,
} from 'lucide-react'

const colorSchemeInfo = {
  blue: { name: 'Ocean Blue', description: 'Professional and trustworthy' },
  green: { name: 'Forest Green', description: 'Natural and calming' },
  purple: { name: 'Royal Purple', description: 'Creative and luxurious' },
  orange: { name: 'Sunset Orange', description: 'Energetic and friendly' },
  rose: { name: 'Rose Pink', description: 'Warm and inviting' },
  slate: { name: 'Slate Gray', description: 'Minimal and sophisticated' },
}

export default function ThemeDemoPage() {
  const { theme } = useTheme()

  return (
    <div className="container mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Theme Customization</h1>
            <p className="text-muted-foreground">
              Customize the look and feel of your application with our comprehensive theming system
            </p>
          </div>
          <ThemeCustomizer />
        </div>
      </div>

      {/* Current Theme Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            {theme.mode === 'light' ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : theme.mode === 'dark' ? (
              <Moon className="h-5 w-5 text-blue-500" />
            ) : (
              <Monitor className="h-5 w-5 text-gray-500" />
            )}
            <span className="font-semibold">Mode</span>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{theme.mode}</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="h-5 w-5 text-primary" />
            <span className="font-semibold">Color</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {colorSchemeInfo[theme.colorScheme].name}
          </p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Type className="h-5 w-5" />
            <span className="font-semibold">Font</span>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{theme.font}</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Square className="h-5 w-5" />
            <span className="font-semibold">Radius</span>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{theme.radius}</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Maximize className="h-5 w-5" />
            <span className="font-semibold">Density</span>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{theme.density}</p>
        </div>
      </section>

      {/* Theme Customizer Panel */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Theme Settings</h2>
          <div className="p-6 rounded-lg border bg-card">
            <ThemeCustomizer asPopover={false} />
          </div>
        </div>
      </section>

      {/* Component Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Component Preview</h2>
        
        {/* Buttons */}
        <div className="p-6 rounded-lg border space-y-4">
          <h3 className="font-semibold mb-3">Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Settings className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Feature Card</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This card demonstrates the current theme's color scheme and border radius.
            </p>
            <Button className="w-full" size="sm">Learn More</Button>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold">Performance</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Theme changes are instant with no page reload required.
            </p>
            <Button className="w-full" variant="secondary" size="sm">View Stats</Button>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold">Customizable</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Every aspect of the theme can be customized to your needs.
            </p>
            <Button className="w-full" variant="outline" size="sm">Customize</Button>
          </div>
        </div>

        {/* Form Elements */}
        <div className="p-6 rounded-lg border space-y-4">
          <h3 className="font-semibold mb-3">Form Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Input Field</label>
              <input 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Type something..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">I agree to the terms</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm">Send me updates</span>
            </label>
          </div>
        </div>

        {/* Navigation Example */}
        <div className="p-6 rounded-lg border space-y-4">
          <h3 className="font-semibold mb-3">Navigation</h3>
          <nav className="flex items-center gap-1">
            {[
              { icon: Home, label: 'Home' },
              { icon: User, label: 'Profile' },
              { icon: Mail, label: 'Messages' },
              { icon: Bell, label: 'Notifications' },
              { icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Color Palette */}
        <div className="p-6 rounded-lg border space-y-4">
          <h3 className="font-semibold mb-3">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-20 rounded-md bg-primary mb-2" />
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs text-muted-foreground">Main brand color</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-secondary mb-2" />
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-xs text-muted-foreground">Supporting color</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-accent mb-2" />
              <p className="text-sm font-medium">Accent</p>
              <p className="text-xs text-muted-foreground">Highlight color</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-destructive mb-2" />
              <p className="text-sm font-medium">Destructive</p>
              <p className="text-xs text-muted-foreground">Error/danger color</p>
            </div>
            <div>
              <div className="h-20 rounded-md bg-muted mb-2" />
              <p className="text-sm font-medium">Muted</p>
              <p className="text-xs text-muted-foreground">Subtle backgrounds</p>
            </div>
            <div>
              <div className="h-20 rounded-md border bg-background mb-2" />
              <p className="text-sm font-medium">Background</p>
              <p className="text-xs text-muted-foreground">Base background</p>
            </div>
            <div>
              <div className="h-20 rounded-md border bg-card mb-2" />
              <p className="text-sm font-medium">Card</p>
              <p className="text-xs text-muted-foreground">Card background</p>
            </div>
            <div>
              <div className="h-20 rounded-md border bg-popover mb-2" />
              <p className="text-sm font-medium">Popover</p>
              <p className="text-xs text-muted-foreground">Popover background</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border">
            <Star className="h-8 w-8 text-yellow-500 mb-3" />
            <h3 className="font-semibold mb-2">Persistent Storage</h3>
            <p className="text-sm text-muted-foreground">
              Theme preferences are saved to localStorage and persist across sessions
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <Zap className="h-8 w-8 text-blue-500 mb-3" />
            <h3 className="font-semibold mb-2">No Flash</h3>
            <p className="text-sm text-muted-foreground">
              Theme is applied before render to prevent any flash of unstyled content
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <Monitor className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold mb-2">System Preference</h3>
            <p className="text-sm text-muted-foreground">
              Automatically follows system dark/light mode preference when set to system
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <Palette className="h-8 w-8 text-purple-500 mb-3" />
            <h3 className="font-semibold mb-2">6 Color Schemes</h3>
            <p className="text-sm text-muted-foreground">
              Choose from blue, green, purple, orange, rose, or slate color schemes
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <Type className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold mb-2">Font Options</h3>
            <p className="text-sm text-muted-foreground">
              Select between Inter, Roboto, or system fonts for the perfect typography
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <Maximize className="h-8 w-8 text-pink-500 mb-3" />
            <h3 className="font-semibold mb-2">Density Modes</h3>
            <p className="text-sm text-muted-foreground">
              Compact, comfortable, or spacious layouts to suit different use cases
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}