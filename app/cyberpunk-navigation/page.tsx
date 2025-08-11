'use client'

import React from 'react'
import { 
  Home,
  Terminal, 
  Database,
  Shield,
  Settings,
  User,
  Lock,
  Globe,
  Zap,
  ChevronRight,
  ChevronDown,
  Command,
  Search,
  Menu,
  X,
  Power,
  Cpu,
  Wifi,
  Activity,
  Server,
  Code,
  FileText,
  FolderOpen,
  GitBranch,
  Cloud,
  MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CyberpunkNavigationPage() {
  const [activeNav, setActiveNav] = React.useState('dashboard')
  const [activeTab, setActiveTab] = React.useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)
  const [commandSearch, setCommandSearch] = React.useState('')
  const [dropdownOpen, setDropdownOpen] = React.useState<string | null>(null)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'terminal', label: 'Terminal', icon: Terminal, badge: 'ACTIVE' },
    { id: 'database', label: 'Database', icon: Database, badge: null },
    { id: 'security', label: 'Security', icon: Shield, badge: 'LOCKED', hasDropdown: true },
    { id: 'settings', label: 'Settings', icon: Settings, badge: 'NEW' },
    { id: 'profile', label: 'Profile', icon: User, badge: null }
  ]

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: Server },
    { id: 'logs', label: 'System Logs', icon: FileText },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'resources', label: 'Resources', icon: Cpu }
  ]

  const breadcrumbPath = [
    { label: 'System', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Analytics', href: '#' },
    { label: 'Real-time Metrics', href: '#', current: true }
  ]

  const commandPaletteItems = [
    { id: 'new-file', label: 'Create New File', icon: FileText, shortcut: 'Ctrl+N' },
    { id: 'open-folder', label: 'Open Folder', icon: FolderOpen, shortcut: 'Ctrl+O' },
    { id: 'git-commit', label: 'Git: Commit', icon: GitBranch, shortcut: 'Ctrl+K' },
    { id: 'deploy', label: 'Deploy to Cloud', icon: Cloud, shortcut: 'Ctrl+D' },
    { id: 'terminal', label: 'Open Terminal', icon: Terminal, shortcut: 'Ctrl+`' },
    { id: 'search', label: 'Search Files', icon: Search, shortcut: 'Ctrl+P' },
    { id: 'chat', label: 'Open Chat', icon: MessageSquare, shortcut: 'Ctrl+M' }
  ]

  const filteredCommands = commandPaletteItems.filter(item =>
    item.label.toLowerCase().includes(commandSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Scan Lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan" />
      </div>

      <div className="relative z-10">
        {/* Page Header */}
        <div className="text-center py-12 px-6">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
            CYBERPUNK NAVIGATION
          </h1>
          <p className="text-cyan-400 text-xl font-mono">
            NAVIGATION SYSTEM INTERFACE v3.1.4
          </p>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Advanced navigation components with terminal aesthetics and neon effects
          </p>
        </div>

        {/* Navigation Menu Section */}
        <section className="mb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-cyan-400 mb-2 flex items-center gap-3">
                <Terminal className="w-8 h-8 animate-pulse" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))' }} />
                NAVIGATION MENU
              </h2>
              <p className="text-gray-400 ml-11">Horizontal navigation with dropdown menus and state badges</p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" 
                style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }} />
            </div>

            {/* Desktop Navigation */}
            <div className="bg-black/50 border border-cyan-400/30 rounded-lg overflow-hidden backdrop-blur-sm"
              style={{
                boxShadow: `
                  0 0 20px rgba(6, 182, 212, 0.3),
                  inset 0 0 20px rgba(6, 182, 212, 0.05)
                `
              }}
            >
              <div className="px-6 py-3 border-b border-cyan-400/30 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-cyan-400 font-mono text-sm flex items-center gap-2">
                      <span className="animate-pulse">▶</span>
                      SYSTEM MENU
                      <span className="w-2 h-4 bg-cyan-400 animate-blink" />
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Desktop Menu Items */}
              <nav className="hidden lg:block">
                <ul className="flex items-center">
                  {navigationItems.map((item) => (
                    <li key={item.id} className="relative">
                      <button
                        onClick={() => {
                          setActiveNav(item.id)
                          if (item.hasDropdown) {
                            setDropdownOpen(dropdownOpen === item.id ? null : item.id)
                          } else {
                            setDropdownOpen(null)
                          }
                        }}
                        className={cn(
                          "relative px-6 py-4 flex items-center gap-2 font-mono text-sm transition-all duration-300",
                          "hover:text-cyan-400 hover:bg-cyan-400/10",
                          activeNav === item.id ? "text-cyan-400" : "text-gray-400"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown className={cn(
                            "w-3 h-3 transition-transform",
                            dropdownOpen === item.id && "rotate-180"
                          )} />
                        )}
                        {item.badge && (
                          <span className={cn(
                            "ml-2 px-2 py-0.5 text-xs font-bold rounded",
                            item.badge === 'ACTIVE' && "bg-green-400/20 text-green-400 animate-pulse",
                            item.badge === 'LOCKED' && "bg-red-400/20 text-red-400",
                            item.badge === 'NEW' && "bg-purple-400/20 text-purple-400"
                          )}>
                            {item.badge}
                          </span>
                        )}
                        {activeNav === item.id && (
                          <>
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                              style={{
                                boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                          </>
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      {item.hasDropdown && dropdownOpen === item.id && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-black/95 border border-cyan-400/30 rounded-lg overflow-hidden backdrop-blur-md"
                          style={{
                            boxShadow: `
                              0 0 20px rgba(6, 182, 212, 0.5),
                              inset 0 0 20px rgba(6, 182, 212, 0.1)
                            `,
                            background: `
                              linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,50,50,0.95) 100%),
                              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)
                            `
                          }}
                        >
                          <div className="py-2">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                              <Lock className="inline w-3 h-3 mr-2" />
                              Access Control
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                              <Shield className="inline w-3 h-3 mr-2" />
                              Firewall Settings
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                              <Zap className="inline w-3 h-3 mr-2" />
                              Threat Detection
                            </a>
                            <div className="border-t border-cyan-400/30 my-2" />
                            <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-all">
                              <Power className="inline w-3 h-3 mr-2" />
                              Emergency Shutdown
                            </a>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/95 z-50 overflow-y-auto">
                  <div className="min-h-screen p-6">
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-cyan-400 font-mono text-lg">SYSTEM MENU</div>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {navigationItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveNav(item.id)
                            setMobileMenuOpen(false)
                          }}
                          className={cn(
                            "w-full px-4 py-3 flex items-center gap-3 font-mono text-left transition-all",
                            "border border-cyan-400/30 rounded-lg",
                            "hover:bg-cyan-400/10 hover:border-cyan-400",
                            activeNav === item.id && "bg-cyan-400/20 border-cyan-400 text-cyan-400"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              "ml-auto px-2 py-0.5 text-xs font-bold rounded",
                              item.badge === 'ACTIVE' && "bg-green-400/20 text-green-400",
                              item.badge === 'LOCKED' && "bg-red-400/20 text-red-400",
                              item.badge === 'NEW' && "bg-purple-400/20 text-purple-400"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-purple-400 mb-2 flex items-center gap-3">
                <Server className="w-8 h-8 animate-pulse" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))' }} />
                TABBED INTERFACE
              </h2>
              <p className="text-gray-400 ml-11">Tech panel tabs with circuit connections and scan animations</p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" 
                style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }} />
            </div>

            {/* Standard Tabs */}
            <div className="mb-8">
              <h3 className="text-lg font-mono text-purple-400 mb-4">▶ Standard Tabs</h3>
              <div className="bg-black/50 border border-purple-400/30 rounded-lg overflow-hidden backdrop-blur-sm"
                style={{
                  boxShadow: `
                    0 0 20px rgba(147, 51, 234, 0.3),
                    inset 0 0 20px rgba(147, 51, 234, 0.05)
                  `
                }}
              >
                <div className="border-b border-purple-400/30">
                  <div className="flex items-center relative">
                    {/* Circuit Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-purple-400/20" />
                    
                    {tabItems.map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "relative px-6 py-4 flex items-center gap-2 font-mono text-sm transition-all duration-300",
                          "border-r border-purple-400/20",
                          activeTab === tab.id
                            ? "bg-purple-400/10 text-purple-400"
                            : "text-gray-400 hover:text-purple-400 hover:bg-purple-400/5"
                        )}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                        {activeTab === tab.id && (
                          <>
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-purple-400"
                              style={{
                                boxShadow: '0 0 10px rgba(147, 51, 234, 0.8)',
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
                              style={{
                                boxShadow: '0 0 10px rgba(147, 51, 234, 0.8)',
                              }}
                            />
                            <div className="absolute inset-0 bg-purple-400/5" />
                          </>
                        )}
                        {/* Circuit Dot */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"
                          style={{
                            boxShadow: '0 0 8px rgba(147, 51, 234, 0.8)',
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 min-h-[200px] relative overflow-hidden">
                  <div className="animate-scan-in">
                    <h4 className="text-xl font-mono text-purple-400 mb-4">
                      {tabItems.find(t => t.id === activeTab)?.label}
                    </h4>
                    <div className="text-gray-400 font-mono text-sm space-y-2">
                      <p>▶ System Status: <span className="text-green-400">ONLINE</span></p>
                      <p>▶ Last Update: <span className="text-purple-400">2.3 seconds ago</span></p>
                      <p>▶ Data Stream: <span className="text-cyan-400">ACTIVE</span></p>
                      <p>▶ Connection: <span className="text-green-400">SECURE</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Tabs Variant */}
            <div>
              <h3 className="text-lg font-mono text-purple-400 mb-4">▶ Terminal Tabs</h3>
              <div className="bg-black border border-green-400/50 rounded-lg overflow-hidden font-mono"
                style={{
                  boxShadow: `
                    0 0 20px rgba(74, 222, 128, 0.3),
                    inset 0 0 20px rgba(74, 222, 128, 0.05)
                  `
                }}
              >
                <div className="border-b-2 border-green-400/50 bg-green-950/30">
                  <div className="flex">
                    {tabItems.slice(0, 3).map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "px-4 py-2 text-sm transition-all",
                          activeTab === tab.id
                            ? "bg-green-400/20 text-green-400 border-l border-r border-t border-green-400"
                            : "text-green-400/60 hover:text-green-400 hover:bg-green-400/10"
                        )}
                      >
                        [{tab.label}]
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4 text-green-400 text-sm">
                  <div className="mb-2">┌─────────────────────────────────────────┐</div>
                  <div className="px-2">
                    <p>│ Terminal: {tabItems.find(t => t.id === activeTab)?.label}</p>
                    <p>│ Status: Connected</p>
                    <p>│ $ <span className="animate-blink">_</span></p>
                  </div>
                  <div className="mt-2">└─────────────────────────────────────────┘</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs Section */}
        <section className="mb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-green-400 mb-2 flex items-center gap-3">
                <ChevronRight className="w-8 h-8 animate-pulse" style={{ filter: 'drop-shadow(0 0 10px rgba(74, 222, 128, 0.8))' }} />
                BREADCRUMBS
              </h2>
              <p className="text-gray-400 ml-11">Path navigation with neon separators and power symbols</p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" 
                style={{ boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)' }} />
            </div>

            {/* Standard Breadcrumbs */}
            <div className="mb-6">
              <div className="bg-black/50 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm"
                style={{
                  boxShadow: `
                    0 0 20px rgba(74, 222, 128, 0.3),
                    inset 0 0 20px rgba(74, 222, 128, 0.05)
                  `
                }}
              >
                <nav className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-green-400">PATH:</span>
                  <Power className="w-4 h-4 text-green-400" style={{ filter: 'drop-shadow(0 0 5px rgba(74, 222, 128, 0.8))' }} />
                  {breadcrumbPath.map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <ChevronRight className="w-4 h-4 text-green-400 animate-pulse" />
                      )}
                      <a
                        href={item.href}
                        className={cn(
                          "transition-all duration-300",
                          item.current
                            ? "text-green-400 font-bold"
                            : "text-gray-400 hover:text-green-400"
                        )}
                        style={{
                          textShadow: item.current ? '0 0 10px rgba(74, 222, 128, 0.8)' : undefined
                        }}
                      >
                        {item.label}
                      </a>
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            </div>

            {/* Alternative Style with Slash */}
            <div>
              <div className="bg-black/50 border border-cyan-400/30 rounded-lg p-4 backdrop-blur-sm"
                style={{
                  boxShadow: `
                    0 0 20px rgba(6, 182, 212, 0.3),
                    inset 0 0 20px rgba(6, 182, 212, 0.05)
                  `
                }}
              >
                <nav className="flex items-center gap-2 font-mono text-sm">
                  <Home className="w-4 h-4 text-cyan-400" style={{ filter: 'drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))' }} />
                  {breadcrumbPath.map((item, index) => (
                    <React.Fragment key={index}>
                      <span className="text-cyan-400">/</span>
                      <a
                        href={item.href}
                        className={cn(
                          "transition-all duration-300",
                          item.current
                            ? "text-cyan-400 font-bold px-2 py-1 bg-cyan-400/20 rounded"
                            : "text-gray-400 hover:text-cyan-400"
                        )}
                      >
                        {item.label}
                      </a>
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Command Palette Section */}
        <section className="mb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-pink-400 mb-2 flex items-center gap-3">
                <Command className="w-8 h-8 animate-pulse" style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8))' }} />
                COMMAND PALETTE
              </h2>
              <p className="text-gray-400 ml-11">Terminal-style command interface with keyboard shortcuts</p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" 
                style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }} />
            </div>

            <div className="bg-black/90 border-2 border-green-400/50 rounded-lg overflow-hidden backdrop-blur-sm"
              style={{
                boxShadow: `
                  0 0 30px rgba(74, 222, 128, 0.5),
                  inset 0 0 30px rgba(74, 222, 128, 0.1)
                `,
                fontFamily: 'JetBrains Mono, Consolas, monospace'
              }}
            >
              {/* Command Input */}
              <div className="border-b border-green-400/30 bg-green-950/30">
                <div className="px-4 py-3 flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-green-400" />
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-green-400">$</span>
                    <input
                      type="text"
                      value={commandSearch}
                      onChange={(e) => setCommandSearch(e.target.value)}
                      placeholder="Type a command..."
                      className="flex-1 bg-transparent text-green-400 outline-none placeholder-green-400/50"
                      onFocus={() => setCommandPaletteOpen(true)}
                    />
                    <span className="w-2 h-4 bg-green-400 animate-blink" />
                  </div>
                  <kbd className="px-2 py-1 text-xs bg-green-400/20 text-green-400 border border-green-400/50 rounded">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Command Results */}
              {commandPaletteOpen && (
                <div className="max-h-96 overflow-y-auto">
                  {/* Matrix Background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 255, 0, 0.1) 2px,
                        rgba(0, 255, 0, 0.1) 4px
                      )`
                    }}
                  />
                  
                  <div className="relative z-10 p-2">
                    {filteredCommands.length > 0 ? (
                      filteredCommands.map((cmd) => (
                        <button
                          key={cmd.id}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-green-400/10 transition-all rounded group"
                        >
                          <div className="flex items-center gap-3">
                            <cmd.icon className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm">{cmd.label}</span>
                          </div>
                          <kbd className="px-2 py-1 text-xs bg-green-400/20 text-green-400 border border-green-400/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {cmd.shortcut}
                          </kbd>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-green-400/50 text-sm">
                        No commands found matching "{commandSearch}"
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              {commandPaletteOpen && (
                <div className="border-t border-green-400/30 px-4 py-2 bg-green-950/30">
                  <div className="flex items-center justify-between text-xs text-green-400/70">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-green-400/20 border border-green-400/50 rounded">↑↓</kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-green-400/20 border border-green-400/50 rounded">Enter</kbd>
                        Select
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-green-400/20 border border-green-400/50 rounded">Esc</kbd>
                        Close
                      </span>
                    </div>
                    <div className="text-green-400">
                      {filteredCommands.length} results
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes scan-in {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        .animate-scan-in {
          animation: scan-in 0.5s ease-out;
        }
        
        .animate-blink {
          animation: blink 1s linear infinite;
        }
      `}</style>
    </div>
  )
}