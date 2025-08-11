'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      props.onChange?.(e)
    }

    React.useEffect(() => {
      if (props.value) {
        setHasValue(true)
      }
    }, [props.value])

    return (
      <div className="relative">
        <input
          type="text"
          className={cn(
            "peer flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive focus-visible:ring-destructive" : "border-input",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder=" "
          {...props}
        />
        {label && (
          <label
            className={cn(
              "absolute left-3 transition-all duration-200 pointer-events-none",
              (isFocused || hasValue || props.value) 
                ? "-top-2 text-xs bg-background px-1"
                : "top-3.5 text-sm",
              error 
                ? "text-destructive" 
                : (isFocused || hasValue || props.value)
                  ? "text-primary"
                  : "text-muted-foreground"
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

export { FloatingInput }