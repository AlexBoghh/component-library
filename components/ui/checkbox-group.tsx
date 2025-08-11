'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import { Label } from '@/components/ui/primitives/label'
import { cn } from '@/lib/utils'

interface CheckboxOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface CheckboxGroupProps {
  options: CheckboxOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  className?: string
  orientation?: 'horizontal' | 'vertical'
  error?: boolean
}

export function CheckboxGroup({
  options,
  value = [],
  onValueChange,
  className,
  orientation = 'vertical',
  error,
}: CheckboxGroupProps) {
  const handleCheckedChange = (optionValue: string, checked: boolean) => {
    if (!onValueChange) return
    
    if (checked) {
      onValueChange([...value, optionValue])
    } else {
      onValueChange(value.filter(v => v !== optionValue))
    }
  }

  return (
    <div
      className={cn(
        'flex gap-4',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        error && 'border border-destructive rounded-md p-3',
        className
      )}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-start space-x-3">
          <Checkbox
            id={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => 
              handleCheckedChange(option.value, checked as boolean)
            }
            disabled={option.disabled}
            className="mt-0.5"
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor={option.value}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                option.disabled && "cursor-not-allowed opacity-70"
              )}
            >
              {option.label}
            </Label>
            {option.description && (
              <p className="text-xs text-muted-foreground">
                {option.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}