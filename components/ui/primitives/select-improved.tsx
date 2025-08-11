'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                              Select Variants                              */
/* -------------------------------------------------------------------------- */

const selectTriggerVariants = cva(
  [
    'flex w-full items-center justify-between whitespace-nowrap',
    'border border-input bg-background text-sm',
    'ring-offset-background placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[&>span]:line-clamp-1',
  ],
  {
    variants: {
      size: {
        xs: 'h-7 px-2 text-xs rounded',
        sm: 'h-8 px-3 text-xs rounded',
        md: 'h-9 px-3 py-2 text-sm rounded-md',
        lg: 'h-10 px-4 text-base rounded-md',
        xl: 'h-12 px-4 text-lg rounded-lg',
      },
      variant: {
        default: 'shadow-sm',
        outline: '',
        ghost: 'border-transparent shadow-none',
      },
      state: {
        default: '',
        error: 'border-destructive focus:ring-destructive',
        success: 'border-green-500 focus:ring-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      state: 'default',
    },
  }
)

const selectContentVariants = cva(
  [
    'relative z-50 max-h-96 min-w-[8rem] overflow-hidden',
    'rounded-md border bg-popover text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
  {
    variants: {
      position: {
        'item-aligned': '',
        popper: [
          'data-[side=bottom]:translate-y-1',
          'data-[side=left]:-translate-x-1',
          'data-[side=right]:translate-x-1',
          'data-[side=top]:-translate-y-1',
        ],
      },
    },
    defaultVariants: {
      position: 'popper',
    },
  }
)

/* -------------------------------------------------------------------------- */
/*                            Select Context                                 */
/* -------------------------------------------------------------------------- */

interface SelectContextValue {
  size?: VariantProps<typeof selectTriggerVariants>['size']
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  state?: VariantProps<typeof selectTriggerVariants>['state']
  multiple?: boolean
  searchable?: boolean
}

const SelectContext = React.createContext<SelectContextValue>({})

const useSelectContext = () => React.useContext(SelectContext)

/* -------------------------------------------------------------------------- */
/*                          Base Select Components                           */
/* -------------------------------------------------------------------------- */

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

/* -------------------------------------------------------------------------- */
/*                            Select Trigger                                 */
/* -------------------------------------------------------------------------- */

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  icon?: React.ReactNode
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size, variant, state, icon, ...props }, ref) => {
  const context = useSelectContext()
  const triggerSize = size || context.size
  const triggerVariant = variant || context.variant
  const triggerState = state || context.state

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        selectTriggerVariants({ size: triggerSize, variant: triggerVariant, state: triggerState }),
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        {icon || <ChevronDown className="h-4 w-4 opacity-50" />}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/* -------------------------------------------------------------------------- */
/*                           Select Scroll Buttons                           */
/* -------------------------------------------------------------------------- */

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

/* -------------------------------------------------------------------------- */
/*                            Select Content                                 */
/* -------------------------------------------------------------------------- */

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContentVariants> {}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(selectContentVariants({ position }), className)}
      position={position as any}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/* -------------------------------------------------------------------------- */
/*                           Select Label & Item                             */
/* -------------------------------------------------------------------------- */

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  icon?: React.ReactNode
  description?: string
  showIndicator?: boolean
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, icon, description, showIndicator = true, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    {showIndicator && (
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    )}
    {icon && <span className="mr-2 flex h-4 w-4 items-center justify-center">{icon}</span>}
    <div className="flex flex-col">
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      {description && (
        <span className="text-xs text-muted-foreground">{description}</span>
      )}
    </div>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

/* -------------------------------------------------------------------------- */
/*                         Searchable Select Component                       */
/* -------------------------------------------------------------------------- */

interface SearchableSelectProps {
  options: Array<{
    value: string
    label: string
    description?: string
    icon?: React.ReactNode
    disabled?: boolean
  }>
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  size?: VariantProps<typeof selectTriggerVariants>['size']
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  state?: VariantProps<typeof selectTriggerVariants>['state']
  disabled?: boolean
}

