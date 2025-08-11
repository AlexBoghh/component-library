'use client'

import React from 'react'
import {
  CyberpunkCard,
  CyberpunkCardHeader,
  CyberpunkCardTitle,
  CyberpunkCardDescription,
  CyberpunkCardContent,
  CyberpunkCardFooter
} from '@/components/ui/primitives/card-cyberpunk'
import {
  CyberpunkDialog,
  CyberpunkDialogContent,
  CyberpunkDialogDescription,
  CyberpunkDialogHeader,
  CyberpunkDialogTitle,
  CyberpunkDialogTrigger,
  CyberpunkDialogFooter
} from '@/components/ui/primitives/dialog-cyberpunk'
import {
  CyberpunkPopover,
  CyberpunkPopoverContent,
  CyberpunkPopoverTrigger
} from '@/components/ui/primitives/popover-cyberpunk'
import {
  CyberpunkTooltip,
  CyberpunkTooltipContent,
  CyberpunkTooltipProvider,
  CyberpunkTooltipTrigger
} from '@/components/ui/primitives/tooltip-cyberpunk'
import { CyberpunkButton } from '@/components/ui/primitives/button-cyberpunk'
import { 
  Info, 
  AlertTriangle, 
  Shield, 
  Lock,
  Terminal,
  Database,
  Cpu,
  Wifi,
  Activity,
  Zap,
  Server,
  Globe,
  Layers,
  Command,
  MessageSquare,
  HelpCircle
} from 'lucide-react'

