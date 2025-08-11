'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Shield, Lock, AlertTriangle, Activity, Zap } from "lucide-react"

export interface CyberpunkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'terminal' | 'hologram' | 'secure'
  showLEDs?: boolean
  showScanline?: boolean
  accessAnimation?: boolean
  stamp?: 'CLASSIFIED' | 'ENCRYPTED' | 'SECURE' | 'RESTRICTED'
}

const CyberpunkCard = React.forwardRef<HTMLDivElement, CyberpunkCardProps>(
  ({ 
    className, 
    children, 
    variant = 'default',
    showLEDs = true,
    showScanline = false,
    accessAnimation = false,
    stamp,
    ...props 
  }, ref) => {
    const [isRevealed, setIsRevealed] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    React.useEffect(() => {
      if (accessAnimation) {
        const timer = setTimeout(() => setIsRevealed(true), 500)
        return () => clearTimeout(timer)
      } else {
        setIsRevealed(true)
      }
    }, [accessAnimation])

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-500",
          "transform-gpu perspective-1000",
          isHovered && "translate-y-[-4px] scale-[1.02]",
          !isRevealed && "opacity-0 scale-95",
          isRevealed && "opacity-100 scale-100",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Background and Border */}
        <div className={cn(
          "absolute inset-0 rounded-lg",
          variant === 'default' && "bg-black/90 border-2 border-cyan-400/50",
          variant === 'terminal' && "bg-green-950/90 border-2 border-green-400/50",
          variant === 'hologram' && "bg-blue-950/20 border-2 border-blue-400/30 backdrop-blur-md",
          variant === 'secure' && "bg-purple-950/90 border-2 border-purple-400/50",
          isHovered && variant === 'default' && "border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)]",
          isHovered && variant === 'terminal' && "border-green-400 shadow-[0_0_30px_rgba(0,255,0,0.5)]",
          isHovered && variant === 'hologram' && "border-blue-400 shadow-[0_0_30px_rgba(0,100,255,0.5)]",
          isHovered && variant === 'secure' && "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
        )} />

        {/* Grid Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Corner Brackets */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left */}
          <div className={cn(
            "absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2",
            variant === 'default' && "border-cyan-400",
            variant === 'terminal' && "border-green-400",
            variant === 'hologram' && "border-blue-400",
            variant === 'secure' && "border-purple-400"
          )} />
          {/* Top Right */}
          <div className={cn(
            "absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2",
            variant === 'default' && "border-cyan-400",
            variant === 'terminal' && "border-green-400",
            variant === 'hologram' && "border-blue-400",
            variant === 'secure' && "border-purple-400"
          )} />
          {/* Bottom Left */}
          <div className={cn(
            "absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2",
            variant === 'default' && "border-cyan-400",
            variant === 'terminal' && "border-green-400",
            variant === 'hologram' && "border-blue-400",
            variant === 'secure' && "border-purple-400"
          )} />
          {/* Bottom Right */}
          <div className={cn(
            "absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2",
            variant === 'default' && "border-cyan-400",
            variant === 'terminal' && "border-green-400",
            variant === 'hologram' && "border-blue-400",
            variant === 'secure' && "border-purple-400"
          )} />
        </div>

        {/* LED Indicators - moved to top right with proper spacing */}
        {showLEDs && (
          <div className="absolute top-4 right-4 flex gap-1 z-20">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              variant === 'default' && "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]",
              variant === 'terminal' && "bg-green-400 shadow-[0_0_8px_rgba(0,255,0,0.8)]",
              variant === 'hologram' && "bg-blue-400 shadow-[0_0_8px_rgba(0,100,255,0.8)]",
              variant === 'secure' && "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
            )} />
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse delay-75",
              variant === 'default' && "bg-cyan-400/60",
              variant === 'terminal' && "bg-green-400/60",
              variant === 'hologram' && "bg-blue-400/60",
              variant === 'secure' && "bg-purple-400/60"
            )} />
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse delay-150",
              variant === 'default' && "bg-cyan-400/30",
              variant === 'terminal' && "bg-green-400/30",
              variant === 'hologram' && "bg-blue-400/30",
              variant === 'secure' && "bg-purple-400/30"
            )} />
          </div>
        )}

        {/* Scanline Overlay */}
        {showScanline && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={cn(
              "absolute inset-x-0 h-px animate-scan-vertical",
              variant === 'default' && "bg-cyan-400",
              variant === 'terminal' && "bg-green-400",
              variant === 'hologram' && "bg-blue-400",
              variant === 'secure' && "bg-purple-400",
              "shadow-[0_0_4px_currentColor]"
            )} />
          </div>
        )}

        {/* Terminal CRT Effect */}
        {variant === 'terminal' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-scan" />
            <div className="absolute inset-0 opacity-50">
              <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]" />
            </div>
          </div>
        )}

        {/* Hologram Shimmer */}
        {variant === 'hologram' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-shimmer" />
          </div>
        )}

        {/* Security Stamp - repositioned to avoid overlap */}
        {stamp && (
          <div className="absolute top-4 left-4 z-20">
            <div className={cn(
              "px-2 py-1 text-xs font-bold font-mono",
              "border rounded",
              "animate-pulse backdrop-blur-sm",
              stamp === 'CLASSIFIED' && "border-red-400 text-red-400 bg-red-950/80",
              stamp === 'ENCRYPTED' && "border-purple-400 text-purple-400 bg-purple-950/80",
              stamp === 'SECURE' && "border-green-400 text-green-400 bg-green-950/80",
              stamp === 'RESTRICTED' && "border-orange-400 text-orange-400 bg-orange-950/80"
            )}>
              {stamp === 'ENCRYPTED' && <Lock className="inline w-3 h-3 mr-1" />}
              {stamp === 'SECURE' && <Shield className="inline w-3 h-3 mr-1" />}
              {stamp === 'RESTRICTED' && <AlertTriangle className="inline w-3 h-3 mr-1" />}
              {stamp}
            </div>
          </div>
        )}

        {/* Access Granted Animation */}
        {accessAnimation && isRevealed && (
          <div className="absolute inset-0 pointer-events-none">
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "text-xs font-mono font-bold",
              "animate-[fade-out_1s_ease-out_forwards]",
              variant === 'default' && "text-cyan-400",
              variant === 'terminal' && "text-green-400",
              variant === 'hologram' && "text-blue-400",
              variant === 'secure' && "text-purple-400"
            )}>
              ACCESS GRANTED
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }
)
CyberpunkCard.displayName = "CyberpunkCard"

const CyberpunkCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { showActivity?: boolean }
>(({ className, children, showActivity = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-6 pt-6 pb-4 border-b border-cyan-400/30",
      "bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent",
      "relative",
      className
    )}
    {...props}
  >
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        {showActivity && <Activity className="w-4 h-4 text-cyan-400 animate-pulse mb-1" />}
        {children}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
  </div>
))
CyberpunkCardHeader.displayName = "CyberpunkCardHeader"

const CyberpunkCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-bold font-mono text-cyan-400",
      "text-shadow-[0_0_10px_rgba(0,255,255,0.5)]",
      className
    )}
    {...props}
  />
))
CyberpunkCardTitle.displayName = "CyberpunkCardTitle"

const CyberpunkCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-gray-400 font-mono",
      className
    )}
    {...props}
  />
))
CyberpunkCardDescription.displayName = "CyberpunkCardDescription"

const CyberpunkCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-6 py-4",
      className
    )}
    {...props}
  />
))
CyberpunkCardContent.displayName = "CyberpunkCardContent"

const CyberpunkCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-6 py-4 border-t border-cyan-400/30",
      "bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent",
      className
    )}
    {...props}
  />
))
CyberpunkCardFooter.displayName = "CyberpunkCardFooter"

export {
  CyberpunkCard,
  CyberpunkCardHeader,
  CyberpunkCardTitle,
  CyberpunkCardDescription,
  CyberpunkCardContent,
  CyberpunkCardFooter,
}