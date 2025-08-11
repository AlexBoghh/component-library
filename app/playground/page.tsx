'use client'

import React from 'react'
import { Button } from '@/components/ui/primitives/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives/card'
import { Badge } from '@/components/ui/primitives/badge'
import { Input } from '@/components/ui/primitives/input'
import { Label } from '@/components/ui/primitives/label'
import { Switch } from '@/components/ui/primitives/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/primitives/select'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/primitives/radio-group'
import { Slider } from '@/components/ui/primitives/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs'
import { useTheme } from '@/lib/hooks/use-theme'
import { cn } from '@/lib/utils'
import { 
  Search, 
  Filter,
  Copy,
  Check,
  Palette,
  Layers,
  Square,
  Type,
  MessageSquare,
  Grid,
  List,
  Zap,
  Terminal,
  Sparkles,
  Eye,
  Loader2,
  AlertCircle,
  Code,
  Moon,
  Sun,
  Monitor,
  Play,
  RotateCcw,
  Download,
  Settings,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Paintbrush,
  BoxSelect,
  ToggleLeft,
  SlidersHorizontal,
  Navigation,
  Bell
} from 'lucide-react'

// Component categories with better icons
const componentCategories = {
  'Forms': {
    icon: Type,
    components: ['Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Slider']
  },
  'Buttons': {
    icon: BoxSelect,
    components: ['Button']
  },
  'Navigation': {
    icon: Navigation,
    components: ['Tabs']
  },
  'Feedback': {
    icon: Bell,
    components: ['Alert']
  },
  'Data Display': {
    icon: Layers,
    components: ['Card', 'Badge']
  }
}

// Minimal theme configurations
const themes = [
  { id: 'default', label: 'Standard', color: 'bg-blue-500', icon: Layers },
  { id: 'cyberpunk', label: 'Cyber', color: 'bg-gradient-to-r from-cyan-500 to-pink-500', icon: Zap }
  // Brutalism theme temporarily disabled due to styling conflicts
  // { id: 'brutalism', label: 'Brutal', color: 'bg-yellow-500', icon: Square }
]

