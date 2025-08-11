'use client'

import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithRef, PolymorphicComponentPropsWithRef } from '@/types/components'

/* -------------------------------------------------------------------------- */
/*                              Button Variants                              */
/* -------------------------------------------------------------------------- */

const buttonVariants = cva(
  // Base styles that all buttons share
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
          'active:scale-[0.98]',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
          'active:scale-[0.98]',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90',
          'active:scale-[0.98]',
        ],
        outline: [
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground',
          'active:scale-[0.98]',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'active:bg-accent/90',
        ],
        link: [
          'text-primary underline-offset-4',
          'hover:underline',
          'active:text-primary/80',
        ],
      },
      size: {
        xs: 'h-7 px-2 text-xs rounded',
        sm: 'h-8 px-3 text-xs rounded',
        md: 'h-9 px-4 text-sm rounded-md',
        lg: 'h-10 px-6 text-base rounded-md',
        xl: 'h-12 px-8 text-lg rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

/* -------------------------------------------------------------------------- */
/*                           Button Context & Types                          */
/* -------------------------------------------------------------------------- */

interface ButtonContextValue {
  size?: VariantProps<typeof buttonVariants>['size']
  variant?: VariantProps<typeof buttonVariants>['variant']
  isLoading?: boolean
  isDisabled?: boolean
}

const ButtonContext = React.createContext<ButtonContextValue>({})

const useButtonContext = () => React.useContext(ButtonContext)

/* -------------------------------------------------------------------------- */
/*                              Button Root Component                        */
/* -------------------------------------------------------------------------- */

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      loadingText,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    // Provide context for child components
    const contextValue = React.useMemo(
      () => ({
        size,
        variant,
        isLoading: loading,
        isDisabled,
      }),
      [size, variant, loading, isDisabled]
    )

    return (
      <ButtonContext.Provider value={contextValue}>
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={loading}
          data-loading={loading}
          data-disabled={isDisabled}
          {...props}
        >
          {leftIcon && <ButtonIcon>{leftIcon}</ButtonIcon>}
          <Slottable>{loading && loadingText ? loadingText : children}</Slottable>
          {rightIcon && <ButtonIcon>{rightIcon}</ButtonIcon>}
        </Comp>
      </ButtonContext.Provider>
    )
  }
)

ButtonRoot.displayName = 'Button'

/* -------------------------------------------------------------------------- */
/*                           Button Icon Component                           */
/* -------------------------------------------------------------------------- */

interface ButtonIconProps {
  children: React.ReactNode
  className?: string
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ children, className }) => {
  const { size, isLoading } = useButtonContext()

  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4 w-4',
    xl: 'h-5 w-5',
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        iconSizes[size || 'md'],
        isLoading && 'animate-pulse',
        className
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*                        Button Group Component                             */
/* -------------------------------------------------------------------------- */

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', variant, size, attached = true, children, ...props }, ref) => {
    const childrenWithProps = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child

      const isFirst = index === 0
      const isLast = index === React.Children.count(children) - 1

      // Pass down variant and size if not specified on child
      const childProps: any = {
        variant: child.props.variant || variant,
        size: child.props.size || size,
      }

      // Add classes for attached buttons
      if (attached) {
        if (orientation === 'horizontal') {
          childProps.className = cn(
            child.props.className,
            !isFirst && '-ml-px',
            !isFirst && !isLast && 'rounded-none',
            isFirst && 'rounded-r-none',
            isLast && 'rounded-l-none'
          )
        } else {
          childProps.className = cn(
            child.props.className,
            !isFirst && '-mt-px',
            !isFirst && !isLast && 'rounded-none',
            isFirst && 'rounded-b-none',
            isLast && 'rounded-t-none'
          )
        }
      }

      return React.cloneElement(child, childProps)
    })

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'inline-flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          attached && 'shadow-sm',
          className
        )}
        {...props}
      >
        {childrenWithProps}
      </div>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'

/* -------------------------------------------------------------------------- */
/*                          Icon Button Component                            */
/* -------------------------------------------------------------------------- */

interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loadingText'> {
  'aria-label': string
  icon: React.ReactNode
  shape?: 'square' | 'circle'
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, shape = 'square', size = 'md', className, ...props }, ref) => {
    const iconButtonSizes = {
      xs: 'h-7 w-7 p-0',
      sm: 'h-8 w-8 p-0',
      md: 'h-9 w-9 p-0',
      lg: 'h-10 w-10 p-0',
      xl: 'h-12 w-12 p-0',
    }

    return (
      <ButtonRoot
        ref={ref}
        size={size}
        className={cn(
          iconButtonSizes[size || 'md'],
          shape === 'circle' && 'rounded-full',
          className
        )}
        {...props}
      >
        <ButtonIcon>{icon}</ButtonIcon>
      </ButtonRoot>
    )
  }
)

IconButton.displayName = 'IconButton'

/* -------------------------------------------------------------------------- */
/*                         Loading Button Component                          */
/* -------------------------------------------------------------------------- */

interface LoadingButtonProps extends ButtonProps {
  loadingIcon?: React.ReactNode
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, loadingIcon, children, leftIcon, ...props }, ref) => {
    const LoadingIcon = loadingIcon || (
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    return (
      <ButtonRoot
        ref={ref}
        loading={loading}
        leftIcon={loading ? LoadingIcon : leftIcon}
        {...props}
      >
        {children}
      </ButtonRoot>
    )
  }
)

LoadingButton.displayName = 'LoadingButton'

/* -------------------------------------------------------------------------- */
/*                                   Exports                                 */
/* -------------------------------------------------------------------------- */

// Export components
export const Button = Object.assign(ButtonRoot, {
  Group: ButtonGroup,
  Icon: IconButton,
  Loading: LoadingButton,
})

// Export utilities
export { buttonVariants, useButtonContext }

// Export types
export type { ButtonContextValue, ButtonGroupProps, IconButtonProps, LoadingButtonProps }