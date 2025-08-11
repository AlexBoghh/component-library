import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

const spinnerVariants = cva(
  "animate-spin text-current",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-[18px] w-[18px]",
        xl: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <span ref={ref} role="status" aria-label="Loading" {...props}>
        <Loader2 className={cn(spinnerVariants({ size }), className)} />
        <span className="sr-only">Loading...</span>
      </span>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }