'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

// CSS Variables for theming
const cssVariables = {
  '--dialog-bg': '#ffffff',
  '--dialog-border': '#e2e8f0',
  '--dialog-text': '#0f172a',
  '--dialog-text-muted': '#64748b',
  '--dialog-overlay-bg': 'rgba(0, 0, 0, 0.5)',
  '--dialog-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '--dialog-radius': '8px',
  '--dialog-primary': '#3b82f6',
  '--dialog-primary-hover': '#2563eb',
  '--dialog-secondary-bg': '#f1f5f9',
  '--dialog-secondary-hover': '#e2e8f0',
}

// Dark mode CSS variables
const darkCssVariables = {
  '--dialog-bg': '#020617',
  '--dialog-border': '#1e293b',
  '--dialog-text': '#f8fafc',
  '--dialog-text-muted': '#94a3b8',
  '--dialog-overlay-bg': 'rgba(0, 0, 0, 0.8)',
  '--dialog-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  '--dialog-secondary-bg': '#1e293b',
  '--dialog-secondary-hover': '#334155',
}

// Inline styles using CSS variables
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  backgroundColor: 'var(--dialog-overlay-bg)',
  backdropFilter: 'blur(4px)',
  animation: 'fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
}

const contentStyle: React.CSSProperties = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  zIndex: 50,
  display: 'grid',
  width: '100%',
  maxWidth: '32rem',
  transform: 'translate(-50%, -50%)',
  gap: '1rem',
  border: '1px solid var(--dialog-border)',
  backgroundColor: 'var(--dialog-bg)',
  padding: '1.5rem',
  boxShadow: 'var(--dialog-shadow)',
  borderRadius: 'var(--dialog-radius)',
  animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
}

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  borderRadius: '2px',
  opacity: 0.7,
  transition: 'opacity 150ms',
  background: 'none',
  border: 'none',
  padding: '4px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--dialog-text-muted)',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  textAlign: 'left',
}

const footerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '1rem',
}

const titleStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: '-0.025em',
  color: 'var(--dialog-text)',
  margin: 0,
}

const descriptionStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: 'var(--dialog-text-muted)',
  marginTop: '0.5rem',
  lineHeight: 1.5,
}

// Button styles
const buttonBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  fontSize: '0.875rem',
  fontWeight: 500,
  height: '40px',
  padding: '0 16px',
  transition: 'all 150ms',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
}

const primaryButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  backgroundColor: 'var(--dialog-primary)',
  color: 'white',
}

const secondaryButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  backgroundColor: 'var(--dialog-secondary-bg)',
  color: 'var(--dialog-text)',
  border: '1px solid var(--dialog-border)',
}

// Dialog with Inline Styles
const DialogInlineStyles = DialogPrimitive.Root

const DialogInlineStylesTrigger = DialogPrimitive.Trigger

const DialogInlineStylesPortal = DialogPrimitive.Portal

const DialogInlineStylesOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    style={{ ...overlayStyle, ...style }}
    {...props}
  />
))
DialogInlineStylesOverlay.displayName = DialogPrimitive.Overlay.displayName

interface DialogInlineStylesContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  isDarkMode?: boolean
}

const DialogInlineStylesContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogInlineStylesContentProps
>(({ style, children, isDarkMode = false, ...props }, ref) => {
  const variables = isDarkMode ? darkCssVariables : cssVariables
  
  return (
    <DialogInlineStylesPortal>
      <DialogInlineStylesOverlay style={{ ...overlayStyle, ...variables }} />
      <DialogPrimitive.Content
        ref={ref}
        style={{ ...contentStyle, ...variables, ...style }}
        {...props}
      >
        {children}
        <DialogPrimitive.Close 
          style={closeButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7'
          }}
        >
          <X size={16} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogInlineStylesPortal>
  )
})
DialogInlineStylesContent.displayName = DialogPrimitive.Content.displayName

const DialogInlineStylesHeader = ({
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{ ...headerStyle, ...style }}
    {...props}
  />
)
DialogInlineStylesHeader.displayName = "DialogHeader"

const DialogInlineStylesFooter = ({
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{ ...footerStyle, ...style }}
    {...props}
  />
)
DialogInlineStylesFooter.displayName = "DialogFooter"

const DialogInlineStylesTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    style={{ ...titleStyle, ...style }}
    {...props}
  />
))
DialogInlineStylesTitle.displayName = DialogPrimitive.Title.displayName

const DialogInlineStylesDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    style={{ ...descriptionStyle, ...style }}
    {...props}
  />
))
DialogInlineStylesDescription.displayName = DialogPrimitive.Description.displayName

// Export button styles for use in demo
export const InlineStyleButton = ({ 
  variant = 'primary', 
  children, 
  ...props 
}: { 
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const style = variant === 'primary' 
    ? {
        ...primaryButtonStyle,
        backgroundColor: isHovered ? 'var(--dialog-primary-hover)' : 'var(--dialog-primary)',
      }
    : {
        ...secondaryButtonStyle,
        backgroundColor: isHovered ? 'var(--dialog-secondary-hover)' : 'var(--dialog-secondary-bg)',
      }

  return (
    <button
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  )
}

// Add keyframe animations
if (typeof document !== 'undefined' && !document.getElementById('dialog-inline-animations')) {
  const style = document.createElement('style')
  style.id = 'dialog-inline-animations'
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes contentShow {
      from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `
  document.head.appendChild(style)
}

export {
  DialogInlineStyles,
  DialogInlineStylesPortal,
  DialogInlineStylesOverlay,
  DialogInlineStylesTrigger,
  DialogInlineStylesContent,
  DialogInlineStylesHeader,
  DialogInlineStylesFooter,
  DialogInlineStylesTitle,
  DialogInlineStylesDescription,
  cssVariables,
  darkCssVariables,
}