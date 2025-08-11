import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import type { LucideIcon } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] focus-ring-premium",
  {
    variants: {
      variant: {
        default:
          "btn-premium-primary micro-bounce",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md active:shadow-sm micro-bounce",
        outline:
          "btn-premium-outline micro-bounce",
        secondary:
          "btn-premium-secondary micro-bounce",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/90 transition-all duration-200",
        link: 
          "text-primary underline-offset-4 hover:underline active:text-primary/80 p-0 h-auto transition-all duration-200",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-base",
        xl: "h-12 px-8 text-lg",
        icon: "h-9 w-9 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// Precise icon sizing that matches button sizes
const getIconSize = (size?: "sm" | "md" | "lg" | "xl" | "icon") => {
  switch (size) {
    case "sm":
      return 14
    case "lg":
      return 18
    case "xl":
      return 20
    case "icon":
    case "md":
    default:
      return 16
  }
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactElement | LucideIcon
  rightIcon?: React.ReactElement | LucideIcon
  loadingText?: string
  spinnerPlacement?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    loadingText,
    spinnerPlacement = "left",
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    const iconSize = getIconSize(size)
    
    // Render icon with proper sizing
    const renderIcon = (icon: React.ReactElement | LucideIcon | undefined) => {
      if (!icon) return null
      
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement<any>, {
          className: cn("shrink-0 transition-transform", (icon as any).props?.className),
          width: iconSize,
          height: iconSize,
          strokeWidth: 1.5,
        })
      }
      
      // If it's a LucideIcon component
      const IconComponent = icon as LucideIcon
      return <IconComponent className="shrink-0 transition-transform" size={iconSize} strokeWidth={1.5} />
    }
    
    // Handle loading state content
    const content = React.useMemo(() => {
      if (loading) {
        const spinner = <Spinner size={size === "icon" ? "md" : size} />
        const text = loadingText || children
        
        if (!text || size === "icon") {
          return spinner
        }
        
        if (spinnerPlacement === "right") {
          return (
            <>
              {text}
              {spinner}
            </>
          )
        }
        
        return (
          <>
            {spinner}
            {text}
          </>
        )
      }
      
      // Handle icons
      return (
        <>
          {renderIcon(leftIcon)}
          {children}
          {renderIcon(rightIcon)}
        </>
      )
    }, [loading, loadingText, children, spinnerPlacement, size, leftIcon, rightIcon, iconSize])
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          loading && "cursor-wait"
        )}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

// Icon Button variant for square icon-only buttons with tooltip
export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loadingText' | 'children'> {
  "aria-label": string
  tooltip?: string
  children: React.ReactElement | LucideIcon
  shape?: "square" | "circle"
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    size = "md", 
    shape = "square",
    tooltip,
    "aria-label": ariaLabel,
    children,
    variant,
    ...props 
  }, ref) => {
    const iconButtonSizes = {
      sm: "h-8 w-8",
      md: "h-9 w-9",
      lg: "h-10 w-10",
      xl: "h-12 w-12",
    }
    
    const button = (
      <Button
        ref={ref}
        className={cn(
          iconButtonSizes[size as keyof typeof iconButtonSizes],
          "p-0 hover:scale-105",
          shape === "circle" && "rounded-full",
          className
        )}
        size="icon"
        variant={variant}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </Button>
    )
    
    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )
    }
    
    return button
  }
)
IconButton.displayName = "IconButton"

// Button Group component for grouped buttons
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex shadow-sm",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child
          
          const isFirst = index === 0
          const isLast = index === React.Children.count(children) - 1
          
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(
              (child as any).props?.className,
              orientation === "horizontal" ? 
                cn(
                  !isFirst && "-ml-px",
                  !isFirst && !isLast && "rounded-none",
                  isFirst && "rounded-r-none",
                  isLast && "rounded-l-none"
                ) :
                cn(
                  !isFirst && "-mt-px",
                  !isFirst && !isLast && "rounded-none",
                  isFirst && "rounded-b-none",
                  isLast && "rounded-t-none"
                )
            ),
          })
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { Button, IconButton, ButtonGroup, buttonVariants }