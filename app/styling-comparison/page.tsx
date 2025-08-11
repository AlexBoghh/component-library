'use client'

import React from 'react'
import { Button } from '@/components/ui/primitives/button'
import { 
  Code, 
  Palette, 
  FileCode,
  Sparkles,
  Layers,
  Zap,
  Package,
  GitBranch,
  CheckCircle,
  XCircle
} from 'lucide-react'

// Import all dialog variants
import {
  DialogTailwind,
  DialogTailwindTrigger,
  DialogTailwindContent,
  DialogTailwindHeader,
  DialogTailwindFooter,
  DialogTailwindTitle,
  DialogTailwindDescription,
} from '@/components/ui/dialog-styles/dialog-tailwind'

import {
  DialogCSSModules,
  DialogCSSModulesTrigger,
  DialogCSSModulesContent,
  DialogCSSModulesHeader,
  DialogCSSModulesFooter,
  DialogCSSModulesTitle,
  DialogCSSModulesDescription,
  cssModulesButtonStyles,
} from '@/components/ui/dialog-styles/dialog-css-modules'

import {
  DialogInlineStyles,
  DialogInlineStylesTrigger,
  DialogInlineStylesContent,
  DialogInlineStylesHeader,
  DialogInlineStylesFooter,
  DialogInlineStylesTitle,
  DialogInlineStylesDescription,
  InlineStyleButton,
} from '@/components/ui/dialog-styles/dialog-inline-styles'

import {
  DialogEmotion,
  DialogEmotionTrigger,
  DialogEmotionContent,
  DialogEmotionHeader,
  DialogEmotionFooter,
  DialogEmotionTitle,
  DialogEmotionDescription,
  EmotionButton,
} from '@/components/ui/dialog-styles/dialog-emotion'

interface StylingMethod {
  id: string
  name: string
  description: string
  icon: React.ElementType
  pros: string[]
  cons: string[]
  bundleSize: string
  performance: 'Excellent' | 'Good' | 'Fair'
  color: string
}

const stylingMethods: StylingMethod[] = [
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework with predefined classes',
    icon: Palette,
    pros: [
      'Rapid development with utility classes',
      'Consistent design system',
      'Excellent IDE support',
      'Small production bundle with PurgeCSS',
      'Great documentation',
    ],
    cons: [
      'Learning curve for class names',
      'Can lead to long class strings',
      'Limited dynamic styling',
    ],
    bundleSize: '~10KB (with PurgeCSS)',
    performance: 'Excellent',
    color: 'text-cyan-500',
  },
  {
    id: 'css-modules',
    name: 'CSS Modules',
    description: 'Locally scoped CSS with automatic class name generation',
    icon: FileCode,
    pros: [
      'True CSS isolation',
      'No runtime overhead',
      'Works with any CSS preprocessor',
      'Predictable styling',
      'Type-safe with TypeScript',
    ],
    cons: [
      'Requires build setup',
      'No dynamic styling',
      'Separate files for styles',
    ],
    bundleSize: '~0KB runtime',
    performance: 'Excellent',
    color: 'text-green-500',
  },
  {
    id: 'inline-styles',
    name: 'Inline Styles',
    description: 'JavaScript object-based styling with CSS variables',
    icon: Code,
    pros: [
      'Dynamic styling capabilities',
      'No build configuration',
      'Component-scoped by default',
      'Easy to pass props',
      'Good for theming',
    ],
    cons: [
      'No pseudo-classes/elements',
      'Larger bundle size',
      'Limited CSS features',
      'Performance overhead',
    ],
    bundleSize: '0KB CSS',
    performance: 'Fair',
    color: 'text-purple-500',
  },
  {
    id: 'emotion',
    name: 'Emotion (CSS-in-JS)',
    description: 'Styled components with runtime CSS generation',
    icon: Sparkles,
    pros: [
      'Full CSS support',
      'Dynamic theming',
      'Component-based styling',
      'Great TypeScript support',
      'Server-side rendering',
    ],
    cons: [
      'Runtime overhead',
      'Larger bundle size',
      'Learning curve',
      'Debugging complexity',
    ],
    bundleSize: '~11KB runtime',
    performance: 'Good',
    color: 'text-pink-500',
  },
]

