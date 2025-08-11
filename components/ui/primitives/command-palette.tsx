'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search, ChevronRight, FileText, Settings, User, Home, Command, Code, Package, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from './visually-hidden'

const CommandPalette = DialogPrimitive.Root

const CommandPaletteTrigger = DialogPrimitive.Trigger

const CommandPaletteDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-20%] gap-4 overflow-hidden rounded-lg bg-popover p-0 shadow-2xl",
        "data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide",
        className
      )}
      {...props}
    >
      <VisuallyHidden>
        <DialogPrimitive.Title>Command Palette</DialogPrimitive.Title>
      </VisuallyHidden>
      <CommandPrimitive className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        {children}
      </CommandPrimitive>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
CommandPaletteDialog.displayName = "CommandPaletteDialog"

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  icon?: React.ReactNode
  shortcut?: string
  badge?: string
  description?: string
}

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, icon, shortcut, badge, description, children, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {icon && (
      <span className="mr-2 h-4 w-4 shrink-0">
        {icon}
      </span>
    )}
    <div className="flex flex-1 flex-col">
      <div className="flex items-center">
        <span className="flex-1">{children}</span>
        {badge && (
          <span className="ml-2 rounded-md bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {badge}
          </span>
        )}
      </div>
      {description && (
        <span className="text-xs text-muted-foreground">{description}</span>
      )}
    </div>
    {shortcut && (
      <span className="ml-auto text-xs tracking-widest text-muted-foreground">
        {shortcut}
      </span>
    )}
  </CommandPrimitive.Item>
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

// Example preset command groups for common use cases
interface CommandPalettePresetProps {
  onSelect?: (value: string) => void
}

const QuickActionsPreset: React.FC<CommandPalettePresetProps> = ({ onSelect }) => (
  <>
    <CommandGroup heading="Quick Actions">
      <CommandItem
        icon={<Home className="h-4 w-4" />}
        shortcut="⌘H"
        onSelect={() => onSelect?.("home")}
      >
        Go to Home
      </CommandItem>
      <CommandItem
        icon={<User className="h-4 w-4" />}
        shortcut="⌘P"
        onSelect={() => onSelect?.("profile")}
      >
        Open Profile
      </CommandItem>
      <CommandItem
        icon={<Settings className="h-4 w-4" />}
        shortcut="⌘,"
        onSelect={() => onSelect?.("settings")}
      >
        Settings
      </CommandItem>
    </CommandGroup>
  </>
)

const FileActionsPreset: React.FC<CommandPalettePresetProps> = ({ onSelect }) => (
  <>
    <CommandGroup heading="Files">
      <CommandItem
        icon={<FileText className="h-4 w-4" />}
        badge="New"
        onSelect={() => onSelect?.("new-file")}
      >
        Create New File
      </CommandItem>
      <CommandItem
        icon={<Search className="h-4 w-4" />}
        onSelect={() => onSelect?.("search-files")}
      >
        Search Files
      </CommandItem>
      <CommandItem
        icon={<Star className="h-4 w-4" />}
        onSelect={() => onSelect?.("recent-files")}
      >
        Recent Files
      </CommandItem>
    </CommandGroup>
  </>
)

const DeveloperPreset: React.FC<CommandPalettePresetProps> = ({ onSelect }) => (
  <>
    <CommandGroup heading="Developer">
      <CommandItem
        icon={<Code className="h-4 w-4" />}
        shortcut="⌘K"
        description="Open code editor"
        onSelect={() => onSelect?.("code-editor")}
      >
        Code Editor
      </CommandItem>
      <CommandItem
        icon={<Command className="h-4 w-4" />}
        shortcut="⌘T"
        description="Open terminal"
        onSelect={() => onSelect?.("terminal")}
      >
        Terminal
      </CommandItem>
      <CommandItem
        icon={<Package className="h-4 w-4" />}
        description="Manage packages"
        onSelect={() => onSelect?.("packages")}
      >
        Package Manager
      </CommandItem>
    </CommandGroup>
  </>
)

export {
  CommandPalette,
  CommandPaletteTrigger,
  CommandPaletteDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
  QuickActionsPreset,
  FileActionsPreset,
  DeveloperPreset,
}