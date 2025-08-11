/**
 * Cyberpunk Effects Library
 * Export all effects, hooks, and utilities
 */

// Import CSS constants first
import { glitchCSS } from './glitch'
import { neonFlickerCSS } from './neon-flicker'
import { matrixRainCSS } from './matrix-rain'
import { cyberpunkEffectsCSS } from './effects'

// Effect Classes
export { GlitchEffect, glitchCSS } from './glitch'
export type { GlitchIntensity, GlitchVariant } from './glitch'

export { NeonFlicker, neonFlickerCSS } from './neon-flicker'
export type { NeonFlickerOptions } from './neon-flicker'

export { MatrixRain, matrixRainCSS } from './matrix-rain'
export type { MatrixRainOptions } from './matrix-rain'

export {
  HolographicShader,
  ScanLineOverlay,
  DataStreamEffect,
  CircuitBoardPattern,
  CyberParticles,
  TerminalTyping,
  PowerAnimation,
  cyberpunkEffectsCSS
} from './effects'
export type { ScanLineOptions, DataStreamOptions } from './effects'

// React Hooks
export {
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
  useCyberLoading
} from './hooks'
export type {
  UseGlitchOptions,
  UseTerminalTypingOptions,
  UseCombinedEffectsOptions
} from './hooks'

// Combined CSS for all effects
export const allCyberpunkCSS = `
  ${glitchCSS}
  ${neonFlickerCSS}
  ${matrixRainCSS}
  ${cyberpunkEffectsCSS}
`

// Utility function to inject all CSS
export function injectCyberpunkStyles() {
  if (typeof document === 'undefined') return
  
  const styleId = 'cyberpunk-effects-styles'
  
  // Check if styles already exist
  if (document.getElementById(styleId)) return
  
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = allCyberpunkCSS
  document.head.appendChild(style)
}

// Preset configurations
export const presets = {
  terminal: {
    scanLines: { speed: 'slow' as const, crtEffect: true },
    dataStream: { type: 'matrix' as const, color: '#00ff00' },
    typing: { speed: 50 }
  },
  neonSign: {
    neonFlicker: { 
      intensity: 'high' as const, 
      flickerSpeed: 'normal' as const, 
      randomFlicker: true 
    },
    glitch: { 
      intensity: 'subtle' as const, 
      randomTrigger: true 
    }
  },
  hacker: {
    matrixRain: { 
      speed: 50,  // Authentic Matrix speed (frame delay in ms)
      density: 0.8, 
      color: '#0F0',
      trailLength: 20
    },
    dataStream: { 
      type: 'binary' as const, 
      speed: 100 
    },
    scanLines: { 
      speed: 'fast' as const, 
      opacity: 0.3 
    }
  },
  hologram: {
    holographic: true,
    glitch: { 
      variant: 'rgb' as const, 
      intensity: 'medium' as const 
    },
    scanLines: { 
      speed: 'slow' as const, 
      opacity: 0.2 
    }
  },
  cyberpunk: {
    neonFlicker: { 
      color: '#00ffff', 
      secondaryColor: '#ff00ff' 
    },
    circuitBoard: 'complex' as const,
    particles: 75,
    glitch: { 
      intensity: 'medium' as const, 
      randomTrigger: true 
    }
  }
}