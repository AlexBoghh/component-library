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
  BrutalDivider,
  BrutalHeading,
  BrutalProgress,
  BrutalTabs,
  BrutalTabsList,
  BrutalTabsTrigger,
} from '@/components/ui/neubrutalism'
import { 
  Zap, Heart, Star, ArrowRight, Coffee, Rocket, 
  Trophy, Sparkles, Sun, Moon, Cloud, 
  Music, Camera, Bell, Mail, Settings,
  ShoppingCart, User, Search, Menu, X
} from 'lucide-react'

export default function NeubrutalismShowcase() {
  const { setTheme } = useTheme()
  const [activeTab, setActiveTab] = React.useState('components')
  const [toggleState, setToggleState] = React.useState(false)
  const [progress, setProgress] = React.useState(65)
  
  React.useEffect(() => {
    // Ensure brutalism theme is active
    setTheme('brutalism')
  }, [setTheme])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <BrutalHeading level={1} className="brutal-text-shadow-colored">
            NEUBRUTALISM
          </BrutalHeading>
          <p className="text-xl font-bold">Bold • Playful • Unapologetic Design System</p>
        </div>
        
        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <BrutalButton variant="primary">
            <Rocket className="inline-block w-4 h-4 mr-2" />
            Get Started
          </BrutalButton>
          <BrutalButton variant="secondary">
            <Star className="inline-block w-4 h-4 mr-2" />
            Examples
          </BrutalButton>
          <BrutalButton variant="outline">
            <Heart className="inline-block w-4 h-4 mr-2" />
            Favorites
          </BrutalButton>
        </div>
        
        {/* Tabs Navigation */}
        <BrutalTabs>
          <BrutalTabsList className="mb-8">
            <BrutalTabsTrigger 
              active={activeTab === 'components'}
              onClick={() => setActiveTab('components')}
            >
              Components
            </BrutalTabsTrigger>
            <BrutalTabsTrigger 
              active={activeTab === 'patterns'}
              onClick={() => setActiveTab('patterns')}
            >
              Patterns
            </BrutalTabsTrigger>
            <BrutalTabsTrigger 
              active={activeTab === 'animations'}
              onClick={() => setActiveTab('animations')}
            >
              Animations
            </BrutalTabsTrigger>
          </BrutalTabsList>
        </BrutalTabs>
        
        {/* Components Section */}
        {activeTab === 'components' && (
          <div className="space-y-12">
            {/* Buttons */}
            <section>
              <BrutalHeading level={2} className="mb-6">BUTTONS</BrutalHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <BrutalButton variant="primary" size="lg">
                  <Zap className="inline-block w-5 h-5 mr-2" />
                  Primary
                </BrutalButton>
                <BrutalButton variant="secondary" size="lg">
                  <Sparkles className="inline-block w-5 h-5 mr-2" />
                  Secondary
                </BrutalButton>
                <BrutalButton variant="success" size="lg">
                  <Trophy className="inline-block w-5 h-5 mr-2" />
                  Success
                </BrutalButton>
                <BrutalButton variant="danger" size="lg">
                  <X className="inline-block w-5 h-5 mr-2" />
                  Danger
                </BrutalButton>
              </div>
            </section>
            
            {/* Cards */}
            <section>
              <BrutalHeading level={2} className="mb-6">CARDS</BrutalHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BrutalCard color="white" hover>
                  <h3 className="text-xl font-black mb-2">WHITE CARD</h3>
                  <p className="font-bold mb-4">Clean and minimal design with hover effect</p>
                  <BrutalButton variant="primary" size="sm">Action</BrutalButton>
                </BrutalCard>
                
                <BrutalCard color="yellow" hover>
                  <h3 className="text-xl font-black mb-2">YELLOW CARD</h3>
                  <p className="font-bold mb-4">Bright and attention-grabbing</p>
                  <BrutalButton variant="outline" size="sm">Action</BrutalButton>
                </BrutalCard>
                
                <BrutalCard color="gradient" hover>
                  <h3 className="text-xl font-black mb-2">GRADIENT CARD</h3>
                  <p className="font-bold mb-4">Modern gradient background</p>
                  <BrutalButton variant="secondary" size="sm">Action</BrutalButton>
                </BrutalCard>
              </div>
            </section>
            
            {/* Form Elements */}
            <section>
              <BrutalHeading level={2} className="mb-6">FORM ELEMENTS</BrutalHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <BrutalInput placeholder="Enter your name" />
                  <BrutalInput type="email" placeholder="Enter your email" />
                  <BrutalInput type="password" placeholder="Enter password" autoComplete="current-password" />
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <BrutalToggle pressed={toggleState} onClick={() => setToggleState(!toggleState)}>
                      {toggleState ? 'ON' : 'OFF'}
                    </BrutalToggle>
                    <BrutalToggle pressed={!toggleState} onClick={() => setToggleState(!toggleState)}>
                      {toggleState ? 'OFF' : 'ON'}
                    </BrutalToggle>
                  </div>
                  <BrutalProgress value={progress} color="yellow" />
                  <div className="flex gap-2">
                    <BrutalButton size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                      -10
                    </BrutalButton>
                    <BrutalButton size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                      +10
                    </BrutalButton>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Badges & Alerts */}
            <section>
              <BrutalHeading level={2} className="mb-6">BADGES & ALERTS</BrutalHeading>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <BrutalBadge color="yellow">NEW</BrutalBadge>
                  <BrutalBadge color="purple">PREMIUM</BrutalBadge>
                  <BrutalBadge color="cyan">FEATURED</BrutalBadge>
                  <BrutalBadge color="green">ACTIVE</BrutalBadge>
                  <BrutalBadge color="pink">HOT</BrutalBadge>
                </div>
                
                <div className="space-y-3">
                  <BrutalAlert variant="info">
                    <Bell className="inline-block w-4 h-4 mr-2" />
                    This is an info alert with cyan background
                  </BrutalAlert>
                  <BrutalAlert variant="warning">
                    <Sun className="inline-block w-4 h-4 mr-2" />
                    This is a warning alert with yellow background
                  </BrutalAlert>
                  <BrutalAlert variant="success">
                    <Trophy className="inline-block w-4 h-4 mr-2" />
                    This is a success alert with green background
                  </BrutalAlert>
                  <BrutalAlert variant="error">
                    <X className="inline-block w-4 h-4 mr-2" />
                    This is an error alert with pink background
                  </BrutalAlert>
                </div>
              </div>
            </section>
          </div>
        )}
        
        {/* Patterns Section */}
        {activeTab === 'patterns' && (
          <div className="space-y-12">
            {/* Background Patterns */}
            <section>
              <BrutalHeading level={2} className="mb-6">BACKGROUND PATTERNS</BrutalHeading>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-8 brutal-border brutal-shadow-lg brutal-bg-dots">
                  <h3 className="font-black">DOTS</h3>
                </div>
                <div className="p-8 brutal-border brutal-shadow-lg brutal-bg-grid">
                  <h3 className="font-black">GRID</h3>
                </div>
                <div className="p-8 brutal-border brutal-shadow-lg brutal-bg-stripes">
                  <h3 className="font-black">STRIPES</h3>
                </div>
                <div className="p-8 brutal-border brutal-shadow-lg brutal-bg-zigzag bg-yellow-400">
                  <h3 className="font-black">ZIGZAG</h3>
                </div>
              </div>
            </section>
            
            {/* Shadow Effects */}
            <section>
              <BrutalHeading level={2} className="mb-6">SHADOW EFFECTS</BrutalHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 bg-white brutal-border brutal-shadow-sm">
                  <p className="font-black">SMALL</p>
                </div>
                <div className="p-6 bg-white brutal-border brutal-shadow">
                  <p className="font-black">MEDIUM</p>
                </div>
                <div className="p-6 bg-white brutal-border brutal-shadow-lg">
                  <p className="font-black">LARGE</p>
                </div>
                <div className="p-6 bg-white brutal-border brutal-shadow-2xl">
                  <p className="font-black">X-LARGE</p>
                </div>
              </div>
            </section>
            
            {/* Color Blocks */}
            <section>
              <BrutalHeading level={2} className="mb-6">COLOR BLOCKS</BrutalHeading>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-8 brutal-yellow brutal-border brutal-shadow-lg">
                  <h3 className="font-black text-2xl">YELLOW</h3>
                </div>
                <div className="p-8 brutal-purple brutal-border brutal-shadow-lg">
                  <h3 className="font-black text-2xl">PURPLE</h3>
                </div>
                <div className="p-8 brutal-cyan brutal-border brutal-shadow-lg">
                  <h3 className="font-black text-2xl">CYAN</h3>
                </div>
                <div className="p-8 brutal-green brutal-border brutal-shadow-lg">
                  <h3 className="font-black text-2xl">GREEN</h3>
                </div>
                <div className="p-8 brutal-pink brutal-border brutal-shadow-lg">
                  <h3 className="font-black text-2xl">PINK</h3>
                </div>
                <div className="p-8 brutal-orange brutal-border brutal-shadow-lg">
                  <h3 className="font-black text-2xl">ORANGE</h3>
                </div>
              </div>
            </section>
            
            {/* Special Effects */}
            <section>
              <BrutalHeading level={2} className="mb-6">SPECIAL EFFECTS</BrutalHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="brutal-paper p-6">
                  <h3 className="font-black mb-2">PAPER EFFECT</h3>
                  <p className="font-bold">With subtle pattern background</p>
                </div>
                
                <div className="brutal-sticker p-6 bg-yellow-400 brutal-border brutal-shadow-lg">
                  <h3 className="font-black mb-2">STICKER</h3>
                  <p className="font-bold">Rotates on hover</p>
                </div>
                
                <div className="brutal-tape p-6 bg-white brutal-border brutal-shadow-lg">
                  <h3 className="font-black mb-2">TAPE EFFECT</h3>
                  <p className="font-bold">With tape on top</p>
                </div>
              </div>
            </section>
          </div>
        )}
        
        {/* Animations Section */}
        {activeTab === 'animations' && (
          <div className="space-y-12">
            <section>
              <BrutalHeading level={2} className="mb-6">ANIMATIONS</BrutalHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <BrutalCard color="white">
                  <div className="brutal-shake p-4 bg-yellow-400 brutal-border text-center">
                    <p className="font-black">SHAKE</p>
                  </div>
                </BrutalCard>
                
                <BrutalCard color="white">
                  <div className="brutal-bounce p-4 bg-purple-600 text-white brutal-border text-center">
                    <p className="font-black">BOUNCE</p>
                  </div>
                </BrutalCard>
                
                <BrutalCard color="white">
                  <div className="brutal-rotate p-4 bg-cyan-400 brutal-border text-center">
                    <p className="font-black">ROTATE</p>
                  </div>
                </BrutalCard>
                
                <BrutalCard color="white">
                  <div className="brutal-pulse p-4 bg-green-500 text-white brutal-border text-center">
                    <p className="font-black">PULSE</p>
                  </div>
                </BrutalCard>
              </div>
            </section>
            
            {/* Interactive Elements */}
            <section>
              <BrutalHeading level={2} className="mb-6">INTERACTIVE</BrutalHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white brutal-border brutal-shadow brutal-hover cursor-pointer">
                  <h3 className="font-black mb-2">HOVER LIFT</h3>
                  <p className="font-bold">Hover to lift up</p>
                </div>
                
                <div className="p-6 bg-yellow-400 brutal-border brutal-shadow brutal-hover-lg cursor-pointer">
                  <h3 className="font-black mb-2">HOVER LIFT LG</h3>
                  <p className="font-bold">Bigger lift effect</p>
                </div>
                
                <div className="p-6 bg-purple-600 text-white brutal-border brutal-shadow brutal-active cursor-pointer">
                  <h3 className="font-black mb-2">PRESS EFFECT</h3>
                  <p className="font-bold">Click to press down</p>
                </div>
              </div>
            </section>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-16 text-center">
          <BrutalDivider className="mb-8" />
          <p className="font-black text-xl mb-4">NEUBRUTALISM DESIGN SYSTEM</p>
          <p className="font-bold text-gray-600">Bold • Playful • Unapologetic</p>
        </div>
      </div>
    </div>
  )
}