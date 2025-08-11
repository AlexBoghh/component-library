'use client'

import React from 'react'
import { Button } from '@/components/ui/primitives/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives/card'
import { Input } from '@/components/ui/primitives/input'
import { Label } from '@/components/ui/primitives/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/primitives/select'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import { Switch } from '@/components/ui/primitives/switch'
import { useTheme } from '@/lib/hooks/use-theme'

export default function BrutalismTestPage() {
  const { setTheme } = useTheme()
  const [clickCount, setClickCount] = React.useState(0)
  const [inputValue, setInputValue] = React.useState('')
  const [selectValue, setSelectValue] = React.useState('')
  const [checkboxChecked, setCheckboxChecked] = React.useState(false)
  const [switchChecked, setSwitchChecked] = React.useState(false)

  React.useEffect(() => {
    // Force brutalism theme on mount
    setTheme('brutalism' as any)
  }, [setTheme])

  return (
    <div className="min-h-screen bg-background p-8" data-theme="brutalism">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-4 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="font-black uppercase text-2xl">Brutalism Interactivity Test</CardTitle>
            <CardDescription className="font-bold text-muted-foreground">
              Testing all interactive components in brutalism theme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Button Test */}
            <div className="space-y-3">
              <Label className="font-black uppercase">Button Test (Click Count: {clickCount})</Label>
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setClickCount(c => c + 1)
                    console.log('Button clicked! Count:', clickCount + 1)
                  }}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  CLICK ME
                </Button>
                <Button 
                  onClick={() => {
                    setClickCount(0)
                    console.log('Reset clicked!')
                  }}
                  className="bg-red-500 hover:bg-red-400 text-white font-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  RESET
                </Button>
              </div>
              {clickCount > 0 && (
                <p className="font-bold text-green-600">
                  Button is working! Clicked {clickCount} time{clickCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Input Test */}
            <div className="space-y-3">
              <Label className="font-black uppercase">Input Test</Label>
              <Input 
                placeholder="TYPE HERE TO TEST"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  console.log('Input changed:', e.target.value)
                }}
                className="font-bold bg-card border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
              {inputValue && (
                <p className="font-bold text-green-600">
                  Input is working! Value: "{inputValue}"
                </p>
              )}
            </div>

            {/* Select Test */}
            <div className="space-y-3">
              <Label className="font-black uppercase">Select Test</Label>
              <Select value={selectValue} onValueChange={(value) => {
                setSelectValue(value)
                console.log('Select changed:', value)
              }}>
                <SelectTrigger className="font-bold border-4 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <SelectValue placeholder="PICK ONE" />
                </SelectTrigger>
                <SelectContent className="border-4 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <SelectItem value="option1" className="font-bold">OPTION ONE</SelectItem>
                  <SelectItem value="option2" className="font-bold">OPTION TWO</SelectItem>
                  <SelectItem value="option3" className="font-bold">OPTION THREE</SelectItem>
                </SelectContent>
              </Select>
              {selectValue && (
                <p className="font-bold text-green-600">
                  Select is working! Selected: {selectValue}
                </p>
              )}
            </div>

            {/* Checkbox Test */}
            <div className="space-y-3">
              <Label className="font-black uppercase">Checkbox Test</Label>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  checked={checkboxChecked}
                  onCheckedChange={(checked) => {
                    setCheckboxChecked(checked as boolean)
                    console.log('Checkbox changed:', checked)
                  }}
                  className="h-6 w-6 border-3 border-black rounded-none data-[state=checked]:bg-yellow-400"
                />
                <Label className="font-black uppercase cursor-pointer">
                  CHECK ME ({checkboxChecked ? 'CHECKED' : 'UNCHECKED'})
                </Label>
              </div>
              {checkboxChecked && (
                <p className="font-bold text-green-600">
                  Checkbox is working! State: CHECKED
                </p>
              )}
            </div>

            {/* Switch Test */}
            <div className="space-y-3">
              <Label className="font-black uppercase">Switch Test</Label>
              <div className="flex items-center space-x-3">
                <Switch 
                  checked={switchChecked}
                  onCheckedChange={(checked) => {
                    setSwitchChecked(checked)
                    console.log('Switch changed:', checked)
                  }}
                  className="h-7 w-12 data-[state=checked]:bg-yellow-400 border-2 border-black rounded-none"
                />
                <Label className="font-black uppercase">
                  TOGGLE ({switchChecked ? 'ON' : 'OFF'})
                </Label>
              </div>
              {switchChecked && (
                <p className="font-bold text-green-600">
                  Switch is working! State: ON
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="mt-8 p-4 bg-yellow-400 border-4 border-black">
              <h3 className="font-black uppercase text-lg mb-2">Test Summary</h3>
              <ul className="space-y-1 font-bold">
                <li>• Button Clicks: {clickCount}</li>
                <li>• Input Value: {inputValue || '(empty)'}</li>
                <li>• Selected: {selectValue || '(none)'}</li>
                <li>• Checkbox: {checkboxChecked ? 'CHECKED' : 'UNCHECKED'}</li>
                <li>• Switch: {switchChecked ? 'ON' : 'OFF'}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="font-black uppercase">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 font-bold">
              <li>1. Click the buttons - they should increment/reset the counter</li>
              <li>2. Type in the input field - text should appear</li>
              <li>3. Select an option from the dropdown - selection should work</li>
              <li>4. Toggle the checkbox - state should change</li>
              <li>5. Toggle the switch - state should change</li>
            </ol>
            <p className="mt-4 font-bold text-green-600">
              If all components respond to interactions, the brutalism theme is working correctly!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}