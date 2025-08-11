'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

const contentHide = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
`

// Styled components
const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  
  &[data-state="open"] {
    animation: ${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &[data-state="closed"] {
    animation: ${fadeOut} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

const StyledContent = styled(DialogPrimitive.Content)<{ theme?: 'light' | 'dark' }>`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  gap: 1rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#1e293b' : '#e2e8f0'};
  background-color: ${props => props.theme === 'dark' ? '#020617' : '#ffffff'};
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 0.5rem;
  
  &[data-state="open"] {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &[data-state="closed"] {
    animation: ${contentHide} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

const StyledCloseButton = styled(DialogPrimitive.Close)<{ theme?: 'light' | 'dark' }>`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 0.125rem;
  opacity: 0.7;
  transition: opacity 150ms;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme === 'dark' ? '#94a3b8' : '#64748b'};
  
  &:hover {
    opacity: 1;
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  &:disabled {
    pointer-events: none;
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-align: center;
  
  @media (min-width: 640px) {
    text-align: left;
  }
`

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`

const StyledTitle = styled(DialogPrimitive.Title)<{ theme?: 'light' | 'dark' }>`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${props => props.theme === 'dark' ? '#f8fafc' : '#0f172a'};
  margin: 0;
`

const StyledDescription = styled(DialogPrimitive.Description)<{ theme?: 'light' | 'dark' }>`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#94a3b8' : '#64748b'};
  margin-top: 0.5rem;
  line-height: 1.5;
`

// Button components
const Button = styled.button<{ variant?: 'primary' | 'secondary', theme?: 'light' | 'dark' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  height: 2.5rem;
  padding: 0 1rem;
  transition: all 150ms;
  cursor: pointer;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background-color: #3b82f6;
    color: white;
    
    &:hover {
      background-color: #2563eb;
    }
  ` : `
    background-color: ${props.theme === 'dark' ? '#1e293b' : '#f1f5f9'};
    color: ${props.theme === 'dark' ? '#f8fafc' : '#0f172a'};
    border: 1px solid ${props.theme === 'dark' ? '#334155' : '#e2e8f0'};
    
    &:hover {
      background-color: ${props.theme === 'dark' ? '#334155' : '#e2e8f0'};
    }
  `}
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Dialog with Emotion/Styled Components
const DialogEmotion = DialogPrimitive.Root

const DialogEmotionTrigger = DialogPrimitive.Trigger

const DialogEmotionPortal = DialogPrimitive.Portal

interface DialogEmotionContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  theme?: 'light' | 'dark'
}

const DialogEmotionOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, ref) => (
  <StyledOverlay ref={ref} {...props} />
))
DialogEmotionOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogEmotionContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogEmotionContentProps
>(({ children, theme = 'light', ...props }, ref) => (
  <DialogEmotionPortal>
    <StyledOverlay />
    <StyledContent ref={ref} theme={theme} {...props}>
      {children}
      <StyledCloseButton theme={theme}>
        <X />
        <span className="sr-only">Close</span>
      </StyledCloseButton>
    </StyledContent>
  </DialogEmotionPortal>
))
DialogEmotionContent.displayName = DialogPrimitive.Content.displayName

const DialogEmotionHeader = StyledHeader
DialogEmotionHeader.displayName = "DialogHeader"

const DialogEmotionFooter = StyledFooter
DialogEmotionFooter.displayName = "DialogFooter"

interface DialogEmotionTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  theme?: 'light' | 'dark'
}

const DialogEmotionTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogEmotionTitleProps
>(({ theme = 'light', ...props }, ref) => (
  <StyledTitle ref={ref} theme={theme} {...props} />
))
DialogEmotionTitle.displayName = DialogPrimitive.Title.displayName

interface DialogEmotionDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  theme?: 'light' | 'dark'
}

const DialogEmotionDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogEmotionDescriptionProps
>(({ theme = 'light', ...props }, ref) => (
  <StyledDescription ref={ref} theme={theme} {...props} />
))
DialogEmotionDescription.displayName = DialogPrimitive.Description.displayName

// Export button component
export const EmotionButton = Button

export {
  DialogEmotion,
  DialogEmotionPortal,
  DialogEmotionOverlay,
  DialogEmotionTrigger,
  DialogEmotionContent,
  DialogEmotionHeader,
  DialogEmotionFooter,
  DialogEmotionTitle,
  DialogEmotionDescription,
}