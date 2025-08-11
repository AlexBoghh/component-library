'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const cyberpunkButtonVariants = cva(
  "relative inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none overflow-hidden group",
  {
    variants: {
      variant: {
        "neon-primary": [
          "bg-black/90 text-cyan-400 border border-cyan-400/50",
          "shadow-[0_0_10px_rgba(0,255,255,0.5),inset_0_0_10px_rgba(0,255,255,0.1)]",
          "hover:shadow-[0_0_20px_rgba(0,255,255,0.8),inset_0_0_20px_rgba(0,255,255,0.2)]",
          "hover:border-cyan-300 hover:text-cyan-300",
          "active:scale-95"
        ],
        "neon-danger": [
          "bg-black/90 text-red-400 border border-red-400/50",
          "shadow-[0_0_10px_rgba(255,0,100,0.5),inset_0_0_10px_rgba(255,0,100,0.1)]",
          "hover:shadow-[0_0_20px_rgba(255,0,100,0.8),inset_0_0_20px_rgba(255,0,100,0.2)]",
          "hover:border-red-300 hover:text-red-300",
          "active:scale-95",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,0,0.1)_10px,rgba(255,0,0,0.1)_20px)]"
        ],
        "neon-success": [
          "bg-black/90 text-green-400 border border-green-400/50",
          "shadow-[0_0_10px_rgba(0,255,0,0.5),inset_0_0_10px_rgba(0,255,0,0.1)]",
          "hover:shadow-[0_0_20px_rgba(0,255,0,0.8),inset_0_0_20px_rgba(0,255,0,0.2)]",
          "hover:border-green-300 hover:text-green-300",
          "active:scale-95"
        ],
        "holographic": [
          "bg-black/90 text-white",
          "border border-transparent",
          "bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500",
          "shadow-[0_0_20px_rgba(255,255,255,0.3)]",
          "hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
          "before:content-[''] before:absolute before:inset-[1px]",
          "before:bg-black/90 before:rounded-[inherit]",
          "[&>*]:relative [&>*]:z-10"
        ],
        "glitch": [
          "bg-black/90 text-white border border-white/20",
          "data-[glitch]:animate-glitch",
          "hover:animate-glitch-hover",
          "shadow-[0_0_10px_rgba(255,255,255,0.3)]",
          "after:content-[attr(data-text)] after:absolute after:inset-0",
          "after:flex after:items-center after:justify-center",
          "after:text-cyan-400 after:opacity-0 after:animate-glitch-1",
          "hover:after:opacity-100",
          "before:content-[attr(data-text)] before:absolute before:inset-0",
          "before:flex before:items-center before:justify-center",
          "before:text-red-400 before:opacity-0 before:animate-glitch-2",
          "hover:before:opacity-100"
        ],
        "terminal": [
          "bg-black text-green-400 border border-green-400/30",
          "font-mono tracking-normal",
          "shadow-[0_0_5px_rgba(0,255,0,0.3)]",
          "hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]",
          "hover:bg-green-950/50",
          "after:content-['_'] after:animate-blink after:text-green-400"
        ],
        "ghost": [
          "bg-transparent text-cyan-400",
          "hover:bg-cyan-400/10 hover:text-cyan-300",
          "hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
        ],
        "outline": [
          "bg-transparent text-cyan-400 border border-cyan-400/50",
          "hover:bg-cyan-400/10 hover:border-cyan-400",
          "hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
        ]
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10"
      },
      corners: {
        normal: "rounded-none",
        cut: "clip-path-cyber",
        rounded: "rounded-md"
      },
      effects: {
        none: "",
        scanning: "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-cyan-400/10 after:to-transparent",
        flicker: "opacity-90 hover:opacity-100",
        pulse: "animate-pulse"
      }
    },
    defaultVariants: {
      variant: "neon-primary",
      size: "md",
      corners: "cut",
      effects: "none"
    }
  }
)

// LED Corner Component
const LEDCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const positionClasses = {
    tl: 'top-1 left-1',
    tr: 'top-1 right-1',
    bl: 'bottom-1 left-1',
    br: 'bottom-1 right-1'
  }
  
  return (
    <span 
      className={cn(
        "absolute w-1 h-1 rounded-full bg-cyan-400 animate-led-blink",
        positionClasses[position]
      )}
      style={{
        boxShadow: '0 0 6px rgba(0, 255, 255, 0.8)',
        animationDelay: position === 'tr' || position === 'bl' ? '0.5s' : '0s'
      }}
    />
  )
}

export interface CyberpunkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberpunkButtonVariants> {
  asChild?: boolean
  loading?: boolean
  glitchOnHover?: boolean
  showLEDs?: boolean
  dataAugmented?: boolean
  soundEffect?: boolean
  dataText?: string
  scanline?: boolean
}

const CyberpunkButton = React.forwardRef<HTMLButtonElement, CyberpunkButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    corners,
    effects,
    asChild = false,
    loading = false,
    glitchOnHover = false,
    showLEDs = false,
    dataAugmented = false,
    soundEffect = false,
    dataText,
    scanline = false,
    children,
    onClick,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [isClicked, setIsClicked] = React.useState(false)
    
    // Simplified click handler
    const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      // Simple click feedback
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 200)
      
      onClick?.(e)
    }, [onClick])
    
    return (
      <Comp
        className={cn(
          cyberpunkButtonVariants({ variant, size, corners, effects }),
          glitchOnHover && "hover:data-[glitch]:true",
          isClicked && "animate-pulse-click",
          dataAugmented && "data-augmented",
          scanline && "scanline-overlay",
          loading && "cursor-wait",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        data-text={dataText || (typeof children === 'string' ? children : '')}
        data-glitch={glitchOnHover}
        {...props}
      >
        {/* LED Corners */}
        {showLEDs && !loading && (
          <>
            <LEDCorner position="tl" />
            <LEDCorner position="tr" />
            <LEDCorner position="bl" />
            <LEDCorner position="br" />
          </>
        )}
        
        {/* Loading State */}
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="animate-pulse">PROCESSING...</span>
          </>
        ) : (
          children
        )}
        
        {/* Augmented Reality Overlay */}
        {dataAugmented && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 text-[8px] text-cyan-400/50 font-mono">
              AR_ENABLED
            </div>
            <div className="absolute bottom-0 right-0 text-[8px] text-cyan-400/50 font-mono">
              v2.077
            </div>
          </div>
        )}
      </Comp>
    )
  }
)
CyberpunkButton.displayName = "CyberpunkButton"

// Icon Button Wrapper for special cyberpunk icon effects
export const CyberpunkIconButton = React.forwardRef<
  HTMLButtonElement,
  CyberpunkButtonProps & { iconAnimation?: 'rotate' | 'pulse' | 'glitch' }
>(({ children, iconAnimation = 'pulse', className, ...props }, ref) => {
  return (
    <CyberpunkButton
      ref={ref}
      className={cn(
        "[&>svg]:transition-all [&>svg]:duration-300",
        iconAnimation === 'rotate' && "[&>svg]:hover:rotate-180",
        iconAnimation === 'pulse' && "[&>svg]:hover:animate-pulse",
        iconAnimation === 'glitch' && "[&>svg]:hover:animate-glitch",
        className
      )}
      {...props}
    >
      {children}
    </CyberpunkButton>
  )
})
CyberpunkIconButton.displayName = "CyberpunkIconButton"

export { CyberpunkButton, cyberpunkButtonVariants }