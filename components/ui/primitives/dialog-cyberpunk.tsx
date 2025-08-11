'use client'

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, AlertTriangle, Shield, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const CyberpunkDialog = DialogPrimitive.Root
const CyberpunkDialogTrigger = DialogPrimitive.Trigger
const CyberpunkDialogPortal = DialogPrimitive.Portal
const CyberpunkDialogClose = DialogPrimitive.Close

const CyberpunkDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    variant?: 'matrix' | 'grid' | 'static'
  }
>(({ className, variant = 'matrix', ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  >
    {/* Matrix Rain Effect */}
    {variant === 'matrix' && (
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="matrix-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-xs animate-matrix-fall"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j} className="opacity-0 animate-fade-in-out" style={{ animationDelay: `${j * 0.1}s` }}>
                  {String.fromCharCode(33 + Math.random() * 93)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Grid Pattern */}
    {variant === 'grid' && (
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
    )}

    {/* Static Noise */}
    {variant === 'static' && (
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 animate-tv-static"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    )}
  </DialogPrimitive.Overlay>
))
CyberpunkDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const CyberpunkDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    systemAlert?: boolean
    glitchIn?: boolean
  }
>(({ className, children, systemAlert = false, glitchIn = true, ...props }, ref) => {
  const [isGlitching, setIsGlitching] = React.useState(glitchIn)

  React.useEffect(() => {
    if (glitchIn) {
      const timer = setTimeout(() => setIsGlitching(false), 500)
      return () => clearTimeout(timer)
    }
  }, [glitchIn])

  return (
    <CyberpunkDialogPortal>
      <CyberpunkDialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4",
          "bg-black/95 border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.5)]",
          "duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          isGlitching && "animate-glitch",
          className
        )}
        {...props}
      >
        {/* Corner Brackets */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400" />
        </div>

        {/* System Alert Header */}
        {systemAlert && (
          <div className="absolute -top-px left-0 right-0 h-8 bg-gradient-to-r from-transparent via-red-500/20 to-transparent flex items-center justify-center">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              SYSTEM ALERT
              <AlertTriangle className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* Close Button */}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-cyan-400" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>

        {children}
      </DialogPrimitive.Content>
    </CyberpunkDialogPortal>
  )
})
CyberpunkDialogContent.displayName = DialogPrimitive.Content.displayName

const CyberpunkDialogHeader = ({
  className,
  showTerminal = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showTerminal?: boolean }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      "pb-4 border-b border-cyan-400/30",
      className
    )}
    {...props}
  >
    {showTerminal && (
      <div className="flex items-center gap-2 text-green-400 text-xs font-mono mb-2">
        <Terminal className="w-3 h-3" />
        <span>root@cyberpunk:~$</span>
        <span className="animate-blink">_</span>
      </div>
    )}
    {props.children}
  </div>
)
CyberpunkDialogHeader.displayName = "CyberpunkDialogHeader"

const CyberpunkDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      "pt-4 border-t border-cyan-400/30",
      className
    )}
    {...props}
  />
)
CyberpunkDialogFooter.displayName = "CyberpunkDialogFooter"

const CyberpunkDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-bold font-mono text-cyan-400",
      "text-shadow-[0_0_10px_rgba(0,255,255,0.5)]",
      className
    )}
    {...props}
  />
))
CyberpunkDialogTitle.displayName = DialogPrimitive.Title.displayName

const CyberpunkDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm text-gray-400 font-mono",
      className
    )}
    {...props}
  />
))
CyberpunkDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  CyberpunkDialog,
  CyberpunkDialogPortal,
  CyberpunkDialogOverlay,
  CyberpunkDialogTrigger,
  CyberpunkDialogClose,
  CyberpunkDialogContent,
  CyberpunkDialogHeader,
  CyberpunkDialogFooter,
  CyberpunkDialogTitle,
  CyberpunkDialogDescription,
}