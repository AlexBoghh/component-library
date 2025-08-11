'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight, X, ChevronDown } from 'lucide-react'

// Neubrutalism Button Component
export const BrutalButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
    size?: 'sm' | 'md' | 'lg'
  }
>(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const variants = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    secondary: 'bg-purple-600 text-white hover:bg-purple-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    outline: 'bg-white text-black hover:bg-gray-50 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    danger: 'bg-red-500 text-white hover:bg-red-400 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    success: 'bg-green-500 text-white hover:bg-green-400 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    <button
      ref={ref}
      className={cn(
        'font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        'transition-all duration-200 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
BrutalButton.displayName = 'BrutalButton'

// Neubrutalism Card Component
export const BrutalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    color?: 'white' | 'yellow' | 'purple' | 'cyan' | 'gradient'
    hover?: boolean
  }
>(({ className, color = 'white', hover = false, children, ...props }, ref) => {
  const colors = {
    white: 'bg-white',
    yellow: 'bg-yellow-400',
    purple: 'bg-purple-600 text-white',
    cyan: 'bg-cyan-400',
    gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500',
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        'border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6',
        hover && 'transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]',
        colors[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
BrutalCard.displayName = 'BrutalCard'

// Neubrutalism Input Component
export const BrutalInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        'font-bold placeholder:text-gray-500 placeholder:font-bold placeholder:uppercase',
        'focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  )
})
BrutalInput.displayName = 'BrutalInput'

// Neubrutalism Badge Component
export const BrutalBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    color?: 'yellow' | 'purple' | 'cyan' | 'green' | 'pink'
  }
>(({ className, color = 'yellow', children, ...props }, ref) => {
  const colors = {
    yellow: 'bg-yellow-400 text-black',
    purple: 'bg-purple-600 text-white',
    cyan: 'bg-cyan-500 text-black',
    green: 'bg-green-500 text-white',
    pink: 'bg-pink-500 text-white',
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        'inline-block px-3 py-1 font-black text-xs uppercase',
        'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
        colors[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})
BrutalBadge.displayName = 'BrutalBadge'

// Neubrutalism Toggle Component
export const BrutalToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    pressed?: boolean
  }
>(({ className, pressed = false, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-state={pressed ? 'on' : 'off'}
      className={cn(
        'px-4 py-2 font-black uppercase border-4 border-black',
        'transition-all duration-200',
        pressed
          ? 'bg-yellow-400 text-black shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.3)]'
          : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
BrutalToggle.displayName = 'BrutalToggle'

// Neubrutalism Alert Component
export const BrutalAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'info' | 'warning' | 'error' | 'success'
  }
>(({ className, variant = 'info', children, ...props }, ref) => {
  const variants = {
    info: 'bg-cyan-100 border-cyan-600 text-cyan-900',
    warning: 'bg-yellow-100 border-yellow-600 text-yellow-900',
    error: 'bg-red-100 border-red-600 text-red-900',
    success: 'bg-green-100 border-green-600 text-green-900',
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        'p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        'font-bold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
BrutalAlert.displayName = 'BrutalAlert'

// Neubrutalism Divider Component
export const BrutalDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-full h-1 bg-black shadow-[0px_2px_0px_0px_rgba(0,0,0,0.3)]',
        className
      )}
    />
  )
}

// Neubrutalism Text Styles
export const BrutalHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4
    color?: 'black' | 'white' | 'yellow' | 'purple'
  }
>(({ className, level = 1, color = 'black', children, ...props }, ref) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const sizes = {
    1: 'text-5xl',
    2: 'text-4xl',
    3: 'text-3xl',
    4: 'text-2xl',
  }
  
  const colors = {
    black: 'text-black',
    white: 'text-white',
    yellow: 'text-yellow-400 text-stroke-black',
    purple: 'text-purple-600',
  }
  
  return React.createElement(
    Tag,
    {
      ref,
      className: cn(
        'font-black uppercase',
        sizes[level],
        colors[color],
        className
      ),
      ...props
    },
    children
  )
})
BrutalHeading.displayName = 'BrutalHeading'

// Neubrutalism Progress Bar
export const BrutalProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: number
    max?: number
    color?: 'yellow' | 'purple' | 'cyan' | 'green'
  }
>(({ className, value, max = 100, color = 'yellow', ...props }, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const colors = {
    yellow: 'bg-yellow-400',
    purple: 'bg-purple-600',
    cyan: 'bg-cyan-400',
    green: 'bg-green-500',
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        'w-full h-8 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'h-full transition-all duration-300',
          colors[color]
        )}
        style={{ width: `${percentage}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center font-black text-sm">
        {Math.round(percentage)}%
      </span>
    </div>
  )
})
BrutalProgress.displayName = 'BrutalProgress'

// Neubrutalism Tabs Component
export const BrutalTabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('space-y-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})
BrutalTabs.displayName = 'BrutalTabs'

export const BrutalTabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex gap-2 p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
BrutalTabsList.displayName = 'BrutalTabsList'

export const BrutalTabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean
  }
>(({ className, active = false, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'px-4 py-2 font-black uppercase transition-all duration-200',
        active
          ? 'bg-yellow-400 text-black border-2 border-black'
          : 'bg-transparent text-black hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
BrutalTabsTrigger.displayName = 'BrutalTabsTrigger'

// Neubrutalism Dropdown Menu
export const BrutalDropdown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean
  }
>(({ className, open = false, children, ...props }, ref) => {
  return (
    <div ref={ref} className="relative inline-block" {...props}>
      {children}
    </div>
  )
})
BrutalDropdown.displayName = 'BrutalDropdown'

// Export all components
export default {
  BrutalButton,
  BrutalCard,
  BrutalInput,
  BrutalBadge,
  BrutalToggle,
  BrutalAlert,
  BrutalDivider,
  BrutalHeading,
  BrutalProgress,
  BrutalTabs,
  BrutalTabsList,
  BrutalTabsTrigger,
  BrutalDropdown,
}