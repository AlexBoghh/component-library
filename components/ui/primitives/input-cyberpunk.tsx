'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Lock, AlertTriangle, CheckCircle, Eye, EyeOff, Terminal } from "lucide-react"

export interface CyberpunkInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  showPasswordToggle?: boolean
  floatingLabel?: boolean
  variant?: 'default' | 'secure' | 'terminal' | 'grid'
}

const CyberpunkInput = React.forwardRef<HTMLInputElement, CyberpunkInputProps>(
  ({ 
    className, 
    type,
    label,
    error,
    success,
    showPasswordToggle,
    floatingLabel = true,
    variant = 'default',
    ...props 
  }, ref) => {
    const [focused, setFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [typewriterPlaceholder, setTypewriterPlaceholder] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    // Typewriter effect for placeholder
    React.useEffect(() => {
      if (props.placeholder && variant === 'terminal' && !hasValue && focused) {
        let i = 0
        const text = props.placeholder
        setTypewriterPlaceholder('')
        
        const interval = setInterval(() => {
          if (i <= text.length) {
            setTypewriterPlaceholder(text.slice(0, i))
            i++
          } else {
            clearInterval(interval)
          }
        }, 50)
        
        return () => clearInterval(interval)
      } else if (!focused) {
        setTypewriterPlaceholder(props.placeholder || '')
      }
    }, [focused, props.placeholder, hasValue, variant])
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      props.onFocus?.(e)
    }
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      setHasValue(e.target.value !== '')
      props.onBlur?.(e)
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== '')
      props.onChange?.(e)
    }
    
    const inputType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password')
      : type
    
    const isSecure = variant === 'secure' || type === 'password'
    
    return (
      <div className="relative group">
        {/* Grid Background Pattern */}
        {variant === 'grid' && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded" />
        )}
        
        {/* Floating Label */}
        {label && floatingLabel && (
          <label
            className={cn(
              "absolute left-3 transition-all duration-300 pointer-events-none",
              "text-gray-500 font-mono text-sm",
              focused || hasValue ? [
                "-top-2 text-xs px-1",
                "bg-black",
                error ? "text-red-400" : success ? "text-green-400" : "text-cyan-400",
                "after:content-[''] after:absolute after:inset-0 after:bg-black after:-z-10"
              ] : [
                "top-3",
                "text-gray-400"
              ],
              // Glitch effect on label
              focused && "animate-text-glitch"
            )}
          >
            {isSecure && <Lock className="inline w-3 h-3 mr-1" />}
            {label}
            {isSecure && <span className="ml-2 text-[8px] text-cyan-400">[SECURE]</span>}
          </label>
        )}
        
        {/* Input Container */}
        <div className={cn(
          "relative",
          focused && "z-10"
        )}>
          {/* Corner Brackets for Focus */}
          {focused && (
            <>
              <span className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400 animate-pulse" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400 animate-pulse" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400 animate-pulse" />
            </>
          )}
          
          {/* Input Field */}
          <input
            type={inputType}
            {...(type === 'password' && { autoComplete: 'current-password' })}
            className={cn(
              "w-full px-3 py-3 bg-black/90 text-cyan-400",
              "font-mono text-sm tracking-wider",
              "border-b-2 transition-all duration-300",
              "placeholder:text-gray-600",
              "focus:outline-none",
              
              // Border styles
              !focused && !error && !success && "border-gray-700",
              focused && !error && "border-cyan-400 shadow-[0_2px_10px_rgba(0,255,255,0.3)]",
              error && "border-red-400 shadow-[0_2px_10px_rgba(255,0,0,0.3)]",
              success && "border-green-400 shadow-[0_2px_10px_rgba(0,255,0,0.3)]",
              
              // Focus border expansion
              focused && "border-l-2 border-r-2 border-t-2",
              
              // Variant specific styles
              variant === 'terminal' && "font-mono bg-black text-green-400 border-green-400/30",
              variant === 'secure' && "text-purple-400 border-purple-400/50",
              
              // Error glitch effect
              error && "animate-glitch-text",
              
              // Padding adjustments for icons
              (error || success) && "pr-10",
              showPasswordToggle && type === 'password' && "pr-10",
              
              className
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={variant === 'terminal' ? typewriterPlaceholder : props.placeholder}
            {...props}
          />
          
          {/* Status Icons */}
          {error && (
            <AlertTriangle className="absolute right-3 top-3 h-5 w-5 text-red-400 animate-pulse" />
          )}
          {success && !error && (
            <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-400 animate-pulse" />
          )}
          
          {/* Password Toggle */}
          {showPasswordToggle && type === 'password' && !error && !success && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
          
          {/* Terminal Cursor */}
          {variant === 'terminal' && focused && (
            <span className="absolute top-3 text-green-400 animate-blink pointer-events-none"
              style={{ left: `${(inputRef.current?.value.length || 0) * 8 + 12}px` }}>
              _
            </span>
          )}
        </div>
        
        {/* Error/Success Messages */}
        {(error || (success && !error)) && (
          <div className={cn(
            "mt-1 text-xs font-mono",
            error ? "text-red-400" : "text-green-400",
            "flex items-center gap-1"
          )}>
            <Terminal className="w-3 h-3" />
            <span className="animate-type">
              {error || (success && "VALIDATION_PASSED")}
            </span>
          </div>
        )}
      </div>
    )
  }
)
CyberpunkInput.displayName = "CyberpunkInput"

export { CyberpunkInput }