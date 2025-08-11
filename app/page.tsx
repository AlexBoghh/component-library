'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/primitives/button'
import { Switch } from '@/components/ui/primitives/switch'
import { Slider } from '@/components/ui/primitives/slider'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/primitives/radio-group'
import { Label } from '@/components/ui/primitives/label'
import { Input } from '@/components/ui/primitives/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives/card'
import { Badge } from '@/components/ui/primitives/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/primitives/dialog'
import { toast } from '@/components/ui/use-toast'
import { useTheme } from '@/lib/hooks/use-theme'
import { cn } from '@/lib/utils'
import { getThemeList, getTheme } from '@/lib/themes'
import {
  ArrowRight,
  Sparkles,
  Zap,
  Command,
  MousePointer2,
  Palette,
  Code2,
  Layers,
  Shield,
  Globe,
  Cpu,
  Gauge,
  Download,
  Star,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RefreshCw,
  Shuffle,
  Copy,
  Check,
  Github,
  Twitter,
  ArrowUpRight,
  Shapes,
  Box,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Pentagon,
  Sparkle,
  Wand2,
  Rocket,
  Timer,
  BarChart3,
  Activity,
  Fingerprint,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Mic,
  Video,
  Music,
  Radio,
  Wifi,
  Bluetooth,
  Battery,
  BatteryCharging,
  Crosshair,
  Target,
  Compass,
  Map,
  Navigation,
  Send,
  Share2,
  Heart,
  MessageCircle,
  Bell,
  BellRing,
  Search,
  Filter,
  Menu,
  X,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  Home,
  Settings,
} from 'lucide-react'

// Custom hook for mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}

// Custom hook for scroll position
function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

