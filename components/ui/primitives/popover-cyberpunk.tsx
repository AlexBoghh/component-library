'use client'

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const CyberpunkPopover = PopoverPrimitive.Root
const CyberpunkPopoverTrigger = PopoverPrimitive.Trigger
const CyberpunkPopoverAnchor = PopoverPrimitive.Anchor

const CyberpunkPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    typeAnimation?: boolean
    prefix?: 'DATA' | 'INFO' | 'SYSTEM' | 'ALERT'
  }
>(({ className, align = "center", sideOffset = 4, typeAnimation = false, prefix, children, ...props }, ref) => {
  const [displayedContent, setDisplayedContent] = React.useState(typeAnimation ? '' : children)
  const [isTyping, setIsTyping] = React.useState(typeAnimation)

  React.useEffect(() => {
    if (typeAnimation && typeof children === 'string') {
      let index = 0
      const text = children
      setDisplayedContent('')
      setIsTyping(true)

      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedContent(text.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, 30)

      return () => clearInterval(interval)
    }
  }, [typeAnimation, children])

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md p-4",
          "bg-black/95 backdrop-blur-md",
          "border border-cyan-400/50",
          "text-cyan-400 font-mono text-sm",
          "shadow-[0_0_30px_rgba(0,255,255,0.3)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "relative overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Digital Materialize Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-cyan-400/10 animate-scan" />
        </div>

        {/* Glass Effect Border */}
        <div className="absolute inset-0 rounded-md border border-cyan-400/20" />
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-400" />

        {/* Content with Prefix */}
        <div className="relative z-10">
          {prefix && (
            <div className="text-cyan-400 text-xs font-bold mb-2 flex items-center gap-1">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              [{prefix}]
            </div>
          )}
          {typeAnimation ? (
            <div>
              {displayedContent}
              {isTyping && <span className="animate-blink">_</span>}
            </div>
          ) : (
            children
          )}
        </div>

        {/* Arrow with Glow */}
        <PopoverPrimitive.Arrow 
          className="fill-black stroke-cyan-400 stroke-2 drop-shadow-[0_0_4px_rgba(0,255,255,0.5)]" 
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
})
CyberpunkPopoverContent.displayName = PopoverPrimitive.Content.displayName

export {
  CyberpunkPopover,
  CyberpunkPopoverTrigger,
  CyberpunkPopoverContent,
  CyberpunkPopoverAnchor,
}