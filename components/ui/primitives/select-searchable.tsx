'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  description?: string
  disabled?: boolean
  group?: string
}

interface SearchableSelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  disabled?: boolean
}

const SearchableSelect = React.forwardRef<
  HTMLButtonElement,
  SearchableSelectProps
>(({ 
  options, 
  value, 
  onValueChange, 
  placeholder = "Select an option", 
  searchPlaceholder = "Search...",
  className,
  disabled 
}, ref) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  const filteredOptions = React.useMemo(() => {
    if (!search) return options
    
    const searchLower = search.toLowerCase()
    return options.filter(option => 
      option.label.toLowerCase().includes(searchLower) ||
      option.description?.toLowerCase().includes(searchLower) ||
      option.group?.toLowerCase().includes(searchLower)
    )
  }, [options, search])

  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, SelectOption[]> = {}
    const ungrouped: SelectOption[] = []
    
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

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue)
    setOpen(false)
    setSearch("")
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange?.("")
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
            !selectedOption && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {selectedOption?.icon && React.isValidElement(selectedOption.icon) && (
              React.cloneElement(selectedOption.icon as React.ReactElement<any>, {
                className: cn("h-4 w-4 shrink-0", (selectedOption.icon as any).props?.className),
              })
            )}
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {selectedOption && !disabled && (
              <X 
                className="h-4 w-4 opacity-50 hover:opacity-100" 
                onClick={handleClear}
              />
            )}
            <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 data-[state=open]:rotate-180" />
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
              className="flex h-11 w-full rounded-md bg-transparent py-3 px-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
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
          
          <div className="max-h-[300px] overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No options found
              </div>
            ) : (
              <>
                {groupedOptions.ungrouped.length > 0 && (
                  <div className="py-1">
                    {groupedOptions.ungrouped.map(option => (
                      <SelectOption
                        key={option.value}
                        option={option}
                        isSelected={value === option.value}
                        onSelect={handleSelect}
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
                      <SelectOption
                        key={option.value}
                        option={option}
                        isSelected={value === option.value}
                        onSelect={handleSelect}
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
SearchableSelect.displayName = "SearchableSelect"

interface SelectOptionProps {
  option: SelectOption
  isSelected: boolean
  onSelect: (value: string) => void
}

const SelectOption: React.FC<SelectOptionProps> = ({ option, isSelected, onSelect }) => {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        option.disabled 
          ? "pointer-events-none opacity-50" 
          : "hover:bg-accent hover:text-accent-foreground cursor-pointer",
        isSelected && "bg-accent/50"
      )}
      onClick={() => !option.disabled && onSelect(option.value)}
    >
      <div className="flex items-center gap-2 flex-1">
        {option.icon && React.isValidElement(option.icon) && (
          React.cloneElement(option.icon as React.ReactElement<any>, {
            className: cn("h-4 w-4 shrink-0", (option.icon as any).props?.className),
          })
        )}
        <div className="flex flex-col">
          <span>{option.label}</span>
          {option.description && (
            <span className="text-xs text-muted-foreground">{option.description}</span>
          )}
        </div>
      </div>
      {isSelected && (
        <Check className="h-4 w-4 ml-auto" />
      )}
    </div>
  )
}

export { SearchableSelect, type SelectOption }