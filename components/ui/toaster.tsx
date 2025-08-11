'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastAction,
} from '@/components/ui/primitives/toast'
import { useToast } from '@/components/ui/use-toast'

interface ToasterProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  swipeDirection?: 'up' | 'down' | 'left' | 'right'
}

export function Toaster({ 
  position = 'bottom-right',
  swipeDirection = 'right' 
}: ToasterProps) {
  const { toasts } = useToast()

  return (
    <ToastProvider swipeDirection={swipeDirection}>
      {toasts.map(function ({ id, title, description, action, render, stackIndex = 0, ...props }, index) {
        const offset = stackIndex * 8
        const scale = 1 - (stackIndex * 0.02)
        const opacity = 1 - (stackIndex * 0.1)
        
        return (
          <Toast 
            key={id} 
            {...props}
            style={{
              transform: `translateY(-${offset}px) scale(${scale})`,
              opacity: opacity,
              zIndex: 100 - stackIndex,
            }}
          >
            {render ? (
              render({ id, dismiss: () => props.onOpenChange?.(false) })
            ) : (
              <>
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
                {action}
                <ToastClose />
              </>
            )}
          </Toast>
        )
      })}
      <ToastViewport position={position} />
    </ToastProvider>
  )
}