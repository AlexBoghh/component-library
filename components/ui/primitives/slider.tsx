'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/hooks/use-theme'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, defaultValue, value, ...props }, ref) => {
  const { themeId } = useTheme()
  
  // Determine if this is a range slider based on the value/defaultValue array length
  const actualValue = value || defaultValue || [0]
  const isRange = Array.isArray(actualValue) && actualValue.length > 1
  
  // Track styles based on theme
  const getTrackStyles = () => {
    switch (themeId) {
      case 'cyberpunk':
        return cn(
          "relative h-2 w-full grow overflow-hidden rounded-full",
          "bg-black/60 border border-cyan-500/30",
          "shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]"
        )
      case 'brutalism':
        return cn(
          "relative h-3 w-full grow overflow-hidden",
          "bg-zinc-200 dark:bg-zinc-800",
          "border-2 border-black rounded-none",
          "shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.2)]"
        )
      default:
        return cn(
          "relative h-2 w-full grow overflow-hidden rounded-full",
          "bg-zinc-200 dark:bg-zinc-700",
          "border border-zinc-300 dark:border-zinc-600"
        )
    }
  }
  
  // Range (filled portion) styles based on theme
  const getRangeStyles = () => {
    switch (themeId) {
      case 'cyberpunk':
        return cn(
          "absolute h-full",
          "bg-gradient-to-r from-cyan-500 to-cyan-400",
          "shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        )
      case 'brutalism':
        return cn(
          "absolute h-full",
          "bg-yellow-400 dark:bg-yellow-500",
          "border-r-2 border-black"
        )
      default:
        return cn(
          "absolute h-full",
          "bg-blue-500 dark:bg-blue-400",
          "shadow-sm"
        )
    }
  }
  
  // Thumb styles based on theme
  const getThumbStyles = () => {
    switch (themeId) {
      case 'cyberpunk':
        return cn(
          "block h-5 w-5 rounded-full",
          "bg-gradient-to-br from-cyan-400 to-cyan-500",
          "border-2 border-cyan-300",
          "shadow-[0_0_15px_rgba(6,182,212,0.6)]",
          "transition-all duration-200",
          "hover:shadow-[0_0_20px_rgba(6,182,212,0.8)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-grab active:cursor-grabbing"
        )
      case 'brutalism':
        return cn(
          "block h-6 w-6",
          "bg-yellow-400 dark:bg-yellow-500",
          "border-3 border-black rounded-none",
          "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
          "transition-all duration-150",
          "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-grab active:cursor-grabbing"
        )
      default:
        return cn(
          "block h-5 w-5 rounded-full",
          "bg-white dark:bg-zinc-100",
          "border-2 border-blue-500 dark:border-blue-400",
          "shadow-lg shadow-black/10 dark:shadow-black/30",
          "transition-all duration-200",
          "hover:scale-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-grab active:cursor-grabbing"
        )
    }
  }
  
  // Root container styles
  const getRootStyles = () => {
    return cn(
      "relative flex w-full touch-none select-none items-center",
      themeId === 'cyberpunk' && "py-1",
      themeId === 'brutalism' && "py-1",
      className
    )
  }
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={getRootStyles()}
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track className={getTrackStyles()}>
        <SliderPrimitive.Range className={getRangeStyles()} />
      </SliderPrimitive.Track>
      
      {/* Render thumbs based on whether it's single or range mode */}
      {isRange ? (
        <>
          {/* First thumb for range minimum */}
          <SliderPrimitive.Thumb 
            className={getThumbStyles()}
            aria-label="Minimum value"
          />
          {/* Second thumb for range maximum */}
          <SliderPrimitive.Thumb 
            className={getThumbStyles()}
            aria-label="Maximum value"
          />
        </>
      ) : (
        /* Single thumb for standard slider */
        <SliderPrimitive.Thumb 
          className={getThumbStyles()}
          aria-label="Value"
        />
      )}
    </SliderPrimitive.Root>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }