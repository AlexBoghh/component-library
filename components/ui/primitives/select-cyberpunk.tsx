'use client'

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const CyberpunkSelect = SelectPrimitive.Root

const CyberpunkSelectGroup = SelectPrimitive.Group

const CyberpunkSelectValue = SelectPrimitive.Value

const CyberpunkSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-12 w-full items-center justify-between px-3 py-2",
        "bg-black/90 border border-cyan-400/30",
        "text-cyan-400 font-mono text-sm",
        "transition-all duration-300",
        "hover:border-cyan-400/60 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]",
        "focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.5)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=open]:border-cyan-400 data-[state=open]:shadow-[0_0_20px_rgba(0,255,255,0.6)]",
        // Holographic shimmer effect
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r",
        "before:from-transparent before:via-cyan-400/10 before:to-transparent",
        "before:translate-x-[-200%] hover:before:translate-x-[200%]",
        "before:transition-transform before:duration-1000",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <div className="relative h-4 w-4">
          <ChevronDown className={cn(
            "h-4 w-4 transition-all duration-300",
            "text-cyan-400"
          )} />
        </div>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
CyberpunkSelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const CyberpunkSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden",
        "bg-black/95 backdrop-blur-md",
        "border border-cyan-400/50",
        "text-cyan-400",
        "shadow-[0_0_30px_rgba(0,255,255,0.5)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
CyberpunkSelectContent.displayName = SelectPrimitive.Content.displayName

const CyberpunkSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-mono text-gray-500",
      className
    )}
    {...props}
  />
))
CyberpunkSelectLabel.displayName = SelectPrimitive.Label.displayName

const CyberpunkSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center",
        "py-2 pl-8 pr-2 text-sm outline-none",
        "font-mono transition-all duration-200",
        "text-cyan-400/70 hover:text-cyan-400",
        "focus:bg-cyan-400/10 focus:text-cyan-400",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[state=checked]:text-cyan-400 data-[state=checked]:bg-cyan-400/20",
        "data-[state=checked]:shadow-[0_0_10px_rgba(0,255,255,0.3)]",
        "hover:bg-cyan-400/10",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Scan line effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-horizontal" />
        </div>
      )}
      
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-cyan-400 animate-pulse" />
        </SelectPrimitive.ItemIndicator>
      </span>
      
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
CyberpunkSelectItem.displayName = SelectPrimitive.Item.displayName

const CyberpunkSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-cyan-400/20",
      className
    )}
    {...props}
  />
))
CyberpunkSelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  CyberpunkSelect,
  CyberpunkSelectGroup,
  CyberpunkSelectValue,
  CyberpunkSelectTrigger,
  CyberpunkSelectContent,
  CyberpunkSelectLabel,
  CyberpunkSelectItem,
  CyberpunkSelectSeparator,
}