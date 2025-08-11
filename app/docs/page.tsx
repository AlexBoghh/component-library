'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/primitives/navigation-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/primitives/collapsible'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/primitives/sheet'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/primitives/command'
import { Button } from '@/components/ui/primitives/button'
import { Input } from '@/components/ui/primitives/input'
import { cn } from '@/lib/utils'
import {
  Search,
  Menu,
  ChevronRight,
  ChevronDown,
  Home,
  BookOpen,
  Code2,
  Palette,
  Package,
  Settings,
  FileText,
  Layers,
  Component,
  Zap,
  Moon,
  Sun,
  Laptop,
  Github,
  Twitter,
  FileCode,
  Terminal,
  Gauge,
  Globe,
  Database,
  Shield,
} from 'lucide-react'
import { useTheme } from '@/lib/hooks/use-theme'

// Navigation structure
const navigationItems = {
  gettingStarted: [
    { title: 'Introduction', href: '/docs', icon: BookOpen },
    { title: 'Installation', href: '/docs/installation', icon: Package },
    { title: 'Project Structure', href: '/docs/structure', icon: Layers },
    { title: 'Configuration', href: '/docs/configuration', icon: Settings },
  ],
  components: [
    { title: 'Button', href: '/docs/components/button', icon: Component },
    { title: 'Dialog', href: '/docs/components/dialog', icon: FileText },
    { title: 'Select', href: '/docs/components/select', icon: ChevronDown },
    { title: 'Navigation', href: '/docs/components/navigation', icon: Menu },
    { title: 'Form', href: '/docs/components/form', icon: FileCode },
    { title: 'Table', href: '/docs/components/table', icon: Database },
  ],
  theming: [
    { title: 'Overview', href: '/docs/theming', icon: Palette },
    { title: 'Colors', href: '/docs/theming/colors', icon: Palette },
    { title: 'Typography', href: '/docs/theming/typography', icon: FileText },
    { title: 'Spacing', href: '/docs/theming/spacing', icon: Layers },
  ],
  advanced: [
    { title: 'Performance', href: '/docs/advanced/performance', icon: Gauge },
    { title: 'Accessibility', href: '/docs/advanced/accessibility', icon: Globe },
    { title: 'Security', href: '/docs/advanced/security', icon: Shield },
    { title: 'Testing', href: '/docs/advanced/testing', icon: Terminal },
  ],
}

// Sidebar sections
const sidebarSections = [
  {
    title: 'Getting Started',
    items: navigationItems.gettingStarted,
    defaultOpen: true,
  },
  {
    title: 'Components',
    items: navigationItems.components,
    defaultOpen: true,
  },
  {
    title: 'Theming',
    items: navigationItems.theming,
    defaultOpen: false,
  },
  {
    title: 'Advanced',
    items: navigationItems.advanced,
    defaultOpen: false,
  },
]

// Search items for command palette
const searchItems = [
  ...navigationItems.gettingStarted.map(item => ({ ...item, category: 'Getting Started' })),
  ...navigationItems.components.map(item => ({ ...item, category: 'Components' })),
  ...navigationItems.theming.map(item => ({ ...item, category: 'Theming' })),
  ...navigationItems.advanced.map(item => ({ ...item, category: 'Advanced' })),
]

export default function DocsPage() {
  const pathname = usePathname()
  const { mode, setMode } = useTheme()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  // Keyboard shortcut for command palette
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Breadcrumb generation
  const breadcrumbs = React.useMemo(() => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/')
      const title = path.charAt(0).toUpperCase() + path.slice(1)
      return { title, href }
    })
  }, [pathname])

  const SidebarContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Documentation
        </h2>
        <div className="space-y-1">
          {sidebarSections.map((section) => (
            <Collapsible
              key={section.title}
              defaultOpen={section.defaultOpen}
              className="space-y-2"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                {section.title}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          {/* Mobile Menu Trigger */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle>Documentation</SheetTitle>
                <SheetDescription>
                  Navigate through the documentation
                </SheetDescription>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Radix Docs
            </span>
          </Link>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/docs"
                        >
                          <BookOpen className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Documentation
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Learn how to build modern web applications with our component library.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {navigationItems.gettingStarted.slice(1).map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.title === 'Installation' && 'Get started with our components'}
                              {item.title === 'Project Structure' && 'Understand the file organization'}
                              {item.title === 'Configuration' && 'Configure your environment'}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navigationItems.components.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <span className="text-sm font-medium leading-none">{item.title}</span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Interactive {item.title.toLowerCase()} component with variants
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/playground" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Playground
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/examples" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Examples
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="ml-auto flex items-center space-x-4">
            {/* Search trigger */}
            <Button
              variant="outline"
              className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="h-4 w-4 xl:mr-2" />
              <span className="hidden xl:inline-flex">Search docs...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* GitHub */}
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="container flex h-12 items-center px-4 text-sm">
          <nav className="flex items-center space-x-2">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link
                  href={crumb.href}
                  className={cn(
                    "hover:text-foreground",
                    index === breadcrumbs.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {crumb.title}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Desktop Sidebar */}
        <aside className="fixed top-[8rem] z-30 -ml-2 hidden h-[calc(100vh-8rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
          <SidebarContent />
        </aside>

        {/* Page Content */}
        <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
                <p className="text-muted-foreground mt-4 text-lg">
                  Welcome to the Radix UI documentation. Learn how to build accessible, 
                  high-quality web applications with our comprehensive component library.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
                  <Zap className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Quick Start</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get up and running with our components in minutes
                  </p>
                  <Link href="/docs/installation" className="text-sm text-primary hover:underline">
                    Start building →
                  </Link>
                </div>

                <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
                  <Component className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Components</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore our collection of accessible UI components
                  </p>
                  <Link href="/docs/components/button" className="text-sm text-primary hover:underline">
                    Browse components →
                  </Link>
                </div>

                <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
                  <Palette className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Theming</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize the look and feel of your application
                  </p>
                  <Link href="/docs/theming" className="text-sm text-primary hover:underline">
                    Learn theming →
                  </Link>
                </div>
              </div>

              {/* Example Content */}
              <div className="prose dark:prose-invert max-w-none">
                <h2>Getting Started</h2>
                <p>
                  Radix UI is a collection of low-level UI primitives that help you build 
                  high-quality, accessible design systems and web applications.
                </p>
                
                <h3>Why Radix UI?</h3>
                <ul>
                  <li>Accessible by default - WAI-ARIA compliant</li>
                  <li>Unstyled components - bring your own styles</li>
                  <li>Composable architecture - mix and match as needed</li>
                  <li>Developer experience - great TypeScript support</li>
                </ul>

                <h3>Installation</h3>
                <p>Install Radix UI primitives from npm:</p>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <code>npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Table of Contents (Desktop) */}
          <div className="hidden xl:block">
            <div className="sticky top-[8rem] h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="space-y-2">
                <p className="font-medium">On This Page</p>
                <ul className="m-0 list-none space-y-2 text-sm">
                  <li>
                    <a href="#getting-started" className="text-muted-foreground hover:text-foreground">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="#why-radix" className="text-muted-foreground hover:text-foreground">
                      Why Radix UI?
                    </a>
                  </li>
                  <li>
                    <a href="#installation" className="text-muted-foreground hover:text-foreground">
                      Installation
                    </a>
                  </li>
                  <li>
                    <a href="#first-component" className="text-muted-foreground hover:text-foreground">
                      Your First Component
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(
            searchItems.reduce((acc, item) => {
              if (!acc[item.category]) acc[item.category] = []
              acc[item.category].push(item)
              return acc
            }, {} as Record<string, typeof searchItems>)
          ).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    setCommandOpen(false)
                    window.location.href = item.href
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => setMode('light')}>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </CommandItem>
            <CommandItem onSelect={() => setMode('dark')}>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}