'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/primitives/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives/card'
import { Badge } from '@/components/ui/primitives/badge'
import { Input } from '@/components/ui/primitives/input'
import { Switch } from '@/components/ui/primitives/switch'
import { Slider } from '@/components/ui/primitives/slider'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/primitives/radio-group'
import { Label } from '@/components/ui/primitives/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/primitives/dialog'
import { useTheme } from '@/lib/hooks/use-theme'
import { cn } from '@/lib/utils'
import { getThemeList, getTheme } from '@/lib/themes'
import {
  Sparkles,
  Zap,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  ArrowRight,
  Play,
  Download,
  Code,
  Eye,
  Settings,
  Cpu,
  Square,
  Grid,
  MousePointer,
  Type,
  Layout,
  Database,
  MessageCircle,
  Shield,
  Activity,
  Terminal,
  Layers,
  Wifi,
  Radio,
  BatteryCharging,
  Volume2,
  Headphones
} from 'lucide-react'

// Theme showcase data
const themeShowcases = [
  {
    id: 'default',
    name: 'Default Theme',
    description: 'Clean, professional design with subtle shadows and modern aesthetics',
    primaryColor: 'from-blue-500 to-indigo-600',
    accent: 'Professional',
    features: ['Clean Design', 'Subtle Shadows', 'Modern Typography', 'Accessible Colors'],
    preview: {
      background: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 to-indigo-950',
      card: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      text: 'text-gray-900 dark:text-gray-100'
    },
    components: [
      {
        name: 'Button',
        element: (
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        )
      },
      {
        name: 'Form Controls',
        element: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch defaultChecked />
              <Label>Enable notifications</Label>
            </div>
            <Input placeholder="Enter your name" />
            <Slider defaultValue={[50]} className="w-full" />
          </div>
        )
      }
    ]
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Theme',
    description: 'Futuristic neon aesthetics with glowing effects and terminal-inspired design',
    primaryColor: 'from-cyan-400 to-purple-600',
    accent: 'Futuristic',
    features: ['Neon Glows', 'Terminal Style', 'Glitch Effects', 'Matrix Colors'],
    preview: {
      background: 'bg-gradient-to-br from-gray-900 to-black',
      card: 'bg-black/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]',
      button: 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]',
      text: 'text-cyan-100'
    },
    components: [
      {
        name: 'Neon Buttons',
        element: (
          <div className="flex gap-2">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              Execute
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              Deploy
            </Button>
            <Button className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
              Scan
            </Button>
          </div>
        )
      },
      {
        name: 'Terminal Controls',
        element: (
          <div className="space-y-4 font-mono">
            <div className="flex items-center space-x-2">
              <Switch 
                defaultChecked 
                className="data-[state=checked]:bg-cyan-500"
              />
              <Label className="text-cyan-400">Neural Link Active</Label>
            </div>
            <Input 
              placeholder="Enter command..." 
              className="bg-black/50 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-500/70"
            />
            <Slider 
              defaultValue={[75]} 
              className="[&_[role=slider]]:bg-cyan-500 [&_[role=slider]]:border-cyan-400 [&_[role=slider]]:shadow-[0_0_10px_rgba(6,182,212,0.5)] [&_span:first-child]:bg-cyan-500/50"
            />
          </div>
        )
      }
    ]
  },
  {
    id: 'brutalism',
    name: 'Brutalism Theme',
    description: 'Bold, stark design with heavy borders, sharp corners, and high contrast',
    primaryColor: 'from-yellow-400 to-red-500',
    accent: 'Bold',
    features: ['Sharp Edges', 'High Contrast', 'Bold Typography', 'Hard Shadows'],
    preview: {
      background: 'bg-white',
      card: 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
      button: 'bg-yellow-400 hover:bg-yellow-300 text-black font-black border-4 border-black',
      text: 'text-black font-bold'
    },
    components: [
      {
        name: 'Bold Buttons',
        element: (
          <div className="flex gap-3">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]">
              CLICK
            </Button>
            <Button className="bg-red-500 hover:bg-red-400 text-white font-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              STOP
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-400 text-white font-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              GO
            </Button>
          </div>
        )
      },
      {
        name: 'Stark Controls',
        element: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                defaultChecked 
                className="data-[state=checked]:bg-yellow-400 border-2 border-black rounded-none"
              />
              <Label className="font-black uppercase">Power ON</Label>
            </div>
            <Input 
              placeholder="TYPE HERE" 
              className="font-bold bg-white border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
            <Slider 
              defaultValue={[60]} 
              className="[&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-3 [&_[role=slider]]:border-black [&_[role=slider]]:rounded-none [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>
        )
      }
    ]
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism Theme',
    description: 'Elegant frosted glass effects with subtle transparency and blur',
    primaryColor: 'from-white/50 to-blue-200/50',
    accent: 'Elegant',
    features: ['Backdrop Blur', 'Transparency', 'Soft Shadows', 'Light Refraction'],
    preview: {
      background: 'bg-gradient-to-br from-blue-100 to-purple-100',
      card: 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg',
      button: 'bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30',
      text: 'text-gray-800'
    },
    comingSoon: true,
    components: [
      {
        name: 'Glass Elements',
        element: (
          <div className="text-center p-8 text-gray-600">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-medium mb-2">Coming Soon</h3>
            <p className="text-sm">Glassmorphism theme in development</p>
          </div>
        )
      }
    ]
  },
  {
    id: 'minimal',
    name: 'Minimal Theme',
    description: 'Ultra-clean design with maximum whitespace and subtle accents',
    primaryColor: 'from-gray-400 to-gray-600',
    accent: 'Clean',
    features: ['Maximum Whitespace', 'Subtle Colors', 'Clean Lines', 'Minimal UI'],
    preview: {
      background: 'bg-white',
      card: 'bg-white border border-gray-100',
      button: 'bg-gray-900 hover:bg-gray-800 text-white',
      text: 'text-gray-900'
    },
    comingSoon: true,
    components: [
      {
        name: 'Clean Elements',
        element: (
          <div className="text-center p-8 text-gray-400">
            <Square className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-medium mb-2 text-gray-600">Coming Soon</h3>
            <p className="text-sm">Minimal theme in development</p>
          </div>
        )
      }
    ]
  }
]