const SearchableSelect = React.forwardRef<HTMLButtonElement, SearchableSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select an option',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found',
      className,
      size,
      variant,
      state,
      disabled,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')

    const filteredOptions = React.useMemo(() => {
      if (!search) return options

      const searchLower = search.toLowerCase()
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchLower) ||
          option.description?.toLowerCase().includes(searchLower)
      )
    }, [options, search])

    const selectedOption = options.find((option) => option.value === value)

    return (
      <SelectContext.Provider value={{ size, variant, state, searchable: true }}>
        <Select open={open} onOpenChange={setOpen} value={value} onValueChange={onValueChange}>
          <SelectTrigger ref={ref} className={className} disabled={disabled}>
            <SelectValue placeholder={placeholder}>
              {selectedOption && (
                <span className="flex items-center">
                  {selectedOption.icon && (
                    <span className="mr-2 flex h-4 w-4 items-center justify-center">
                      {selectedOption.icon}
                    </span>
                  )}
                  {selectedOption.label}
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <div className="flex items-center border-b px-2 pb-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="ml-2 rounded-sm opacity-70 hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    icon={option.icon}
                    description={option.description}
                  >
                    {option.label}
                  </SelectItem>
                ))
              )}
            </div>
          </SelectContent>
        </Select>
      </SelectContext.Provider>
    )
  }
)
SearchableSelect.displayName = 'SearchableSelect'

/* -------------------------------------------------------------------------- */
/*                         Multi-Select Component                            */
/* -------------------------------------------------------------------------- */

interface MultiSelectProps {
  options: Array<{
    value: string
    label: string
    icon?: React.ReactNode
    disabled?: boolean
  }>
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  maxSelected?: number
  className?: string
  size?: VariantProps<typeof selectTriggerVariants>['size']
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  state?: VariantProps<typeof selectTriggerVariants>['state']
  disabled?: boolean
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onValueChange,
      placeholder = 'Select options',
      maxSelected,
      className,
      size = 'md',
      variant = 'default',
      state = 'default',
      disabled,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const handleToggle = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]

      if (maxSelected && newValue.length > maxSelected) {
        return
      }

      onValueChange?.(newValue)
    }

    const selectedLabels = value
      .map((v) => options.find((opt) => opt.value === v)?.label)
      .filter(Boolean)

    return (
      <SelectContext.Provider value={{ size, variant, state, multiple: true }}>
        <div ref={ref} className={cn('relative', className)}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            disabled={disabled}
            className={cn(
              selectTriggerVariants({ size, variant, state }),
              'w-full justify-between',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            aria-expanded={open}
            aria-haspopup="listbox"
          >
            <span className="flex flex-wrap gap-1">
              {selectedLabels.length > 0 ? (
                selectedLabels.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded bg-primary/10 px-2 py-0.5 text-xs"
                  >
                    {label}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
              <div className="max-h-60 overflow-auto p-1">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      'flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm',
                      'hover:bg-accent hover:text-accent-foreground',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option.value)}
                      onChange={() => handleToggle(option.value)}
                      disabled={option.disabled}
                      className="mr-2"
                    />
                    {option.icon && (
                      <span className="mr-2 flex h-4 w-4 items-center justify-center">
                        {option.icon}
                      </span>
                    )}
                    {option.label}
                  </label>
                ))}
              </div>
              {maxSelected && (
                <div className="border-t px-2 py-1 text-xs text-muted-foreground">
                  {value.length}/{maxSelected} selected
                </div>
              )}
            </div>
          )}
        </div>
      </SelectContext.Provider>
    )
  }
)
MultiSelect.displayName = 'MultiSelect'

/* -------------------------------------------------------------------------- */
/*                                Custom Hooks                               */
/* -------------------------------------------------------------------------- */

// Hook for managing select state with validation
function useSelectState(
  initialValue?: string,
  options?: { required?: boolean; validator?: (value: string) => boolean }
) {
  const [value, setValue] = React.useState(initialValue || '')
  const [error, setError] = React.useState<string | null>(null)

  const handleChange = React.useCallback(
    (newValue: string) => {
      setValue(newValue)

      if (options?.required && !newValue) {
        setError('This field is required')
        return
      }

      if (options?.validator && !options.validator(newValue)) {
        setError('Invalid selection')
        return
      }

      setError(null)
    },
    [options]
  )

  return {
    value,
    setValue: handleChange,
    error,
    clearError: () => setError(null),
    isValid: !error && (!options?.required || !!value),
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                 */
/* -------------------------------------------------------------------------- */

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SearchableSelect,
  MultiSelect,
  useSelectState,
  useSelectContext,
  selectTriggerVariants,
  selectContentVariants,
}

// Export types
export type {
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SearchableSelectProps,
  MultiSelectProps,
}