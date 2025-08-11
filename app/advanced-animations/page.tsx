import AdvancedAnimationsShowcase from '@/components/showcase/advanced-animations-showcase'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advanced Animations - Radix UI Lab',
  description: 'Explore stunning visual effects, micro-interactions, and advanced CSS animations in the Radix UI component library.',
}

export default function AdvancedAnimationsPage() {
  return <AdvancedAnimationsShowcase />
}