export default function StylingComparisonPage() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  return (
    <div className="container mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold mb-2">Styling Methods Comparison</h1>
        <p className="text-muted-foreground max-w-3xl">
          Radix UI primitives are unstyled by design, giving you complete control over styling. 
          Here's the same Dialog component implemented with four different styling approaches.
        </p>
        <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
          <Layers className="h-5 w-5 text-blue-500" />
          <p className="text-sm text-blue-900 dark:text-blue-100">
            All examples use the same Radix Dialog primitive, demonstrating styling flexibility
          </p>
        </div>
      </div>

      {/* Live Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Live Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tailwind CSS Dialog */}
          <div className="p-6 rounded-lg border space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900">
                <Palette className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <h3 className="font-semibold">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">Utility classes</p>
              </div>
            </div>
            
            <DialogTailwind>
              <DialogTailwindTrigger asChild>
                <Button variant="outline" className="w-full">
                  Open Tailwind Dialog
                </Button>
              </DialogTailwindTrigger>
              <DialogTailwindContent>
                <DialogTailwindHeader>
                  <DialogTailwindTitle>Tailwind CSS Dialog</DialogTailwindTitle>
                  <DialogTailwindDescription>
                    This dialog is styled using Tailwind CSS utility classes. 
                    Notice the smooth animations and consistent design tokens.
                  </DialogTailwindDescription>
                </DialogTailwindHeader>
                <div className="py-4">
                  <p className="text-sm">
                    Tailwind provides a comprehensive set of utility classes that make 
                    styling predictable and maintainable.
                  </p>
                </div>
                <DialogTailwindFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Continue</Button>
                </DialogTailwindFooter>
              </DialogTailwindContent>
            </DialogTailwind>
          </div>

          {/* CSS Modules Dialog */}
          <div className="p-6 rounded-lg border space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <FileCode className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">CSS Modules</h3>
                <p className="text-sm text-muted-foreground">Scoped styles</p>
              </div>
            </div>
            
            <DialogCSSModules>
              <DialogCSSModulesTrigger asChild>
                <Button variant="outline" className="w-full">
                  Open CSS Modules Dialog
                </Button>
              </DialogCSSModulesTrigger>
              <DialogCSSModulesContent>
                <DialogCSSModulesHeader>
                  <DialogCSSModulesTitle>CSS Modules Dialog</DialogCSSModulesTitle>
                  <DialogCSSModulesDescription>
                    This dialog uses CSS Modules for locally scoped styles with 
                    zero runtime overhead.
                  </DialogCSSModulesDescription>
                </DialogCSSModulesHeader>
                <div style={{ padding: '1rem 0' }}>
                  <p style={{ fontSize: '0.875rem' }}>
                    CSS Modules provide true isolation and work great with 
                    build tools like webpack.
                  </p>
                </div>
                <DialogCSSModulesFooter>
                  <button className={cssModulesButtonStyles.secondary}>Cancel</button>
                  <button className={cssModulesButtonStyles.primary}>Continue</button>
                </DialogCSSModulesFooter>
              </DialogCSSModulesContent>
            </DialogCSSModules>
          </div>

          {/* Inline Styles Dialog */}
          <div className="p-6 rounded-lg border space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <Code className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Inline Styles</h3>
                <p className="text-sm text-muted-foreground">CSS-in-JS objects</p>
              </div>
            </div>
            
            <DialogInlineStyles>
              <DialogInlineStylesTrigger asChild>
                <Button variant="outline" className="w-full">
                  Open Inline Styles Dialog
                </Button>
              </DialogInlineStylesTrigger>
              <DialogInlineStylesContent isDarkMode={isDarkMode}>
                <DialogInlineStylesHeader>
                  <DialogInlineStylesTitle>Inline Styles Dialog</DialogInlineStylesTitle>
                  <DialogInlineStylesDescription>
                    This dialog uses inline styles with CSS variables for theming 
                    and dynamic styling.
                  </DialogInlineStylesDescription>
                </DialogInlineStylesHeader>
                <div style={{ padding: '1rem 0' }}>
                  <p style={{ fontSize: '0.875rem' }}>
                    Inline styles offer maximum flexibility for dynamic updates 
                    and prop-based styling.
                  </p>
                </div>
                <DialogInlineStylesFooter>
                  <InlineStyleButton variant="secondary">Cancel</InlineStyleButton>
                  <InlineStyleButton variant="primary">Continue</InlineStyleButton>
                </DialogInlineStylesFooter>
              </DialogInlineStylesContent>
            </DialogInlineStyles>
          </div>

          {/* Emotion Dialog */}
          <div className="p-6 rounded-lg border space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900">
                <Sparkles className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold">Emotion</h3>
                <p className="text-sm text-muted-foreground">Styled components</p>
              </div>
            </div>
            
            <DialogEmotion>
              <DialogEmotionTrigger asChild>
                <Button variant="outline" className="w-full">
                  Open Emotion Dialog
                </Button>
              </DialogEmotionTrigger>
              <DialogEmotionContent theme={isDarkMode ? 'dark' : 'light'}>
                <DialogEmotionHeader>
                  <DialogEmotionTitle theme={isDarkMode ? 'dark' : 'light'}>
                    Emotion Dialog
                  </DialogEmotionTitle>
                  <DialogEmotionDescription theme={isDarkMode ? 'dark' : 'light'}>
                    This dialog uses Emotion for CSS-in-JS with styled components 
                    and runtime generation.
                  </DialogEmotionDescription>
                </DialogEmotionHeader>
                <div style={{ padding: '1rem 0' }}>
                  <p style={{ fontSize: '0.875rem' }}>
                    Emotion provides powerful styling capabilities with great 
                    developer experience.
                  </p>
                </div>
                <DialogEmotionFooter>
                  <EmotionButton variant="secondary" theme={isDarkMode ? 'dark' : 'light'}>
                    Cancel
                  </EmotionButton>
                  <EmotionButton variant="primary">Continue</EmotionButton>
                </DialogEmotionFooter>
              </DialogEmotionContent>
            </DialogEmotion>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Detailed Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Method</th>
                <th className="text-left p-4">Bundle Size</th>
                <th className="text-left p-4">Performance</th>
                <th className="text-left p-4">DX Score</th>
                <th className="text-left p-4">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {stylingMethods.map((method) => (
                <tr key={method.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <method.icon className={`h-5 w-5 ${method.color}`} />
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{method.bundleSize}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                      ${method.performance === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        method.performance === 'Good' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'}`}>
                      {method.performance}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`h-4 w-4 ${
                            star <= (method.id === 'tailwind' ? 5 : 
                                    method.id === 'emotion' ? 4 :
                                    method.id === 'css-modules' ? 4 : 3)
                              ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {method.id === 'tailwind' && 'Rapid prototyping, consistent design'}
                    {method.id === 'css-modules' && 'Large applications, team projects'}
                    {method.id === 'inline-styles' && 'Dynamic theming, small components'}
                    {method.id === 'emotion' && 'Complex interactions, design systems'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Pros and Cons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stylingMethods.map((method) => (
            <div key={method.id} className="p-6 rounded-lg border space-y-4">
              <div className="flex items-center gap-3">
                <method.icon className={`h-6 w-6 ${method.color}`} />
                <h3 className="font-semibold text-lg">{method.name}</h3>
              </div>
              
              <p className="text-sm text-muted-foreground">{method.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Pros
                  </h4>
                  <ul className="space-y-1">
                    {method.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Cons
                  </h4>
                  <ul className="space-y-1">
                    {method.cons.map((con, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="pt-3 border-t flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bundle: {method.bundleSize}</span>
                <span className={`font-medium
                  ${method.performance === 'Excellent' ? 'text-green-500' :
                    method.performance === 'Good' ? 'text-yellow-500' : 'text-orange-500'}`}>
                  {method.performance} Performance
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
        
        <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">For Most Projects</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Tailwind CSS</strong> offers the best balance of developer experience, 
                  performance, and maintainability. It's ideal for teams and projects that value 
                  consistency and rapid development.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Package className="h-6 w-6 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">For Large Applications</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>CSS Modules</strong> provide excellent isolation and zero runtime overhead, 
                  making them perfect for large-scale applications where performance is critical.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <GitBranch className="h-6 w-6 text-purple-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">For Design Systems</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Emotion or styled-components</strong> offer the flexibility needed for 
                  complex design systems with dynamic theming and component variants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5 text-cyan-500" />
              Tailwind CSS
            </h3>
            <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-sm overflow-x-auto">
              <code>{`<DialogContent className="
  fixed left-[50%] top-[50%] z-50 
  grid w-full max-w-lg gap-4
  border bg-background p-6 shadow-lg
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
">
  {children}
</DialogContent>`}</code>
            </pre>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-pink-500" />
              Emotion
            </h3>
            <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-sm overflow-x-auto">
              <code>{`const StyledContent = styled(Dialog.Content)\`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  
  &[data-state="open"] {
    animation: \${contentShow} 150ms;
  }
\``}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}