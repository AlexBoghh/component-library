'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  }
>(({ className, position = 'bottom-right', ...props }, ref) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0',
  }

  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        'fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]',
        positionClasses[position],
        className
      )}
      {...props}
    />
  )
})
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 pr-6 shadow-2xl backdrop-blur-sm transition-all duration-300 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-1',
  {
    variants: {
      variant: {
        default: 'border bg-gradient-to-r from-background via-background to-background/95 text-foreground',
        success: 'border-green-500/20 bg-gradient-to-r from-green-50 via-green-50/95 to-green-100/90 text-green-900 dark:border-green-400/20 dark:from-green-950 dark:via-green-950/95 dark:to-green-900/90 dark:text-green-100',
        error: 'border-red-500/20 bg-gradient-to-r from-red-50 via-red-50/95 to-red-100/90 text-red-900 dark:border-red-400/20 dark:from-red-950 dark:via-red-950/95 dark:to-red-900/90 dark:text-red-100',
        warning: 'border-yellow-500/20 bg-gradient-to-r from-yellow-50 via-yellow-50/95 to-yellow-100/90 text-yellow-900 dark:border-yellow-400/20 dark:from-yellow-950 dark:via-yellow-950/95 dark:to-yellow-900/90 dark:text-yellow-100',
        info: 'border-blue-500/20 bg-gradient-to-r from-blue-50 via-blue-50/95 to-blue-100/90 text-blue-900 dark:border-blue-400/20 dark:from-blue-950 dark:via-blue-950/95 dark:to-blue-900/90 dark:text-blue-100',
        glass: 'border-border bg-card/50 backdrop-blur-xl text-foreground shadow-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {
      showProgress?: boolean
      duration?: number
      pauseOnHover?: boolean
      sound?: boolean
    }
>(({ className, variant, showProgress = true, duration = 5000, pauseOnHover = true, sound = false, ...props }, ref) => {
  const [progress, setProgress] = React.useState(100)
  const [isPaused, setIsPaused] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    if (sound && props.open && typeof window !== 'undefined') {
      const audioData = variant === 'success' ? 'data:audio/wav;base64,UklGRo4BAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWoBAAA=' :
                       variant === 'error' ? 'data:audio/wav;base64,UklGRo4BAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWoBAAA=' :
                       'data:audio/wav;base64,UklGRo4BAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWoBAAA='
      audioRef.current = new Audio(audioData)
      audioRef.current.volume = 0.3
      audioRef.current.play().catch(() => {})
    }
  }, [sound, variant, props.open])

  React.useEffect(() => {
    if (!showProgress || !props.open || isPaused) return

    const interval = 100
    const decrement = (100 / duration) * interval

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - decrement
        if (next <= 0) {
          clearInterval(timer)
          return 0
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [showProgress, duration, props.open, isPaused])

  React.useEffect(() => {
    if (props.open) {
      setProgress(100)
    }
  }, [props.open])

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    default: null,
  }[variant || 'default']

  return (
    <ToastPrimitives.Root
      ref={ref}
      duration={isPaused ? Infinity : duration}
      className={cn(toastVariants({ variant }), 'group', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      {...props}
    >
      {Icon && (
        <Icon className={cn(
          'h-5 w-5 shrink-0',
          variant === 'success' && 'text-green-600 dark:text-green-400',
          variant === 'error' && 'text-red-600 dark:text-red-400',
          variant === 'warning' && 'text-yellow-600 dark:text-yellow-400',
          variant === 'info' && 'text-blue-600 dark:text-blue-400'
        )} />
      )}
      {props.children}
      {showProgress && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden bg-muted/20">
          <div
            className={cn(
              'h-full transition-all ease-linear',
              isPaused ? 'transition-none' : 'duration-100',
              variant === 'success' && 'bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-400',
              variant === 'error' && 'bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-400',
              variant === 'warning' && 'bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-400',
              variant === 'info' && 'bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-400',
              variant === 'glass' && 'bg-gradient-to-r from-white/40 to-white/60',
              variant === 'default' && 'bg-gradient-to-r from-foreground/60 to-foreground'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </ToastPrimitives.Root>
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.error]:border-red-200 group-[.error]:hover:bg-red-100 group-[.error]:dark:border-red-800 group-[.error]:dark:hover:bg-red-900',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}