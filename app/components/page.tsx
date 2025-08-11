'use client'

import React, { useState, useMemo } from 'react'
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
  Search,
  Filter,
  Grid,
  List,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  Palette,
  Layers,
  Type,
  Navigation,
  MessageCircle,
  Database,
  Layout,
  MousePointer,
  Shield,
  Zap,
  Code,
  BookOpen,
  Star,
  Heart,
  Download,
  Share2,
  Bookmark,
  Eye,
  Play,
  ChevronDown,
  ChevronUp,
  Globe,
  Smartphone,
  Monitor,
  Accessibility,
  Timer,
  Activity
} from 'lucide-react'

// Component categories with enhanced metadata
const componentCategories = {
  'Form Controls': {
    icon: Type,
    description: 'Interactive form elements and inputs',
    color: 'from-blue-500 to-cyan-500',
    components: [
      { 
        name: 'Button', 
        description: 'Clickable elements with various styles and states',
        variants: 12,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Input', 
        description: 'Text input fields with validation support',
        variants: 8,
        accessibility: 98,
        status: 'stable'
      },
      { 
        name: 'Switch', 
        description: 'Toggle switches for boolean settings',
        variants: 5,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Checkbox', 
        description: 'Multi-selection checkboxes',
        variants: 6,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Radio Group', 
        description: 'Single selection radio buttons',
        variants: 4,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Slider', 
        description: 'Range sliders for numeric input',
        variants: 7,
        accessibility: 95,
        status: 'stable'
      },
      { 
        name: 'Select', 
        description: 'Dropdown selection menus',
        variants: 10,
        accessibility: 98,
        status: 'stable'
      }
    ]
  },
  'Navigation': {
    icon: Navigation,
    description: 'Navigation menus and wayfinding components',
    color: 'from-purple-500 to-pink-500',
    components: [
      { 
        name: 'Tabs', 
        description: 'Horizontal tab navigation',
        variants: 6,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Navigation Menu', 
        description: 'Hierarchical navigation menus',
        variants: 8,
        accessibility: 98,
        status: 'stable'
      },
      { 
        name: 'Dropdown Menu', 
        description: 'Contextual dropdown menus',
        variants: 5,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Command', 
        description: 'Command palette for quick actions',
        variants: 3,
        accessibility: 95,
        status: 'beta'
      }
    ]
  },
  'Data Display': {
    icon: Database,
    description: 'Components for displaying and organizing data',
    color: 'from-green-500 to-teal-500',
    components: [
      { 
        name: 'Card', 
        description: 'Flexible content containers',
        variants: 9,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Badge', 
        description: 'Status indicators and labels',
        variants: 7,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Data Table', 
        description: 'Advanced data tables with sorting and filtering',
        variants: 4,
        accessibility: 98,
        status: 'stable'
      },
      { 
        name: 'Calendar', 
        description: 'Date selection calendars',
        variants: 5,
        accessibility: 95,
        status: 'stable'
      }
    ]
  },
  'Overlays': {
    icon: Layout,
    description: 'Modal dialogs and overlay components',
    color: 'from-orange-500 to-red-500',
    components: [
      { 
        name: 'Dialog', 
        description: 'Modal dialogs for important interactions',
        variants: 8,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Sheet', 
        description: 'Sliding panel overlays',
        variants: 6,
        accessibility: 98,
        status: 'stable'
      },
      { 
        name: 'Popover', 
        description: 'Contextual popup content',
        variants: 5,
        accessibility: 95,
        status: 'stable'
      },
      { 
        name: 'Tooltip', 
        description: 'Hover-activated information tooltips',
        variants: 4,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Toast', 
        description: 'Temporary notification messages',
        variants: 6,
        accessibility: 98,
        status: 'stable'
      }
    ]
  },
  'Feedback': {
    icon: MessageCircle,
    description: 'Status indicators and user feedback',
    color: 'from-violet-500 to-purple-500',
    components: [
      { 
        name: 'Alert Dialog', 
        description: 'Important confirmation dialogs',
        variants: 4,
        accessibility: 100,
        status: 'stable'
      },
      { 
        name: 'Progress', 
        description: 'Progress indicators and loading states',
        variants: 5,
        accessibility: 95,
        status: 'stable'
      },
      { 
        name: 'Spinner', 
        description: 'Loading spinners and indicators',
        variants: 8,
        accessibility: 90,
        status: 'stable'
      }
    ]
  }
}

// Theme-aware component examples for live preview
const getComponentExample = (componentName: string, theme: string) => {
  const examples: any = {
    'Button': {
      default: (
        <div className="flex gap-2 flex-wrap">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      ),
      cyberpunk: (
        <div className="flex gap-2 flex-wrap">
          <Button className="bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            Execute
          </Button>
          <Button className="bg-pink-500 hover:bg-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            Deploy
          </Button>
        </div>
      ),
      brutalism: (
        <div className="flex gap-2 flex-wrap">
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            CLICK
          </Button>
          <Button className="bg-red-500 hover:bg-red-400 text-white font-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ACTION
          </Button>
        </div>
      )
    },
    'Card': {
      default: (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm">Example Card</CardTitle>
            <CardDescription className="text-xs">Card description here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Card content goes here</p>
          </CardContent>
        </Card>
      ),
      cyberpunk: (
        <Card className="w-full max-w-sm bg-black/80 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          <CardHeader>
            <CardTitle className="text-sm text-cyan-400">Data Stream</CardTitle>
            <CardDescription className="text-xs text-cyan-500/70">Active connection</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-cyan-300/80">Streaming live data...</p>
          </CardContent>
        </Card>
      ),
      brutalism: (
        <Card className="w-full max-w-sm bg-white border-4 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase">Info Block</CardTitle>
            <CardDescription className="text-xs font-bold text-gray-600">IMPORTANT</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-semibold">Read this content now</p>
          </CardContent>
        </Card>
      )
    },
    'Switch': {
      default: (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Label className="text-sm">Enable feature</Label>
          </div>
        </div>
      ),
      cyberpunk: (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch defaultChecked className="data-[state=checked]:bg-cyan-500" />
            <Label className="text-sm text-cyan-400">Neural link active</Label>
          </div>
        </div>
      ),
      brutalism: (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch defaultChecked className="data-[state=checked]:bg-yellow-400 border-2 border-black rounded-none" />
            <Label className="text-sm font-black uppercase">Power ON</Label>
          </div>
        </div>
      )
    }
    // Add more component examples as needed
  }
  
  return examples[componentName]?.[theme] || examples[componentName]?.default || null
}

