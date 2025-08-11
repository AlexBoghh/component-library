'use client'

import React from 'react'
import { useTheme } from '@/lib/hooks/use-theme'
import { Button } from '@/components/ui/primitives/button'
import { Input } from '@/components/ui/primitives/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/primitives/dropdown-menu'
import { BrutalCard, BrutalButton, BrutalHeading } from '@/components/ui/neubrutalism'
import { Search, ChevronDown, Settings, User, LogOut, Menu } from 'lucide-react'

export default function BrutalismFixesTest() {
  const { setTheme } = useTheme()
  
  React.useEffect(() => {
    setTheme('brutalism')
  }, [setTheme])
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <BrutalHeading level={1}>Z-Index & Search Fixes Test</BrutalHeading>
        
        {/* Test 1: Search Input with Icon */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">SEARCH INPUT TEST</h2>
          <p className="text-sm text-muted-foreground">The search icon should not overlap the text</p>
          
          <div className="space-y-4">
            {/* Standard search pattern */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Type here - text should not be under icon"
                className="pl-10"
              />
            </div>
            
            {/* Alternative search pattern */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Another search field - should have proper padding"
                className="w-full"
              />
            </div>
          </div>
        </section>
        
        {/* Test 2: Dropdown Menus Z-Index */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">DROPDOWN MENU Z-INDEX TEST</h2>
          <p className="text-sm text-muted-foreground">Dropdowns should appear above all content</p>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Regular Dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full">
                    Regular Menu <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Brutal Button Dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <BrutalButton variant="primary">
                    Brutal Menu <ChevronDown className="ml-2 h-4 w-4" />
                  </BrutalButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" /> Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Menu with Icons */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                  <DropdownMenuItem>Option 3</DropdownMenuItem>
                  <DropdownMenuItem>Option 4</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>
        
        {/* Test 3: Cards with high shadows shouldn't block dropdowns */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">CARDS WITH DROPDOWNS</h2>
          <p className="text-sm text-muted-foreground">Dropdowns should appear above cards with shadows</p>
          
          <div className="grid grid-cols-2 gap-6">
            <BrutalCard color="white">
              <h3 className="font-black mb-4">Card with Dropdown</h3>
              <p className="mb-4">This card has a big shadow</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <BrutalButton variant="secondary" size="sm">
                    Open Menu
                  </BrutalButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>This menu</DropdownMenuItem>
                  <DropdownMenuItem>Should appear</DropdownMenuItem>
                  <DropdownMenuItem>Above the card</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BrutalCard>
            
            <BrutalCard color="yellow">
              <h3 className="font-black mb-4">Yellow Card</h3>
              <p className="mb-4">Another card with dropdown</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Test Dropdown</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Visible Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Visible Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Visible Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BrutalCard>
          </div>
        </section>
        
        {/* Test 4: Multiple overlapping elements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">OVERLAPPING ELEMENTS TEST</h2>
          <div className="relative">
            <div className="absolute top-0 right-0 p-4 bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10">
              <p className="font-bold mb-2">Floating Box</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Should be on top</DropdownMenuItem>
                  <DropdownMenuItem>Of everything</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="p-8 bg-purple-600 text-white border-4 border-black">
              <p className="font-bold">Background Content</p>
              <p>The dropdown from the floating box should appear above this</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}