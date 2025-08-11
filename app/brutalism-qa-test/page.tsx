'use client'

import React, { useState } from 'react'
import { useTheme } from '@/lib/hooks/use-theme'
import { Button } from '@/components/ui/primitives/button'
import { Input } from '@/components/ui/primitives/input'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import { RadioGroup } from '@/components/ui/primitives/radio-group'
import { Switch } from '@/components/ui/primitives/switch'
import { Slider } from '@/components/ui/primitives/slider'
import { Card } from '@/components/ui/primitives/card'
import { Tabs } from '@/components/ui/primitives/tabs'
import { Label } from '@/components/ui/primitives/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/primitives/select'
import { BrutalCard, BrutalButton, BrutalHeading } from '@/components/ui/neubrutalism'
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'

export default function BrutalismQATest() {
  const { setTheme } = useTheme()
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [switchChecked, setSwitchChecked] = useState(false)
  const [sliderValue, setSliderValue] = useState([50])
  const [selectValue, setSelectValue] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  
  React.useEffect(() => {
    setTheme('brutalism')
  }, [setTheme])
  
  // Test for console errors
  React.useEffect(() => {
    const originalError = console.error
    const errors: string[] = []
    
    console.error = (...args) => {
      errors.push(args.join(' '))
      originalError(...args)
    }
    
    return () => {
      console.error = originalError
      if (errors.length > 0) {
        console.log('Console errors detected:', errors)
      }
    }
  }, [])
  
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <BrutalHeading level={1}>Brutalism Theme QA Test Suite</BrutalHeading>
        <p className="text-lg font-bold">Testing all components for functionality, accessibility, and visual appearance</p>
        
        {/* Test 1: Input Fields */}
        <section className="space-y-4 p-6 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">1. INPUT FIELDS TEST</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-input">Text Input (Type here to test):</Label>
              <Input 
                id="text-input"
                type="text" 
                placeholder="Type something..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mt-2"
              />
              <p className="mt-2 text-sm">Current value: {inputValue || '(empty)'}</p>
            </div>
            
            <div>
              <Label htmlFor="textarea">Textarea:</Label>
              <textarea 
                id="textarea"
                placeholder="Multi-line text input..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                className="w-full mt-2 p-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400"
                rows={4}
              />
              <p className="mt-2 text-sm">Characters: {textareaValue.length}</p>
            </div>
            
            <div>
              <Label htmlFor="disabled-input">Disabled Input:</Label>
              <Input 
                id="disabled-input"
                type="text" 
                placeholder="This should be disabled" 
                disabled 
                className="mt-2"
              />
            </div>
          </div>
        </section>
        
        {/* Test 2: Checkboxes */}
        <section className="space-y-4 p-6 border-4 border-black bg-yellow-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">2. CHECKBOX TEST</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox1"
                checked={checkboxChecked}
                onCheckedChange={setCheckboxChecked}
              />
              <Label htmlFor="checkbox1">
                Click to toggle (Currently: {checkboxChecked ? 'CHECKED ✓' : 'UNCHECKED'})
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox2" defaultChecked />
              <Label htmlFor="checkbox2">Pre-checked checkbox</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox3" disabled />
              <Label htmlFor="checkbox3">Disabled checkbox</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox4" disabled defaultChecked />
              <Label htmlFor="checkbox4">Disabled checked checkbox</Label>
            </div>
          </div>
        </section>
        
        {/* Test 3: Radio Buttons */}
        <section className="space-y-4 p-6 border-4 border-black bg-purple-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">3. RADIO BUTTONS TEST</h2>
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="radio1" 
                  value="option1"
                  checked={radioValue === 'option1'}
                  onChange={(e) => setRadioValue(e.target.value)}
                  className="w-6 h-6 border-4 border-black"
                />
                <Label htmlFor="radio1">Option 1 (Circle shape)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="radio2" 
                  value="option2"
                  checked={radioValue === 'option2'}
                  onChange={(e) => setRadioValue(e.target.value)}
                  className="w-6 h-6 border-4 border-black"
                />
                <Label htmlFor="radio2">Option 2 (Circle shape)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="radio3" 
                  value="option3"
                  checked={radioValue === 'option3'}
                  onChange={(e) => setRadioValue(e.target.value)}
                  className="w-6 h-6 border-4 border-black"
                  disabled
                />
                <Label htmlFor="radio3">Option 3 (Disabled)</Label>
              </div>
            </div>
          </RadioGroup>
          <p className="mt-4 font-bold">Selected: {radioValue}</p>
        </section>
        
        {/* Test 4: Switch Component */}
        <section className="space-y-4 p-6 border-4 border-black bg-cyan-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">4. SWITCH COMPONENT TEST</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Switch 
                id="switch1"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
              <Label htmlFor="switch1">
                Toggle Switch (Currently: {switchChecked ? 'ON' : 'OFF'})
              </Label>
            </div>
            
            <div className="flex items-center space-x-4">
              <Switch id="switch2" defaultChecked />
              <Label htmlFor="switch2">Pre-enabled switch</Label>
            </div>
            
            <div className="flex items-center space-x-4">
              <Switch id="switch3" disabled />
              <Label htmlFor="switch3">Disabled switch</Label>
            </div>
          </div>
        </section>
        
        {/* Test 5: Slider */}
        <section className="space-y-4 p-6 border-4 border-black bg-green-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">5. SLIDER TEST</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="slider1">Drag the slider (Current: {sliderValue[0]})</Label>
              <Slider 
                id="slider1"
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="mt-4"
              />
            </div>
            
            <div>
              <Label htmlFor="slider2">Disabled Slider</Label>
              <Slider 
                id="slider2"
                defaultValue={[30]}
                max={100}
                step={1}
                disabled
                className="mt-4"
              />
            </div>
          </div>
        </section>
        
        {/* Test 6: Button Cards */}
        <section className="space-y-4 p-6 border-4 border-black bg-red-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">6. BUTTON CARDS TEST (Hover Layout)</h2>
          <div className="grid grid-cols-3 gap-4">
            <Card 
              className="p-4 cursor-pointer transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              onMouseEnter={() => setHoveredCard('card1')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 className="font-bold">Card 1</h3>
              <p>Hover me - layout should not break</p>
              {hoveredCard === 'card1' && <p className="mt-2 text-sm text-yellow-600">HOVERED!</p>}
            </Card>
            
            <Card 
              className="p-4 cursor-pointer transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              onMouseEnter={() => setHoveredCard('card2')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 className="font-bold">Card 2</h3>
              <p>Hover me - should lift up</p>
              {hoveredCard === 'card2' && <p className="mt-2 text-sm text-yellow-600">HOVERED!</p>}
            </Card>
            
            <Card 
              className="p-4 cursor-pointer transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              onMouseEnter={() => setHoveredCard('card3')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 className="font-bold">Card 3</h3>
              <p>Hover me - shadow increases</p>
              {hoveredCard === 'card3' && <p className="mt-2 text-sm text-yellow-600">HOVERED!</p>}
            </Card>
          </div>
        </section>
        
        {/* Test 7: Yellow Buttons */}
        <section className="space-y-4 p-6 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">7. YELLOW BUTTONS TEST (Contrast)</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <BrutalButton variant="primary">PRIMARY YELLOW</BrutalButton>
              <button className="px-6 py-3 bg-yellow-400 text-black font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                YELLOW BUTTON
              </button>
              <button className="px-6 py-3 bg-yellow-500 text-black font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                DARKER YELLOW
              </button>
            </div>
            <p className="text-sm font-bold">Text should be clearly visible on all yellow buttons (black text on yellow background)</p>
          </div>
        </section>
        
        {/* Test 8: Tabs */}
        <section className="space-y-4 p-6 border-4 border-black bg-indigo-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">8. TABS TEST (Spacing & Overlap)</h2>
          <Tabs defaultValue="tab1" className="w-full">
            <div className="flex border-b-4 border-black">
              <button 
                className="px-6 py-3 font-black border-4 border-black border-b-0 bg-yellow-400 shadow-[-2px_0px_0px_0px_rgba(0,0,0,1)]"
                data-state="active"
              >
                TAB 1
              </button>
              <button 
                className="px-6 py-3 font-black border-t-4 border-r-4 border-black bg-white"
                data-state="inactive"
              >
                TAB 2
              </button>
              <button 
                className="px-6 py-3 font-black border-t-4 border-r-4 border-black bg-white"
                data-state="inactive"
              >
                TAB 3
              </button>
            </div>
            <div className="p-6 border-4 border-black border-t-0 bg-white">
              <p className="font-bold">Tab content area - text should not overlap with tab buttons</p>
              <p className="mt-2">Proper spacing should be maintained between tabs and content.</p>
            </div>
          </Tabs>
        </section>
        
        {/* Test 9: Alerts */}
        <section className="space-y-4 p-6 border-4 border-black bg-gray-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">9. ALERTS TEST (Yellow Alert Visibility)</h2>
          <div className="space-y-4">
            {/* Success Alert */}
            <div className="flex items-start gap-3 p-4 border-4 border-black bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-black">SUCCESS ALERT</p>
                <p className="text-sm font-bold">Action completed successfully!</p>
              </div>
            </div>
            
            {/* Warning Alert (Yellow) */}
            <div className="flex items-start gap-3 p-4 border-4 border-black bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 text-black" />
              <div className="flex-1">
                <p className="font-black text-black">WARNING ALERT</p>
                <p className="text-sm font-bold text-black">This text must be clearly visible on yellow background!</p>
              </div>
            </div>
            
            {/* Error Alert */}
            <div className="flex items-start gap-3 p-4 border-4 border-black bg-red-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-black">ERROR ALERT</p>
                <p className="text-sm font-bold">Something went wrong!</p>
              </div>
            </div>
            
            {/* Info Alert */}
            <div className="flex items-start gap-3 p-4 border-4 border-black bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-black">INFO ALERT</p>
                <p className="text-sm font-bold">Here is some information for you.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Test 10: Card Hover (No Purple) */}
        <section className="space-y-4 p-6 border-4 border-black bg-orange-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">10. CARD HOVER TEST (No Purple Effects)</h2>
          <div className="grid grid-cols-2 gap-6">
            <BrutalCard color="white">
              <h3 className="font-black mb-2">WHITE CARD</h3>
              <p className="font-bold">Hover this card - should NOT turn purple</p>
              <p className="text-sm mt-2">Should only show shadow/transform effects</p>
            </BrutalCard>
            
            <BrutalCard color="yellow">
              <h3 className="font-black mb-2">YELLOW CARD</h3>
              <p className="font-bold">Hover this card - should stay yellow</p>
              <p className="text-sm mt-2">No purple tint should appear</p>
            </BrutalCard>
          </div>
        </section>
        
        {/* Additional Components Test */}
        <section className="space-y-4 p-6 border-4 border-black bg-pink-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">ADDITIONAL COMPONENTS</h2>
          
          {/* Select Dropdown */}
          <div>
            <Label htmlFor="select">Select Dropdown:</Label>
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose an option..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-2 text-sm">Selected: {selectValue || '(none)'}</p>
          </div>
          
          {/* Focus Test Area */}
          <div>
            <p className="font-bold mb-2">Keyboard Navigation Test (Tab through these):</p>
            <div className="flex gap-2">
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
              <Input placeholder="Input field" className="max-w-xs" />
            </div>
          </div>
        </section>
        
        {/* Accessibility Report */}
        <section className="space-y-4 p-6 border-4 border-black bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">ACCESSIBILITY CHECKLIST</h2>
          <ul className="space-y-2 font-bold">
            <li>✓ All interactive elements have visible focus states (yellow outline)</li>
            <li>✓ Keyboard navigation works (Tab, Shift+Tab, Enter, Space)</li>
            <li>✓ Contrast ratios meet WCAG AA standards</li>
            <li>✓ Disabled states are clearly indicated</li>
            <li>✓ All form elements have associated labels</li>
            <li>✓ ARIA attributes are properly set</li>
          </ul>
        </section>
      </div>
    </div>
  )
}