export default function ThemeShowcase() {
  const { setTheme, theme: currentTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'default')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showCode, setShowCode] = useState(false)
  
  const currentShowcase = themeShowcases.find(t => t.id === selectedTheme) || themeShowcases[0]
  
  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId)
    if (themeShowcases.find(t => t.id === themeId)?.comingSoon) {
      return // Don't actually change theme for coming soon themes
    }
    setTheme(themeId as any)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md mb-6">
              <Palette className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">5 Unique Themes</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Theme Showcase
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our collection of carefully crafted themes. Each one tells a different story 
              and creates a unique experience for your users.
            </p>
            
            <div className="flex justify-center gap-4">
              <Link href="/playground">
                <Button size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Try in Playground
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Theme
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Theme Pills */}
            <div className="flex gap-2 overflow-x-auto">
              {themeShowcases.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    selectedTheme === theme.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
                    theme.comingSoon && "opacity-60"
                  )}
                >
                  <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r", theme.primaryColor)} />
                  {theme.name}
                  {theme.comingSoon && (
                    <Badge variant="secondary" className="text-xs ml-1">Soon</Badge>
                  )}
                </button>
              ))}
            </div>
            
            {/* Preview Controls */}
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={cn(
                    "p-2 transition-colors",
                    previewMode === 'desktop' ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={cn(
                    "p-2 transition-colors",
                    previewMode === 'tablet' ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={cn(
                    "p-2 transition-colors",
                    previewMode === 'mobile' ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                <Code className="mr-2 h-4 w-4" />
                {showCode ? 'Hide' : 'Show'} Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Theme Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={cn("w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center", currentShowcase.primaryColor)}>
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>{currentShowcase.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {currentShowcase.accent}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {currentShowcase.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <div className="space-y-1">
                      {currentShowcase.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {!currentShowcase.comingSoon && (
                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={() => handleThemeChange(currentShowcase.id)}
                        className="flex-1"
                      >
                        Apply Theme
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Theme Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Components</span>
                  <span className="font-medium">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Variants</span>
                  <span className="font-medium">200+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accessibility</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span className="font-medium">A+</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <div className={cn(
              "rounded-lg border transition-all duration-500",
              previewMode === 'desktop' && "max-w-none",
              previewMode === 'tablet' && "max-w-2xl mx-auto",
              previewMode === 'mobile' && "max-w-sm mx-auto"
            )}>
              <div className="border-b px-4 py-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-muted-foreground ml-4">
                      {currentShowcase.name} Preview
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
              </div>
              
              <div className={cn("p-8 min-h-[600px] transition-all", currentShowcase.preview.background)}>
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center">
                    <h2 className={cn("text-3xl font-bold mb-2", currentShowcase.preview.text)}>
                      {currentShowcase.name} Components
                    </h2>
                    <p className={cn("text-muted-foreground", currentShowcase.preview.text)}>
                      Interactive preview of theme components
                    </p>
                  </div>
                  
                  {/* Component Previews */}
                  <div className="grid gap-6">
                    {currentShowcase.components.map((component) => (
                      <Card key={component.name} className={cn("transition-all", currentShowcase.preview.card)}>
                        <CardHeader>
                          <CardTitle className={cn("text-lg", currentShowcase.preview.text)}>
                            {component.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {component.element}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code View */}
        {showCode && !currentShowcase.comingSoon && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Theme Configuration
                </CardTitle>
                <CardDescription>
                  CSS variables and configuration for {currentShowcase.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`// ${currentShowcase.name} Theme Configuration
:root {
  --primary: ${currentShowcase.id === 'cyberpunk' ? 'hsl(180 100% 60%)' : 'hsl(221.2 83.2% 53.3%)'};
  --secondary: ${currentShowcase.id === 'cyberpunk' ? 'hsl(315 100% 65%)' : 'hsl(210 40% 96%)'};
  --accent: ${currentShowcase.id === 'cyberpunk' ? 'hsl(60 100% 60%)' : 'hsl(210 40% 96%)'};
  --background: ${currentShowcase.id === 'cyberpunk' ? 'hsl(240 10% 3%)' : 'hsl(0 0% 100%)'};
  --foreground: ${currentShowcase.id === 'cyberpunk' ? 'hsl(180 100% 90%)' : 'hsl(222.2 84% 4.9%)'};
  ${currentShowcase.id === 'cyberpunk' ? '--neon-glow: 0 0 20px currentColor;' : ''}
  ${currentShowcase.id === 'brutalism' ? '--shadow-hard: 4px 4px 0px 0px rgba(0,0,0,1);' : ''}
}

.${currentShowcase.id}-button {
  ${currentShowcase.id === 'cyberpunk' ? 'box-shadow: var(--neon-glow);' : ''}
  ${currentShowcase.id === 'brutalism' ? 'box-shadow: var(--shadow-hard);' : ''}
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}