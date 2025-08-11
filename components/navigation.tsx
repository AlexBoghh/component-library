'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/primitives/button'
// Theme switcher removed - only available in playground
import { 
  Home, 
  Square, 
  MessageSquare, 
  Menu,
  X,
  Play,
  BookOpen,
  FileEdit,
  ChevronDown,
  Palette,
  Zap,
  Layers,
  Navigation as NavigationIcon,
  Terminal,
  Sparkles,
  Settings,
  Code2,
  FlaskConical,
  Activity,
  BarChart3,
  Eye,
  Gauge,
  FileText
} from 'lucide-react'

const navigationItems = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Components',
    href: '/components',
    icon: Layers,
    description: 'Browse all components'
  },
  {
    title: 'Playground',
    href: '/playground',
    icon: Code2,
    description: 'Test components live'
  },
  {
    title: 'Showcase',
    icon: Eye,
    description: 'Explore our showcases',
    items: [
      { 
        title: 'Theme Gallery', 
        href: '/themes', 
        icon: Palette,
        description: 'Browse all available themes'
      },
      { 
        title: 'Performance Metrics', 
        href: '/metrics', 
        icon: BarChart3,
        description: 'View performance dashboard'
      },
      { 
        type: 'separator' 
      },
      { 
        type: 'label',
        title: 'Standard Theme'
      },
      { title: 'Buttons', href: '/button-demo', icon: Square },
      { title: 'Forms', href: '/form-builder', icon: FileEdit },
      { title: 'Dialogs', href: '/dialog-demo', icon: MessageSquare },
      { title: 'Select', href: '/select-demo', icon: ChevronDown },
      { title: 'Tables', href: '/table-demo', icon: Square },
      { title: 'Toast', href: '/toast-demo', icon: MessageSquare },
      { 
        type: 'separator' 
      },
      { 
        type: 'label',
        title: 'Cyberpunk Theme'
      },
      { title: 'Neon Buttons', href: '/cyberpunk-buttons', icon: Zap },
      { title: 'Simple Buttons', href: '/cyberpunk-buttons-simple', icon: Square },
      { title: 'Cyber Forms', href: '/cyberpunk-forms', icon: Terminal },
      { title: 'Overlays', href: '/cyberpunk-overlays', icon: Layers },
      { title: 'Navigation', href: '/cyberpunk-navigation', icon: NavigationIcon },
      { title: 'Effects Library', href: '/cyberpunk-effects', icon: Zap },
    ]
  },
  {
    title: 'Docs',
    href: '/docs',
    icon: FileText,
    description: 'Documentation'
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [openDropdowns, setOpenDropdowns] = React.useState<string[]>([])
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (title: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoveredItem(title)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 100) // Small delay to allow moving to submenu
  }

  const toggleDropdown = (title: string) => {
    setOpenDropdowns(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href
  const isGroupActive = (items: any[]) => items?.some(item => item.href && pathname === item.href)

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-[40] w-full border-b border-border/50 bg-[#0a0a0f] backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center px-4 bg-transparent">
        <div className="mr-6 flex">
          <Link href="/" className="mr-8 flex items-center space-x-2 transition-colors hover:text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Square className="h-4 w-4" />
            </div>
            <span className="font-bold text-lg">Radix UI Lab</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {navigationItems.map((item) => {
            if (item.items) {
              return (
                <div 
                  key={item.title} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                      "hover:bg-accent/80 hover:text-accent-foreground hover:shadow-md hover:scale-[1.02]",
                      "active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      isGroupActive(item.items) 
                        ? "bg-accent/60 text-accent-foreground shadow-sm font-medium" 
                        : "text-foreground/80 hover:text-accent-foreground font-medium"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.title}</span>
                    <ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {hoveredItem === item.title && (
                    <div 
                      className="absolute top-full left-0 pt-2"
                      onMouseEnter={() => handleMouseEnter(item.title)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-80 rounded-xl border border-[#2a2a33] bg-[#1a1a22] backdrop-blur-xl p-4 shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                      {item.items.map((subItem, index) => {
                        if (subItem.type === 'separator') {
                          return <div key={index} className="my-3 h-px bg-border/60" />
                        }
                        if (subItem.type === 'label') {
                          return (
                            <div key={index} className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              {subItem.title}
                            </div>
                          )
                        }
                        return (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={cn(
                              "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                              "hover:bg-accent/80 hover:text-accent-foreground hover:shadow-md hover:scale-[1.02]",
                              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                              isActive(subItem.href) 
                                ? "bg-accent/60 text-accent-foreground shadow-sm border border-accent/20" 
                                : "text-popover-foreground/80 hover:text-accent-foreground"
                            )}
                          >
                            <subItem.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">{subItem.title}</div>
                              {subItem.description && (
                                <div className="text-xs text-muted-foreground mt-0.5">{subItem.description}</div>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            
            return (
              <Link
                key={item.title}
                href={item.href!}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                  "hover:bg-accent/80 hover:text-accent-foreground hover:shadow-md hover:scale-[1.02]",
                  "active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isActive(item.href!) 
                    ? "bg-accent/60 text-accent-foreground shadow-sm font-medium border border-accent/20" 
                    : "text-foreground/80 hover:text-accent-foreground font-medium"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-3">
          {/* Divider */}
          <div className="h-6 w-px bg-border/60" />
          {/* Theme Controls */}
          <div className="flex items-center space-x-1">
            {/* Theme switcher removed - only available in playground */}
          </div>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2a2a33] bg-[#0a0a0f] backdrop-blur-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              if (item.items) {
                return (
                  <div key={item.title}>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent/60",
                        isGroupActive(item.items) && "bg-accent/40 shadow-sm"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 transition-transform duration-200 opacity-60",
                          openDropdowns.includes(item.title) && "rotate-180"
                        )}
                      />
                    </button>
                    
                    {openDropdowns.includes(item.title) && (
                      <div className="ml-6 mt-2 space-y-1 border-l border-border/40 pl-4">
                        {item.items.map((subItem, index) => {
                          if (subItem.type === 'separator') {
                            return <div key={index} className="my-3 h-px bg-border/60" />
                          }
                          if (subItem.type === 'label') {
                            return (
                              <div key={index} className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                {subItem.title}
                              </div>
                            )
                          }
                          return (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-accent/60",
                                isActive(subItem.href) && "bg-accent/40 shadow-sm"
                              )}
                            >
                              <subItem.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <span>{subItem.title}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.title}
                  href={item.href!}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent/60",
                    isActive(item.href!) && "bg-accent/40 shadow-sm"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}