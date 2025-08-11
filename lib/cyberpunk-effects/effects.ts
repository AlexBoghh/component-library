/**
 * Additional Cyberpunk Effects
 * Holographic, scan lines, data streams, and more
 */

// ============ Holographic Shader ============
export class HolographicShader {
  private element: HTMLElement
  private animationId?: number
  
  constructor(element: HTMLElement) {
    this.element = element
    this.init()
  }
  
  private init() {
    this.element.style.background = `
      linear-gradient(
        45deg,
        #ff006e,
        #8338ec,
        #3a86ff,
        #06b6d4,
        #10b981,
        #f59e0b,
        #ff006e
      )
    `
    this.element.style.backgroundSize = '400% 400%'
    this.element.style.animation = 'holographic-shift 3s ease infinite'
    
    // Add iridescent overlay
    const overlay = document.createElement('div')
    overlay.className = 'holographic-overlay'
    overlay.style.position = 'absolute'
    overlay.style.inset = '0'
    overlay.style.background = 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)'
    overlay.style.animation = 'holographic-shine 2s infinite'
    overlay.style.pointerEvents = 'none'
    overlay.style.mixBlendMode = 'overlay'
    
    this.element.style.position = 'relative'
    this.element.appendChild(overlay)
  }
  
  public destroy() {
    this.element.querySelector('.holographic-overlay')?.remove()
    this.element.style.animation = ''
    this.element.style.background = ''
    this.element.style.backgroundSize = ''
  }
}

// ============ Scan Line Overlay ============
export interface ScanLineOptions {
  speed?: 'slow' | 'normal' | 'fast'
  opacity?: number
  color?: string
  crtEffect?: boolean
}

export class ScanLineOverlay {
  private element: HTMLElement
  private scanLine: HTMLDivElement
  
  constructor(element: HTMLElement, options: ScanLineOptions = {}) {
    this.element = element
    this.scanLine = document.createElement('div')
    this.init(options)
  }
  
  private init(options: ScanLineOptions) {
    const speed = options.speed || 'normal'
    const opacity = options.opacity || 0.5
    const color = options.color || '#00ffff'
    
    this.element.style.position = 'relative'
    this.element.style.overflow = 'hidden'
    
    this.scanLine.className = 'scan-line'
    this.scanLine.style.position = 'absolute'
    this.scanLine.style.left = '0'
    this.scanLine.style.right = '0'
    this.scanLine.style.height = '2px'
    this.scanLine.style.background = color
    this.scanLine.style.opacity = opacity.toString()
    this.scanLine.style.boxShadow = `0 0 10px ${color}`
    this.scanLine.style.pointerEvents = 'none'
    this.scanLine.style.zIndex = '10'
    
    const duration = speed === 'slow' ? '8s' : speed === 'fast' ? '2s' : '4s'
    this.scanLine.style.animation = `scan-line-move ${duration} linear infinite`
    
    this.element.appendChild(this.scanLine)
    
    if (options.crtEffect) {
      this.addCRTEffect()
    }
  }
  
  private addCRTEffect() {
    const crtOverlay = document.createElement('div')
    crtOverlay.className = 'crt-overlay'
    crtOverlay.style.position = 'absolute'
    crtOverlay.style.inset = '0'
    crtOverlay.style.background = `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.3) 2px,
        rgba(0, 0, 0, 0.3) 4px
      )
    `
    crtOverlay.style.pointerEvents = 'none'
    crtOverlay.style.zIndex = '9'
    
    this.element.appendChild(crtOverlay)
  }
  
  public destroy() {
    this.scanLine.remove()
    this.element.querySelector('.crt-overlay')?.remove()
  }
}

// ============ Data Stream Effect ============
export interface DataStreamOptions {
  type?: 'binary' | 'hex' | 'matrix'
  speed?: number
  color?: string
  fontSize?: number
}

export class DataStreamEffect {
  private container: HTMLElement
  private streamElement: HTMLDivElement
  private intervalId?: NodeJS.Timeout
  
  constructor(container: HTMLElement, options: DataStreamOptions = {}) {
    this.container = container
    this.streamElement = document.createElement('div')
    this.init(options)
  }
  
  private init(options: DataStreamOptions) {
    const type = options.type || 'binary'
    const speed = options.speed || 100
    const color = options.color || '#00ff00'
    const fontSize = options.fontSize || 12
    
    this.streamElement.style.position = 'absolute'
    this.streamElement.style.inset = '0'
    this.streamElement.style.color = color
    this.streamElement.style.fontFamily = 'monospace'
    this.streamElement.style.fontSize = `${fontSize}px`
    this.streamElement.style.overflow = 'hidden'
    this.streamElement.style.pointerEvents = 'none'
    this.streamElement.style.opacity = '0.8'
    this.streamElement.style.lineHeight = '1.2'
    this.streamElement.style.whiteSpace = 'pre-wrap'
    this.streamElement.style.wordBreak = 'break-all'
    
    this.container.style.position = 'relative'
    this.container.appendChild(this.streamElement)
    
    this.startStream(type, speed)
  }
  