export default function CyberpunkOverlaysPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Scan Lines Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan-slow" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center py-16">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse-slow">
            CYBERPUNK OVERLAYS
          </h1>
          <p className="text-cyan-400 text-xl font-mono">
            ADVANCED UI OVERLAY COMPONENTS v2.077
          </p>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Futuristic overlay components with holographic effects, glassmorphism, and neon aesthetics
          </p>
        </div>

        {/* Cards Section */}
        <section className="py-16">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-8 h-8 text-cyan-400 animate-pulse" 
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))',
                }}
              />
              <h2 className="text-3xl font-bold text-cyan-400">
                CARDS & CONTAINERS
              </h2>
            </div>
            <p className="text-gray-400 ml-11">
              Data containers with glassmorphism, LED indicators, and terminal aesthetics
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" 
              style={{
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* System Status Card */}
            <div className="group">
              <CyberpunkCard 
                variant="default" 
                showLEDs 
                showScanline={false}
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: `
                    0 0 10px rgba(6, 182, 212, 0.5),
                    0 0 20px rgba(6, 182, 212, 0.3),
                    0 0 40px rgba(6, 182, 212, 0.1),
                    inset 0 0 10px rgba(6, 182, 212, 0.05)
                  `
                }}
              >
                <CyberpunkCardHeader showActivity>
                  <CyberpunkCardTitle className="text-xl">System Status</CyberpunkCardTitle>
                  <CyberpunkCardDescription className="text-gray-300">
                    Neural network operational
                  </CyberpunkCardDescription>
                </CyberpunkCardHeader>
                <CyberpunkCardContent className="p-6">
                  <div className="space-y-3 font-mono">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">CPU Usage:</span>
                      <span className="text-cyan-400 font-bold">47%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Memory:</span>
                      <span className="text-cyan-400 font-bold">8.2 GB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Network:</span>
                      <span className="text-green-400 font-bold animate-pulse">CONNECTED</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Status:</span>
                      <span className="text-emerald-400 font-bold px-2 py-1 bg-emerald-400/20 rounded">
                        OPTIMAL
                      </span>
                    </div>
                  </div>
                </CyberpunkCardContent>
                <CyberpunkCardFooter className="p-6">
                  <CyberpunkButton 
                    variant="outline" 
                    size="sm"
                    className="w-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                    style={{
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
                    }}
                  >
                    <Terminal className="mr-2 h-4 w-4" />
                    VIEW LOGS
                  </CyberpunkButton>
                </CyberpunkCardFooter>
              </CyberpunkCard>
            </div>

            {/* Terminal Output Card */}
            <div className="group">
              <CyberpunkCard 
                variant="terminal" 
                showLEDs 
                accessAnimation
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-black/80"
                style={{
                  backdropFilter: 'blur(10px)',
                  fontFamily: 'JetBrains Mono, Consolas, monospace',
                  boxShadow: `
                    0 0 10px rgba(74, 222, 128, 0.5),
                    0 0 20px rgba(74, 222, 128, 0.3),
                    0 0 40px rgba(74, 222, 128, 0.1),
                    inset 0 0 10px rgba(74, 222, 128, 0.05)
                  `
                }}
              >
                <CyberpunkCardHeader className="border-b border-green-400/30">
                  <CyberpunkCardTitle className="text-xl text-green-400">
                    Terminal Output
                  </CyberpunkCardTitle>
                </CyberpunkCardHeader>
                <CyberpunkCardContent className="p-6 font-mono">
                  <div className="text-sm text-green-400 space-y-2">
                    <div className="opacity-60">$ initializing system...</div>
                    <div className="opacity-70">$ loading kernel modules...</div>
                    <div className="opacity-80">$ establishing connection...</div>
                    <div className="text-green-500 font-bold">$ STATUS: ONLINE</div>
                    <div className="flex items-center">
                      <span>$ </span>
                      <span className="ml-1 w-2 h-4 bg-green-400 animate-blink" />
                    </div>
                  </div>
                </CyberpunkCardContent>
              </CyberpunkCard>
            </div>

            {/* Holographic Display Card */}
            <div className="group">
              <CyberpunkCard 
                variant="hologram" 
                showLEDs
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: `
                    0 0 10px rgba(147, 51, 234, 0.5),
                    0 0 20px rgba(147, 51, 234, 0.3),
                    0 0 40px rgba(147, 51, 234, 0.1),
                    inset 0 0 10px rgba(147, 51, 234, 0.05)
                  `
                }}
              >
                <CyberpunkCardHeader>
                  <CyberpunkCardTitle className="text-xl">Holographic Display</CyberpunkCardTitle>
                </CyberpunkCardHeader>
                <CyberpunkCardContent className="p-6">
                  <div className="text-blue-300 font-mono space-y-2">
                    <p className="flex justify-between">
                      <span>Quantum processing:</span>
                      <span className="text-purple-400 font-bold">ENABLED</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Photonic relay:</span>
                      <span className="text-purple-400 font-bold">ACTIVE</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Reality mesh:</span>
                      <span className="text-purple-400 font-bold">STABLE</span>
                    </p>
                  </div>
                </CyberpunkCardContent>
              </CyberpunkCard>
            </div>

            {/* Classified Data Card */}
            <div className="group">
              <CyberpunkCard 
                variant="secure" 
                stamp="CLASSIFIED" 
                showScanline
                showLEDs
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: `
                    0 0 10px rgba(239, 68, 68, 0.5),
                    0 0 20px rgba(239, 68, 68, 0.3),
                    0 0 40px rgba(239, 68, 68, 0.1),
                    inset 0 0 10px rgba(239, 68, 68, 0.05)
                  `
                }}
              >
                <CyberpunkCardHeader className="mt-8">
                  <CyberpunkCardTitle className="text-xl">Classified Data</CyberpunkCardTitle>
                </CyberpunkCardHeader>
                <CyberpunkCardContent className="p-6">
                  <div className="text-red-300 font-mono space-y-2">
                    <p className="text-red-400 font-bold">[REDACTED]</p>
                    <p>Authorization Level: <span className="text-red-400 font-bold">OMEGA</span></p>
                    <p>Access restricted to Level 5 personnel</p>
                  </div>
                </CyberpunkCardContent>
              </CyberpunkCard>
            </div>

            {/* Encrypted Transmission Card */}
            <div className="group">
              <CyberpunkCard 
                variant="default" 
                stamp="ENCRYPTED" 
                showLEDs
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: `
                    0 0 10px rgba(251, 146, 60, 0.5),
                    0 0 20px rgba(251, 146, 60, 0.3),
                    0 0 40px rgba(251, 146, 60, 0.1),
                    inset 0 0 10px rgba(251, 146, 60, 0.05)
                  `
                }}
              >
                <CyberpunkCardHeader className="mt-8">
                  <CyberpunkCardTitle className="text-xl">Encrypted Transmission</CyberpunkCardTitle>
                </CyberpunkCardHeader>
                <CyberpunkCardContent className="p-6">
                  <div className="font-mono text-orange-300 space-y-2">
                    <p>Encryption: <span className="text-orange-400 font-bold">AES-256</span></p>
                    <p>Key: <span className="text-orange-400">************</span></p>
                    <p className="text-orange-400 animate-pulse">Decryption in progress...</p>
                  </div>
                </CyberpunkCardContent>
              </CyberpunkCard>
            </div>

            {/* Restricted Access Card */}
            <div className="group">
              <CyberpunkCard 
                variant="terminal" 
                stamp="RESTRICTED" 
                accessAnimation
                className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: `
                    0 0 10px rgba(251, 191, 36, 0.5),
                    0 0 20px rgba(251, 191, 36, 0.3),
                    0 0 40px rgba(251, 191, 36, 0.1),
                    inset 0 0 10px rgba(251, 191, 36, 0.05)
                  `
                }}
              >
                <CyberpunkCardHeader className="mt-8">
                  <CyberpunkCardTitle className="text-xl text-yellow-400">
                    Restricted Access
                  </CyberpunkCardTitle>
                </CyberpunkCardHeader>
                <CyberpunkCardContent className="p-6">
                  <div className="text-yellow-300 font-mono space-y-2">
                    <p>✓ Biometric scan required</p>
                    <p>✓ Neural implant verified</p>
                    <p>✓ Access logged</p>
                  </div>
                </CyberpunkCardContent>
              </CyberpunkCard>
            </div>
          </div>
        </section>

        {/* Dialogs Section */}
        <section className="py-16">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Command className="w-8 h-8 text-purple-400 animate-pulse" 
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))',
                }}
              />
              <h2 className="text-3xl font-bold text-purple-400">
                DIALOGS & MODALS
              </h2>
            </div>
            <p className="text-gray-400 ml-11">
              Interactive modal overlays with terminal headers and system alerts
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" 
              style={{
                boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
              }}
            />
          </div>
          
          <div className="flex flex-wrap gap-6">
            {/* Standard Dialog */}
            <CyberpunkDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <CyberpunkDialogTrigger asChild>
                <CyberpunkButton 
                  variant="neon-primary"
                  className="hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: `
                      0 0 10px rgba(6, 182, 212, 0.5),
                      0 0 20px rgba(6, 182, 212, 0.3)
                    `
                  }}
                >
                  <Cpu className="mr-2 h-4 w-4" />
                  Open System Configuration
                </CyberpunkButton>
              </CyberpunkDialogTrigger>
              <CyberpunkDialogContent>
                <CyberpunkDialogHeader showTerminal>
                  <CyberpunkDialogTitle>System Configuration</CyberpunkDialogTitle>
                  <CyberpunkDialogDescription>
                    Adjust your neural interface settings. Changes will be applied immediately.
                  </CyberpunkDialogDescription>
                </CyberpunkDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-mono text-cyan-400">
                      Name
                    </label>
                    <input
                      className="col-span-3 bg-black/50 border border-cyan-400/30 rounded px-3 py-1 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-lg transition-all"
                      placeholder="Enter designation..."
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(6, 182, 212, 0.1)',
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-mono text-cyan-400">
                      Access
                    </label>
                    <input
                      className="col-span-3 bg-black/50 border border-cyan-400/30 rounded px-3 py-1 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-lg transition-all"
                      placeholder="Security clearance..."
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(6, 182, 212, 0.1)',
                      }}
                    />
                  </div>
                </div>
                <CyberpunkDialogFooter>
                  <CyberpunkButton 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    className="hover:scale-105 transition-all"
                  >
                    Cancel
                  </CyberpunkButton>
                  <CyberpunkButton 
                    variant="neon-success" 
                    onClick={() => setDialogOpen(false)}
                    className="hover:scale-105 transition-all"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Save Changes
                  </CyberpunkButton>
                </CyberpunkDialogFooter>
              </CyberpunkDialogContent>
            </CyberpunkDialog>

            {/* System Alert Dialog */}
            <CyberpunkDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
              <CyberpunkDialogTrigger asChild>
                <CyberpunkButton 
                  variant="neon-danger"
                  className="hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: `
                      0 0 10px rgba(239, 68, 68, 0.5),
                      0 0 20px rgba(239, 68, 68, 0.3)
                    `
                  }}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Trigger System Alert
                </CyberpunkButton>
              </CyberpunkDialogTrigger>
              <CyberpunkDialogContent systemAlert>
                <CyberpunkDialogHeader>
                  <CyberpunkDialogTitle>Critical System Alert</CyberpunkDialogTitle>
                  <CyberpunkDialogDescription>
                    Unauthorized access detected. Security protocols have been activated.
                  </CyberpunkDialogDescription>
                </CyberpunkDialogHeader>
                <div className="py-4">
                  <div className="flex items-center gap-3 text-red-400 font-mono text-sm">
                    <AlertTriangle className="h-8 w-8 animate-pulse" />
                    <div>
                      <p>Location: Sector 7-G</p>
                      <p>Threat Level: <span className="font-bold text-red-500">HIGH</span></p>
                      <p>Response: <span className="font-bold animate-pulse">IMMEDIATE</span></p>
                    </div>
                  </div>
                </div>
                <CyberpunkDialogFooter>
                  <CyberpunkButton 
                    variant="neon-danger" 
                    onClick={() => setAlertDialogOpen(false)}
                    className="hover:scale-105 transition-all"
                  >
                    Acknowledge
                  </CyberpunkButton>
                  <CyberpunkButton 
                    variant="neon-primary" 
                    onClick={() => setAlertDialogOpen(false)}
                    className="hover:scale-105 transition-all"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Initiate Lockdown
                  </CyberpunkButton>
                </CyberpunkDialogFooter>
              </CyberpunkDialogContent>
            </CyberpunkDialog>
          </div>
        </section>

        {/* Popovers Section */}
        <section className="py-16">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-8 h-8 text-green-400 animate-pulse" 
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(74, 222, 128, 0.8))',
                }}
              />
              <h2 className="text-3xl font-bold text-green-400">
                POPOVERS
              </h2>
            </div>
            <p className="text-gray-400 ml-11">
              Contextual overlays with glass effects and digital materialize animations
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" 
              style={{
                boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
              }}
            />
          </div>
          
          <div className="flex flex-wrap gap-6">
            <CyberpunkPopover>
              <CyberpunkPopoverTrigger asChild>
                <CyberpunkButton 
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
                  }}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Standard Popover
                </CyberpunkButton>
              </CyberpunkPopoverTrigger>
              <CyberpunkPopoverContent prefix="INFO">
                This is a standard popover with glass effect and digital materialize animation.
              </CyberpunkPopoverContent>
            </CyberpunkPopover>

            <CyberpunkPopover>
              <CyberpunkPopoverTrigger asChild>
                <CyberpunkButton 
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 10px rgba(147, 51, 234, 0.3)',
                  }}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Data Popover
                </CyberpunkButton>
              </CyberpunkPopoverTrigger>
              <CyberpunkPopoverContent prefix="DATA" typeAnimation>
                Loading system information from quantum database...
              </CyberpunkPopoverContent>
            </CyberpunkPopover>

            <CyberpunkPopover>
              <CyberpunkPopoverTrigger asChild>
                <CyberpunkButton 
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)',
                  }}
                >
                  <Terminal className="mr-2 h-4 w-4" />
                  System Popover
                </CyberpunkButton>
              </CyberpunkPopoverTrigger>
              <CyberpunkPopoverContent prefix="SYSTEM">
                <div className="space-y-2 font-mono">
                  <p>OS: <span className="text-green-400">CyberOS v2.077</span></p>
                  <p>Kernel: <span className="text-green-400">5.15.0-quantum</span></p>
                  <p>Uptime: <span className="text-green-400">127:34:22</span></p>
                </div>
              </CyberpunkPopoverContent>
            </CyberpunkPopover>

            <CyberpunkPopover>
              <CyberpunkPopoverTrigger asChild>
                <CyberpunkButton 
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 10px rgba(251, 146, 60, 0.3)',
                  }}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Alert Popover
                </CyberpunkButton>
              </CyberpunkPopoverTrigger>
              <CyberpunkPopoverContent prefix="ALERT">
                <div className="text-orange-400 font-mono">
                  <p className="font-bold mb-2">⚠ WARNING</p>
                  <p>System resources running low. Consider upgrading neural processor.</p>
                </div>
              </CyberpunkPopoverContent>
            </CyberpunkPopover>
          </div>
        </section>

        {/* Tooltips Section */}
        <section className="py-16 pb-24">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-pink-400 animate-pulse" 
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8))',
                }}
              />
              <h2 className="text-3xl font-bold text-pink-400">
                TOOLTIPS
              </h2>
            </div>
            <p className="text-gray-400 ml-11">
              Hover tooltips with holographic effects and contextual information
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" 
              style={{
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
              }}
            />
          </div>
          
          <CyberpunkTooltipProvider>
            <div className="flex flex-wrap gap-6">
              <CyberpunkTooltip>
                <CyberpunkTooltipTrigger asChild>
                  <CyberpunkButton 
                    variant="ghost"
                    className="hover:scale-105 transition-all duration-300"
                  >
                    <Wifi className="mr-2 h-4 w-4" />
                    Holographic Tooltip
                  </CyberpunkButton>
                </CyberpunkTooltipTrigger>
                <CyberpunkTooltipContent>
                  Neural link established
                </CyberpunkTooltipContent>
              </CyberpunkTooltip>

              <CyberpunkTooltip>
                <CyberpunkTooltipTrigger asChild>
                  <CyberpunkButton 
                    variant="ghost"
                    className="hover:scale-105 transition-all duration-300"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Data Tooltip
                  </CyberpunkButton>
                </CyberpunkTooltipTrigger>
                <CyberpunkTooltipContent prefix="DATA">
                  Processing speed: 2.7 THz
                </CyberpunkTooltipContent>
              </CyberpunkTooltip>

              <CyberpunkTooltip>
                <CyberpunkTooltipTrigger asChild>
                  <CyberpunkButton 
                    variant="ghost"
                    className="hover:scale-105 transition-all duration-300"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Info Tooltip
                  </CyberpunkButton>
                </CyberpunkTooltipTrigger>
                <CyberpunkTooltipContent prefix="INFO" holographic={false}>
                  Power consumption: 47W
                </CyberpunkTooltipContent>
              </CyberpunkTooltip>

              <CyberpunkTooltip>
                <CyberpunkTooltipTrigger asChild>
                  <CyberpunkButton 
                    variant="ghost"
                    className="hover:scale-105 transition-all duration-300"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Tip Tooltip
                  </CyberpunkButton>
                </CyberpunkTooltipTrigger>
                <CyberpunkTooltipContent prefix="TIP">
                  Use biometric scan for faster access
                </CyberpunkTooltipContent>
              </CyberpunkTooltip>

              <CyberpunkTooltip>
                <CyberpunkTooltipTrigger asChild>
                  <CyberpunkButton 
                    variant="ghost"
                    className="hover:scale-105 transition-all duration-300"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Hint Tooltip
                  </CyberpunkButton>
                </CyberpunkTooltipTrigger>
                <CyberpunkTooltipContent prefix="HINT">
                  Security level can be adjusted in settings
                </CyberpunkTooltipContent>
              </CyberpunkTooltip>
            </div>
          </CyberpunkTooltipProvider>
        </section>
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes scan-slow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        .animate-scan-slow {
          animation: scan-slow 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s linear infinite;
        }
      `}</style>
    </div>
  )
}