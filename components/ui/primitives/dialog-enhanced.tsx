'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const dialogOverlayVariants = cva(
  "fixed inset-0 z-50 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
  {
    variants: {
      blur: {
        none: "bg-background/80",
        sm: "bg-background/80 backdrop-blur-sm",
        md: "bg-background/80 backdrop-blur-md",
        lg: "bg-background/80 backdrop-blur-lg",
      },
    },
    defaultVariants: {
      blur: "sm",
    },
  }
)

interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof dialogOverlayVariants> {}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, blur, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(dialogOverlayVariants({ blur }), className)}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const dialogContentVariants = cva(
  "fixed z-50 grid w-full gap-4 border bg-background p-6 shadow-lg",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw] max-h-[95vh]",
      },
      animation: {
        fade: "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
        zoom: "data-[state=open]:animate-enter data-[state=closed]:animate-exit",
        slideUp: "data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom",
        slideDown: "data-[state=open]:animate-slide-in-from-top data-[state=closed]:animate-slide-out-to-top",
        slideLeft: "data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right",
        slideRight: "data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left",
      },
      position: {
        center: "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg",
        top: "left-[50%] top-[10%] translate-x-[-50%] rounded-lg",
        bottom: "left-[50%] bottom-[10%] translate-x-[-50%] rounded-lg",
        left: "left-0 top-0 h-full rounded-r-lg",
        right: "right-0 top-0 h-full rounded-l-lg",
      },
    },
    defaultVariants: {
      size: "md",
      animation: "zoom",
      position: "center",
    },
  }
)

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  blur?: "none" | "sm" | "md" | "lg"
  hideCloseButton?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ 
  className, 
  children, 
  size,
  animation,
  position,
  blur = "sm",
  hideCloseButton = false,
  ...props 
}, ref) => (
  <DialogPortal>
    <DialogOverlay blur={blur} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        dialogContentVariants({ size, animation, position }),
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}