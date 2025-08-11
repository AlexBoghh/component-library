/**
 * Matrix Rain Background
 * Canvas-based matrix rain effect with authentic Matrix movie styling
 */

export interface MatrixRainOptions {
  characters?: string
  fontSize?: number
  speed?: number  // Frame delay in ms (higher = slower)
  density?: number
  color?: string
  backgroundColor?: string
  trailLength?: number  // How many characters in the trail
}

interface Column {
  y: number
  speed: number
  trail: string[]
  nextCharTime: number
}

export class MatrixRain {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private options: Required<MatrixRainOptions>
  private columns: Column[] = []
  private animationId?: number
  private isRunning = false
  private lastTime = 0
  
  constructor(container: HTMLElement, options: MatrixRainOptions = {}) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
    this.options = {
      characters: options.characters || 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      fontSize: options.fontSize || 16,
      speed: options.speed || 50,  // Frame delay - authentic Matrix speed
      density: options.density || 1,
      color: options.color || '#0F0',
      backgroundColor: options.backgroundColor || 'rgba(0, 0, 0, 0.05)',
      trailLength: options.trailLength || 20,
    }
    
    this.init(container)
  }
  
  private init(container: HTMLElement) {
    // Setup canvas
    this.canvas.style.position = 'absolute'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.zIndex = '0'
    
    container.style.position = 'relative'
    container.appendChild(this.canvas)
    
    this.resize()
    this.initColumns()
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize)
  }
  
  private handleResize = () => {
    this.resize()
    this.initColumns()
  }
  
  private resize() {
    const rect = this.canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      this.canvas.width = rect.width
      this.canvas.height = rect.height
    }
  }
  
  private initColumns() {
    const columnCount = Math.floor(this.canvas.width / this.options.fontSize)
    this.columns = []
    
    for (let i = 0; i < columnCount; i++) {
      // Random chance to have a column active
      if (Math.random() < this.options.density) {
        this.columns.push({
          y: Math.random() * -this.canvas.height,
          speed: 0.5 + Math.random() * 1.5,  // Variable speed per column
          trail: [],
          nextCharTime: 0
        })
      } else {
        this.columns.push({
          y: -this.options.fontSize * this.options.trailLength,
          speed: 0.5 + Math.random() * 1.5,
          trail: [],
          nextCharTime: 0
        })
      }
    }
  }
  
  public start() {
    if (this.isRunning) return
    this.isRunning = true
    this.animate()
  }
  
  private animate = (currentTime: number = 0) => {
    if (!this.isRunning) return
    
    // Control frame rate
    if (currentTime - this.lastTime < this.options.speed) {
      this.animationId = requestAnimationFrame(this.animate)
      return
    }
    this.lastTime = currentTime
    
    // Fade effect for trails
    this.ctx.fillStyle = this.options.backgroundColor
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    
    // Set font
    this.ctx.font = `bold ${this.options.fontSize}px monospace`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i]
      const x = i * this.options.fontSize + this.options.fontSize / 2
      
      // Add new character to trail
      if (currentTime > column.nextCharTime) {
        const char = this.options.characters[
          Math.floor(Math.random() * this.options.characters.length)
        ]
        column.trail.push(char)
        
        // Keep trail at max length
        if (column.trail.length > this.options.trailLength) {
          column.trail.shift()
        }
        
        column.nextCharTime = currentTime + (Math.random() * 100 + 50)
      }
      
      // Draw the trail
      for (let j = 0; j < column.trail.length; j++) {
        const y = column.y + j * this.options.fontSize
        
        if (y > 0 && y < this.canvas.height + this.options.fontSize) {
          // Calculate brightness based on position in trail
          const brightness = j / column.trail.length
          
          if (j === column.trail.length - 1) {
            // Leading character - bright white
            this.ctx.fillStyle = '#fff'
            this.ctx.shadowBlur = 8
            this.ctx.shadowColor = '#0f0'
          } else if (j > column.trail.length - 3) {
            // Near-leading characters - bright green
            this.ctx.fillStyle = '#0f0'
            this.ctx.shadowBlur = 4
            this.ctx.shadowColor = '#0f0'
          } else {
            // Trail - fading green
            const opacity = brightness * 0.8
            this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`
            this.ctx.shadowBlur = 0
          }
          
          this.ctx.fillText(column.trail[j], x, y)
        }
      }
      
      // Move column down
      column.y += column.speed * this.options.fontSize
      
      // Reset column when it goes off screen
      if (column.y > this.canvas.height + this.options.fontSize * 2) {
        column.y = -this.options.fontSize * this.options.trailLength
        column.trail = []
        column.speed = 0.5 + Math.random() * 1.5
        column.nextCharTime = currentTime + Math.random() * 2000
      }
    }
    
    this.animationId = requestAnimationFrame(this.animate)
  }
  
  public stop() {
    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = undefined
    }
  }
  
  public destroy() {
    this.stop()
    window.removeEventListener('resize', this.handleResize)
    this.canvas.remove()
  }
}

// Pure CSS Matrix Rain (simplified version)
export const matrixRainCSS = `
  .matrix-rain {
    position: relative;
    overflow: hidden;
  }
  
  .matrix-rain::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 0, 0.03) 2px,
        rgba(0, 255, 0, 0.03) 4px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 0, 0.03) 2px,
        rgba(0, 255, 0, 0.03) 4px
      );
    animation: matrix-rain-fall 20s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
  
  @keyframes matrix-rain-fall {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  
  .matrix-characters {
    position: absolute;
    color: #0F0;
    font-family: monospace;
    font-size: 20px;
    animation: matrix-fall linear infinite;
    text-shadow: 0 0 5px #0F0;
  }
  
  @keyframes matrix-fall {
    to {
      transform: translateY(100vh);
    }
  }
`