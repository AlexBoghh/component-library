'use client'

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { Power, Zap, Lock, Unlock } from "lucide-react"

export interface CyberpunkSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string
  variant?: 'power' | 'data' | 'security' | 'neon'
  showLabels?: boolean
  showIcon?: boolean
}

const CyberpunkSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CyberpunkSwitchProps
>(({ className, label, variant = 'power', showLabels = true, showIcon = false, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [sparkAnimation, setSparkAnimation] = React.useState(false)

  // Spark animation on toggle
  React.useEffect(() => {
    if (props.checked !== undefined) {
      setSparkAnimation(true)
      const timer = setTimeout(() => setSparkAnimation(false), 500)
      return () => clearTimeout(timer)
    }
  }, [props.checked])

  const getColors = () => {
    switch (variant) {
      case 'power':
        return {
          track: 'bg-gray-800 data-[state=checked]:bg-cyan-950',
          thumb: 'bg-gray-600 data-[state=checked]:bg-cyan-400',
          border: 'border-gray-600 data-[state=checked]:border-cyan-400',
          glow: 'data-[state=checked]:shadow-[0_0_20px_rgba(0,255,255,0.6)]',
          label: 'text-gray-400 data-[state=checked]:text-cyan-400'
        }
      case 'data':
        return {
          track: 'bg-gray-800 data-[state=checked]:bg-green-950',
          thumb: 'bg-gray-600 data-[state=checked]:bg-green-400',
          border: 'border-gray-600 data-[state=checked]:border-green-400',
          glow: 'data-[state=checked]:shadow-[0_0_20px_rgba(0,255,0,0.6)]',
          label: 'text-gray-400 data-[state=checked]:text-green-400'
        }
      case 'security':
        return {
          track: 'bg-gray-800 data-[state=checked]:bg-purple-950',
          thumb: 'bg-gray-600 data-[state=checked]:bg-purple-400',
          border: 'border-gray-600 data-[state=checked]:border-purple-400',
          glow: 'data-[state=checked]:shadow-[0_0_20px_rgba(168,85,247,0.6)]',
          label: 'text-gray-400 data-[state=checked]:text-purple-400'
        }
      case 'neon':
        return {
          track: 'bg-black data-[state=checked]:bg-pink-950/50',
          thumb: 'bg-pink-600 data-[state=checked]:bg-pink-400',
          border: 'border-pink-600 data-[state=checked]:border-pink-400',
          glow: 'data-[state=checked]:shadow-[0_0_20px_rgba(236,72,153,0.6)]',
          label: 'text-pink-600 data-[state=checked]:text-pink-400'
        }
      default:
        return {
          track: 'bg-gray-800 data-[state=checked]:bg-cyan-950',
          thumb: 'bg-gray-600 data-[state=checked]:bg-cyan-400',
          border: 'border-gray-600 data-[state=checked]:border-cyan-400',
          glow: 'data-[state=checked]:shadow-[0_0_20px_rgba(0,255,255,0.6)]',
          label: 'text-gray-400 data-[state=checked]:text-cyan-400'
        }
    }
  }

  const colors = getColors()

  const getIcon = () => {
    if (!showIcon) return null
    
    switch (variant) {
      case 'power':
        return <Power className="h-3 w-3" />
      case 'data':
        return <Zap className="h-3 w-3" />
      case 'security':
        return props.checked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />
      default:
        return <Power className="h-3 w-3" />
    }
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Main Switch */}
      <div className="relative">
        <SwitchPrimitives.Root
          className={cn(
            "peer relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center",
            "rounded-sm border-2 transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            "disabled:cursor-not-allowed disabled:opacity-50",
            colors.track,
            colors.border,
            colors.glow,
            isHovered && "scale-105",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
          ref={ref}
        >
          {/* Track Labels */}
          {showLabels && (
            <>
              <span className={cn(
                "absolute left-1.5 text-[10px] font-mono font-bold transition-opacity duration-200",
                "data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100",
                variant === 'power' && "text-red-400",
                variant === 'data' && "text-gray-500",
                variant === 'security' && "text-red-400",
                variant === 'neon' && "text-gray-500"
              )}>
                {variant === 'security' ? 'LOCK' : 'OFF'}
              </span>
              <span className={cn(
                "absolute right-1.5 text-[10px] font-mono font-bold transition-opacity duration-200",
                "data-[state=unchecked]:opacity-0 data-[state=checked]:opacity-100",
                colors.label.split(' ')[1] // Get the checked color
              )}>
                {variant === 'security' ? 'OPEN' : 'ON'}
              </span>
            </>
          )}

          {/* Thumb */}
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none flex items-center justify-center",
              "h-6 w-6 rounded-sm ring-0 transition-all duration-300",
              "data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0.5",
              colors.thumb,
              "shadow-lg",
              // Power lines on thumb
              variant === 'power' && [
                "before:absolute before:inset-x-1 before:top-1/2 before:-translate-y-1/2",
                "before:h-0.5 before:bg-current before:opacity-50",
                "after:absolute after:inset-y-1 after:left-1/2 after:-translate-x-1/2",
                "after:w-0.5 after:bg-current after:opacity-50"
              ]
            )}
          >
            {getIcon()}
          </SwitchPrimitives.Thumb>

          {/* Spark Effect */}
          {sparkAnimation && (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={cn(
                  "h-2 w-2 rounded-full animate-ping",
                  colors.thumb.split(' ')[2] // Get color from thumb
                )} />
              </div>
              {/* Electric Arc Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <path
                  d={`M ${props.checked ? 48 : 16} 16 L ${props.checked ? 52 : 20} 10 L ${props.checked ? 56 : 24} 16`}
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className={cn(
                    "opacity-0 animate-[spark_0.5s_ease-out]",
                    colors.label.split(' ')[1]
                  )}
                />
                <path
                  d={`M ${props.checked ? 48 : 16} 16 L ${props.checked ? 52 : 20} 22 L ${props.checked ? 56 : 24} 16`}
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className={cn(
                    "opacity-0 animate-[spark_0.5s_ease-out_0.1s]",
                    colors.label.split(' ')[1]
                  )}
                />
              </svg>
            </>
          )}

          {/* Circuit Board Pattern (subtle) */}
          {variant === 'data' && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent" />
              <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-current to-transparent" />
              <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-current to-transparent" />
            </div>
          )}

          {/* Security Lock Indicator */}
          {variant === 'security' && (
            <div className={cn(
              "absolute -top-2 -right-2 h-2 w-2 rounded-full transition-all duration-300",
              props.checked ? "bg-green-400 animate-pulse" : "bg-red-400"
            )} />
          )}
        </SwitchPrimitives.Root>

        {/* Power Indicator LEDs */}
        {variant === 'power' && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            <div className={cn(
              "h-1 w-1 rounded-full transition-all duration-300",
              props.checked ? "bg-cyan-400 animate-pulse" : "bg-gray-600"
            )} />
            <div className={cn(
              "h-1 w-1 rounded-full transition-all duration-300",
              props.checked ? "bg-cyan-400 animate-pulse delay-75" : "bg-gray-600"
            )} />
            <div className={cn(
              "h-1 w-1 rounded-full transition-all duration-300",
              props.checked ? "bg-cyan-400 animate-pulse delay-150" : "bg-gray-600"
            )} />
          </div>
        )}
      </div>

      {/* Label */}
      {label && (
        <label 
          className={cn(
            "text-sm font-mono cursor-pointer select-none",
            "transition-colors duration-200",
            props.disabled && "cursor-not-allowed opacity-50",
            colors.label,
            isHovered && !props.disabled && "text-white"
          )}
        >
          {label}
          {variant === 'power' && (
            <span className={cn(
              "ml-2 text-[8px]",
              props.checked ? "text-cyan-400/50" : "text-gray-500"
            )}>
              [{props.checked ? 'ACTIVE' : 'STANDBY'}]
            </span>
          )}
          {variant === 'data' && (
            <span className={cn(
              "ml-2 text-[8px]",
              props.checked ? "text-green-400/50" : "text-gray-500"
            )}>
              [{props.checked ? 'STREAMING' : 'PAUSED'}]
            </span>
          )}
          {variant === 'security' && (
            <span className={cn(
              "ml-2 text-[8px]",
              props.checked ? "text-purple-400/50" : "text-gray-500"
            )}>
              [{props.checked ? 'UNLOCKED' : 'SECURED'}]
            </span>
          )}
        </label>
      )}
    </div>
  )
})
CyberpunkSwitch.displayName = SwitchPrimitives.Root.displayName

export { CyberpunkSwitch }