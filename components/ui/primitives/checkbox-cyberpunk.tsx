'use client'

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CyberpunkCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
  error?: boolean
  variant?: 'default' | 'secure' | 'data' | 'terminal'
}

const CyberpunkCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CyberpunkCheckboxProps
>(({ className, label, error, variant = 'default', ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [scanAnimation, setScanAnimation] = React.useState(false)

  // Trigger scan animation on check
  React.useEffect(() => {
    if (props.checked) {
      setScanAnimation(true)
      const timer = setTimeout(() => setScanAnimation(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [props.checked])

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Octagon Container */}
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            "peer relative h-6 w-6",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {/* Octagon Shape Background */}
          <div 
            className={cn(
              "absolute inset-0",
              "bg-black border-2 transition-all duration-300",
              variant === 'default' && "border-cyan-400/50 data-[state=checked]:border-cyan-400",
              variant === 'secure' && "border-purple-400/50 data-[state=checked]:border-purple-400",
              variant === 'data' && "border-green-400/50 data-[state=checked]:border-green-400",
              variant === 'terminal' && "border-green-500/50 data-[state=checked]:border-green-500",
              error && "border-red-400",
              isHovered && !error && "shadow-[0_0_10px_rgba(0,255,255,0.5)]",
              props.checked && !error && "shadow-[0_0_15px_rgba(0,255,255,0.7)]"
            )}
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
            }}
          />
          
          {/* Inner Fill when Checked */}
          {props.checked && (
            <div 
              className={cn(
                "absolute inset-[3px] animate-in zoom-in-0 duration-200",
                variant === 'default' && "bg-cyan-400/20",
                variant === 'secure' && "bg-purple-400/20",
                variant === 'data' && "bg-green-400/20",
                variant === 'terminal' && "bg-green-500/20",
                error && "bg-red-400/20"
              )}
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            />
          )}

          {/* Scan Line Animation */}
          {scanAnimation && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div 
                className={cn(
                  "absolute inset-x-0 h-px",
                  variant === 'default' && "bg-cyan-400",
                  variant === 'secure' && "bg-purple-400",
                  variant === 'data' && "bg-green-400",
                  variant === 'terminal' && "bg-green-500",
                  error && "bg-red-400",
                  "shadow-[0_0_4px_currentColor]",
                  "animate-scan-vertical"
                )}
              />
            </div>
          )}

          {/* Hover Corner Glow */}
          {isHovered && !props.disabled && (
            <>
              <span className={cn(
                "absolute -top-1 -left-1 w-2 h-2",
                variant === 'default' && "bg-cyan-400",
                variant === 'secure' && "bg-purple-400",
                variant === 'data' && "bg-green-400",
                variant === 'terminal' && "bg-green-500",
                error && "bg-red-400",
                "animate-pulse"
              )} />
              <span className={cn(
                "absolute -top-1 -right-1 w-2 h-2",
                variant === 'default' && "bg-cyan-400",
                variant === 'secure' && "bg-purple-400",
                variant === 'data' && "bg-green-400",
                variant === 'terminal' && "bg-green-500",
                error && "bg-red-400",
                "animate-pulse"
              )} />
              <span className={cn(
                "absolute -bottom-1 -left-1 w-2 h-2",
                variant === 'default' && "bg-cyan-400",
                variant === 'secure' && "bg-purple-400",
                variant === 'data' && "bg-green-400",
                variant === 'terminal' && "bg-green-500",
                error && "bg-red-400",
                "animate-pulse"
              )} />
              <span className={cn(
                "absolute -bottom-1 -right-1 w-2 h-2",
                variant === 'default' && "bg-cyan-400",
                variant === 'secure' && "bg-purple-400",
                variant === 'data' && "bg-green-400",
                variant === 'terminal' && "bg-green-500",
                error && "bg-red-400",
                "animate-pulse"
              )} />
            </>
          )}

          <CheckboxPrimitive.Indicator
            className={cn(
              "flex items-center justify-center text-current",
              "data-[state=checked]:animate-in data-[state=checked]:zoom-in-0",
              "data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-0",
              "duration-200"
            )}
          >
            {variant === 'terminal' ? (
              <X className={cn(
                "h-4 w-4",
                "text-green-500"
              )} />
            ) : (
              <Check className={cn(
                "h-4 w-4",
                variant === 'default' && "text-cyan-400",
                variant === 'secure' && "text-purple-400",
                variant === 'data' && "text-green-400",
                error && "text-red-400"
              )} />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {/* Digital Circuit Lines (decorative) */}
        {variant === 'data' && props.checked && (
          <svg className="absolute -inset-2 w-10 h-10 pointer-events-none opacity-50">
            <path
              d="M 5 20 L 20 20 L 35 20"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-green-400 animate-pulse"
            />
            <circle cx="5" cy="20" r="2" fill="currentColor" className="text-green-400" />
            <circle cx="35" cy="20" r="2" fill="currentColor" className="text-green-400" />
          </svg>
        )}
      </div>

      {/* Label */}
      {label && (
        <label 
          className={cn(
            "text-sm font-mono cursor-pointer select-none",
            "transition-colors duration-200",
            props.disabled && "cursor-not-allowed opacity-50",
            variant === 'default' && "text-cyan-400/70 peer-data-[state=checked]:text-cyan-400",
            variant === 'secure' && "text-purple-400/70 peer-data-[state=checked]:text-purple-400",
            variant === 'data' && "text-green-400/70 peer-data-[state=checked]:text-green-400",
            variant === 'terminal' && "text-green-500/70 peer-data-[state=checked]:text-green-500",
            error && "text-red-400",
            isHovered && !props.disabled && "text-white"
          )}
        >
          {label}
          {variant === 'secure' && (
            <span className="ml-2 text-[8px] text-purple-400/50">[ENCRYPTED]</span>
          )}
          {variant === 'data' && (
            <span className="ml-2 text-[8px] text-green-400/50">[DATA_NODE]</span>
          )}
        </label>
      )}
    </div>
  )
})
CyberpunkCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { CyberpunkCheckbox }