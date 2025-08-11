'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const RadioCards = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-4", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioCards.displayName = RadioGroupPrimitive.Root.displayName

interface RadioCardProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  title?: string
  description?: string
  icon?: React.ReactNode
}

const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioCardProps
>(({ className, children, title, description, icon, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer rounded-lg border bg-card p-4 hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-start gap-4">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1 space-y-1">
          {title && (
            <div className="font-medium leading-none">{title}</div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {children}
        </div>
        <RadioGroupPrimitive.Indicator className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary text-primary">
          <Check className="h-3 w-3" />
        </RadioGroupPrimitive.Indicator>
      </div>
    </RadioGroupPrimitive.Item>
  )
})
RadioCard.displayName = "RadioCard"

export { RadioCards, RadioCard }