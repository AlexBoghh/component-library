'use client'

import { Button } from '@/components/ui/primitives/button'
import { Card } from '@/components/ui/primitives/card'
import { Input } from '@/components/ui/primitives/input'
import { Badge } from '@/components/ui/primitives/badge'
import { useTheme } from '@/lib/hooks/use-theme'
import { Square, Zap, Palette } from 'lucide-react'

export default function BrutalismDemoPage() {
  const { themeId, setTheme } = useTheme()
  
  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase mb-4">
          Brutalism Theme Demo
        </h1>
        
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={() => setTheme('default')}
            variant={themeId === 'default' ? 'default' : 'outline'}
          >
            <Palette className="w-4 h-4 mr-2" />
            Default
          </Button>
          <Button 
            onClick={() => setTheme('cyberpunk')}
            variant={themeId === 'cyberpunk' ? 'default' : 'outline'}
          >
            <Zap className="w-4 h-4 mr-2" />
            Cyberpunk
          </Button>
          <Button 
            onClick={() => setTheme('brutalism')}
            variant={themeId === 'brutalism' ? 'default' : 'outline'}
          >
            <Square className="w-4 h-4 mr-2" />
            Brutalism
          </Button>
        </div>
        
        <div className="text-sm mb-8 p-4 border-2 border-border">
          Current Theme: <strong>{themeId}</strong>
          <br />
          Theme Attribute: <strong>{typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') || 'none' : 'N/A'}</strong>
        </div>
        
        {/* Brutalism Elements */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">BRUTAL CARD</h2>
            <p className="mb-4">This is a brutalist card with harsh shadows and no rounded corners.</p>
            <div className="flex gap-4">
              <Button>ACTION</Button>
              <Button variant="outline">CANCEL</Button>
            </div>
          </Card>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border-4 border-black bg-yellow-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-xl">YELLOW</h3>
              <p className="font-bold">Primary</p>
            </div>
            <div className="p-4 border-4 border-black bg-purple-600 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-xl">PURPLE</h3>
              <p className="font-bold">Accent</p>
            </div>
            <div className="p-4 border-4 border-black bg-cyan-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-xl">CYAN</h3>
              <p className="font-bold">Info</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Input placeholder="BRUTAL INPUT" className="border-4" />
            <div className="flex gap-2">
              <Badge>BADGE 1</Badge>
              <Badge>BADGE 2</Badge>
              <Badge>BADGE 3</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-yellow-400 to-yellow-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black mb-2">GRADIENT BOX</h2>
              <p className="font-bold">Neubrutalism style with gradients</p>
            </div>
            <div className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black mb-2">WHITE BOX</h2>
              <p className="font-bold">Clean contrast with harsh shadows</p>
            </div>
          </div>
          
          <div className="p-8 bg-black text-white">
            <h2 className="text-3xl font-black mb-4">NEUBRUTALISM</h2>
            <p className="text-xl font-bold">Bold • Playful • Unapologetic</p>
            <div className="flex gap-4 mt-4">
              <span className="px-4 py-2 bg-yellow-500 text-black font-black">YELLOW</span>
              <span className="px-4 py-2 bg-purple-600 font-black">PURPLE</span>
              <span className="px-4 py-2 bg-cyan-500 text-black font-black">CYAN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}