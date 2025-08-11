'use client'

import React from 'react'
import { useTheme } from '@/lib/hooks/use-theme'
import {
  BrutalButton,
  BrutalCard,
  BrutalInput,
  BrutalBadge,
  BrutalToggle,
  BrutalAlert,
  BrutalHeading,
  BrutalProgress,
} from '@/components/ui/neubrutalism'
import { Sun, Moon } from 'lucide-react'

export default function NeubrutalismColorTest() {
  const { setTheme, mode, setMode } = useTheme()
  
  React.useEffect(() => {
    setTheme('brutalism')
  }, [setTheme])
  
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Mode Toggle */}
        <div className="flex items-center justify-between mb-8">
          <BrutalHeading level={1}>Color Contrast Test</BrutalHeading>
          <button
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            className="p-3 border-4 border-black bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            {mode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Background/Foreground Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Background & Text Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-background text-foreground border-4 border-border">
              <p className="font-bold">Default Background</p>
              <p>This text should be clearly visible</p>
            </div>
            <div className="p-4 bg-card text-card-foreground border-4 border-border">
              <p className="font-bold">Card Background</p>
              <p>Card text should be readable</p>
            </div>
            <div className="p-4 bg-muted text-muted-foreground border-4 border-border">
              <p className="font-bold">Muted Background</p>
              <p>Muted text should be visible</p>
            </div>
            <div className="p-4 bg-popover text-popover-foreground border-4 border-border">
              <p className="font-bold">Popover Background</p>
              <p>Popover text clarity test</p>
            </div>
          </div>
        </section>
        
        {/* Primary Colors Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Primary Colors</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-primary text-primary-foreground border-4 border-black">
              <p className="font-bold">Primary (Yellow)</p>
              <p>Text should be black and readable</p>
            </div>
            <div className="p-4 bg-secondary text-secondary-foreground border-4 border-black">
              <p className="font-bold">Secondary (Purple)</p>
              <p>Text should be white and visible</p>
            </div>
            <div className="p-4 bg-accent text-accent-foreground border-4 border-black">
              <p className="font-bold">Accent (Cyan)</p>
              <p>Text contrast check</p>
            </div>
          </div>
        </section>
        
        {/* Button Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <BrutalButton variant="primary">Primary Yellow</BrutalButton>
            <BrutalButton variant="secondary">Secondary Purple</BrutalButton>
            <BrutalButton variant="outline">Outline White</BrutalButton>
            <BrutalButton variant="success">Success Green</BrutalButton>
            <BrutalButton variant="danger">Danger Red</BrutalButton>
          </div>
        </section>
        
        {/* Badge Colors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Badge Visibility</h2>
          <div className="flex flex-wrap gap-3">
            <BrutalBadge color="yellow">Yellow Badge</BrutalBadge>
            <BrutalBadge color="purple">Purple Badge</BrutalBadge>
            <BrutalBadge color="cyan">Cyan Badge</BrutalBadge>
            <BrutalBadge color="green">Green Badge</BrutalBadge>
            <BrutalBadge color="pink">Pink Badge</BrutalBadge>
          </div>
        </section>
        
        {/* Alert Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Alert Messages</h2>
          <div className="space-y-3">
            <BrutalAlert variant="info">
              Info: This text should be clearly visible on cyan background
            </BrutalAlert>
            <BrutalAlert variant="warning">
              Warning: This text should be readable on yellow background
            </BrutalAlert>
            <BrutalAlert variant="success">
              Success: This text should be visible on green background
            </BrutalAlert>
            <BrutalAlert variant="error">
              Error: This text should be readable on red background
            </BrutalAlert>
          </div>
        </section>
        
        {/* Cards with Different Backgrounds */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Card Color Variants</h2>
          <div className="grid grid-cols-3 gap-4">
            <BrutalCard color="white">
              <h3 className="font-black mb-2">White Card</h3>
              <p>Black text on white background</p>
            </BrutalCard>
            <BrutalCard color="yellow">
              <h3 className="font-black mb-2">Yellow Card</h3>
              <p>Black text on yellow background</p>
            </BrutalCard>
            <BrutalCard color="purple">
              <h3 className="font-black mb-2">Purple Card</h3>
              <p>White text on purple background</p>
            </BrutalCard>
          </div>
        </section>
        
        {/* Form Elements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Form Elements</h2>
          <div className="space-y-3">
            <BrutalInput placeholder="Input field - text should be visible" />
            <div className="flex gap-4">
              <BrutalToggle pressed={true}>ON STATE</BrutalToggle>
              <BrutalToggle pressed={false}>OFF STATE</BrutalToggle>
            </div>
            <BrutalProgress value={65} color="yellow" />
            <BrutalProgress value={45} color="purple" />
          </div>
        </section>
        
        {/* Utility Classes Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Utility Classes</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 brutal-yellow brutal-border brutal-shadow-lg">
              <p className="font-black">Yellow Block</p>
              <p>Text visibility check</p>
            </div>
            <div className="p-4 brutal-purple brutal-border brutal-shadow-lg">
              <p className="font-black">Purple Block</p>
              <p>Text visibility check</p>
            </div>
            <div className="p-4 brutal-cyan brutal-border brutal-shadow-lg">
              <p className="font-black">Cyan Block</p>
              <p>Text visibility check</p>
            </div>
            <div className="p-4 brutal-green brutal-border brutal-shadow-lg">
              <p className="font-black">Green Block</p>
              <p>Text visibility check</p>
            </div>
            <div className="p-4 brutal-pink brutal-border brutal-shadow-lg">
              <p className="font-black">Pink Block</p>
              <p>Text visibility check</p>
            </div>
            <div className="p-4 brutal-orange brutal-border brutal-shadow-lg">
              <p className="font-black">Orange Block</p>
              <p>Text visibility check</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}