// Component examples
const componentExamples = {
  Input: {
    default: (
      <form className="w-full space-y-3" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Enter text..." className="h-10 px-3 py-2 text-sm" />
        <Input type="password" placeholder="Password" autoComplete="current-password" className="h-10 px-3 py-2 text-sm" />
      </form>
    ),
    cyberpunk: (
      <form className="w-full space-y-3" onSubmit={(e) => e.preventDefault()}>
        <Input 
          placeholder="Enter data..." 
          className="h-10 px-3 py-2 text-sm bg-black/50 border-cyan-500/50 text-cyan-100 placeholder:text-cyan-500/70 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        />
        <Input 
          type="password" 
          placeholder="Access code" 
          autoComplete="current-password"
          className="h-10 px-3 py-2 text-sm bg-black/50 border-pink-500/50 text-pink-100 placeholder:text-pink-500/70 focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)]"
        />
      </form>
    )
    // brutalism examples removed
  },
  Button: {
    default: (
      <div className="flex flex-wrap gap-2">
        <Button size="md">Primary</Button>
        <Button size="md" variant="secondary">Secondary</Button>
        <Button size="md" variant="outline">Outline</Button>
      </div>
    ),
    cyberpunk: (
      <div className="flex flex-wrap gap-3">
        {/* Primary Button - Cyan/Blue Glowing */}
        <Button className="cyberpunk-btn-primary h-10 px-6 py-2 text-sm">
          Execute
        </Button>
        
        {/* Secondary Button - Magenta/Pink Glowing */}
        <Button className="cyberpunk-btn-secondary h-10 px-6 py-2 text-sm">
          Deploy
        </Button>
        
        {/* Destructive Button - Red Glowing */}
        <Button className="cyberpunk-btn-destructive h-10 px-6 py-2 text-sm">
          Destroy
        </Button>
        
        {/* Ghost Button - Transparent with Border */}
        <Button className="cyberpunk-btn-ghost h-10 px-6 py-2 text-sm">
          Scan
        </Button>
        
        {/* Outline Button - Border Only */}
        <Button className="cyberpunk-btn-outline h-10 px-6 py-2 text-sm">
          Analyze
        </Button>
      </div>
    )
  },
  Card: {
    default: (
      <Card className="w-full">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-base font-semibold">Card Title</CardTitle>
          <CardDescription className="text-sm mt-1">Supporting text</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-sm text-muted-foreground">Content goes here</p>
        </CardContent>
      </Card>
    ),
    cyberpunk: (
      <Card className="w-full bg-black/80 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-base font-semibold text-cyan-400">Data Stream</CardTitle>
          <CardDescription className="text-sm mt-1 text-cyan-500/70">Active connection</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-sm text-cyan-300/80">Streaming data...</p>
        </CardContent>
      </Card>
    )
  },
  Badge: {
    default: (
      <div className="flex flex-wrap gap-2">
        <Badge className="text-xs px-2 py-0.5">Default</Badge>
        <Badge variant="secondary" className="text-xs px-2 py-0.5">Secondary</Badge>
        <Badge variant="outline" className="text-xs px-2 py-0.5">Outline</Badge>
      </div>
    ),
    cyberpunk: (
      <div className="flex flex-wrap gap-2">
        <Badge className="text-xs px-2 py-0.5 bg-cyan-500/20 border-cyan-500 text-cyan-400 font-medium">ONLINE</Badge>
        <Badge className="text-xs px-2 py-0.5 bg-pink-500/20 border-pink-500 text-pink-400 font-medium">ACTIVE</Badge>
        <Badge className="text-xs px-2 py-0.5 bg-yellow-500/20 border-yellow-500 text-yellow-400 font-medium animate-pulse">ALERT</Badge>
      </div>
    )
  },
  Switch: {
    default: (
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Switch id="s1" className="h-6 w-11" />
          <Label htmlFor="s1" className="text-sm font-medium">Enable feature</Label>
        </div>
        <div className="flex items-center space-x-3">
          <Switch id="s2" defaultChecked className="h-6 w-11" />
          <Label htmlFor="s2" className="text-sm font-medium">Active</Label>
        </div>
      </div>
    ),
    cyberpunk: (
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Switch className="h-7 w-14 cyberpunk-switch bg-black/80 border-2 border-cyan-500/50 data-[state=unchecked]:bg-black/90 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-900/50 data-[state=checked]:to-cyan-800/50 data-[state=checked]:border-cyan-400 data-[state=checked]:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300" />
          <Label className="text-sm font-medium text-cyan-400 font-mono">Neural Link</Label>
        </div>
        <div className="flex items-center space-x-3">
          <Switch defaultChecked className="h-7 w-14 cyberpunk-switch bg-black/80 border-2 border-pink-500/50 data-[state=unchecked]:bg-black/90 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-900/50 data-[state=checked]:to-pink-800/50 data-[state=checked]:border-pink-400 data-[state=checked]:shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all duration-300" />
          <Label className="text-sm font-medium text-pink-400 font-mono">Combat Mode</Label>
        </div>
      </div>
    )
  },
  Checkbox: {
    default: (
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Checkbox id="c1" className="h-5 w-5" />
          <Label htmlFor="c1" className="text-sm font-medium cursor-pointer">Accept terms</Label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="c2" defaultChecked className="h-5 w-5" />
          <Label htmlFor="c2" className="text-sm font-medium cursor-pointer">Notifications</Label>
        </div>
      </div>
    ),
    cyberpunk: (
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Checkbox className="h-5 w-5 cyberpunk-checkbox border-cyan-500/50 bg-black/80 data-[state=checked]:bg-cyan-500/20 data-[state=checked]:border-cyan-400 data-[state=checked]:shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:border-cyan-400/70 transition-all duration-300" />
          <Label className="text-sm font-medium text-cyan-400 cursor-pointer font-mono">Neural Link</Label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox defaultChecked className="h-5 w-5 cyberpunk-checkbox border-pink-500/50 bg-black/80 data-[state=checked]:bg-pink-500/20 data-[state=checked]:border-pink-400 data-[state=checked]:shadow-[0_0_15px_rgba(236,72,153,0.6)] hover:border-pink-400/70 transition-all duration-300" />
          <Label className="text-sm font-medium text-pink-400 cursor-pointer font-mono">Auto-Enhance</Label>
        </div>
      </div>
    )
  },
  Radio: {
    default: (
      <RadioGroup defaultValue="option-1" className="space-y-3">
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="option-1" id="r1" className="h-5 w-5" />
          <Label htmlFor="r1" className="text-sm font-medium cursor-pointer">Option A</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="option-2" id="r2" className="h-5 w-5" />
          <Label htmlFor="r2" className="text-sm font-medium cursor-pointer">Option B</Label>
        </div>
      </RadioGroup>
    ),
    cyberpunk: (
      <RadioGroup defaultValue="quantum" className="space-y-4">
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="quantum" className="h-5 w-5 cyberpunk-radio border-cyan-500/50 bg-black/80 data-[state=checked]:border-cyan-400 data-[state=checked]:bg-cyan-500/10 data-[state=checked]:shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:border-cyan-400/70 transition-all duration-300" />
          <Label className="text-sm font-medium text-cyan-400 cursor-pointer font-mono">Quantum Protocol</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="neural" className="h-5 w-5 cyberpunk-radio border-pink-500/50 bg-black/80 data-[state=checked]:border-pink-400 data-[state=checked]:bg-pink-500/10 data-[state=checked]:shadow-[0_0_15px_rgba(236,72,153,0.7)] hover:border-pink-400/70 transition-all duration-300" />
          <Label className="text-sm font-medium text-pink-400 cursor-pointer font-mono">Neural Network</Label>
        </div>
      </RadioGroup>
    )
  },
  Select: {
    default: (
      <Select>
        <SelectTrigger className="w-full h-10 text-sm">
          <SelectValue placeholder="Choose option..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light" className="text-sm">Light mode</SelectItem>
          <SelectItem value="dark" className="text-sm">Dark mode</SelectItem>
          <SelectItem value="system" className="text-sm">System</SelectItem>
        </SelectContent>
      </Select>
    ),
    cyberpunk: (
      <Select>
        <SelectTrigger className="w-full h-10 text-sm cyberpunk-select-trigger bg-black/80 border-2 border-cyan-500/50 text-cyan-100 focus:border-cyan-400 hover:border-cyan-400/70 transition-all duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
          <SelectValue placeholder="Select protocol..." className="cyberpunk-select-value font-mono" />
        </SelectTrigger>
        <SelectContent className="bg-black/95 border-2 border-cyan-500/50 backdrop-blur-md">
          <SelectItem value="stealth" className="text-sm text-cyan-400 font-mono hover:bg-cyan-500/20 focus:bg-cyan-500/20 focus:text-cyan-300">Stealth Mode</SelectItem>
          <SelectItem value="combat" className="text-sm text-pink-400 font-mono hover:bg-pink-500/20 focus:bg-pink-500/20 focus:text-pink-300">Combat Ready</SelectItem>
          <SelectItem value="recon" className="text-sm text-yellow-400 font-mono hover:bg-yellow-500/20 focus:bg-yellow-500/20 focus:text-yellow-300">Recon Active</SelectItem>
        </SelectContent>
      </Select>
    )
  },
  Slider: {
    default: (
      <div className="w-full space-y-4 py-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs font-medium">Single Value</span>
            <span className="text-xs text-muted-foreground">50%</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs font-medium">Range Selection</span>
            <span className="text-xs text-muted-foreground">25-75</span>
          </div>
          <Slider defaultValue={[25, 75]} max={100} step={1} className="w-full" />
        </div>
      </div>
    ),
    cyberpunk: (
      <div className="w-full space-y-4 py-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs font-medium text-cyan-400">Power Level</span>
            <span className="text-xs text-cyan-400/70">70%</span>
          </div>
          <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs font-medium text-pink-400">Frequency Range</span>
            <span className="text-xs text-pink-400/70">30-80 Hz</span>
          </div>
          <Slider defaultValue={[30, 80]} max={100} step={1} className="w-full" />
        </div>
      </div>
    )
  },
  Tabs: {
    default: (
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-9">
          <TabsTrigger value="tab1" className="text-xs">General</TabsTrigger>
          <TabsTrigger value="tab2" className="text-xs">Advanced</TabsTrigger>
          <TabsTrigger value="tab3" className="text-xs">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="mt-2">
          <p className="text-xs text-muted-foreground">General content panel</p>
        </TabsContent>
        <TabsContent value="tab2" className="mt-2">
          <p className="text-xs text-muted-foreground">Advanced options here</p>
        </TabsContent>
        <TabsContent value="tab3" className="mt-2">
          <p className="text-xs text-muted-foreground">Settings configuration</p>
        </TabsContent>
      </Tabs>
    ),
    cyberpunk: (
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="cyberpunk-tabs-list flex w-full justify-center h-12 bg-black/80 border border-cyan-500/40 rounded-sm p-2 gap-2">
          <TabsTrigger value="data" className="cyberpunk-tabs-trigger flex-1 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider text-cyan-400/70 border border-cyan-500/30 bg-transparent hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-cyan-600/20 data-[state=active]:border-cyan-400 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300">Data Stream</TabsTrigger>
          <TabsTrigger value="cypher" className="cyberpunk-tabs-trigger flex-1 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider text-pink-400/70 border border-pink-500/30 bg-transparent hover:border-pink-400/60 hover:text-pink-400 hover:bg-pink-500/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-pink-600/20 data-[state=active]:border-pink-400 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all duration-300">Cypher</TabsTrigger>
          <TabsTrigger value="matrix" className="cyberpunk-tabs-trigger flex-1 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider text-yellow-400/70 border border-yellow-500/30 bg-transparent hover:border-yellow-400/60 hover:text-yellow-400 hover:bg-yellow-500/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/20 data-[state=active]:to-yellow-600/20 data-[state=active]:border-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-[0_0_15px_rgba(255,255,0,0.4)] transition-all duration-300">Matrix</TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="mt-4">
          <p className="text-xs text-cyan-400 font-mono">[SYSTEM] Neural data stream active</p>
        </TabsContent>
        <TabsContent value="cypher" className="mt-4">
          <p className="text-xs text-pink-400 font-mono">[ENCRYPTED] Protocols engaged</p>
        </TabsContent>
        <TabsContent value="matrix" className="mt-4">
          <p className="text-xs text-yellow-400 font-mono">[MATRIX] System online</p>
        </TabsContent>
      </Tabs>
    )
  },
  Alert: {
    default: (
      <div className="w-full">
        <div className="flex gap-3 p-3 border rounded-md bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold mb-1 text-blue-900 dark:text-blue-100">Information</p>
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">System update available.</p>
          </div>
        </div>
      </div>
    ),
    cyberpunk: (
      <div className="w-full">
        <div className="flex gap-3 p-3 bg-black/50 border border-cyan-500/50 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <AlertCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="text-xs font-semibold text-cyan-400 mb-1">System Alert</p>
            <p className="text-xs text-cyan-300/80 leading-relaxed">Neural network synchronized.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default function PlaygroundPage() {
  const { setTheme, themeId } = useTheme()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)
  const [showCodeEditor, setShowCodeEditor] = React.useState(false)
  const [selectedComponentForEdit, setSelectedComponentForEdit] = React.useState<string | null>(null)
  const [isCodeExpanded, setIsCodeExpanded] = React.useState(false)
  
  // Track selected theme locally, defaulting to current theme
  const [selectedTheme, setSelectedTheme] = React.useState<string>(themeId || 'default')

  // Filter components
  const filteredComponents = React.useMemo(() => {
    const allComponents: { name: string; category: string }[] = []
    
    Object.entries(componentCategories).forEach(([category, data]) => {
      data.components.forEach(component => {
        if (
          (selectedCategory === 'all' || selectedCategory === category) &&
          component.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          allComponents.push({ name: component, category })
        }
      })
    })
    
    return allComponents
  }, [searchQuery, selectedCategory])

  const copyCode = (componentName: string) => {
    const code = `import { ${componentName} } from '@/components/ui/${componentName.toLowerCase()}'`
    navigator.clipboard.writeText(code)
    setCopiedCode(componentName)
    setTimeout(() => setCopiedCode(null), 2000)
  }
  
  const openCodeEditor = (componentName: string) => {
    setSelectedComponentForEdit(componentName)
    setShowCodeEditor(true)
  }
  
  const generateFullCode = (componentName: string) => {
    const examples = componentExamples[componentName as keyof typeof componentExamples]
    if (!examples) return ''
    
    const imports = [
      `import { ${componentName} } from '@/components/ui/primitives/${componentName.toLowerCase()}'`,
      selectedTheme === 'cyberpunk' ? `import { cn } from '@/lib/utils'` : '',
    ].filter(Boolean).join('\n')
    
    return `${imports}\n\nexport default function Example() {\n  return (\n    <div className="p-4">\n      {/* Component example */}\n    </div>\n  )\n}`
  }

  const renderComponentExample = (componentName: string) => {
    const examples = componentExamples[componentName as keyof typeof componentExamples]
    if (!examples) {
      return null // Don't show placeholder for missing components
    }
    
    return examples[selectedTheme as keyof typeof examples] || examples.default
  }

  // Handle theme changes from UI
  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme)
    setTheme(newTheme as any)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur dark:bg-zinc-950/95">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Component Playground</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Interactive component showcase with live themes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar - Minimal and sticky */}
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-30 dark:bg-zinc-950/95">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-muted/20 border-border/50 focus:bg-background focus:border-primary transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className={cn(
                "w-[180px] h-10 cyberpunk-select-trigger",
                selectedTheme === 'cyberpunk' && "bg-black/80 border-cyan-500/50 text-cyan-100 hover:border-cyan-400/70"
              )}>
                <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
                <SelectValue placeholder="Category" className="cyberpunk-select-value" />
              </SelectTrigger>
              <SelectContent className={cn(
                selectedTheme === 'cyberpunk' && "bg-black/90 border-cyan-500/50 text-cyan-100"
              )}>
                <SelectItem value="all" className={cn(
                  selectedTheme === 'cyberpunk' && "text-cyan-400 focus:bg-cyan-500/20 focus:text-cyan-300"
                )}>All Categories</SelectItem>
                {Object.keys(componentCategories).map(category => (
                  <SelectItem key={category} value={category} className={cn(
                    selectedTheme === 'cyberpunk' && "text-cyan-400 focus:bg-cyan-500/20 focus:text-cyan-300"
                  )}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Enhanced Theme Switcher */}
            <div className="flex items-center gap-1 ml-auto p-1 bg-muted/20 rounded-lg border border-border/50">
              {themes.map(theme => {
                const Icon = theme.icon
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium",
                      selectedTheme === theme.id 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {theme.label}
                    </span>
                  </button>
                )
              })}
            </div>
            
            {/* View Mode */}
            <div className="flex gap-0.5 p-1 bg-muted/20 border border-border/50 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'grid' ? "bg-background shadow-sm" : "hover:bg-muted/50"
                )}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'list' ? "bg-background shadow-sm" : "hover:bg-muted/50"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No components found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={cn(
            "gap-4",
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-4"
          )}>
            {filteredComponents.map(({ name, category }) => {
              const CategoryIcon = componentCategories[category as keyof typeof componentCategories].icon
              const example = renderComponentExample(name)
              
              // Skip cards with no examples
              if (!example) return null
              
              return (
                <Card 
                  key={name} 
                  className={cn(
                    "relative overflow-hidden border bg-card group",
                    // Remove problematic purple glow and add theme-specific classes
                    selectedTheme === 'default' && "playground-card-default",
                    selectedTheme === 'cyberpunk' && "playground-card-cyberpunk border-cyan-500/30 bg-black/60",
                    selectedTheme === 'brutalism' && "playground-card-brutalism border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-card",
                    "dark:bg-zinc-900/50 dark:border-zinc-800"
                  )}
                >
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold">{name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{category}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => copyCode(name)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-md transition-colors"
                          title="Copy import"
                        >
                          {copiedCode === name ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-zinc-400 hover:text-zinc-100" />
                          )}
                        </button>
                        <button
                          onClick={() => openCodeEditor(name)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-md transition-colors"
                          title="Open in editor"
                        >
                          <Code className="h-4 w-4 text-zinc-400 hover:text-zinc-100" />
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <div className={cn(
                      "p-6 min-h-[180px] flex items-center justify-center overflow-visible transition-all duration-200",
                      selectedTheme === 'default' && "rounded-lg border-2 bg-muted/30 dark:bg-muted/20 border-border/60 group-hover:border-border/80 group-hover:bg-muted/40 dark:group-hover:bg-muted/30",
                      selectedTheme === 'cyberpunk' && "rounded-lg border-2 bg-black/60 border-cyan-500/30 group-hover:border-cyan-500/50 group-hover:bg-black/80 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]",
                      // brutalism styles removed
                    )}>
                      <div className="w-full flex items-center justify-center">
                        {example}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
      
      {/* Advanced Code Editor Modal */}
      {showCodeEditor && selectedComponentForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className={cn(
            "w-full max-w-6xl h-[90vh] mx-4 rounded-lg border bg-zinc-900 shadow-2xl flex flex-col",
            selectedTheme === 'cyberpunk' && "border-cyan-500/50 shadow-cyan-500/20 bg-black",
            selectedTheme === 'brutalism' && "border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-zinc-900"
          )}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/20">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-zinc-100">Component Editor</h3>
                <Badge variant="outline" className="text-xs">
                  {selectedComponentForEdit}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                  className="hover:bg-zinc-800"
                >
                  {isCodeExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowCodeEditor(false)}
                  className="hover:bg-zinc-800"
                >
                  ×
                </Button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex">
              {/* Left Panel - Code */}
              <div className={cn(
                "border-r border-zinc-800 bg-zinc-950 flex flex-col",
                isCodeExpanded ? "w-full" : "w-1/2"
              )}>
                <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded bg-zinc-800">
                      <FileText className="h-4 w-4 text-zinc-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">Code</span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-zinc-800">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-zinc-800">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-zinc-950">
                  <pre className="text-zinc-400">
                    <code>{generateFullCode(selectedComponentForEdit)}</code>
                  </pre>
                </div>
              </div>
              
              {/* Right Panel - Preview */}
              {!isCodeExpanded && (
                <div className="w-1/2 flex flex-col">
                  <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded bg-zinc-800">
                        <Eye className="h-4 w-4 text-zinc-400" />
                      </div>
                      <span className="text-sm font-medium text-zinc-200">Preview</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {themes.map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeChange(theme.id)}
                          className={cn(
                            "px-2 py-1 rounded text-xs transition-colors",
                            selectedTheme === theme.id ? "bg-primary text-primary-foreground" : "hover:bg-zinc-800 text-zinc-400"
                          )}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-8 overflow-auto bg-zinc-900/50">
                    <div className={cn(
                      "rounded-lg p-8 min-h-[240px] flex items-center justify-center border-2 border-dashed transition-all duration-200",
                      selectedTheme === 'default' && "bg-muted/20 border-border/60 hover:border-border/80 hover:bg-muted/30",
                      selectedTheme === 'cyberpunk' && "bg-black/40 border-cyan-500/30 hover:border-cyan-500/50 hover:bg-black/60 shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]",
                      // brutalism styles removed
                    )}>
                      <div className="w-full max-w-md flex items-center justify-center">
                        {renderComponentExample(selectedComponentForEdit)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Terminal className="h-4 w-4" />
                <span>Interactive component playground</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}