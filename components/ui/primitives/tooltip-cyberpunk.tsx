'use client'

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const CyberpunkTooltipProvider = TooltipPrimitive.Provider

const CyberpunkTooltip = TooltipPrimitive.Root

const CyberpunkTooltipTrigger = TooltipPrimitive.Trigger

const CyberpunkTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    prefix?: 'DATA' | 'INFO' | 'TIP' | 'HINT'
    holographic?: boolean
  }
>(({ className, sideOffset = 4, prefix, holographic = true, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md px-3 py-1.5",
      "text-xs font-mono",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      holographic ? [
        "bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20",
        "backdrop-blur-md border border-cyan-400/50",
        "text-cyan-300",
        "shadow-[0_0_20px_rgba(0,255,255,0.4)]"
      ] : [
        "bg-black/90 border border-cyan-400/30",
        "text-cyan-400",
        "shadow-[0_0_10px_rgba(0,255,255,0.3)]"
      ],
      className
    )}
    {...props}
  >
    {/* Holographic Shimmer Effect */}
    {holographic && (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
    )}

    {/* Scan Line Animation */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-x-0 h-px bg-cyan-400/50 animate-scan-quick" />
    </div>

    {/* Content */}
    <div className="relative z-10">
      {prefix && (
        <span className="text-cyan-400 font-bold mr-1">
          {prefix}:
        </span>
      )}
      <span className={cn(
        holographic && "text-shadow-[0_0_5px_rgba(0,255,255,0.5)]"
      )}>
        {children}
      </span>
    </div>

    {/* Arrow */}
    <TooltipPrimitive.Arrow 
      className={cn(
        holographic 
          ? "fill-cyan-500/20 stroke-cyan-400/50" 
          : "fill-black/90 stroke-cyan-400/30",
        "stroke-1 drop-shadow-[0_0_2px_rgba(0,255,255,0.5)]"
      )} 
    />
  </TooltipPrimitive.Content>
))
CyberpunkTooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  CyberpunkTooltip,
  CyberpunkTooltipTrigger,
  CyberpunkTooltipContent,
  CyberpunkTooltipProvider,
}