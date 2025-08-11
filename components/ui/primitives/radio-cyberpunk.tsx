'use client'

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const CyberpunkRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      {...props}
      ref={ref}
    />
  )
})
CyberpunkRadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export interface CyberpunkRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string
  description?: string
  variant?: 'default' | 'hex' | 'diamond' | 'circuit'
}

const CyberpunkRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  CyberpunkRadioItemProps
>(({ className, label, description, variant = 'hex', ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [pulseAnimation, setPulseAnimation] = React.useState(false)

  // Pulse animation on selection
  React.useEffect(() => {
    if (props.checked) {
      setPulseAnimation(true)
      const timer = setTimeout(() => setPulseAnimation(false), 600)
      return () => clearTimeout(timer)
    }
  }, [props.checked])

  const getClipPath = () => {
    switch (variant) {
      case 'hex':
        return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
      case 'diamond':
        return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      case 'circuit':
        return 'circle(50%)'
      default:
        return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
    }
  }

  return (
    <div className="flex items-start space-x-3">
      <div className="relative mt-0.5">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            "relative h-6 w-6",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {/* Outer Shape */}
          <div 
            className={cn(
              "absolute inset-0",
              "bg-black border-2 transition-all duration-300",
              "border-cyan-400/30",
              "data-[state=checked]:border-cyan-400",
              "data-[state=checked]:shadow-[0_0_15px_rgba(0,255,255,0.6)]",
              isHovered && "border-cyan-400/60 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            )}
            style={{ clipPath: getClipPath() }}
          />

          {/* Inner Glow when checked */}
          <div 
            className={cn(
              "absolute inset-[3px] transition-all duration-300",
              "data-[state=checked]:bg-cyan-400/20",
              "data-[state=unchecked]:scale-0",
              "data-[state=checked]:scale-100"
            )}
            style={{ clipPath: getClipPath() }}
          />

          {/* Center Indicator */}
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div className={cn(
              "h-2.5 w-2.5",
              "bg-cyan-400",
              "shadow-[0_0_10px_rgba(0,255,255,0.8)]",
              "animate-in zoom-in-0 duration-200",
              variant === 'circuit' && "rounded-full",
              variant === 'hex' && "rotate-0",
              variant === 'diamond' && "rotate-45"
            )} 
            style={{ 
              clipPath: variant === 'circuit' ? 'none' : getClipPath(),
              transform: variant === 'diamond' ? 'rotate(45deg) scale(0.6)' : 'scale(0.6)'
            }}
            />
          </RadioGroupPrimitive.Indicator>

          {/* Pulse Effect */}
          {pulseAnimation && (
            <div 
              className="absolute inset-0 border-2 border-cyan-400 animate-ping"
              style={{ clipPath: getClipPath() }}
            />
          )}

          {/* Circuit Connection Lines */}
          {variant === 'circuit' && props.checked && (
            <svg className="absolute -inset-4 w-14 h-14 pointer-events-none">
              <defs>
                <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgb(0,255,255)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <line
                x1="0" y1="28" x2="20" y2="28"
                stroke="url(#circuit-gradient)"
                strokeWidth="1"
                className="animate-pulse"
              />
              <line
                x1="36" y1="28" x2="56" y2="28"
                stroke="url(#circuit-gradient)"
                strokeWidth="1"
                className="animate-pulse"
              />
              <circle cx="20" cy="28" r="1.5" fill="rgb(0,255,255)" className="animate-pulse" />
              <circle cx="36" cy="28" r="1.5" fill="rgb(0,255,255)" className="animate-pulse" />
            </svg>
          )}

          {/* Hover Corner Dots */}
          {isHovered && variant === 'hex' && (
            <>
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
              <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
            </>
          )}
        </RadioGroupPrimitive.Item>

        {/* Connection Line to Next Item (decorative) */}
        {variant === 'circuit' && (
          <div className="absolute top-1/2 left-full w-8 h-px bg-gradient-to-r from-cyan-400/20 to-transparent -translate-y-1/2 pointer-events-none" />
        )}
      </div>

      {/* Labels */}
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label 
              className={cn(
                "text-sm font-mono cursor-pointer select-none",
                "transition-colors duration-200",
                "text-cyan-400/70",
                "peer-data-[state=checked]:text-cyan-400",
                props.disabled && "cursor-not-allowed opacity-50",
                isHovered && !props.disabled && "text-cyan-400"
              )}
            >
              {label}
              {variant === 'circuit' && (
                <span className="ml-2 text-[8px] text-cyan-400/30">[NODE_{props.value}]</span>
              )}
            </label>
          )}
          {description && (
            <p className={cn(
              "text-xs font-mono mt-1",
              "text-gray-500",
              "transition-colors duration-200",
              props.checked && "text-gray-400"
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
})
CyberpunkRadioItem.displayName = RadioGroupPrimitive.Item.displayName

export { CyberpunkRadioGroup, CyberpunkRadioItem }