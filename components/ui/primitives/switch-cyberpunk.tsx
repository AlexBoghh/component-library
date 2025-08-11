'use client'

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { Power, Zap, Lock, Unlock } from "lucide-react"

export interface CyberpunkSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string
  variant?: 'power' | 'data' | 'security' | 'neon' | 'neural' | 'quantum'
  showLabels?: boolean
  showIcon?: boolean
  showStatus?: boolean
  showLEDs?: boolean
  intensity?: 'low' | 'medium' | 'high'
}

const CyberpunkSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CyberpunkSwitchProps
>(({ 
  className, 
  label, 
  variant = 'power', 
  showLabels = true, 
  showIcon = false, 
  showStatus = true,
  showLEDs = true,
  intensity = 'medium',
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [sparkAnimation, setSparkAnimation] = React.useState(false)
  const [energyDischarge, setEnergyDischarge] = React.useState(false)

  // Enhanced animation effects on toggle
  React.useEffect(() => {
    if (props.checked !== undefined) {
      setSparkAnimation(true)
      setEnergyDischarge(true)
      const sparkTimer = setTimeout(() => setSparkAnimation(false), 600)
      const energyTimer = setTimeout(() => setEnergyDischarge(false), 800)
      return () => {
        clearTimeout(sparkTimer)
        clearTimeout(energyTimer)
      }
    }
  }, [props.checked])

  const getVariantConfig = () => {
    const baseIntensity = {
      low: { glow: '0.3', shadowSize: '15px' },
      medium: { glow: '0.6', shadowSize: '25px' },
      high: { glow: '0.9', shadowSize: '35px' }
    }[intensity]

    switch (variant) {
      case 'power':
        return {
          colors: { primary: '#00ffff', secondary: '#0099cc', accent: '#66ffff' },
          status: { off: 'STANDBY', on: 'ACTIVE' },
          className: 'cyberpunk-switch-power'
        }
      case 'data':
        return {
          colors: { primary: '#00ff00', secondary: '#009900', accent: '#66ff66' },
          status: { off: 'PAUSED', on: 'STREAMING' },
          className: 'cyberpunk-switch-data'
        }
      case 'security':
        return {
          colors: { primary: '#a855f7', secondary: '#7c3aed', accent: '#c084fc' },
          status: { off: 'LOCKED', on: 'SECURED' },
          className: 'cyberpunk-switch-security'
        }
      case 'neon':
        return {
          colors: { primary: '#ec4899', secondary: '#db2777', accent: '#f472b6' },
          status: { off: 'OFFLINE', on: 'NEON' },
          className: 'cyberpunk-switch-neon'
        }
      case 'neural':
        return {
          colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
          status: { off: 'DISCONNECTED', on: 'SYNCED' },
          className: 'cyberpunk-switch-neural'
        }
      case 'quantum':
        return {
          colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
          status: { off: 'COLLAPSED', on: 'ENTANGLED' },
          className: 'cyberpunk-switch-quantum'
        }
      default:
        return {
          colors: { primary: '#00ffff', secondary: '#0099cc', accent: '#66ffff' },
          status: { off: 'STANDBY', on: 'ACTIVE' },
          className: 'cyberpunk-switch-power'
        }
    }
  }

  const variantConfig = getVariantConfig()

  const getIcon = () => {
    if (!showIcon) return null
    
    const iconProps = { className: "h-3 w-3", style: { color: props.checked ? variantConfig.colors.primary : 'rgba(100, 100, 120, 0.6)' } }
    
    switch (variant) {
      case 'power':
        return <Power {...iconProps} />
      case 'data':
        return <Zap {...iconProps} />
      case 'security':
        return props.checked ? <Unlock {...iconProps} /> : <Lock {...iconProps} />
      case 'neural':
        return <Zap {...iconProps} />
      case 'quantum':
        return <Power {...iconProps} />
      default:
        return <Power {...iconProps} />
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
      </div>

      {/* Enhanced Label */}
      {label && (
        <label 
          className={cn(
            "text-sm font-mono cursor-pointer select-none transition-all duration-300",
            props.disabled && "cursor-not-allowed opacity-50",
            isHovered && !props.disabled && "text-white transform translateX(2px)"
          )}
          style={{
            color: props.checked ? variantConfig.colors.primary : 'rgba(156, 163, 175, 0.8)'
          }}
        >
          {label}
          <span className={cn(
            "ml-2 text-[8px] font-bold uppercase tracking-wide transition-all duration-300",
            props.checked && "animate-pulse"
          )}
          style={{
            color: props.checked ? `${variantConfig.colors.accent}80` : 'rgba(107, 114, 128, 0.6)'
          }}>
            [{props.checked ? variantConfig.status.on : variantConfig.status.off}]
          </span>
        </label>
      )}
    </div>
  )
})
CyberpunkSwitch.displayName = SwitchPrimitives.Root.displayName

export { CyberpunkSwitch }