  private startStream(type: string, speed: number) {
    this.intervalId = setInterval(() => {
      const chunk = this.generateData(type)
      this.streamElement.textContent += chunk
      
      // Keep only last 1000 characters
      if (this.streamElement.textContent!.length > 1000) {
        this.streamElement.textContent = this.streamElement.textContent!.slice(-800)
      }
      
      // Auto scroll
      this.streamElement.scrollTop = this.streamElement.scrollHeight
    }, speed)
  }
  
  private generateData(type: string): string {
    switch (type) {
      case 'binary':
        return Array.from({ length: 8 }, () => Math.round(Math.random())).join('') + ' '
      case 'hex':
        return Math.random().toString(16).substr(2, 8).toUpperCase() + ' '
      case 'matrix':
        const chars = 'アイウエオカキクケコ0123456789ABCDEF'
        return Array.from({ length: 4 }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      default:
        return '00 '
    }
  }
  
  public destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    this.streamElement.remove()
  }
}

// ============ Circuit Board Pattern ============
export class CircuitBoardPattern {
  private svg: SVGElement
  
  constructor(container: HTMLElement, complexity: 'simple' | 'medium' | 'complex' = 'medium') {
    this.svg = this.createCircuitPattern(complexity)
    this.init(container)
  }
  
  private init(container: HTMLElement) {
    container.style.position = 'relative'
    this.svg.style.position = 'absolute'
    this.svg.style.inset = '0'
    this.svg.style.width = '100%'
    this.svg.style.height = '100%'
    this.svg.style.pointerEvents = 'none'
    this.svg.style.opacity = '0.3'
    container.appendChild(this.svg)
  }
  
  private createCircuitPattern(complexity: string): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 400 400')
    
    // Create circuit paths
    const paths = this.generateCircuitPaths(complexity)
    paths.forEach(path => {
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      pathElement.setAttribute('d', path)
      pathElement.setAttribute('stroke', '#00ffff')
      pathElement.setAttribute('stroke-width', '1')
      pathElement.setAttribute('fill', 'none')
      pathElement.style.animation = 'circuit-pulse 3s infinite'
      svg.appendChild(pathElement)
    })
    
    // Add connection dots
    for (let i = 0; i < 20; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', (Math.random() * 400).toString())
      circle.setAttribute('cy', (Math.random() * 400).toString())
      circle.setAttribute('r', '2')
      circle.setAttribute('fill', '#00ffff')
      circle.style.animation = `circuit-dot-pulse ${2 + Math.random() * 2}s infinite`
      svg.appendChild(circle)
    }
    
    return svg
  }
  
  private generateCircuitPaths(complexity: string): string[] {
    const paths: string[] = []
    const count = complexity === 'simple' ? 5 : complexity === 'complex' ? 15 : 10
    
    for (let i = 0; i < count; i++) {
      const startX = Math.random() * 400
      const startY = Math.random() * 400
      const endX = Math.random() * 400
      const endY = Math.random() * 400
      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2
      
      // Create L-shaped paths
      paths.push(`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`)
    }
    
    return paths
  }
  
  public destroy() {
    this.svg.remove()
  }
}

// ============ Cyber Particles ============
export class CyberParticles {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private animationId?: number
  private mouseX = 0
  private mouseY = 0
  
  constructor(container: HTMLElement, count = 50) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
    this.init(container, count)
  }
  
  private init(container: HTMLElement, count: number) {
    container.style.position = 'relative'
    this.canvas.style.position = 'absolute'
    this.canvas.style.inset = '0'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.pointerEvents = 'none'
    
    container.appendChild(this.canvas)
    this.resize()
    
    // Create particles
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height))
    }
    
    // Mouse tracking
    container.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('resize', this.handleResize)
    
    this.animate()
  }
  
  private handleMouseMove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    this.mouseX = e.clientX - rect.left
    this.mouseY = e.clientY - rect.top
  }
  
  private handleResize = () => {
    this.resize()
  }
  
  private resize() {
    const rect = this.canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      this.canvas.width = rect.width
      this.canvas.height = rect.height
    }
  }
  
  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    this.particles.forEach(particle => {
      particle.update(this.mouseX, this.mouseY)
      particle.draw(this.ctx)
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.x > this.canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = this.canvas.height
      if (particle.y > this.canvas.height) particle.y = 0
    })
    
    this.animationId = requestAnimationFrame(this.animate)
  }
  
  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.handleResize)
    this.canvas.remove()
  }
}

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * 3 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00']
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }
  
  update(mouseX: number, mouseY: number) {
    // React to mouse
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 100) {
      const force = (100 - distance) / 100
      this.speedX -= (dx / distance) * force * 0.5
      this.speedY -= (dy / distance) * force * 0.5
    }
    
    // Apply friction
    this.speedX *= 0.98
    this.speedY *= 0.98
    
    // Update position
    this.x += this.speedX
    this.y += this.speedY
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.shadowBlur = 10
    ctx.shadowColor = this.color
    
    // Draw hexagon
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = this.x + this.size * Math.cos(angle)
      const y = this.y + this.size * Math.sin(angle)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    
    ctx.shadowBlur = 0
  }
}

