'use client'

import { useState, useEffect } from 'react'
import { 
  useGlitch,
  useNeonFlicker,
  useMatrixRain,
  useHolographicShader,
  useScanLines,
  useDataStream,
  useCircuitBoard,
  useCyberParticles,
  useTerminalTyping,
  usePowerAnimation,
  useCombinedEffects,
  useCyberText,
  injectCyberpunkStyles,
  presets
} from '@/lib/cyberpunk-effects'
import { Button } from '@/components/ui/primitives/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs'
import { Badge } from '@/components/ui/primitives/badge'
import { Zap, Terminal, Sparkles, CircuitBoard, Play, Square, RefreshCw } from 'lucide-react'

export default function CyberpunkEffectsPage() {
  // Inject CSS styles
  useEffect(() => {
    injectCyberpunkStyles()
  }, [])

  // Individual effect demos
  const glitchDemo = useGlitch({ intensity: 'medium', randomTrigger: false })
  const neonDemo = useNeonFlicker({ color: '#00ffff', intensity: 'high', randomFlicker: false })
  const matrixDemo = useMatrixRain({ speed: 50, density: 0.7, trailLength: 15 })  // Authentic Matrix settings
  const holographicDemo = useHolographicShader()
  const scanLinesDemo = useScanLines({ speed: 'normal', crtEffect: true })
  const dataStreamDemo = useDataStream({ type: 'hex', color: '#00ff00' })
  const circuitDemo = useCircuitBoard('complex')
  const particlesDemo = useCyberParticles(30)
  const typingDemo = useTerminalTyping({ 
    text: 'Initializing cyberpunk effects library...\n> System ready.', 
    speed: 50 
  })
  const powerDemo = usePowerAnimation()

  // Combined effects demo
  const combinedDemo = useCombinedEffects({
    glitch: { intensity: 'medium', randomTrigger: true },
    neonFlicker: { color: '#ff00ff', randomFlicker: true },
    scanLines: { speed: 'slow', opacity: 0.3 }
  })

  // Preset demos
  const [activePreset, setActivePreset] = useState<keyof typeof presets | null>(null)
  const terminalPreset = useCombinedEffects(activePreset === 'terminal' ? presets.terminal : {})
  const neonSignPreset = useCombinedEffects(activePreset === 'neonSign' ? presets.neonSign : {})
  const hackerPreset = useCombinedEffects(activePreset === 'hacker' ? presets.hacker : {})

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          Cyberpunk Effects Library
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of cyberpunk-themed visual effects for React applications.
          Each effect can be used individually or combined for maximum impact.
        </p>
      </div>

      {/* Effects Tabs */}
      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="individual">Individual Effects</TabsTrigger>
          <TabsTrigger value="combined">Combined Effects</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        {/* Individual Effects */}
        <TabsContent value="individual" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Glitch Effect */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Glitch Effect
                </CardTitle>
                <CardDescription>CSS transform skew with RGB shift</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={glitchDemo.ref as any}
                  className="p-6 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-lg text-center text-2xl font-bold"
                >
                  GLITCH TEXT
                </div>
                <Button 
                  onClick={() => glitchDemo.trigger()}
                  className="w-full"
                  variant="outline"
                >
                  Trigger Glitch
                </Button>
              </CardContent>
            </Card>

            {/* Neon Flicker */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Neon Flicker
                </CardTitle>
                <CardDescription>Realistic neon sign animation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={neonDemo.ref as any}
                  className="p-6 bg-black rounded-lg text-center text-2xl font-bold text-cyan-400"
                >
                  NEON SIGN
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => neonDemo.flicker()}
                    className="flex-1"
                    variant="outline"
                  >
                    Flicker
                  </Button>
                  <Button 
                    onClick={() => neonDemo.stop()}
                    className="flex-1"
                    variant="outline"
                  >
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Matrix Rain */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Matrix Rain
                </CardTitle>
                <CardDescription>Canvas-based falling characters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={matrixDemo.ref as any}
                  className="relative h-48 bg-black rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-green-400 font-mono z-10">
                    THE MATRIX
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => matrixDemo.start()}
                    className="flex-1"
                    variant="outline"
                    disabled={matrixDemo.isRunning}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                  <Button 
                    onClick={() => matrixDemo.stop()}
                    className="flex-1"
                    variant="outline"
                    disabled={!matrixDemo.isRunning}
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Holographic Shader */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Holographic Shader
                </CardTitle>
                <CardDescription>Iridescent color shifting effect</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  ref={holographicDemo.ref as any}
                  className="p-6 rounded-lg text-center text-xl font-bold text-white"
                >
                  HOLOGRAM
                </div>
              </CardContent>
            </Card>

            {/* Scan Lines */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Scan Lines
                </CardTitle>
                <CardDescription>CRT monitor effect</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  ref={scanLinesDemo.ref as any}
                  className="relative p-6 bg-gradient-to-br from-green-900/50 to-green-700/50 rounded-lg text-center text-green-400 font-mono"
                >
                  CRT MONITOR
                </div>
              </CardContent>
            </Card>

            {/* Data Stream */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Data Stream
                </CardTitle>
                <CardDescription>Flowing data visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  ref={dataStreamDemo.ref as any}
                  className="relative h-32 bg-black rounded-lg p-2 overflow-hidden"
                />
              </CardContent>
            </Card>

            {/* Circuit Board Pattern */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircuitBoard className="h-5 w-5" />
                  Circuit Board
                </CardTitle>
                <CardDescription>Animated circuit paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  ref={circuitDemo.ref as any}
                  className="relative h-32 bg-gray-900 rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Cyber Particles */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Cyber Particles
                </CardTitle>
                <CardDescription>Interactive particle system</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  ref={particlesDemo.ref as any}
                  className="relative h-32 bg-gray-900 rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Terminal Typing */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Terminal Typing
                </CardTitle>
                <CardDescription>Typewriter effect with cursor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={typingDemo.ref as any}
                  className="p-4 bg-black rounded-lg text-green-400 font-mono min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => typingDemo.start()}
                    className="flex-1"
                    variant="outline"
                    disabled={typingDemo.isTyping}
                  >
                    Start
                  </Button>
                  <Button 
                    onClick={() => typingDemo.reset()}
                    className="flex-1"
                    variant="outline"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Power Animation */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Power Animation
                </CardTitle>
                <CardDescription>Power up/down effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={powerDemo.ref as any}
                  className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg text-center text-xl font-bold"
                >
                  POWER SYSTEM
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => powerDemo.powerUp()}
                    className="flex-1"
                    variant="outline"
                  >
                    Power Up
                  </Button>
                  <Button 
                    onClick={() => powerDemo.powerDown()}
                    className="flex-1"
                    variant="outline"
                  >
                    Power Down
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </TabsContent>

        {/* Combined Effects */}
        <TabsContent value="combined" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Combined Effects Demo</CardTitle>
              <CardDescription>
                Multiple effects applied to a single element for maximum cyberpunk aesthetic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                ref={combinedDemo.ref as any}
                className="p-12 bg-gradient-to-br from-cyan-900/50 via-purple-900/50 to-pink-900/50 rounded-lg text-center"
              >
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                  CYBER ENHANCED
                </h2>
                <p className="mt-2 text-cyan-400/80">Multiple effects active</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => combinedDemo.triggerGlitch()}
                  variant="outline"
                >
                  Trigger Glitch
                </Button>
                <Button 
                  onClick={() => combinedDemo.flickerNeon()}
                  variant="outline"
                >
                  Flicker Neon
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Glitch Effect</Badge>
                <Badge variant="secondary">Neon Flicker</Badge>
                <Badge variant="secondary">Scan Lines</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Presets */}
        <TabsContent value="presets" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Terminal Preset */}
            <Card>
              <CardHeader>
                <CardTitle>Terminal Preset</CardTitle>
                <CardDescription>Classic terminal/hacker aesthetic</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={terminalPreset.ref as any}
                  className="p-8 bg-black rounded-lg text-green-400 font-mono"
                >
                  <div>$ accessing mainframe...</div>
                  <div>$ connection established</div>
                  <div className="mt-2 text-cyan-400">SYSTEM ONLINE</div>
                </div>
                <Button 
                  onClick={() => setActivePreset(activePreset === 'terminal' ? null : 'terminal')}
                  variant={activePreset === 'terminal' ? 'default' : 'outline'}
                  className="w-full"
                >
                  {activePreset === 'terminal' ? 'Deactivate' : 'Activate'} Terminal Preset
                </Button>
              </CardContent>
            </Card>

            {/* Neon Sign Preset */}
            <Card>
              <CardHeader>
                <CardTitle>Neon Sign Preset</CardTitle>
                <CardDescription>Flickering neon sign effect</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={neonSignPreset.ref as any}
                  className="p-8 bg-gray-900 rounded-lg text-center"
                >
                  <div className="text-3xl font-bold text-pink-400">OPEN</div>
                  <div className="text-xl text-cyan-400">24 HOURS</div>
                </div>
                <Button 
                  onClick={() => setActivePreset(activePreset === 'neonSign' ? null : 'neonSign')}
                  variant={activePreset === 'neonSign' ? 'default' : 'outline'}
                  className="w-full"
                >
                  {activePreset === 'neonSign' ? 'Deactivate' : 'Activate'} Neon Sign Preset
                </Button>
              </CardContent>
            </Card>

            {/* Hacker Preset */}
            <Card>
              <CardHeader>
                <CardTitle>Hacker Preset</CardTitle>
                <CardDescription>Matrix rain with data streams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={hackerPreset.ref as any}
                  className="relative h-48 bg-black rounded-lg overflow-hidden p-4"
                >
                  <div className="relative z-10 text-green-400 font-mono">
                    <div>ACCESSING DATABASE...</div>
                    <div>DECRYPTING FILES...</div>
                    <div className="mt-2 text-cyan-400">[ BREACH SUCCESSFUL ]</div>
                  </div>
                </div>
                <Button 
                  onClick={() => setActivePreset(activePreset === 'hacker' ? null : 'hacker')}
                  variant={activePreset === 'hacker' ? 'default' : 'outline'}
                  className="w-full"
                >
                  {activePreset === 'hacker' ? 'Deactivate' : 'Activate'} Hacker Preset
                </Button>
              </CardContent>
            </Card>

          </div>
        </TabsContent>
      </Tabs>

      {/* Usage Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Example</CardTitle>
          <CardDescription>How to use the cyberpunk effects in your components</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-950 rounded-lg overflow-x-auto text-sm">
            <code className="text-green-400">{`import { useGlitch, useNeonFlicker, useCombinedEffects } from '@/lib/cyberpunk-effects'

function MyComponent() {
  // Single effect
  const glitch = useGlitch({ 
    intensity: 'medium', 
    randomTrigger: true 
  })
  
  // Multiple effects
  const combined = useCombinedEffects({
    glitch: { intensity: 'subtle' },
    neonFlicker: { color: '#00ffff' },
    scanLines: { speed: 'slow' }
  })
  
  return (
    <div ref={glitch.ref}>
      Cyberpunk Text
    </div>
  )
}`}</code>
          </pre>
        </CardContent>
      </Card>

    </div>
  )
}