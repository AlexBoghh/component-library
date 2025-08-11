'use client'

import { getThemeList } from '@/lib/themes'
import { useTheme } from '@/lib/hooks/use-theme'

export default function TestThemesPage() {
  const themes = getThemeList()
  const { themeId, setTheme } = useTheme()
  
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Theme Test Page</h1>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Current Theme: {themeId}</h2>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Available Themes ({themes.length}):</h2>
        <div className="space-y-2">
          {themes.map(theme => (
            <div key={theme.id} className="flex items-center gap-4">
              <button 
                onClick={() => setTheme(theme.id)}
                className={`px-4 py-2 border-2 ${themeId === theme.id ? 'border-primary bg-primary/10' : 'border-border'}`}
              >
                {theme.name} (ID: {theme.id})
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Theme Data Attributes:</h2>
        <pre className="p-4 bg-muted rounded">
          data-theme: {typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : 'N/A'}
        </pre>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Theme Test Elements:</h2>
        
        <div className="p-4 border-4 border-black">
          <p>This should have a thick black border in brutalism theme</p>
        </div>
        
        <button className="px-6 py-3 bg-primary text-primary-foreground">
          Test Button
        </button>
        
        <div className="p-4 bg-yellow-500 text-black font-black uppercase">
          Brutalism Test (should be visible in brutalism theme)
        </div>
      </div>
    </div>
  )
}