'use client'

import React from 'react'
import { Button } from '@/components/ui/primitives/button'
import { Input } from '@/components/ui/primitives/input'
import { Label } from '@/components/ui/primitives/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/primitives/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/primitives/select'
import { Switch } from '@/components/ui/primitives/switch'
import { Slider } from '@/components/ui/primitives/slider'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/primitives/toast'
import { Toaster } from '@/components/ui/toaster'
import { Card } from '@/components/ui/primitives/card'
import { 
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Bell,
  Download,
  Upload,
  Trash2,
  Save,
  Send,
  Calendar,
  User,
  Settings,
  Heart,
  Star,
  Zap,
  Coffee,
  Gift,
  ShoppingCart,
  CreditCard,
  Wifi,
  WifiOff,
  Copy,
  Share2
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
type SwipeDirection = 'up' | 'down' | 'left' | 'right'

export default function ToastDemoPage() {
  const [position, setPosition] = React.useState<Position>('bottom-right')
  const [swipeDirection, setSwipeDirection] = React.useState<SwipeDirection>('right')
  const [showProgress, setShowProgress] = React.useState(true)
  const [duration, setDuration] = React.useState(5000)
  const [customTitle, setCustomTitle] = React.useState('')
  const [customDescription, setCustomDescription] = React.useState('')
  const [pauseOnHover, setPauseOnHover] = React.useState(true)
  const [soundEnabled, setSoundEnabled] = React.useState(false)
  const [toastCount, setToastCount] = React.useState(0)

  // Simple toast examples
  const showSimpleToast = () => {
    setToastCount(prev => prev + 1)
    toast({
      title: `Toast #${toastCount + 1}`,
      description: 'This is a simple toast notification.',
      showProgress,
      duration,
      pauseOnHover,
      sound: soundEnabled,
    })
  }

  const showSuccessToast = () => {
    setToastCount(prev => prev + 1)
    toast.success({
      title: 'Success!',
      description: 'Your operation completed successfully.',
      showProgress,
      duration,
      pauseOnHover,
      sound: soundEnabled,
    })
  }

  const showErrorToast = () => {
    setToastCount(prev => prev + 1)
    toast.error({
      title: 'Error occurred',
      description: 'Something went wrong. Please try again.',
      showProgress,
      duration,
      pauseOnHover,
      sound: soundEnabled,
    })
  }

  const showWarningToast = () => {
    toast.warning({
      title: 'Warning',
      description: 'Please review this important information.',
      showProgress,
      duration,
    })
  }

  const showInfoToast = () => {
    toast.info({
      title: 'Information',
      description: 'Here\'s something you should know.',
      showProgress,
      duration,
    })
  }

  // Toast with action button
  const showActionToast = () => {
    toast({
      title: 'Undo Action',
      description: 'You just deleted an item.',
      action: <ToastAction altText="Undo">Undo</ToastAction>,
      showProgress,
      duration,
    })
  }

  // Custom render toast
  const showCustomToast = () => {
    toast({
      render: ({ id, dismiss }) => (
        <div className="flex items-center gap-4 p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Gift className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">You've got a gift!</p>
            <p className="text-sm text-muted-foreground">
              Click to claim your reward
            </p>
          </div>
          <Button size="sm" onClick={dismiss}>
            Claim
          </Button>
        </div>
      ),
      showProgress,
      duration,
    })
  }

  // Multiple toasts
  const showMultipleToasts = () => {
    toast.success({
      title: 'File uploaded',
      description: 'profile.jpg uploaded successfully',
      showProgress,
      duration,
    })
    
    setTimeout(() => {
      toast.info({
        title: 'Processing',
        description: 'Optimizing your image...',
        showProgress,
        duration,
      })
    }, 500)
    
    setTimeout(() => {
      toast.success({
        title: 'Complete!',
        description: 'Image optimization finished',
        showProgress,
        duration,
      })
    }, 1000)
  }

  // Notification examples
  const showNotificationToasts = () => {
    const notifications = [
      {
        variant: 'success' as const,
        icon: <CheckCircle2 className="h-5 w-5" />,
        title: 'Payment successful',
        description: 'Your payment of $99.00 was processed',
      },
      {
        variant: 'info' as const,
        icon: <Bell className="h-5 w-5" />,
        title: 'New message',
        description: 'You have 3 unread messages',
      },
      {
        variant: 'warning' as const,
        icon: <Wifi className="h-5 w-5" />,
        title: 'Connection unstable',
        description: 'Your internet connection is slow',
      },
    ]

    notifications.forEach((notification, index) => {
      setTimeout(() => {
        toast[notification.variant]({
          title: notification.title,
          description: notification.description,
          showProgress,
          duration,
        })
      }, index * 700)
    })
  }

  // Long content toast
  const showLongContentToast = () => {
    toast({
      render: ({ dismiss }) => (
        <div className="w-full">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1 space-y-2">
              <p className="font-semibold">Meeting Reminder</p>
              <p className="text-sm text-muted-foreground">
                You have a meeting with the design team at 2:00 PM today.
                Don't forget to prepare the mockups and user research findings.
              </p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={dismiss}>
                  Dismiss
                </Button>
                <Button size="sm">
                  Join Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
      showProgress: false,
      duration: 10000,
    })
  }

  // Promise toast
  const showPromiseToast = async () => {
    setToastCount(prev => prev + 1)
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('Data loaded successfully!'), 3000)
    })

    await toast.promise(promise, {
      loading: 'Loading your data...',
      success: (data) => data,
      error: 'Failed to load data',
    })
  }

  // Glass variant toast
  const showGlassToast = () => {
    setToastCount(prev => prev + 1)
    toast.glass({
      title: 'Glass Morphism',
      description: 'Beautiful frosted glass effect',
      showProgress,
      duration,
      pauseOnHover,
      sound: soundEnabled,
    })
  }

  // Stacked toasts demo
  const showStackedToasts = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        setToastCount(prev => prev + 1)
        toast({
          title: `Stacked Toast ${i + 1}`,
          description: `This is toast number ${i + 1} in the stack`,
          variant: ['success', 'info', 'warning'][i] as any,
          showProgress,
          duration: duration + (i * 1000),
          pauseOnHover,
          sound: soundEnabled,
        })
      }, i * 200)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Toast Notification System</h1>
        <p className="text-muted-foreground">
          Comprehensive toast system with Radix Toast, featuring variants, positions, animations, and custom content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Configuration</h2>
            
            <div className="space-y-6">
              {/* Position */}
              <div className="space-y-2">
                <Label>Position</Label>
                <RadioGroup value={position} onValueChange={(value) => setPosition(value as Position)}>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="top-left" id="top-left" />
                      <Label htmlFor="top-left" className="font-normal">Top Left</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="top-center" id="top-center" />
                      <Label htmlFor="top-center" className="font-normal">Top Center</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="top-right" id="top-right" />
                      <Label htmlFor="top-right" className="font-normal">Top Right</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bottom-left" id="bottom-left" />
                      <Label htmlFor="bottom-left" className="font-normal">Bottom Left</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bottom-center" id="bottom-center" />
                      <Label htmlFor="bottom-center" className="font-normal">Bottom Center</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bottom-right" id="bottom-right" />
                      <Label htmlFor="bottom-right" className="font-normal">Bottom Right</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Swipe Direction */}
              <div className="space-y-2">
                <Label>Swipe Direction</Label>
                <Select value={swipeDirection} onValueChange={(value) => setSwipeDirection(value as SwipeDirection)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up">Up</SelectItem>
                    <SelectItem value="down">Down</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label>Duration: {duration}ms</Label>
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  min={1000}
                  max={10000}
                  step={500}
                />
              </div>

              {/* Show Progress */}
              <div className="flex items-center justify-between">
                <Label htmlFor="progress">Show Progress Bar</Label>
                <Switch
                  id="progress"
                  checked={showProgress}
                  onCheckedChange={setShowProgress}
                />
              </div>

              {/* Pause on Hover */}
              <div className="flex items-center justify-between">
                <Label htmlFor="pauseHover">Pause on Hover</Label>
                <Switch
                  id="pauseHover"
                  checked={pauseOnHover}
                  onCheckedChange={setPauseOnHover}
                />
              </div>

              {/* Sound Effects */}
              <div className="flex items-center justify-between">
                <Label htmlFor="sound">Sound Effects</Label>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
            </div>
          </div>

          {/* Custom Toast Builder */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Custom Toast Builder</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customTitle">Title</Label>
                <Input
                  id="customTitle"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Enter toast title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customDescription">Description</Label>
                <Input
                  id="customDescription"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Enter toast description"
                />
              </div>
              
              <Button 
                className="w-full"
                onClick={() => {
                  if (customTitle || customDescription) {
                    setToastCount(prev => prev + 1)
                    toast({
                      title: customTitle || 'Custom Toast',
                      description: customDescription || undefined,
                      showProgress,
                      duration,
                      pauseOnHover,
                      sound: soundEnabled,
                    })
                  }
                }}
                disabled={!customTitle && !customDescription}
              >
                Show Custom Toast
              </Button>
            </div>
          </div>
        </div>

        {/* Toast Triggers */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Variants */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Variants</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button onClick={showSimpleToast} variant="outline">
                Default Toast
              </Button>
              <Button onClick={showSuccessToast} variant="outline" className="text-green-600">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Success
              </Button>
              <Button onClick={showErrorToast} variant="outline" className="text-red-600">
                <XCircle className="mr-2 h-4 w-4" />
                Error
              </Button>
              <Button onClick={showWarningToast} variant="outline" className="text-yellow-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Warning
              </Button>
              <Button onClick={showInfoToast} variant="outline" className="text-blue-600">
                <Info className="mr-2 h-4 w-4" />
                Info
              </Button>
              <Button onClick={showActionToast} variant="outline">
                With Action
              </Button>
            </div>
          </div>

          {/* Advanced Examples */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Advanced Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button onClick={showCustomToast} variant="outline">
                <Gift className="mr-2 h-4 w-4" />
                Custom Render
              </Button>
              <Button onClick={showMultipleToasts} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Multiple Toasts
              </Button>
              <Button onClick={showNotificationToasts} variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button onClick={showLongContentToast} variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Long Content
              </Button>
              <Button onClick={showPromiseToast} variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Promise Toast
              </Button>
              <Button onClick={showGlassToast} variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Glass Toast
              </Button>
              <Button onClick={showStackedToasts} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Stacked Toasts
              </Button>
            </div>
          </div>

          {/* Use Cases */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Common Use Cases</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.success({
                    title: 'Saved!',
                    description: 'Your changes have been saved.',
                    showProgress,
                    duration,
                  })
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.info({
                    title: 'Sending...',
                    description: 'Your message is being sent.',
                    showProgress,
                    duration,
                  })
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.error({
                    title: 'Delete failed',
                    description: 'Unable to delete the item.',
                    showProgress,
                    duration,
                  })
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.success({
                    title: 'Downloaded',
                    description: 'File downloaded successfully.',
                    showProgress,
                    duration,
                  })
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.warning({
                    title: 'Upload limit',
                    description: 'File size exceeds 10MB.',
                    showProgress,
                    duration,
                  })
                }}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: 'Copied!',
                    description: 'Link copied to clipboard.',
                    showProgress,
                    duration: 2000,
                  })
                }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Live Preview Card */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-2">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Toast Preview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
                <span className="text-sm">Active Toasts</span>
                <span className="text-2xl font-bold">{toastCount}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
                  <div className="text-xs text-muted-foreground mb-1">Position</div>
                  <div className="font-medium capitalize">{position.replace('-', ' ')}</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
                  <div className="text-xs text-muted-foreground mb-1">Duration</div>
                  <div className="font-medium">{duration / 1000}s</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
                  <div className="text-xs text-muted-foreground mb-1">Pause on Hover</div>
                  <div className="font-medium">{pauseOnHover ? 'Enabled' : 'Disabled'}</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
                  <div className="text-xs text-muted-foreground mb-1">Sound</div>
                  <div className="font-medium">{soundEnabled ? 'On' : 'Off'}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <div className="rounded-lg border bg-muted/50 p-6">
            <h3 className="font-semibold mb-2">✨ Enhanced Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>6 Variants:</strong> default, success, error, warning, info, glass</li>
              <li>• <strong>Smart Stacking:</strong> Beautiful stacked layout with depth</li>
              <li>• <strong>Pause on Hover:</strong> Auto-pause timer when hovering</li>
              <li>• <strong>Sound Effects:</strong> Optional notification sounds</li>
              <li>• <strong>Promise Support:</strong> Async operations with loading states</li>
              <li>• <strong>Glass Morphism:</strong> Frosted glass visual effect</li>
              <li>• <strong>Gradient Progress:</strong> Smooth gradient progress bars</li>
              <li>• <strong>Advanced Animations:</strong> Scale, shadow, and blur effects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toaster Component */}
      <Toaster position={position} swipeDirection={swipeDirection} />
    </div>
  )
}