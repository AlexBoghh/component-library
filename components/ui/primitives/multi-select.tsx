'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronDown, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface MultiSelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  group?: string
  disabled?: boolean
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  disabled?: boolean
  maxItems?: number
  maxDisplay?: number
}

const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(({ 
  options, 
  value = [], 
  onValueChange, 
  placeholder = "Select options", 
  searchPlaceholder = "Search...",
  className,
  disabled,
  maxItems,
  maxDisplay = 3
}, ref) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selectedOptions = options.filter(opt => value.includes(opt.value))

  const filteredOptions = React.useMemo(() => {
    if (!search) return options
    
    const searchLower = search.toLowerCase()
    return options.filter(option => 
      option.label.toLowerCase().includes(searchLower) ||
      option.group?.toLowerCase().includes(searchLower)
    )
  }, [options, search])

  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, MultiSelectOption[]> = {}
    const ungrouped: MultiSelectOption[] = []
    
    filteredOptions.forEach(option => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = []
        }
        groups[option.group].push(option)
      } else {
        ungrouped.push(option)
      }
    })
    
    return { groups, ungrouped }
  }, [filteredOptions])

  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : maxItems && value.length >= maxItems
        ? value
        : [...value, optionValue]
    
    onValueChange?.(newValue)
  }

  const handleRemove = (optionValue: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    onValueChange?.(value.filter(v => v !== optionValue))
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange?.([])
  }

  const handleSelectAll = () => {
    const allValues = filteredOptions
      .filter(opt => !opt.disabled)
      .map(opt => opt.value)
      .slice(0, maxItems)
    onValueChange?.(allValues)
  }

  const displayValue = () => {
    if (selectedOptions.length === 0) return placeholder
    if (selectedOptions.length <= maxDisplay) {
      return selectedOptions.map(opt => opt.label).join(", ")
    }
    return `${selectedOptions.slice(0, maxDisplay).map(opt => opt.label).join(", ")} +${selectedOptions.length - maxDisplay}`
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal hover:bg-accent/50",
            selectedOptions.length === 0 && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate text-left flex-1">
            {displayValue()}
          </span>
          <div className="flex items-center gap-1">
            {selectedOptions.length > 0 && !disabled && (
              <div className="flex items-center gap-1">
                <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                  {selectedOptions.length}
                </span>
                <X 
                  className="h-4 w-4 opacity-50 hover:opacity-100" 
                  onClick={handleClear}
                />
              </div>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="z-50 w-[var(--radix-popover-trigger-width)] p-0 rounded-lg border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-slide-in-from-top data-[state=closed]:animate-slide-out-to-top"
          align="start"
          sideOffset={4}
        >
          <div className="flex items-center border-b px-3">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              className="flex h-11 w-full rounded-md bg-transparent py-3 px-3 text-sm outline-none placeholder:text-muted-foreground"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X 
                className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100 cursor-pointer" 
                onClick={() => setSearch("")}
              />
            )}
          </div>

          {selectedOptions.length > 0 && (
            <div className="border-b p-2">
              <div className="flex flex-wrap gap-1">
                {selectedOptions.slice(0, 5).map(option => (
                  <span
                    key={option.value}
                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  >
                    {option.icon && React.isValidElement(option.icon) && (
                      React.cloneElement(option.icon as React.ReactElement<any>, {
                        className: cn("h-3 w-3", (option.icon as any).props?.className),
                      })
                    )}
                    {option.label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:opacity-70"
                      onClick={(e) => handleRemove(option.value, e)}
                    />
                  </span>
                ))}
                {selectedOptions.length > 5 && (
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs">
                    +{selectedOptions.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-xs text-muted-foreground">
              {value.length} selected
              {maxItems && ` / ${maxItems} max`}
            </span>
            <div className="flex gap-2">
              <button
                className="text-xs text-primary hover:underline"
                onClick={handleSelectAll}
              >
                Select all
              </button>
              <button
                className="text-xs text-primary hover:underline"
                onClick={() => onValueChange?.([])}
              >
                Clear all
              </button>
            </div>
          </div>
          
          <div className="max-h-[250px] overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No options found
              </div>
            ) : (
              <>
                {groupedOptions.ungrouped.length > 0 && (
                  <div className="py-1">
                    {groupedOptions.ungrouped.map(option => (
                      <MultiSelectOption
                        key={option.value}
                        option={option}
                        isSelected={value.includes(option.value)}
                        onToggle={handleToggle}
                        disabled={!value.includes(option.value) && maxItems !== undefined && value.length >= maxItems}
                      />
                    ))}
                  </div>
                )}
                
                {Object.entries(groupedOptions.groups).map(([group, groupOptions]) => (
                  <div key={group}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      {group}
                    </div>
                    {groupOptions.map(option => (
                      <MultiSelectOption
                        key={option.value}
                        option={option}
                        isSelected={value.includes(option.value)}
                        onToggle={handleToggle}
                        disabled={!value.includes(option.value) && maxItems !== undefined && value.length >= maxItems}
                      />
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
})
MultiSelect.displayName = "MultiSelect"

interface MultiSelectOptionProps {
  option: MultiSelectOption
  isSelected: boolean
  onToggle: (value: string) => void
  disabled?: boolean
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ 
  option, 
  isSelected, 
  onToggle,
  disabled 
}) => {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        (option.disabled || disabled)
          ? "pointer-events-none opacity-50" 
          : "hover:bg-accent hover:text-accent-foreground cursor-pointer",
        isSelected && "bg-accent/50"
      )}
      onClick={() => !option.disabled && !disabled && onToggle(option.value)}
    >
      <div className="flex items-center gap-2 flex-1">
        <div className={cn(
          "h-4 w-4 rounded border flex items-center justify-center",
          isSelected ? "bg-primary border-primary" : "border-input"
        )}>
          {isSelected && (
            <Check className="h-3 w-3 text-primary-foreground" />
          )}
        </div>
        {option.icon && React.isValidElement(option.icon) && (
          React.cloneElement(option.icon as React.ReactElement<any>, {
            className: cn("h-4 w-4 shrink-0", (option.icon as any).props?.className),
          })
        )}
        <span>{option.label}</span>
      </div>
    </div>
  )
}

export { MultiSelect, type MultiSelectOption }