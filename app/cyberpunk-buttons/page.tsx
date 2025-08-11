'use client'

import React from 'react'
import { CyberpunkButton, CyberpunkIconButton } from '@/components/ui/primitives/button-cyberpunk'
import { 
  Power, 
  Wifi, 
  WifiOff,
  AlertTriangle, 
  Download, 
  Upload,
  Shield,
  Zap,
  Terminal,
  Globe,
  Lock,
  Unlock,
  Database,
  Cpu,
  Activity,
  HardDrive,
  Skull,
  Code,
  CloudLightning,
  Radio,
  Server,
  Disc
} from 'lucide-react'
import { Card } from '@/components/ui/primitives/card'

export default function CyberpunkButtonsPage() {
  const [loading, setLoading] = React.useState(false)
  
  const handleConnect = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Simplified Cyber Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-50" />
      
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            CYBERPUNK BUTTONS
          </h1>
          <p className="text-cyan-400 text-lg font-mono">
            ADVANCED NEURAL INTERFACE COMPONENTS v2.077
          </p>
        </div>

        {/* Basic Neon Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            NEON VARIANTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/50 border-cyan-400/20 p-6">
              <h3 className="text-cyan-400 font-mono text-sm mb-4">PRIMARY_INTERFACE</h3>
              <div className="space-y-4">
                <CyberpunkButton variant="neon-primary">
                  INITIALIZE
                </CyberpunkButton>
                <CyberpunkButton variant="neon-primary" size="lg">
                  <Power className="mr-2 h-5 w-5" />
                  POWER ON
                </CyberpunkButton>
                <CyberpunkButton variant="neon-primary" disabled>
                  DISABLED
                </CyberpunkButton>
              </div>
            </Card>

            <Card className="bg-black/50 border-red-400/20 p-6">
              <h3 className="text-red-400 font-mono text-sm mb-4">DANGER_ZONE</h3>
              <div className="space-y-4">
                <CyberpunkButton variant="neon-danger">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  WARNING
                </CyberpunkButton>
                <CyberpunkButton variant="neon-danger" size="lg">
                  TERMINATE
                </CyberpunkButton>
                <CyberpunkButton variant="neon-danger">
                  <Skull className="mr-2 h-4 w-4" />
                  DANGER
                </CyberpunkButton>
              </div>
            </Card>

            <Card className="bg-black/50 border-green-400/20 p-6">
              <h3 className="text-green-400 font-mono text-sm mb-4">SUCCESS_STATE</h3>
              <div className="space-y-4">
                <CyberpunkButton variant="neon-success">
                  <Shield className="mr-2 h-4 w-4" />
                  SECURE
                </CyberpunkButton>
                <CyberpunkButton variant="neon-success" size="lg">
                  VERIFIED
                </CyberpunkButton>
                <CyberpunkButton 
                  variant="neon-success"
                  loading={loading}
                  onClick={handleConnect}
                >
                  CONNECT
                </CyberpunkButton>
              </div>
            </Card>
          </div>
        </section>

        {/* Special Effects Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            SPECIAL EFFECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Holographic */}
            <Card className="bg-black/50 border-purple-400/20 p-6">
              <h3 className="text-purple-400 font-mono text-sm mb-4">HOLOGRAPHIC</h3>
              <div className="space-y-4">
                <CyberpunkButton variant="holographic" size="lg">
                  <Globe className="mr-2 h-5 w-5" />
                  QUANTUM LEAP
                </CyberpunkButton>
                <CyberpunkButton variant="holographic">
                  PRISMATIC
                </CyberpunkButton>
              </div>
            </Card>

            {/* Glitch */}
            <Card className="bg-black/50 border-white/20 p-6">
              <h3 className="text-white font-mono text-sm mb-4">GLITCH_MODE</h3>
              <div className="space-y-4">
                <CyberpunkButton variant="glitch" dataText="CORRUPTED">
                  CORRUPTED
                </CyberpunkButton>
                <CyberpunkButton variant="glitch" size="lg">
                  UNSTABLE
                </CyberpunkButton>
              </div>
            </Card>

            {/* Terminal */}
            <Card className="bg-black/50 border-green-400/20 p-6">
              <h3 className="text-green-400 font-mono text-sm mb-4">TERMINAL_ACCESS</h3>
              <div className="space-y-4">
                <CyberpunkButton variant="terminal">
                  <Terminal className="mr-2 h-4 w-4" />
                  root@cyber
                </CyberpunkButton>
                <CyberpunkButton variant="terminal" size="lg">
                  EXECUTE_CMD
                </CyberpunkButton>
              </div>
            </Card>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6" />
            ICON INTERFACES
          </h2>
          <div className="flex flex-wrap gap-4">
            <CyberpunkIconButton 
              variant="neon-primary" 
              size="icon"
              iconAnimation="rotate"
            >
              <Settings className="h-5 w-5" />
            </CyberpunkIconButton>
            
            <CyberpunkIconButton 
              variant="neon-danger" 
              size="icon"
              iconAnimation="pulse"
            >
              <WifiOff className="h-5 w-5" />
            </CyberpunkIconButton>
            
            <CyberpunkIconButton 
              variant="neon-success" 
              size="icon"
              iconAnimation="glitch"
            >
              <Wifi className="h-5 w-5" />
            </CyberpunkIconButton>
            
            <CyberpunkIconButton variant="holographic" size="icon">
              <Database className="h-5 w-5" />
            </CyberpunkIconButton>
            
            <CyberpunkIconButton variant="glitch" size="icon" glitchOnHover>
              <Code className="h-5 w-5" />
            </CyberpunkIconButton>
            
            <CyberpunkIconButton variant="terminal" size="icon">
              <HardDrive className="h-5 w-5" />
            </CyberpunkIconButton>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
            <CloudLightning className="w-6 h-6" />
            ADVANCED FEATURES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Augmented Reality */}
            <Card className="bg-black/50 border-cyan-400/20 p-6">
              <h3 className="text-cyan-400 font-mono text-sm mb-4">AUGMENTED_REALITY</h3>
              <div className="space-y-4">
                <CyberpunkButton 
                  variant="neon-primary" 
                  dataAugmented 
                  size="lg"
                >
                  AR ENHANCED
                </CyberpunkButton>
                <CyberpunkButton 
                  variant="holographic" 
                  dataAugmented
                >
                  NEURAL LINK
                </CyberpunkButton>
              </div>
            </Card>

            {/* Scanning Effects */}
            <Card className="bg-black/50 border-purple-400/20 p-6">
              <h3 className="text-purple-400 font-mono text-sm mb-4">SCAN_MODES</h3>
              <div className="space-y-4">
                <CyberpunkButton 
                  variant="neon-primary" 
                  effects="scanning"
                  size="lg"
                >
                  <Radio className="mr-2 h-5 w-5" />
                  SCANNING...
                </CyberpunkButton>
                <CyberpunkButton 
                  variant="neon-success" 
                  effects="flicker"
                  scanline
                >
                  <Activity className="mr-2 h-4 w-4" />
                  MONITORING
                </CyberpunkButton>
              </div>
            </Card>
          </div>
        </section>

        {/* Size Variations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
            <Server className="w-6 h-6" />
            SIZE MATRIX
          </h2>
          <Card className="bg-black/50 border-yellow-400/20 p-6">
            <div className="flex flex-wrap items-center gap-4">
              <CyberpunkButton variant="neon-primary" size="sm" soundEffect>
                SMALL
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" size="md" soundEffect>
                MEDIUM
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" size="lg" soundEffect>
                LARGE
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" size="xl" soundEffect showLEDs>
                EXTRA LARGE
              </CyberpunkButton>
            </div>
          </Card>
        </section>

        {/* Corner Styles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
            <Disc className="w-6 h-6" />
            CORNER PROTOCOLS
          </h2>
          <div className="flex flex-wrap gap-4">
            <CyberpunkButton variant="neon-primary" corners="cut">
              CUT CORNERS
            </CyberpunkButton>
            <CyberpunkButton variant="neon-primary" corners="rounded">
              ROUNDED
            </CyberpunkButton>
            <CyberpunkButton variant="neon-primary" corners="normal">
              SHARP
            </CyberpunkButton>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            SYSTEM ACTIONS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CyberpunkButton 
              variant="neon-success" 
              className="w-full"
              soundEffect
              showLEDs
            >
              <Download className="mr-2 h-4 w-4" />
              DOWNLOAD
            </CyberpunkButton>
            <CyberpunkButton 
              variant="neon-primary" 
              className="w-full"
              soundEffect
            >
              <Upload className="mr-2 h-4 w-4" />
              UPLOAD
            </CyberpunkButton>
            <CyberpunkButton 
              variant="holographic" 
              className="w-full"
              dataAugmented
            >
              <Lock className="mr-2 h-4 w-4" />
              ENCRYPT
            </CyberpunkButton>
            <CyberpunkButton 
              variant="neon-danger" 
              className="w-full"
              glitchOnHover
            >
              <Unlock className="mr-2 h-4 w-4" />
              DECRYPT
            </CyberpunkButton>
          </div>
        </section>

        {/* New Distinct Button Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            DISTINCT VARIANT MATRIX
          </h2>
          <p className="text-cyan-400/70 font-mono text-sm mb-6">
            Alternative button styling approach with distinct visual identities for each variant type.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/50 border-cyan-400/20 p-6">
              <h3 className="text-cyan-400 font-mono text-sm mb-4">PRIMARY_ACTION</h3>
              <div className="space-y-4">
                <button className="cyberpunk-btn-primary h-10 px-6 py-2 text-sm">
                  Execute Command
                </button>
                <button className="cyberpunk-btn-primary h-12 px-8 py-3 text-base">
                  <Power className="mr-2 h-5 w-5" />
                  Initialize System
                </button>
              </div>
            </Card>

            <Card className="bg-black/50 border-pink-400/20 p-6">
              <h3 className="text-pink-400 font-mono text-sm mb-4">SECONDARY_ACTION</h3>
              <div className="space-y-4">
                <button className="cyberpunk-btn-secondary h-10 px-6 py-2 text-sm">
                  Deploy Module
                </button>
                <button className="cyberpunk-btn-secondary h-12 px-8 py-3 text-base">
                  <Upload className="mr-2 h-5 w-5" />
                  Transfer Data
                </button>
              </div>
            </Card>

            <Card className="bg-black/50 border-red-400/20 p-6">
              <h3 className="text-red-400 font-mono text-sm mb-4">DESTRUCTIVE_ACTION</h3>
              <div className="space-y-4">
                <button className="cyberpunk-btn-destructive h-10 px-6 py-2 text-sm">
                  Terminate Process
                </button>
                <button className="cyberpunk-btn-destructive h-12 px-8 py-3 text-base">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  System Purge
                </button>
              </div>
            </Card>

            <Card className="bg-black/50 border-cyan-400/20 p-6">
              <h3 className="text-cyan-400/70 font-mono text-sm mb-4">GHOST_MODE</h3>
              <div className="space-y-4">
                <button className="cyberpunk-btn-ghost h-10 px-6 py-2 text-sm">
                  Background Scan
                </button>
                <button className="cyberpunk-btn-ghost h-12 px-8 py-3 text-base">
                  <Shield className="mr-2 h-5 w-5" />
                  Stealth Mode
                </button>
              </div>
            </Card>

            <Card className="bg-black/50 border-yellow-400/20 p-6">
              <h3 className="text-yellow-400 font-mono text-sm mb-4">OUTLINE_ONLY</h3>
              <div className="space-y-4">
                <button className="cyberpunk-btn-outline h-10 px-6 py-2 text-sm">
                  Analyze Data
                </button>
                <button className="cyberpunk-btn-outline h-12 px-8 py-3 text-base">
                  <Terminal className="mr-2 h-5 w-5" />
                  Debug Mode
                </button>
              </div>
            </Card>

            <Card className="bg-black/50 border-white/20 p-6">
              <h3 className="text-white/70 font-mono text-sm mb-4">LOADING_STATES</h3>
              <div className="space-y-4">
                <button className="cyberpunk-btn-primary cyberpunk-btn-loading h-10 px-6 py-2 text-sm" disabled>
                  Processing...
                </button>
                <button className="cyberpunk-btn-secondary cyberpunk-btn-loading h-10 px-6 py-2 text-sm" disabled>
                  Connecting...
                </button>
              </div>
            </Card>
          </div>
        </section>

        {/* Disabled State Showcase */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-400 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            DISABLED_STATES
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="cyberpunk-btn-primary h-10 px-6 py-2 text-sm" disabled>
              Primary Disabled
            </button>
            <button className="cyberpunk-btn-secondary h-10 px-6 py-2 text-sm" disabled>
              Secondary Disabled
            </button>
            <button className="cyberpunk-btn-destructive h-10 px-6 py-2 text-sm" disabled>
              Destructive Disabled
            </button>
            <button className="cyberpunk-btn-ghost h-10 px-6 py-2 text-sm" disabled>
              Ghost Disabled
            </button>
            <button className="cyberpunk-btn-outline h-10 px-6 py-2 text-sm" disabled>
              Outline Disabled
            </button>
          </div>
        </section>

        {/* Ghost and Outline Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-indigo-400 mb-6">MINIMAL INTERFACES</h2>
          <div className="flex flex-wrap gap-4">
            <CyberpunkButton variant="ghost">
              GHOST MODE
            </CyberpunkButton>
            <CyberpunkButton variant="outline">
              OUTLINE ONLY
            </CyberpunkButton>
            <CyberpunkButton variant="outline" showLEDs>
              WITH LEDS
            </CyberpunkButton>
          </div>
        </section>
      </div>
    </div>
  )
}

// Add Settings icon since it's not imported from lucide-react
const Settings = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
  </svg>
)