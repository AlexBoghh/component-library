'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import styles from './dialog-css-modules.module.css'

// Dialog with CSS Modules
const DialogCSSModules = DialogPrimitive.Root

const DialogCSSModulesTrigger = DialogPrimitive.Trigger

const DialogCSSModulesPortal = DialogPrimitive.Portal

const DialogCSSModulesOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={`${styles.overlay} ${className || ''}`}
    {...props}
  />
))
DialogCSSModulesOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogCSSModulesContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogCSSModulesPortal>
    <DialogCSSModulesOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`${styles.content} ${className || ''}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className={styles.closeButton}>
        <X />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogCSSModulesPortal>
))
DialogCSSModulesContent.displayName = DialogPrimitive.Content.displayName

const DialogCSSModulesHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${styles.header} ${className || ''}`}
    {...props}
  />
)
DialogCSSModulesHeader.displayName = "DialogHeader"

const DialogCSSModulesFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${styles.footer} ${className || ''}`}
    {...props}
  />
)
DialogCSSModulesFooter.displayName = "DialogFooter"

const DialogCSSModulesTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`${styles.title} ${className || ''}`}
    {...props}
  />
))
DialogCSSModulesTitle.displayName = DialogPrimitive.Title.displayName

const DialogCSSModulesDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={`${styles.description} ${className || ''}`}
    {...props}
  />
))
DialogCSSModulesDescription.displayName = DialogPrimitive.Description.displayName

// Export button styles for use in demo
export const cssModulesButtonStyles = {
  primary: `${styles.button} ${styles.buttonPrimary}`,
  secondary: `${styles.button} ${styles.buttonSecondary}`,
}

export {
  DialogCSSModules,
  DialogCSSModulesPortal,
  DialogCSSModulesOverlay,
  DialogCSSModulesTrigger,
  DialogCSSModulesContent,
  DialogCSSModulesHeader,
  DialogCSSModulesFooter,
  DialogCSSModulesTitle,
  DialogCSSModulesDescription,
}