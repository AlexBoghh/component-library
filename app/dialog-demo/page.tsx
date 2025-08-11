'use client'

import React from 'react'
import { Button } from '@/components/ui/primitives/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/primitives/dialog-enhanced'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/primitives/drawer'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/primitives/alert-dialog'
import {
  CommandPalette,
  CommandPaletteTrigger,
  CommandPaletteDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  QuickActionsPreset,
  FileActionsPreset,
  DeveloperPreset,
} from '@/components/ui/primitives/command-palette'
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Key,
  Search,
  Home,
  FileText,
  Code,
  Package,
  Star,
  Command,
  Terminal
} from 'lucide-react'

export default function DialogDemoPage() {
  const [selectedCommand, setSelectedCommand] = React.useState<string>('')

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dialog System</h1>
        <p className="text-muted-foreground">
          Comprehensive dialog components including modals, drawers, alerts, and command palettes
        </p>
      </div>

      {/* Enhanced Dialog Variants */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Enhanced Dialog</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Dialogs with different sizes, animations, and overlay effects
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Size Variants */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Small Dialog</Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Small Dialog</DialogTitle>
                <DialogDescription>
                  This is a small dialog, perfect for quick confirmations.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Medium Dialog</Button>
            </DialogTrigger>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Medium Dialog</DialogTitle>
                <DialogDescription>
                  This is a medium-sized dialog with more content space.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm">
                  Medium dialogs are great for forms and moderate amounts of content.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Large Dialog</Button>
            </DialogTrigger>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Large Dialog</DialogTitle>
                <DialogDescription>
                  This is a large dialog for complex content and forms.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input className="w-full px-3 py-2 border rounded-md" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input className="w-full px-3 py-2 border rounded-md" placeholder="Doe" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Animation Variants */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Fade Animation</Button>
            </DialogTrigger>
            <DialogContent animation="fade">
              <DialogHeader>
                <DialogTitle>Fade Animation</DialogTitle>
                <DialogDescription>
                  This dialog fades in and out smoothly.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Zoom Animation</Button>
            </DialogTrigger>
            <DialogContent animation="zoom">
              <DialogHeader>
                <DialogTitle>Zoom Animation</DialogTitle>
                <DialogDescription>
                  This dialog zooms in and out with scale transform.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Slide Up</Button>
            </DialogTrigger>
            <DialogContent animation="slideUp">
              <DialogHeader>
                <DialogTitle>Slide Up Animation</DialogTitle>
                <DialogDescription>
                  This dialog slides up from the bottom.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Position Variants */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Top Position</Button>
            </DialogTrigger>
            <DialogContent position="top">
              <DialogHeader>
                <DialogTitle>Top Positioned</DialogTitle>
                <DialogDescription>
                  This dialog appears at the top of the viewport.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">No Blur Overlay</Button>
            </DialogTrigger>
            <DialogContent blur="none">
              <DialogHeader>
                <DialogTitle>No Blur Effect</DialogTitle>
                <DialogDescription>
                  This dialog has no backdrop blur effect.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Heavy Blur</Button>
            </DialogTrigger>
            <DialogContent blur="lg">
              <DialogHeader>
                <DialogTitle>Heavy Blur Effect</DialogTitle>
                <DialogDescription>
                  This dialog has a strong backdrop blur effect.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Drawer Variants */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Drawer Component</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Slide-out panels from different edges of the viewport
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Right Drawer</Button>
            </DrawerTrigger>
            <DrawerContent side="right" size="md">
              <DrawerHeader>
                <DrawerTitle>Account Settings</DrawerTitle>
                <DrawerDescription>
                  Manage your account settings and preferences.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent cursor-pointer">
                  <User className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Profile</p>
                    <p className="text-sm text-muted-foreground">Edit your profile information</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent cursor-pointer">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Billing</p>
                    <p className="text-sm text-muted-foreground">Manage payment methods</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent cursor-pointer">
                  <Bell className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">Configure notification preferences</p>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Left Drawer</Button>
            </DrawerTrigger>
            <DrawerContent side="left" size="sm" showHandle>
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
                <DrawerDescription>
                  Quick access to main sections
                </DrawerDescription>
              </DrawerHeader>
              <nav className="p-4 space-y-2">
                <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </a>
                <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </a>
              </nav>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Top Drawer</Button>
            </DrawerTrigger>
            <DrawerContent side="top" size="sm">
              <div className="p-4 text-center">
                <DrawerTitle>Announcement</DrawerTitle>
                <DrawerDescription className="mt-2">
                  New features have been added to your dashboard!
                </DrawerDescription>
              </div>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Bottom Drawer</Button>
            </DrawerTrigger>
            <DrawerContent side="bottom" size="md" showHandle>
              <DrawerHeader>
                <DrawerTitle>Cookie Preferences</DrawerTitle>
                <DrawerDescription>
                  Manage how we use cookies on this site
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-6 space-y-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Essential cookies</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Analytics cookies</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Marketing cookies</span>
                </label>
              </div>
              <DrawerFooter>
                <Button variant="outline">Reject All</Button>
                <Button>Accept Selected</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* Alert Dialog Variants */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Alert Dialog</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Interrupt user actions with important messages and confirmations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Default Alert</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Destructive Alert</Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="destructive">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account and all associated data. 
                  This action is irreversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Warning Alert
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="warning">
              <AlertDialogHeader>
                <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                <AlertDialogDescription>
                  You have unsaved changes. Are you sure you want to leave?
                  Your changes will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Stay</AlertDialogCancel>
                <AlertDialogAction className="bg-orange-500 hover:bg-orange-600">
                  Leave Without Saving
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                Success Alert
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="success">
              <AlertDialogHeader>
                <AlertDialogTitle>Payment Successful</AlertDialogTitle>
                <AlertDialogDescription>
                  Your payment has been processed successfully. 
                  You will receive a confirmation email shortly.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="bg-green-500 hover:bg-green-600">
                  Done
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                Info Alert
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="info">
              <AlertDialogHeader>
                <AlertDialogTitle>System Update</AlertDialogTitle>
                <AlertDialogDescription>
                  A new version is available. Would you like to update now?
                  The update will take approximately 5 minutes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Later</AlertDialogCancel>
                <AlertDialogAction className="bg-blue-500 hover:bg-blue-600">
                  Update Now
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">No Icon Alert</Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="info" showIcon={false}>
              <AlertDialogHeader>
                <AlertDialogTitle>Simple Alert</AlertDialogTitle>
                <AlertDialogDescription>
                  This is an alert without an icon for a cleaner look.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Got it</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* Command Palette */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Command Palette</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Quick command interface for power users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommandPalette>
            <CommandPaletteTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search commands... (⌘K)
              </Button>
            </CommandPaletteTrigger>
            <CommandPaletteDialog>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <QuickActionsPreset onSelect={setSelectedCommand} />
                <CommandSeparator />
                <FileActionsPreset onSelect={setSelectedCommand} />
                <CommandSeparator />
                <DeveloperPreset onSelect={setSelectedCommand} />
              </CommandList>
            </CommandPaletteDialog>
          </CommandPalette>

          <CommandPalette>
            <CommandPaletteTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Command className="mr-2 h-4 w-4" />
                Custom Command Palette
              </Button>
            </CommandPaletteTrigger>
            <CommandPaletteDialog>
              <CommandInput placeholder="What do you need?" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem
                    icon={<Shield className="h-4 w-4" />}
                    badge="Admin"
                    description="Manage user permissions"
                    onSelect={() => setSelectedCommand("security")}
                  >
                    Security Settings
                  </CommandItem>
                  <CommandItem
                    icon={<Key className="h-4 w-4" />}
                    shortcut="⌘S"
                    description="Generate new API keys"
                    onSelect={() => setSelectedCommand("api-keys")}
                  >
                    API Keys
                  </CommandItem>
                  <CommandItem
                    icon={<Terminal className="h-4 w-4" />}
                    shortcut="⌘`"
                    description="Open development console"
                    onSelect={() => setSelectedCommand("console")}
                  >
                    Developer Console
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandPaletteDialog>
          </CommandPalette>
        </div>

        {selectedCommand && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm">
              Last selected command: <code className="px-2 py-1 bg-background rounded">{selectedCommand}</code>
            </p>
          </div>
        )}
      </section>

      {/* Complex Dialog Example */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Complex Dialog Example</h2>
          <p className="text-sm text-muted-foreground mb-6">
            A full-featured settings dialog with multiple sections
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Open Settings
            </Button>
          </DialogTrigger>
          <DialogContent size="xl" className="max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Manage your application preferences and configuration
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-4 gap-6">
                <nav className="space-y-1">
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-accent">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Profile</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm font-medium">Notifications</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Privacy</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm font-medium">Billing</span>
                  </a>
                </nav>
                
                <div className="col-span-3 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First Name</label>
                          <input className="w-full px-3 py-2 border rounded-md" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Last Name</label>
                          <input className="w-full px-3 py-2 border rounded-md" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input className="w-full px-3 py-2 border rounded-md" defaultValue="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <textarea className="w-full px-3 py-2 border rounded-md" rows={3} 
                          placeholder="Tell us about yourself..." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}