// ============ Terminal Typing Effect ============
export class TerminalTyping {
  private element: HTMLElement
  private text: string
  private speed: number
  private currentIndex = 0
  private intervalId?: NodeJS.Timeout
  private cursor: HTMLSpanElement
  private onComplete?: () => void
  
  constructor(element: HTMLElement, text: string, speed = 50, onComplete?: () => void) {
    this.element = element
    this.text = text
    this.speed = speed
    this.onComplete = onComplete
    this.cursor = document.createElement('span')
    this.init()
  }
  
  private init() {
    this.element.style.fontFamily = 'monospace'
    this.element.textContent = ''
    
    this.cursor.textContent = '_'
    this.cursor.style.animation = 'blink 1s infinite'
    this.element.appendChild(this.cursor)
  }
  
  public start() {
    this.intervalId = setInterval(() => {
      if (this.currentIndex < this.text.length) {
        const char = this.text[this.currentIndex]
        const textNode = document.createTextNode(char)
        this.element.insertBefore(textNode, this.cursor)
        this.currentIndex++
      } else {
        this.stop()
        if (this.onComplete) {
          this.onComplete()
        }
      }
    }, this.speed)
  }
  
  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
  
  public destroy() {
    this.stop()
    this.element.textContent = ''
  }
}

// ============ Power Animation ============
export class PowerAnimation {
  static powerUp(element: HTMLElement, duration = 1000) {
    element.style.opacity = '0'
    element.style.transform = 'scale(0.8)'
    element.style.filter = 'blur(10px)'
    element.style.transition = `all ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
    
    setTimeout(() => {
      element.style.opacity = '1'
      element.style.transform = 'scale(1)'
      element.style.filter = 'blur(0)'
    }, 50)
    
    // Add electricity effect
    const electricity = document.createElement('div')
    electricity.style.position = 'absolute'
    electricity.style.inset = '0'
    electricity.style.background = 'linear-gradient(45deg, transparent, #00ffff, transparent)'
    electricity.style.opacity = '0'
    electricity.style.pointerEvents = 'none'
    electricity.style.animation = `electricity ${duration}ms ease-out`
    
    element.style.position = 'relative'
    element.appendChild(electricity)
    
    setTimeout(() => {
      electricity.remove()
    }, duration)
  }
  
  static powerDown(element: HTMLElement, duration = 1000) {
    element.style.transition = `all ${duration}ms ease-in`
    element.style.opacity = '0'
    element.style.transform = 'scale(0.8) translateY(20px)'
    element.style.filter = 'blur(10px) brightness(2)'
    
    // Flicker effect
    const flicker = [
      { opacity: '1', filter: 'brightness(1)' },
      { opacity: '0.3', filter: 'brightness(2)' },
      { opacity: '0.8', filter: 'brightness(0.5)' },
      { opacity: '0', filter: 'brightness(0)' }
    ]
    
    element.animate(flicker, {
      duration: duration,
      easing: 'ease-out'
    })
  }
}

// Export all CSS
export const cyberpunkEffectsCSS = `
  @keyframes holographic-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes holographic-shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  
  @keyframes scan-line-move {
    0% { top: -2px; }
    100% { top: 100%; }
  }
  
  @keyframes circuit-pulse {
    0%, 100% { opacity: 0.3; stroke: #00ffff; }
    50% { opacity: 1; stroke: #ffffff; }
  }
  
  @keyframes circuit-dot-pulse {
    0%, 100% { opacity: 0.5; r: 2; }
    50% { opacity: 1; r: 3; }
  }
  
  @keyframes electricity {
    0% { opacity: 0; transform: scaleX(0); }
    50% { opacity: 1; transform: scaleX(1); }
    100% { opacity: 0; transform: scaleX(1); }
  }
  
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`