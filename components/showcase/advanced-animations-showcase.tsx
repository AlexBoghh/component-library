"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/primitives/button'
import { Card } from '@/components/ui/primitives/card'
import { Badge } from '@/components/ui/primitives/badge'
import { Sparkles, Zap, Heart, Star, Rocket, Wand2 } from 'lucide-react'

const AdvancedAnimationsShowcase = () => {
  const [activeDemo, setActiveDemo] = useState<string>('')

  const triggerAnimation = (demoId: string) => {
    setActiveDemo(demoId)
    setTimeout(() => setActiveDemo(''), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 p-8">
      {/* Floating Particles Background */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="particle particle-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 animate-elastic-in bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Advanced Animation Gallery
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-spring-bounce">
          Explore stunning visual effects and micro-interactions
        </p>
        
        {/* Theme-specific badge */}
        <Badge 
          variant="outline" 
          className="animate-float glass-medium hover-glow"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          High-Performance CSS Animations
        </Badge>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8">
        
        {/* Elastic & Spring Animations */}
        <Card className="p-8 glass-card animate-glass-emerge">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            Elastic & Spring Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Button 
                onClick={() => triggerAnimation('elastic')}
                className={`w-full hover-lift ${activeDemo === 'elastic' ? 'animate-elastic-in' : ''} particle-burst`}
                variant="default"
              >
                <Heart className="w-4 h-4 mr-2" />
                Elastic Entrance
              </Button>
              <p className="text-sm text-muted-foreground">
                Bouncy spring animation with rotation
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => triggerAnimation('spring')}
                className={`w-full hover-scale ${activeDemo === 'spring' ? 'animate-spring-bounce' : ''}`}
                variant="secondary"
              >
                <Star className="w-4 h-4 mr-2" />
                Spring Bounce
              </Button>
              <p className="text-sm text-muted-foreground">
                Realistic spring physics simulation
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => triggerAnimation('rubber')}
                className={`w-full hover-tilt ${activeDemo === 'rubber' ? 'animate-rubber-band' : ''}`}
                variant="outline"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Rubber Band
              </Button>
              <p className="text-sm text-muted-foreground">
                Stretchy rubber band effect
              </p>
            </div>
          </div>
        </Card>

        {/* Glassmorphism Effects */}
        <Card className="p-8 glass-gradient-rainbow animate-gradient-flow">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            Glassmorphism Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 animate-glass-emerge stagger-delay-1">
              <h3 className="text-lg font-semibold mb-4">Frosted Glass</h3>
              <div className="space-y-3">
                <div className="glass-light p-3 rounded-lg hover-glow">
                  <span className="text-sm">Light glass material</span>
                </div>
                <div className="glass-medium p-3 rounded-lg hover-glow">
                  <span className="text-sm">Medium glass material</span>
                </div>
                <div className="glass-heavy p-3 rounded-lg hover-glow">
                  <span className="text-sm">Heavy glass material</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 animate-glass-emerge stagger-delay-2">
              <h3 className="text-lg font-semibold mb-4">Animated Glass</h3>
              <div className="space-y-3">
                <div className="glass-purple p-3 rounded-lg animate-prismatic-glow">
                  <span className="text-sm">Prismatic glow effect</span>
                </div>
                <div className="glass-blue p-3 rounded-lg animate-depth-float">
                  <span className="text-sm">3D depth floating</span>
                </div>
                <div className="glass-pink p-3 rounded-lg animate-liquid-morph">
                  <span className="text-sm">Liquid morphing shape</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Loading & Skeleton States */}
        <Card className="p-8 animate-morph-expand">
          <h2 className="text-2xl font-bold mb-6">Loading States & Skeletons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Skeleton Examples */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skeleton Screens</h3>
              <div className="skeleton-article">
                <div className="skeleton-article-header">
                  <div className="skeleton skeleton-avatar-sm"></div>
                  <div className="space-y-2 flex-1">
                    <div className="skeleton skeleton-text-sm skeleton-w-3/4"></div>
                    <div className="skeleton skeleton-text-sm skeleton-w-1/2"></div>
                  </div>
                </div>
                <div className="skeleton skeleton-image-sm"></div>
                <div className="skeleton-article-content">
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text skeleton-w-3/4"></div>
                  <div className="skeleton skeleton-text skeleton-w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Loading Spinners */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Loading Spinners</h3>
              <div className="flex items-center gap-4">
                <div className="loading-spinner"></div>
                <div className="loading-spinner-lg"></div>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="loading-bar"></div>
                <div className="loading-progress"></div>
              </div>
            </div>

            {/* Interactive Loading */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Interactive States</h3>
              <Button className="w-full button-loading" disabled>
                Loading Button
              </Button>
              <div className="relative">
                <input 
                  className="w-full p-2 border rounded input-loading" 
                  placeholder="Loading input..."
                  disabled
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Micro-interactions */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Micro-interactions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hover Effects</h3>
              <div className="space-y-2">
                <div className="p-4 border rounded hover-lift cursor-pointer">
                  Lift on hover
                </div>
                <div className="p-4 border rounded hover-scale cursor-pointer">
                  Scale on hover
                </div>
                <div className="p-4 border rounded hover-rotate cursor-pointer">
                  Rotate on hover
                </div>
                <div className="p-4 border rounded hover-tilt cursor-pointer">
                  3D tilt on hover
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Button States</h3>
              <div className="space-y-2">
                <Button className="w-full active-press">
                  Press Animation
                </Button>
                <Button className="w-full hover-glow" variant="outline">
                  Glow Effect
                </Button>
                <Button className="w-full animate-button-glow" variant="secondary">
                  Persistent Glow
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Particle Effects</h3>
              <div className="space-y-2">
                <Button 
                  className="w-full particle-trail"
                  variant="default"
                >
                  Particle Trail
                </Button>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    const btn = document.querySelector('.particle-celebration') as HTMLElement
                    if (btn) {
                      btn.classList.add('active')
                      setTimeout(() => btn.classList.remove('active'), 2000)
                    }
                  }}
                >
                  <div className="particle-celebration">
                    Celebration
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Tips */}
        <Card className="p-8 border-dashed animate-float">
          <h2 className="text-2xl font-bold mb-6">Performance Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Built-in Optimizations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• GPU acceleration with <code>transform: translateZ(0)</code></li>
                <li>• Smart <code>will-change</code> property usage</li>
                <li>• Paint containment for better performance</li>
                <li>• Reduced motion support for accessibility</li>
                <li>• High contrast mode compatibility</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Accessibility Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <code>prefers-reduced-motion</code> respect</li>
                <li>• Alternative focus states for reduced motion</li>
                <li>• High contrast mode support</li>
                <li>• Screen reader friendly animations</li>
                <li>• Keyboard navigation preserved</li>
              </ul>
            </div>
          </div>
        </Card>

      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <p className="text-muted-foreground">
          All animations are optimized for performance and accessibility
        </p>
      </div>
    </div>
  )
}

export default AdvancedAnimationsShowcase