'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                              Dialog Variants                              */
/* -------------------------------------------------------------------------- */

const dialogOverlayVariants = cva(
  'fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      blur: {
        none: 'bg-background/80',
        sm: 'bg-background/80 backdrop-blur-sm',
        md: 'bg-background/80 backdrop-blur-md',
        lg: 'bg-background/80 backdrop-blur-lg',
      },
    },
    defaultVariants: {
      blur: 'sm',
    },
  }
)

const dialogContentVariants = cva(
  [
    'fixed z-50 grid gap-4 border bg-background shadow-lg',
    'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ],
  {
    variants: {
      position: {
        center: [
          'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        ],
        top: [
          'left-[50%] top-[10%] translate-x-[-50%]',
          'data-[state=closed]:slide-out-to-top-10 data-[state=open]:slide-in-from-top-10',
        ],
        bottom: [
          'left-[50%] bottom-[10%] translate-x-[-50%]',
          'data-[state=closed]:slide-out-to-bottom-10 data-[state=open]:slide-in-from-bottom-10',
        ],
        left: [
          'left-0 top-[50%] translate-y-[-50%] h-full max-h-screen',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        ],
        right: [
          'right-0 top-[50%] translate-y-[-50%] h-full max-h-screen',
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        ],
      },
      size: {
        xs: 'w-full max-w-xs p-4',
        sm: 'w-full max-w-sm p-4',
        md: 'w-full max-w-md p-6',
        lg: 'w-full max-w-lg p-6',
        xl: 'w-full max-w-xl p-6',
        '2xl': 'w-full max-w-2xl p-6',
        '3xl': 'w-full max-w-3xl p-8',
        '4xl': 'w-full max-w-4xl p-8',
        '5xl': 'w-full max-w-5xl p-8',
        full: 'w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] p-6',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      position: 'center',
      size: 'md',
      rounded: 'lg',
    },
  }
)

/* -------------------------------------------------------------------------- */
/*                           Dialog Context & Hooks                          */
/* -------------------------------------------------------------------------- */

interface DialogContextValue {
  size?: VariantProps<typeof dialogContentVariants>['size']
  position?: VariantProps<typeof dialogContentVariants>['position']
  hideCloseButton?: boolean
  preventClose?: boolean
  onInteractOutside?: (event: Event) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
}

const DialogContext = React.createContext<DialogContextValue>({})

const useDialogContext = () => React.useContext(DialogContext)

/* -------------------------------------------------------------------------- */
/*                              Dialog Components                            */
/* -------------------------------------------------------------------------- */

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

/* -------------------------------------------------------------------------- */
/*                            Dialog Overlay                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                            Dialog Content                                 */
/* -------------------------------------------------------------------------- */

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  hideCloseButton?: boolean
  preventClose?: boolean
  overlayBlur?: VariantProps<typeof dialogOverlayVariants>['blur']
  overlayClassName?: string
  closeButtonClassName?: string
  showOverlay?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size,
      position,
      rounded,
      hideCloseButton = false,
      preventClose = false,
      overlayBlur,
      overlayClassName,
      closeButtonClassName,
      showOverlay = true,
      onInteractOutside,
      onEscapeKeyDown,
      ...props
    },
    ref
  ) => {
    // Handle prevention of close
    const handleInteractOutside = React.useCallback(
      (event: Event) => {
        if (preventClose) {
          event.preventDefault()
        }
        onInteractOutside?.(event)
      },
      [preventClose, onInteractOutside]
    )

    const handleEscapeKeyDown = React.useCallback(
      (event: KeyboardEvent) => {
        if (preventClose) {
          event.preventDefault()
        }
        onEscapeKeyDown?.(event)
      },
      [preventClose, onEscapeKeyDown]
    )

    // Provide context for child components
    const contextValue = React.useMemo(
      () => ({
        size,
        position,
        hideCloseButton,
        preventClose,
        onInteractOutside: handleInteractOutside,
        onEscapeKeyDown: handleEscapeKeyDown,
      }),
      [size, position, hideCloseButton, preventClose, handleInteractOutside, handleEscapeKeyDown]
    )

    return (
      <DialogContext.Provider value={contextValue}>
        <DialogPortal>
          {showOverlay && <DialogOverlay blur={overlayBlur} className={overlayClassName} />}
          <DialogPrimitive.Content
            ref={ref}
            className={cn(dialogContentVariants({ size, position, rounded }), className)}
            onInteractOutside={handleInteractOutside}
            onEscapeKeyDown={handleEscapeKeyDown}
            {...props}
          >
            {children}
            {!hideCloseButton && (
              <DialogPrimitive.Close
                className={cn(
                  'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background',
                  'transition-opacity hover:opacity-100',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  'disabled:pointer-events-none',
                  'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
                  closeButtonClassName
                )}
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </DialogContext.Provider>
    )
  }
)
DialogContent.displayName = DialogPrimitive.Content.displayName

/* -------------------------------------------------------------------------- */
/*                         Dialog Header & Footer                            */
/* -------------------------------------------------------------------------- */

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  )
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2',
        className
      )}
      {...props}
    />
  )
)
DialogFooter.displayName = 'DialogFooter'

/* -------------------------------------------------------------------------- */
/*                         Dialog Title & Description                        */
/* -------------------------------------------------------------------------- */

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
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
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

/* -------------------------------------------------------------------------- */
/*                        Specialized Dialog Components                      */
/* -------------------------------------------------------------------------- */

// Alert Dialog - A dialog that requires user action
interface AlertDialogProps extends DialogContentProps {
  type?: 'info' | 'warning' | 'error' | 'success'
}

const AlertDialog = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  AlertDialogProps
>(({ type = 'info', className, ...props }, ref) => {
  const typeStyles = {
    info: 'border-blue-200 dark:border-blue-800',
    warning: 'border-yellow-200 dark:border-yellow-800',
    error: 'border-red-200 dark:border-red-800',
    success: 'border-green-200 dark:border-green-800',
  }

  return (
    <DialogContent
      ref={ref}
      preventClose
      hideCloseButton
      className={cn(typeStyles[type], className)}
      {...props}
    />
  )
})
AlertDialog.displayName = 'AlertDialog'

// Confirmation Dialog - A dialog for confirming actions
interface ConfirmationDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel?: () => void
  variant?: 'default' | 'destructive'
  loading?: boolean
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  loading = false,
}) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange?.(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={cn(
              'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-primary-foreground',
              variant === 'destructive'
                ? 'bg-destructive hover:bg-destructive/90'
                : 'bg-primary hover:bg-primary/90'
            )}
          >
            {loading ? 'Loading...' : confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Custom Hooks                               */
/* -------------------------------------------------------------------------- */

// Hook for managing dialog state
function useDialog(defaultOpen = false) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), [])

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle,
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                 */
/* -------------------------------------------------------------------------- */

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
  AlertDialog,
  ConfirmationDialog,
  useDialog,
  useDialogContext,
  dialogContentVariants,
  dialogOverlayVariants,
}

// Export types
export type { DialogContentProps, AlertDialogProps, ConfirmationDialogProps }