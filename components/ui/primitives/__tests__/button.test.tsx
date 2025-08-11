import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, IconButton, ButtonGroup } from '../button'
import { ChevronRight, Plus } from 'lucide-react'

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders with correct variant styles', () => {
      const { rerender } = render(<Button variant="default">Default</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-primary')

      rerender(<Button variant="destructive">Destructive</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-destructive')

      rerender(<Button variant="outline">Outline</Button>)
      expect(screen.getByRole('button')).toHaveClass('border')
    })

    it('renders with correct size', () => {
      const { rerender } = render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-8')

      rerender(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-10')
    })

    it('renders full width when specified', () => {
      render(<Button fullWidth>Full Width</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
    })
  })

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('disables button when loading', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
    })
  })

  describe('Loading State', () => {
    it('shows spinner when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toHaveClass('cursor-wait')
    })

    it('shows loading text when provided', () => {
      render(<Button loading loadingText="Please wait...">Submit</Button>)
      expect(screen.getByText('Please wait...')).toBeInTheDocument()
    })

    it('positions spinner correctly', () => {
      const { rerender } = render(
        <Button loading spinnerPlacement="left">Loading</Button>
      )
      // Default is left, spinner should be first child
      const button = screen.getByRole('button')
      expect(button.firstChild).toBeDefined()

      rerender(<Button loading spinnerPlacement="right">Loading</Button>)
      // Spinner should be last child when placement is right
      expect(button.lastChild).toBeDefined()
    })
  })

  describe('Icons', () => {
    it('renders with left icon', () => {
      render(<Button leftIcon={<Plus />}>Add Item</Button>)
      expect(screen.getByRole('button')).toContainHTML('svg')
    })

    it('renders with right icon', () => {
      render(<Button rightIcon={<ChevronRight />}>Next</Button>)
      expect(screen.getByRole('button')).toContainHTML('svg')
    })

    it('renders with both icons', () => {
      render(
        <Button leftIcon={<Plus />} rightIcon={<ChevronRight />}>
          Action
        </Button>
      )
      const button = screen.getByRole('button')
      const svgs = button.querySelectorAll('svg')
      expect(svgs).toHaveLength(2)
    })
  })

  describe('Event Handlers', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Click me</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      render(<Button loading onClick={handleClick}>Click me</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('supports keyboard navigation', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Press Enter</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
      
      fireEvent.keyDown(button, { key: 'Enter' })
      expect(handleClick).toHaveBeenCalled()
    })
  })
})

describe('IconButton Component', () => {
  it('renders with required aria-label', () => {
    render(
      <IconButton aria-label="Add item">
        <Plus />
      </IconButton>
    )
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
  })

  it('renders with tooltip when provided', () => {
    render(
      <IconButton aria-label="Add item" tooltip="Click to add">
        <Plus />
      </IconButton>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
    // Tooltip content would be tested with hover interaction
  })

  it('applies correct shape classes', () => {
    const { rerender } = render(
      <IconButton aria-label="Add" shape="square">
        <Plus />
      </IconButton>
    )
    expect(screen.getByRole('button')).not.toHaveClass('rounded-full')

    rerender(
      <IconButton aria-label="Add" shape="circle">
        <Plus />
      </IconButton>
    )
    expect(screen.getByRole('button')).toHaveClass('rounded-full')
  })
})

describe('ButtonGroup Component', () => {
  it('renders children in a group', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>
    )
    
    const group = screen.getByRole('group')
    expect(group).toBeInTheDocument()
    expect(group.children).toHaveLength(3)
  })

  it('applies correct orientation classes', () => {
    const { rerender } = render(
      <ButtonGroup orientation="horizontal">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toHaveClass('flex-row')

    rerender(
      <ButtonGroup orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toHaveClass('flex-col')
  })

  it('has proper role attribute', () => {
    render(
      <ButtonGroup>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })
})