export default function AwardWinningLandingPage() {
  const { mode, setMode, theme: currentTheme } = useTheme()
  const mousePosition = useMousePosition()
  const scrollY = useScrollPosition()
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [selectedComponent, setSelectedComponent] = useState(0)
  const [isBuilding, setIsBuilding] = useState(false)
  const [remixCount, setRemixCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [showCustomCursor, setShowCustomCursor] = useState(false) // Disabled by default for better usability
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [performanceMetrics, setPerformanceMetrics] = useState({ 
    loadTime: 0.3, 
    score: 99, 
    accessibility: 100, 
    bestPractices: 98 
  })
  const heroRef = useRef<HTMLDivElement>(null)
  const [konami, setKonami] = useState('')
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false)
  
  // Available themes
  const themes = getThemeList()
  const themeData = getTheme(selectedTheme)

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba'
    const handleKeyPress = (e: KeyboardEvent) => {
      const newCode = konami + e.key
      if (konamiCode.indexOf(newCode) === 0) {
        setKonami(newCode)
        if (newCode === konamiCode) {
          toast.success({
            title: '🎮 Konami Code Activated!',
            description: 'You found the easter egg! Enjoy the confetti!',
          })
          // Trigger confetti or special effect
          setKonami('')
        }
      } else {
        setKonami('')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [konami])

  // Parallax calculations with safe window checks
  const parallaxX = useMemo(() => {
    if (typeof window === 'undefined') return 0
    return (mousePosition.x - window.innerWidth / 2) / 50
  }, [mousePosition.x])
  
  const parallaxY = useMemo(() => {
    if (typeof window === 'undefined') return 0
    return (mousePosition.y - window.innerHeight / 2) / 50
  }, [mousePosition.y])

  // 3D rotating components data
  const floatingComponents = [
    { id: 1, type: 'button', rotation: 0, scale: 1.2, x: -200, y: -100, z: 100 },
    { id: 2, type: 'switch', rotation: 45, scale: 1, x: 200, y: -150, z: -50 },
    { id: 3, type: 'slider', rotation: 90, scale: 1.1, x: -150, y: 100, z: 50 },
    { id: 4, type: 'checkbox', rotation: 135, scale: 0.9, x: 180, y: 80, z: -100 },
    { id: 5, type: 'radio', rotation: 180, scale: 1.3, x: 0, y: -180, z: 150 },
  ]

  // Bento grid items
  const bentoItems = [
    {
      id: 1,
      title: 'Button Collection',
      size: 'large',
      gradient: 'from-purple-500 to-pink-500',
      component: <Button className="scale-150">Explore Buttons</Button>,
      stats: '12 variants',
    },
    {
      id: 2,
      title: 'Form Controls',
      size: 'medium',
      gradient: 'from-blue-500 to-cyan-500',
      component: <Switch className="scale-150" defaultChecked />,
      stats: '8 components',
    },
    {
      id: 3,
      title: 'Data Display',
      size: 'small',
      gradient: 'from-green-500 to-emerald-500',
      component: <div className="flex gap-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse delay-75" />
        <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse delay-150" />
      </div>,
      stats: '15 components',
    },
    {
      id: 4,
      title: 'Navigation',
      size: 'medium',
      gradient: 'from-orange-500 to-red-500',
      component: <Menu className="h-8 w-8" />,
      stats: '6 patterns',
    },
    {
      id: 5,
      title: 'Feedback',
      size: 'large',
      gradient: 'from-indigo-500 to-purple-500',
      component: <BellRing className="h-8 w-8 animate-bounce" />,
      stats: '10 types',
    },
  ]

  // Remix function
  const handleRemix = () => {
    setRemixCount(prev => prev + 1)
    const colors = ['blue', 'purple', 'green', 'orange', 'pink', 'indigo']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    document.documentElement.style.setProperty('--primary', `var(--${randomColor}-500)`)
    toast.info({
      title: '🎨 Remixed!',
      description: `Theme variant ${remixCount + 1} applied`,
    })
  }

  // Copy component code
  const copyComponent = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success({
      title: 'Copied!',
      description: 'Component code copied to clipboard',
    })
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Custom Cursor - Only show if enabled */}
      {showCustomCursor && (
        <div
          className={cn(
            "pointer-events-none fixed z-[9999] transition-transform duration-100",
            cursorVariant === 'default' && "h-4 w-4 -ml-2 -mt-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
            cursorVariant === 'hover' && "h-12 w-12 -ml-6 -mt-6 rounded-full border-2 border-purple-500 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
            cursorVariant === 'click' && "h-8 w-8 -ml-4 -mt-4 rounded-full bg-purple-500 scale-75 shadow-[0_0_15px_rgba(168,85,247,0.7)]"
          )}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      )}

      {/* Theme-aware Gradient Mesh Background */}
      <div className="fixed inset-0">
        <div className={cn(
          "absolute inset-0 transition-all duration-1000",
          selectedTheme === 'cyberpunk' && "bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20",
          selectedTheme === 'brutalism' && "bg-gradient-to-br from-yellow-500/10 via-background to-red-500/10",
          selectedTheme === 'glassmorphism' && "bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10",
          selectedTheme === 'default' && "bg-gradient-to-br from-primary/10 via-background to-secondary/10"
        )} />
        
        <div 
          className="absolute inset-0 opacity-30 transition-opacity duration-1000"
          style={{
            background: typeof window !== 'undefined' ? `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${window.innerWidth - mousePosition.x}px ${window.innerHeight - mousePosition.y}px, hsl(var(--secondary) / 0.15) 0%, transparent 50%)
            ` : '',
          }}
        />
        
        {/* Animated mesh gradient */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" className="text-muted-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Theme-specific effects */}
        {selectedTheme === 'cyberpunk' && themeData.custom?.scanlines && (
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 4px)',
              animation: 'scanlines 0.1s linear infinite',
            }}
          />
        )}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 h-64 w-64 animate-float">
          <Hexagon className="h-full w-full text-purple-500/10" />
        </div>
        <div className="absolute top-40 right-32 h-48 w-48 animate-float-delayed">
          <Triangle className="h-full w-full text-pink-500/10" />
        </div>
        <div className="absolute bottom-32 left-40 h-56 w-56 animate-float">
          <Square className="h-full w-full text-blue-500/10" />
        </div>
      </div>

      {/* Hero Section with 3D Components */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8 z-10">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">The Future of UI Development</span>
                <Badge className="text-xs bg-gradient-to-r from-primary to-secondary text-primary-foreground">v3.0</Badge>
              </div>

              <div>
                <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                    Radix UI
                  </span>
                  <span className="block mt-2 text-foreground">
                    Lab
                  </span>
                </h1>
                
                {/* Theme Indicator */}
                <div className="mt-4">
                  <Dialog open={isThemeDialogOpen} onOpenChange={setIsThemeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Palette className="mr-2 h-4 w-4" />
                        Current: {themeData.name}
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Choose Your Theme Experience</DialogTitle>
                        <DialogDescription>
                          Each theme offers a unique visual and interactive experience
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        {themes.map((theme) => (
                          <Card 
                            key={theme.id}
                            className={cn(
                              "cursor-pointer border-2 transition-all hover:shadow-lg",
                              selectedTheme === theme.id ? "border-primary" : "border-border"
                            )}
                            onClick={() => {
                              setSelectedTheme(theme.id)
                              setIsThemeDialogOpen(false)
                            }}
                          >
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">{theme.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2 mb-3">
                                <div className="flex gap-1">
                                  <div className="w-4 h-4 rounded bg-primary" />
                                  <div className="w-4 h-4 rounded bg-secondary" />
                                  <div className="w-4 h-4 rounded bg-accent" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Button size="sm" className="w-full">Sample Button</Button>
                                <div className="flex items-center justify-between">
                                  <Switch size="sm" />
                                  <Checkbox />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <p className="text-xl text-muted-foreground max-w-lg">
                Award-winning components that push the boundaries of what's possible. 
                Build interfaces that users will never forget.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/playground">
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary border-0"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    onClick={() => setCursorVariant('click')}
                  >
                    <span className="relative z-10 flex items-center">
                      Start Building
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-border bg-background/50 backdrop-blur-md hover:bg-accent"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">
                      50K+
                    </div>
                    <div className="absolute -inset-2 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent animate-pulse delay-75">
                      {performanceMetrics.score}%
                    </div>
                    <div className="absolute -inset-2 bg-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-sm text-muted-foreground">Performance</div>
                </div>
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary animate-pulse delay-150">
                      {performanceMetrics.loadTime}s
                    </div>
                    <div className="absolute -inset-2 bg-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-sm text-muted-foreground">Load Time</div>
                </div>
              </div>
            </div>

            {/* Right Side - 3D Floating Components */}
            <div className="relative h-[600px] perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central glow */}
                <div className="absolute h-96 w-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                
                {/* Floating 3D Components */}
                {floatingComponents.map((comp, index) => (
                  <div
                    key={comp.id}
                    className="absolute preserve-3d animate-float"
                    style={{
                      transform: `
                        translateX(${comp.x + parallaxX}px)
                        translateY(${comp.y + parallaxY}px)
                        translateZ(${comp.z}px)
                        rotateY(${autoRotate ? (Date.now() / 20 + comp.rotation) % 360 : comp.rotation}deg)
                        scale(${comp.scale})
                      `,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                      {comp.type === 'button' && <Button className="scale-150">Click Me</Button>}
                      {comp.type === 'switch' && <Switch className="scale-150" defaultChecked />}
                      {comp.type === 'slider' && <Slider className="w-32" defaultValue={[50]} />}
                      {comp.type === 'checkbox' && <Checkbox className="scale-150" defaultChecked />}
                      {comp.type === 'radio' && (
                        <RadioGroup defaultValue="1">
                          <RadioGroupItem value="1" className="scale-150" />
                        </RadioGroup>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-white/5 backdrop-blur-md"
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-white/5 backdrop-blur-md"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/50" />
        </div>
      </section>

      {/* Interactive Component Builder */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Build. Remix. Ship.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Drag, drop, and customize components in real-time
            </p>
          </div>

          {/* Component Builder Interface */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRemix}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Remix
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsBuilding(!isBuilding)}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isBuilding ? 'Preview' : 'Build'}
                </Button>
              </div>
            </div>

            {/* Builder Canvas */}
            <div className="p-8 min-h-[400px] relative">
              {isBuilding ? (
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-colors cursor-move"
                    draggable
                  >
                    <Button className="w-full">Draggable Button</Button>
                  </div>
                  <div 
                    className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-colors cursor-move"
                    draggable
                  >
                    <Switch />
                  </div>
                  <div 
                    className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-colors cursor-move"
                    draggable
                  >
                    <Input placeholder="Draggable Input" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-8">
                  <Button size="lg">Preview Button</Button>
                  <Switch defaultChecked />
                  <Slider className="w-32" defaultValue={[75]} />
                </div>
              )}
            </div>

            {/* Code Output */}
            <div className="border-t border-white/10 p-4 bg-black/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Generated Code</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyComponent('<Button>Your Component</Button>')}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="text-sm text-green-400">
                <code>{`<Button size="lg">Preview Button</Button>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Component Universe - Redesigned */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="h-1 w-1 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">50+ Components</span>
            </div>
            <h2 className="text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                Component Universe
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our galaxy of beautifully crafted components. Each one designed with precision, 
              accessibility, and stunning aesthetics in mind.
            </p>
            
            {/* Quick Actions */}
            <div className="flex justify-center gap-4 mt-8">
              <Link href="/components">
                <Button variant="outline" size="sm">
                  <Layers className="mr-2 h-4 w-4" />
                  Browse All
                </Button>
              </Link>
              <Link href="/playground">
                <Button variant="outline" size="sm">
                  <Code2 className="mr-2 h-4 w-4" />
                  Try Playground
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsThemeDialogOpen(true)}
              >
                <Palette className="mr-2 h-4 w-4" />
                Switch Theme
              </Button>
            </div>
          </div>

          {/* Filter Pills with liquid morphing effect */}
          <div className="flex justify-center gap-3 mb-16">
            <div className="relative p-1 rounded-full bg-white/5 backdrop-blur-md">
              <div 
                className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{
                  left: activeFilter === 'all' ? '0' : 
                        activeFilter === 'forms' ? '20%' :
                        activeFilter === 'navigation' ? '40%' :
                        activeFilter === 'display' ? '60%' : '80%',
                  width: '20%',
                }}
              />
              <div className="relative flex gap-1">
                {['all', 'forms', 'navigation', 'display', 'feedback'].map((filter) => (
                  <Button
                    key={filter}
                    size="sm"
                    variant="ghost"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "capitalize relative z-10 transition-all duration-300",
                      activeFilter === filter && "text-white"
                    )}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Bento Grid with 3D effects */}
          <div className="grid grid-cols-6 gap-4 auto-rows-[120px] lg:auto-rows-[150px] perspective-1000">
            {/* Featured Component - Extra Large */}
            <div
              className="col-span-6 lg:col-span-3 row-span-3 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              style={{
                transform: `rotateX(${parallaxY / 10}deg) rotateY(${parallaxX / 10}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-90" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md mb-4">
                    <Star className="h-3 w-3" />
                    <span className="text-xs">Featured</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Advanced Forms</h3>
                  <p className="text-white/80">Complete form solution with validation</p>
                </div>
                
                <div className="flex items-center justify-center py-8">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <Input placeholder="Name" className="bg-white/10 border-white/20" />
                    <Input placeholder="Email" className="bg-white/10 border-white/20" />
                    <div className="col-span-2">
                      <Button className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30">
                        Submit Form
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">15 components</span>
                  <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-white/20">
                    Explore
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Interactive Button Showcase */}
            <div
              className="col-span-3 lg:col-span-2 row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-90" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Buttons</h3>
                  <p className="text-sm text-white/80">12 variants</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30">Default</Button>
                  <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">Outline</Button>
                  <Button size="sm" variant="ghost" className="hover:bg-white/10">Ghost</Button>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">Gradient</Button>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Toggle Switches */}
            <div
              className="col-span-2 lg:col-span-1 row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-90" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              
              <div className="relative h-full p-6 flex flex-col justify-center items-center">
                <h3 className="text-lg font-bold mb-4">Toggles</h3>
                <div className="space-y-3">
                  <Switch defaultChecked className="scale-125" />
                  <Switch className="scale-125" />
                  <Switch defaultChecked className="scale-125" />
                </div>
              </div>
            </div>

            {/* Progress & Sliders */}
            <div
              className="col-span-4 lg:col-span-2 row-span-1 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 opacity-90" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              
              <div className="relative h-full p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Sliders</h3>
                  <p className="text-sm text-white/80">Range inputs</p>
                </div>
                <div className="flex-1 max-w-[200px] ml-6 space-y-3">
                  <Slider defaultValue={[75]} className="w-full" />
                  <Slider defaultValue={[50]} className="w-full" />
                </div>
              </div>
            </div>

            {/* Checkboxes & Radio */}
            <div
              className="col-span-2 lg:col-span-1 row-span-1 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-90" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              
              <div className="relative h-full p-6 flex items-center justify-center gap-4">
                <Checkbox defaultChecked className="scale-150" />
                <RadioGroup defaultValue="1">
                  <RadioGroupItem value="1" className="scale-150" />
                </RadioGroup>
                <Checkbox className="scale-150" />
              </div>
            </div>

            {/* Navigation Menu */}
            <div
              className="col-span-3 lg:col-span-2 row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-600 opacity-90" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Navigation</h3>
                  <p className="text-sm text-white/80">Menus & Nav bars</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10">
                    <Menu className="h-4 w-4" />
                    <span className="text-sm">Menu Item</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/20">
                    <Home className="h-4 w-4" />
                    <span className="text-sm">Active Item</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Tables */}
            <div
              className="col-span-3 lg:col-span-1 row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-600 opacity-90" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              
              <div className="relative h-full p-6 flex flex-col justify-between">
                <h3 className="text-lg font-bold mb-4">Tables</h3>
                
                <div className="space-y-1 text-xs">
                  <div className="grid grid-cols-3 gap-1 p-1 bg-white/10 rounded">
                    <div className="bg-white/10 rounded px-1">ID</div>
                    <div className="bg-white/10 rounded px-1">Name</div>
                    <div className="bg-white/10 rounded px-1">Status</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-1">
                    <div className="text-white/60">01</div>
                    <div className="text-white/60">Item</div>
                    <div className="text-green-400">Active</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-1">
                    <div className="text-white/60">02</div>
                    <div className="text-white/60">Item</div>
                    <div className="text-yellow-400">Pending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dialogs & Modals */}
            <div
              className="col-span-6 lg:col-span-3 row-span-1 group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-90" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              
              <div className="relative h-full p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Dialogs & Modals</h3>
                  <p className="text-sm text-white/80">Beautiful overlays</p>
                </div>
                <div className="flex gap-2">
                  <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md">
                    <div className="h-8 w-32 bg-white/20 rounded mb-2" />
                    <div className="h-4 w-24 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Components CTA */}
          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              View All Components
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Performance Dashboard */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Lightning Performance
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Numbers that speak louder than words
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: 'Load Speed', value: '0.3s', color: 'from-yellow-400 to-orange-400' },
              { icon: Gauge, label: 'Performance', value: '99/100', color: 'from-green-400 to-emerald-400' },
              { icon: Shield, label: 'Security', value: 'A+', color: 'from-blue-400 to-cyan-400' },
              { icon: Fingerprint, label: 'Accessibility', value: '100%', color: 'from-purple-400 to-pink-400' },
            ].map((metric, index) => (
              <div
                key={metric.label}
                className="relative group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                  style={{
                    background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />
                <div className="relative rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-8 hover:border-white/20 transition-all">
                  <metric.icon className="h-8 w-8 mb-4 text-white" />
                  <div className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Footer */}
      <footer className="relative py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Radix UI Lab
              </h3>
              <p className="text-muted-foreground mb-6">
                The future of component libraries. Built for developers who refuse to settle.
              </p>
              <div className="flex gap-4">
                <Button size="sm" variant="ghost" className="bg-white/5">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="bg-white/5">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="bg-white/5">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/components" className="hover:text-white transition-colors">Components</Link></li>
                <li><Link href="/playground" className="hover:text-white transition-colors">Playground</Link></li>
                <li><Link href="/themes" className="hover:text-white transition-colors">Themes</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/showcase" className="hover:text-white transition-colors">Showcase</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Radix UI Lab. Crafted with ❤️ and lots of ☕
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Moon className="h-4 w-4" />
                <span>Always Dark Mode</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-10deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .delay-75 {
          animation-delay: 75ms;
        }
        
        .delay-150 {
          animation-delay: 150ms;
        }

        /* Custom cursor styles - temporarily showing default cursor for visibility */
        /* * {
          cursor: none !important;
        } */
      `}</style>
    </div>
  )
}