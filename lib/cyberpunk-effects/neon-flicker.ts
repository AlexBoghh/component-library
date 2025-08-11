/**
 * Neon Flicker Animation
 * Realistic neon sign flicker with random intervals
 */

export interface NeonFlickerOptions {
  color?: string
  secondaryColor?: string
  intensity?: 'low' | 'medium' | 'high'
  flickerSpeed?: 'slow' | 'normal' | 'fast'
  randomFlicker?: boolean
}

export class NeonFlicker {
  private element: HTMLElement
  private options: Required<NeonFlickerOptions>
  private flickerInterval?: NodeJS.Timeout
  private isFlickering = false
  
  constructor(element: HTMLElement, options: NeonFlickerOptions = {}) {
    this.element = element
    this.options = {
      color: options.color || '#00ffff',
      secondaryColor: options.secondaryColor || '#ff00ff',
      intensity: options.intensity || 'medium',
      flickerSpeed: options.flickerSpeed || 'normal',
      randomFlicker: options.randomFlicker ?? true,
    }
    
    this.init()
  }
  
  private init() {
    this.applyNeonStyle()
    if (this.options.randomFlicker) {
      this.startRandomFlicker()
    }
  }
  
  private applyNeonStyle() {
    const intensity = this.getIntensityValues()
    const baseGlow = `
      0 0 ${intensity.blur1}px ${this.options.color},
      0 0 ${intensity.blur2}px ${this.options.color},
      0 0 ${intensity.blur3}px ${this.options.color},
      0 0 ${intensity.blur4}px ${this.options.secondaryColor}
    `
    
    if (this.element.tagName === 'TEXT' || this.element.classList.contains('text')) {
      this.element.style.textShadow = baseGlow
    } else {
      this.element.style.boxShadow = baseGlow
    }
    
    this.element.style.transition = 'all 0.1s ease-in-out'
  }
  
  private getIntensityValues() {
    switch (this.options.intensity) {
      case 'low':
        return { blur1: 5, blur2: 10, blur3: 20, blur4: 30 }
      case 'medium':
        return { blur1: 10, blur2: 20, blur3: 40, blur4: 60 }
      case 'high':
        return { blur1: 15, blur2: 30, blur3: 60, blur4: 90 }
      default:
        return { blur1: 10, blur2: 20, blur3: 40, blur4: 60 }
    }
  }
  
  private getFlickerSpeed() {
    switch (this.options.flickerSpeed) {
      case 'slow':
        return { min: 3000, max: 8000, duration: 300 }
      case 'normal':
        return { min: 1000, max: 5000, duration: 200 }
      case 'fast':
        return { min: 500, max: 2000, duration: 100 }
      default:
        return { min: 1000, max: 5000, duration: 200 }
    }
  }
  
  private startRandomFlicker() {
    const speed = this.getFlickerSpeed()
    
    const scheduleFlicker = () => {
      const delay = Math.random() * (speed.max - speed.min) + speed.min
      
      this.flickerInterval = setTimeout(() => {
        this.flicker(speed.duration)
        scheduleFlicker()
      }, delay)
    }
    
    scheduleFlicker()
  }
  
  public flicker(duration = 200) {
    if (this.isFlickering) return
    
    this.isFlickering = true
    const originalOpacity = this.element.style.opacity || '1'
    const originalFilter = this.element.style.filter || ''
    
    // Flicker sequence
    const sequence = [
      { opacity: '0.3', filter: 'brightness(0.5)' },
      { opacity: '1', filter: 'brightness(1.2)' },
      { opacity: '0.5', filter: 'brightness(0.7)' },
      { opacity: '1', filter: 'brightness(1)' },
      { opacity: '0.8', filter: 'brightness(0.9)' },
      { opacity: originalOpacity, filter: originalFilter },
    ]
    
    let step = 0
    const flickerStep = () => {
      if (step < sequence.length) {
        this.element.style.opacity = sequence[step].opacity
        this.element.style.filter = sequence[step].filter
        step++
        setTimeout(flickerStep, duration / sequence.length)
      } else {
        this.isFlickering = false
      }
    }
    
    flickerStep()
  }
  
  public stop() {
    if (this.flickerInterval) {
      clearTimeout(this.flickerInterval)
      this.flickerInterval = undefined
    }
    this.element.style.opacity = '1'
    this.element.style.filter = ''
  }
  
  public destroy() {
    this.stop()
    this.element.style.textShadow = ''
    this.element.style.boxShadow = ''
    this.element.style.transition = ''
  }
}

// CSS classes for neon effects
export const neonFlickerCSS = `
  .neon-flicker {
    animation: neon-flicker 2s infinite alternate;
  }
  
  .neon-flicker-fast {
    animation: neon-flicker 0.5s infinite alternate;
  }
  
  .neon-flicker-slow {
    animation: neon-flicker 4s infinite alternate;
  }
  
  @keyframes neon-flicker {
    0%, 100% {
      opacity: 1;
      filter: brightness(1);
    }
    5% {
      opacity: 0.8;
      filter: brightness(0.8);
    }
    10% {
      opacity: 1;
      filter: brightness(1.2);
    }
    15% {
      opacity: 0.9;
      filter: brightness(0.9);
    }
    20% {
      opacity: 1;
      filter: brightness(1);
    }
    50% {
      opacity: 1;
      filter: brightness(1);
    }
    55% {
      opacity: 0.7;
      filter: brightness(0.7);
    }
    60% {
      opacity: 1;
      filter: brightness(1.1);
    }
    65% {
      opacity: 0.85;
      filter: brightness(0.85);
    }
    70% {
      opacity: 1;
      filter: brightness(1);
    }
    95% {
      opacity: 0.9;
      filter: brightness(0.9);
    }
  }
`