export default function ComponentsGallery() {
  const { theme: currentTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'variants' | 'accessibility'>('name')
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'default')
  const [copiedComponent, setCopiedComponent] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  
  // Available themes
  const themes = getThemeList()
  const themeData = getTheme(selectedTheme)
  
  // Filter and sort components
  const filteredComponents = useMemo(() => {
    const allComponents: any[] = []
    
    Object.entries(componentCategories).forEach(([categoryName, categoryData]) => {
      if (selectedCategory === 'all' || selectedCategory === categoryName) {
        categoryData.components.forEach(component => {
          if (component.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            allComponents.push({
              ...component,
              category: categoryName,
              categoryData
            })
          }
        })
      }
    })
    
    // Sort components
    return allComponents.sort((a, b) => {
      switch (sortBy) {
        case 'variants':
          return b.variants - a.variants
        case 'accessibility':
          return b.accessibility - a.accessibility
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }, [searchQuery, selectedCategory, sortBy])
  
  const copyImport = (componentName: string) => {
    const code = `import { ${componentName.replace(' ', '')} } from '@/components/ui/primitives/${componentName.toLowerCase().replace(' ', '-')}'`
    navigator.clipboard.writeText(code)
    setCopiedComponent(componentName)
    setTimeout(() => setCopiedComponent(null), 2000)
  }
  
  const toggleFavorite = (componentName: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(componentName)) {
      newFavorites.delete(componentName)
    } else {
      newFavorites.add(componentName)
    }
    setFavorites(newFavorites)
  }
  
  const totalComponents = Object.values(componentCategories).reduce((sum, cat) => sum + cat.components.length, 0)
  const stableComponents = Object.values(componentCategories).reduce((sum, cat) => 
    sum + cat.components.filter(comp => comp.status === 'stable').length, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">{totalComponents} Components Available</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                Component Gallery
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our comprehensive collection of production-ready components. 
              Each one crafted with accessibility, performance, and beautiful design in mind.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalComponents}</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{stableComponents}</div>
                <div className="text-sm text-muted-foreground">Production Ready</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">5</div>
                <div className="text-sm text-muted-foreground">Themes</div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Link href="/playground">
                <Button size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Try Playground
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-0 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {Object.entries(componentCategories).map(([category, data]) => {
                const Icon = data.icon
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category}
                  </Button>
                )
              })}
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 text-sm border rounded-md bg-background"
              >
                <option value="name">Sort by Name</option>
                <option value="variants">Sort by Variants</option>
                <option value="accessibility">Sort by Accessibility</option>
              </select>
              
              {/* Theme Picker */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Palette className="mr-2 h-4 w-4" />
                    {themeData.name}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Choose Theme</DialogTitle>
                    <DialogDescription>
                      Preview components in different themes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    {themes.map((theme) => (
                      <Button
                        key={theme.id}
                        variant={selectedTheme === theme.id ? 'default' : 'outline'}
                        onClick={() => setSelectedTheme(theme.id)}
                        className="justify-start"
                      >
                        {theme.name}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No components found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={cn(
            "gap-6",
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
          )}>
            {filteredComponents.map((component) => {
              const CategoryIcon = component.categoryData.icon
              const isFavorited = favorites.has(component.name)
              const example = getComponentExample(component.name, selectedTheme)
              
              return (
                <Card 
                  key={component.name}
                  className={cn(
                    "relative overflow-hidden transition-all duration-300 hover:shadow-lg group",
                    selectedTheme === 'cyberpunk' && "border-cyan-500/30 hover:border-cyan-500/50",
                    selectedTheme === 'brutalism' && "border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  )}
                >
                  {/* Header */}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{component.name}</h3>
                          <Badge 
                            variant={component.status === 'stable' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {component.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {component.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CategoryIcon className="h-3 w-3" />
                            <span>{component.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Palette className="h-3 w-3" />
                            <span>{component.variants} variants</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Accessibility className="h-3 w-3" />
                            <span>{component.accessibility}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(component.name)}
                          className="h-8 w-8 p-0"
                        >
                          <Heart className={cn("h-4 w-4", isFavorited && "fill-red-500 text-red-500")} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyImport(component.name)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedComponent === component.name ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {/* Preview */}
                  <CardContent>
                    <div className={cn(
                      "rounded-lg p-6 min-h-[120px] flex items-center justify-center bg-muted/20 border border-dashed border-border/50",
                      selectedTheme === 'cyberpunk' && "bg-black/20 border-cyan-500/20",
                      selectedTheme === 'brutalism' && "bg-white border-2 border-black rounded-none"
                    )}>
                      {example || (
                        <div className="text-muted-foreground text-sm">
                          Preview not available
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Link href="/playground" className="flex-1">
                        <Button size="sm" className="w-full">
                          <Play className="mr-2 h-3 w-3" />
                          Try it
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <BookOpen className="mr-2 h-3 w-3" />
                        Docs
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}