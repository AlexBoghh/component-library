'use client'

import React from 'react'
import { CyberpunkButton } from '@/components/ui/primitives/button-cyberpunk'
import { 
  Power, 
  Shield,
  AlertTriangle,
  Zap
} from 'lucide-react'

export default function CyberpunkButtonsSimplePage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">
          Cyberpunk Buttons
        </h1>
        
        {/* Basic Examples */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Basic Variants</h2>
            <div className="flex flex-wrap gap-4">
              <CyberpunkButton variant="neon-primary">
                PRIMARY
              </CyberpunkButton>
              <CyberpunkButton variant="neon-danger">
                <AlertTriangle className="mr-2 h-4 w-4" />
                DANGER
              </CyberpunkButton>
              <CyberpunkButton variant="neon-success">
                <Shield className="mr-2 h-4 w-4" />
                SUCCESS
              </CyberpunkButton>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-purple-400 mb-4">Special Effects</h2>
            <div className="flex flex-wrap gap-4">
              <CyberpunkButton variant="holographic">
                HOLOGRAPHIC
              </CyberpunkButton>
              <CyberpunkButton variant="glitch">
                GLITCH
              </CyberpunkButton>
              <CyberpunkButton variant="terminal">
                TERMINAL
              </CyberpunkButton>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <CyberpunkButton variant="neon-primary" size="sm">
                SMALL
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" size="md">
                MEDIUM
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" size="lg">
                LARGE
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" size="xl">
                <Zap className="mr-2 h-5 w-5" />
                EXTRA LARGE
              </CyberpunkButton>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-green-400 mb-4">States</h2>
            <div className="flex flex-wrap gap-4">
              <CyberpunkButton variant="neon-primary">
                NORMAL
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" disabled>
                DISABLED
              </CyberpunkButton>
              <CyberpunkButton variant="neon-primary" loading>
                LOADING
              </CyberpunkButton>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-pink-400 mb-4">Corner Styles</h2>
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

          <section>
            <h2 className="text-xl font-bold text-indigo-400 mb-4">Minimal Styles</h2>
            <div className="flex flex-wrap gap-4">
              <CyberpunkButton variant="ghost">
                GHOST
              </CyberpunkButton>
              <CyberpunkButton variant="outline">
                OUTLINE
              </CyberpunkButton>
              <CyberpunkButton variant="outline" size="icon">
                <Power className="h-5 w-5" />
              </CyberpunkButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}