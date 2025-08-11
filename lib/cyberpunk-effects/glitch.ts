/**
 * Glitch Effect Class
 * CSS animations with transform skew and RGB shift
 */

export type GlitchIntensity = 'subtle' | 'medium' | 'intense'
export type GlitchVariant = 'text' | 'box' | 'rgb' | 'distortion'

interface GlitchOptions {
  intensity?: GlitchIntensity
  variant?: GlitchVariant
  randomTrigger?: boolean
  duration?: number
  color1?: string
  color2?: string
}

export class GlitchEffect {
  private element: HTMLElement
  private options: Required<GlitchOptions>
  private intervalId?: NodeJS.Timeout
  
  constructor(element: HTMLElement, options: GlitchOptions = {}) {
    this.element = element
    this.options = {
      intensity: options.intensity || 'medium',
      variant: options.variant || 'text',
      randomTrigger: options.randomTrigger || false,
      duration: options.duration || 200,
      color1: options.color1 || '#00ffff',
      color2: options.color2 || '#ff00ff',
    }
    
    this.init()
  }
  
  private init() {
    this.element.style.position = 'relative'
    this.applyBaseStyles()
    
    if (this.options.randomTrigger) {
      this.startRandomGlitch()
    }
  }
  
  private applyBaseStyles() {
    const styles = this.getStyles()
    Object.assign(this.element.style, styles)
  }
  
  private getStyles(): Partial<CSSStyleDeclaration> {
    const intensity = this.getIntensityValues()
    
    switch (this.options.variant) {
      case 'text':
        return {
          textShadow: `
            ${intensity.offset}px 0 ${this.options.color1},
            -${intensity.offset}px 0 ${this.options.color2}
          `,
        }
      case 'box':
        return {
          boxShadow: `
            ${intensity.offset}px 0 ${intensity.blur}px ${this.options.color1},
            -${intensity.offset}px 0 ${intensity.blur}px ${this.options.color2}
          `,
        }
      case 'rgb':
        return {
          filter: `
            drop-shadow(${intensity.offset}px 0 0 ${this.options.color1})
            drop-shadow(-${intensity.offset}px 0 0 ${this.options.color2})
          `,
        }
      case 'distortion':
        return {
          transform: `skew(${intensity.skew}deg)`,
        }
      default:
        return {}
    }
  }
  
  private getIntensityValues() {
    switch (this.options.intensity) {
      case 'subtle':
        return { offset: 1, blur: 2, skew: 0.5 }
      case 'medium':
        return { offset: 2, blur: 4, skew: 1 }
      case 'intense':
        return { offset: 4, blur: 8, skew: 2 }
      default:
        return { offset: 2, blur: 4, skew: 1 }
    }
  }
  
  private startRandomGlitch() {
    const minInterval = 2000
    const maxInterval = 8000
    
    const triggerGlitch = () => {
      this.trigger()
      const nextInterval = Math.random() * (maxInterval - minInterval) + minInterval
      this.intervalId = setTimeout(triggerGlitch, nextInterval)
    }
    
    triggerGlitch()
  }
  
  public trigger() {
    this.element.classList.add('glitch-active')
    this.applyGlitchAnimation()
    
    setTimeout(() => {
      this.element.classList.remove('glitch-active')
      this.removeGlitchAnimation()
    }, this.options.duration)
  }
  
  private applyGlitchAnimation() {
    const keyframes = this.getKeyframes()
    this.element.animate(keyframes, {
      duration: this.options.duration,
      easing: 'steps(2)',
    })
  }
  
  private getKeyframes() {
    const intensity = this.getIntensityValues()
    
    return [
      { transform: 'translate(0)' },
      { transform: `translate(${intensity.offset}px, -${intensity.offset}px)` },
      { transform: `translate(-${intensity.offset}px, ${intensity.offset}px)` },
      { transform: 'translate(0)' },
    ]
  }
  
  private removeGlitchAnimation() {
    // Animation cleanup handled by Web Animations API
  }
  
  public destroy() {
    if (this.intervalId) {
      clearTimeout(this.intervalId)
    }
    this.element.classList.remove('glitch-active')
  }
}

// CSS classes for global usage
export const glitchCSS = `
  .glitch-text {
    position: relative;
    animation: glitch-skew 1s infinite linear alternate-reverse;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  .glitch-text::before {
    animation: glitch-1 0.5s infinite linear alternate-reverse;
    color: #00ffff;
    z-index: -1;
  }
  
  .glitch-text::after {
    animation: glitch-2 0.5s infinite linear alternate-reverse;
    color: #ff00ff;
    z-index: -2;
  }
  
  @keyframes glitch-1 {
    0% {
      clip: rect(44px, 450px, 56px, 0);
      transform: translate(-2px, -1px);
    }
    20% {
      clip: rect(70px, 450px, 90px, 0);
      transform: translate(2px, 1px);
    }
    40% {
      clip: rect(20px, 450px, 40px, 0);
      transform: translate(-1px, 0);
    }
    60% {
      clip: rect(80px, 450px, 95px, 0);
      transform: translate(1px, -1px);
    }
    80% {
      clip: rect(10px, 450px, 30px, 0);
      transform: translate(0, 1px);
    }
    100% {
      clip: rect(60px, 450px, 75px, 0);
      transform: translate(-2px, 0);
    }
  }
  
  @keyframes glitch-2 {
    0% {
      clip: rect(65px, 450px, 80px, 0);
      transform: translate(1px, 0);
    }
    20% {
      clip: rect(30px, 450px, 50px, 0);
      transform: translate(-1px, 1px);
    }
    40% {
      clip: rect(80px, 450px, 100px, 0);
      transform: translate(2px, -1px);
    }
    60% {
      clip: rect(10px, 450px, 25px, 0);
      transform: translate(-2px, 1px);
    }
    80% {
      clip: rect(50px, 450px, 70px, 0);
      transform: translate(1px, -2px);
    }
    100% {
      clip: rect(90px, 450px, 110px, 0);
      transform: translate(0, 1px);
    }
  }
  
  @keyframes glitch-skew {
    0% {
      transform: skew(0deg);
    }
    10% {
      transform: skew(-1deg);
    }
    20% {
      transform: skew(0.5deg);
    }
    30% {
      transform: skew(-0.5deg);
    }
    40% {
      transform: skew(0deg);
    }
    50% {
      transform: skew(0.5deg);
    }
    60% {
      transform: skew(0deg);
    }
    70% {
      transform: skew(-0.5deg);
    }
    80% {
      transform: skew(0.5deg);
    }
    90% {
      transform: skew(0deg);
    }
    100% {
      transform: skew(0deg);
    }
  }
`