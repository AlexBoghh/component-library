'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerPortal = DialogPrimitive.Portal
const DrawerClose = DialogPrimitive.Close

const drawerOverlayVariants = cva(
  "fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
  {
    variants: {
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
      },
    },
    defaultVariants: {
      blur: "sm",
    },
  }
)

interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof drawerOverlayVariants> {}

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, blur, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(drawerOverlayVariants({ blur }), className)}
    {...props}
  />
))
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName

const drawerContentVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      {
        side: ["left", "right"],
        size: "sm",
        class: "sm:max-w-xs",
      },
      {
        side: ["left", "right"],
        size: "md",
        class: "sm:max-w-sm",
      },
      {
        side: ["left", "right"],
        size: "lg",
        class: "sm:max-w-md",
      },
      {
        side: ["left", "right"],
        size: "xl",
        class: "sm:max-w-lg",
      },
      {
        side: ["left", "right"],
        size: "full",
        class: "sm:max-w-full",
      },
      {
        side: ["top", "bottom"],
        size: "sm",
        class: "max-h-32",
      },
      {
        side: ["top", "bottom"],
        size: "md",
        class: "max-h-48",
      },
      {
        side: ["top", "bottom"],
        size: "lg",
        class: "max-h-64",
      },
      {
        side: ["top", "bottom"],
        size: "xl",
        class: "max-h-96",
      },
      {
        side: ["top", "bottom"],
        size: "full",
        class: "max-h-screen",
      },
    ],
    defaultVariants: {
      side: "right",
      size: "md",
    },
  }
)

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerContentVariants> {
  blur?: "none" | "sm" | "md" | "lg"
  hideCloseButton?: boolean
  showHandle?: boolean
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ 
  className, 
  children, 
  side,
  size,
  blur = "sm",
  hideCloseButton = false,
  showHandle = false,
  ...props 
}, ref) => {
  const handleElement = React.useMemo(() => {
    if (!showHandle) return null;
    
    if (side === "top" || side === "bottom") {
      return <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />;
    }
    
    if (side === "left" || side === "right") {
      return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
      );
    }
    
    return null;
  }, [showHandle, side]);

  return (
    <DrawerPortal>
      <DrawerOverlay blur={blur} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(drawerContentVariants({ side, size }), className)}
        {...props}
      >
        {handleElement}
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DrawerPortal>
  );
})
DrawerContent.displayName = DialogPrimitive.Content.displayName

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2",
      className
    )}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
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
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
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
DrawerTitle.displayName = DialogPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DialogPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}