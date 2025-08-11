/**
 * React Hooks for Cyberpunk Effects
 * Easy-to-use hooks for all cyberpunk effects
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { GlitchEffect, GlitchIntensity, GlitchVariant } from './glitch'
import { NeonFlicker, NeonFlickerOptions } from './neon-flicker'
import { MatrixRain, MatrixRainOptions } from './matrix-rain'
import {
  HolographicShader,
  ScanLineOverlay,
  ScanLineOptions,
  DataStreamEffect,
  DataStreamOptions,
  CircuitBoardPattern,
  CyberParticles,
  TerminalTyping,
  PowerAnimation,
} from './effects'

// ============ Glitch Hook ============
export interface UseGlitchOptions {
  intensity?: GlitchIntensity
  variant?: GlitchVariant
  randomTrigger?: boolean
  duration?: number
  color1?: string
  color2?: string
}

export function useGlitch(options: UseGlitchOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const glitchRef = useRef<GlitchEffect | null>(null)

  useEffect(() => {
    if (!ref.current) return

    glitchRef.current = new GlitchEffect(ref.current, options)

    return () => {
      glitchRef.current?.destroy()
      glitchRef.current = null
    }
  }, [options.intensity, options.variant, options.randomTrigger, options.duration, options.color1, options.color2])

  const trigger = useCallback(() => {
    glitchRef.current?.trigger()
  }, [])

  return { ref, trigger }
}

// ============ Neon Flicker Hook ============
export function useNeonFlicker(options: NeonFlickerOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const flickerRef = useRef<NeonFlicker | null>(null)

  useEffect(() => {
    if (!ref.current) return

    flickerRef.current = new NeonFlicker(ref.current, options)

    return () => {
      flickerRef.current?.destroy()
      flickerRef.current = null
    }
  }, [options.color, options.secondaryColor, options.intensity, options.flickerSpeed, options.randomFlicker])

  const flicker = useCallback((duration?: number) => {
    flickerRef.current?.flicker(duration)
  }, [])

  const stop = useCallback(() => {
    flickerRef.current?.stop()
  }, [])

  return { ref, flicker, stop }
}

// ============ Matrix Rain Hook ============
export function useMatrixRain(options: MatrixRainOptions = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const matrixRef = useRef<MatrixRain | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    matrixRef.current = new MatrixRain(containerRef.current, options)
    
    if (options.characters !== undefined || 
        options.fontSize !== undefined ||
        options.speed !== undefined ||
        options.density !== undefined ||
        options.color !== undefined ||
        options.backgroundColor !== undefined ||
        options.trailLength !== undefined) {
      // Recreate with new options
      matrixRef.current?.destroy()
      matrixRef.current = new MatrixRain(containerRef.current, options)
      if (isRunning) {
        matrixRef.current.start()
      }
    }

    return () => {
      matrixRef.current?.destroy()
      matrixRef.current = null
    }
  }, [options, isRunning])

  const start = useCallback(() => {
    matrixRef.current?.start()
    setIsRunning(true)
  }, [])

  const stop = useCallback(() => {
    matrixRef.current?.stop()
    setIsRunning(false)
  }, [])

  return { ref: containerRef, start, stop, isRunning }
}

// ============ Holographic Shader Hook ============
export function useHolographicShader() {
  const ref = useRef<HTMLElement>(null)
  const shaderRef = useRef<HolographicShader | null>(null)

  useEffect(() => {
    if (!ref.current) return

    shaderRef.current = new HolographicShader(ref.current)

    return () => {
      shaderRef.current?.destroy()
      shaderRef.current = null
    }
  }, [])

  return { ref }
}

// ============ Scan Lines Hook ============
export function useScanLines(options: ScanLineOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const scanLineRef = useRef<ScanLineOverlay | null>(null)

  useEffect(() => {
    if (!ref.current) return

    scanLineRef.current = new ScanLineOverlay(ref.current, options)

    return () => {
      scanLineRef.current?.destroy()
      scanLineRef.current = null
    }
  }, [options.speed, options.opacity, options.color, options.crtEffect])

  return { ref }
}

// ============ Data Stream Hook ============
export function useDataStream(options: DataStreamOptions = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const streamRef = useRef<DataStreamEffect | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    streamRef.current = new DataStreamEffect(containerRef.current, options)

    return () => {
      streamRef.current?.destroy()
      streamRef.current = null
    }
  }, [options.type, options.speed, options.color, options.fontSize])

  return { ref: containerRef }
}

// ============ Circuit Board Hook ============
export function useCircuitBoard(complexity: 'simple' | 'medium' | 'complex' = 'medium') {
  const ref = useRef<HTMLElement>(null)
  const circuitRef = useRef<CircuitBoardPattern | null>(null)

  useEffect(() => {
    if (!ref.current) return

    circuitRef.current = new CircuitBoardPattern(ref.current, complexity)

    return () => {
      circuitRef.current?.destroy()
      circuitRef.current = null
    }
  }, [complexity])

  return { ref }
}

// ============ Cyber Particles Hook ============
export function useCyberParticles(count = 50) {
  const containerRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<CyberParticles | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    particlesRef.current = new CyberParticles(containerRef.current, count)

    return () => {
      particlesRef.current?.destroy()
      particlesRef.current = null
    }
  }, [count])

  return { ref: containerRef }
}

// ============ Terminal Typing Hook ============
export interface UseTerminalTypingOptions {
  text: string
  speed?: number
  onComplete?: () => void
}

export function useTerminalTyping({ text, speed = 50, onComplete }: UseTerminalTypingOptions) {
  const ref = useRef<HTMLElement>(null)
  const typingRef = useRef<TerminalTyping | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!ref.current || !text) return

    typingRef.current = new TerminalTyping(ref.current, text, speed, () => {
      setIsTyping(false)
      onComplete?.()
    })

    return () => {
      typingRef.current?.destroy()
      typingRef.current = null
    }
  }, [text, speed, onComplete])

  const start = useCallback(() => {
    typingRef.current?.start()
    setIsTyping(true)
  }, [])

  const stop = useCallback(() => {
    typingRef.current?.stop()
    setIsTyping(false)
  }, [])

  const reset = useCallback(() => {
    if (ref.current && text) {
      typingRef.current?.destroy()
      typingRef.current = new TerminalTyping(ref.current, text, speed, () => {
        setIsTyping(false)
        onComplete?.()
      })
    }
  }, [text, speed, onComplete])

  return { ref, start, stop, reset, isTyping }
}

// ============ Power Animation Hook ============
export function usePowerAnimation() {
  const ref = useRef<HTMLElement>(null)

  const powerUp = useCallback((duration = 1000) => {
    if (ref.current) {
      PowerAnimation.powerUp(ref.current, duration)
    }
  }, [])

  const powerDown = useCallback((duration = 1000) => {
    if (ref.current) {
      PowerAnimation.powerDown(ref.current, duration)
    }
  }, [])

  return { ref, powerUp, powerDown }
}

// ============ Combined Effects Hook ============
export interface UseCombinedEffectsOptions {
  glitch?: UseGlitchOptions | boolean
  neonFlicker?: NeonFlickerOptions | boolean
  scanLines?: ScanLineOptions | boolean
  holographic?: boolean
  dataStream?: DataStreamOptions | boolean
  circuitBoard?: 'simple' | 'medium' | 'complex' | boolean
  particles?: number | boolean
}

export function useCombinedEffects(options: UseCombinedEffectsOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const effectsRef = useRef<{
    glitch?: GlitchEffect
    neonFlicker?: NeonFlicker
    scanLines?: ScanLineOverlay
    holographic?: HolographicShader
    dataStream?: DataStreamEffect
    circuitBoard?: CircuitBoardPattern
    particles?: CyberParticles
  }>({})

  useEffect(() => {
    if (!ref.current) return

    // Apply each effect if enabled
    if (options.glitch) {
      const glitchOptions = typeof options.glitch === 'object' ? options.glitch : {}
      effectsRef.current.glitch = new GlitchEffect(ref.current, glitchOptions)
    }

    if (options.neonFlicker) {
      const flickerOptions = typeof options.neonFlicker === 'object' ? options.neonFlicker : {}
      effectsRef.current.neonFlicker = new NeonFlicker(ref.current, flickerOptions)
    }

    if (options.scanLines) {
      const scanOptions = typeof options.scanLines === 'object' ? options.scanLines : {}
      effectsRef.current.scanLines = new ScanLineOverlay(ref.current, scanOptions)
    }

    if (options.holographic) {
      effectsRef.current.holographic = new HolographicShader(ref.current)
    }

    if (options.dataStream) {
      const streamOptions = typeof options.dataStream === 'object' ? options.dataStream : {}
      effectsRef.current.dataStream = new DataStreamEffect(ref.current, streamOptions)
    }

    if (options.circuitBoard) {
      const complexity = typeof options.circuitBoard === 'string' ? options.circuitBoard : 'medium'
      effectsRef.current.circuitBoard = new CircuitBoardPattern(ref.current, complexity)
    }

    if (options.particles) {
      const count = typeof options.particles === 'number' ? options.particles : 50
      effectsRef.current.particles = new CyberParticles(ref.current, count)
    }

    return () => {
      // Cleanup all effects
      Object.values(effectsRef.current).forEach(effect => {
        if (effect && 'destroy' in effect) {
          effect.destroy()
        }
      })
      effectsRef.current = {}
    }
  }, [options])

  const triggerGlitch = useCallback(() => {
    effectsRef.current.glitch?.trigger()
  }, [])

  const flickerNeon = useCallback((duration?: number) => {
    effectsRef.current.neonFlicker?.flicker(duration)
  }, [])

  return { ref, triggerGlitch, flickerNeon }
}

// ============ Utility Hooks ============

// Hook for animated cyberpunk text
export function useCyberText(text: string, options: { glitch?: boolean; neon?: boolean; typing?: boolean } = {}) {
  const ref = useRef<HTMLElement>(null)
  const [displayText, setDisplayText] = useState(text)
  
  // Apply multiple effects based on options
  const glitchEffect = useGlitch(options.glitch ? { randomTrigger: true } : {})
  const neonEffect = useNeonFlicker(options.neon ? { randomFlicker: true } : {})
  const typingEffect = useTerminalTyping({ 
    text, 
    speed: 50,
    onComplete: () => {
      if (options.glitch) {
        glitchEffect.trigger()
      }
      if (options.neon) {
        neonEffect.flicker()
      }
    }
  })

  useEffect(() => {
    if (ref.current) {
      // Combine refs
      if (options.glitch && glitchEffect.ref.current !== ref.current) {
        glitchEffect.ref.current = ref.current
      }
      if (options.neon && neonEffect.ref.current !== ref.current) {
        neonEffect.ref.current = ref.current
      }
      if (options.typing && typingEffect.ref.current !== ref.current) {
        typingEffect.ref.current = ref.current
        typingEffect.start()
      }
    }
  }, [text, options])

  return { ref, displayText }
}

// Hook for cyberpunk loading states
export function useCyberLoading(isLoading: boolean) {
  const ref = useRef<HTMLElement>(null)
  const matrixRain = useMatrixRain({ speed: 50, density: 0.7 })
  const scanLines = useScanLines({ speed: 'fast', crtEffect: true })
  const powerAnimation = usePowerAnimation()

  useEffect(() => {
    if (isLoading) {
      matrixRain.start()
      powerAnimation.powerUp()
    } else {
      matrixRain.stop()
      powerAnimation.powerDown()
    }
  }, [isLoading])

  return {
    containerRef: ref,
    matrixRef: matrixRain.ref,
    scanRef: scanLines.ref,
    powerRef: powerAnimation.ref,
    isLoading
  }
}