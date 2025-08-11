'use client'

import { Button } from '@/components/ui/primitives/button'
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Loader2,
  ChevronRight,
  Github
} from 'lucide-react'
import { useState } from 'react'

export function ButtonShowcase() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadingClick = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Button Component</h2>
        <p className="text-muted-foreground mb-6">
          A versatile button component with multiple variants, sizes, and states.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">With Icons</h3>
          <div className="flex flex-wrap gap-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Login with Email
            </Button>
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button onClick={handleLoadingClick} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Loading...' : 'Click to Load'}
            </Button>
            <Button variant="secondary" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">As Child (Polymorphic)</h3>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Link Button
              </a>
            </Button>
            <Button variant="outline" asChild>
              <span>Span Button</span>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Button Group</h3>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Button variant="outline" className="rounded-r-none">
              Previous
            </Button>
            <Button variant="outline" className="rounded-none border-l-0">
              Current
            </Button>
            <Button variant="outline" className="rounded-l-none border-l-0">
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}