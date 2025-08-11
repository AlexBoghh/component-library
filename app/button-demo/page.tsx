'use client'

import { useState } from 'react'
import { Button, IconButton, ButtonGroup } from '@/components/ui/primitives/button'
import { TooltipProvider } from '@/components/ui/primitives/tooltip'
import { 
  // Navigation & Direction
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  
  // Actions
  Download, 
  Upload,
  Save,
  Edit,
  Trash2,
  Copy,
  Plus,
  X,
  Check,
  
  // Communication
  Mail, 
  Send,
  MessageSquare,
  Phone,
  
  // Media
  Play,
  Pause,
  SkipForward,
  Volume2,
  
  // Social
  Github,
  Twitter,
  Linkedin,
  Facebook,
  
  // UI Elements
  Settings,
  Menu,
  MoreVertical,
  MoreHorizontal,
  Filter,
  Search,
  
  // Status & Info
  AlertCircle,
  Info,
  HelpCircle,
  
  // User
  User,
  Users,
  UserPlus,
  LogIn,
  LogOut,
  
  // Files
  File,
  FileText,
  Folder,
  FolderOpen,
  
  // Utility
  Share2,
  Bookmark,
  Heart,
  Star,
  Bell,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  Zap,
  TrendingUp,
  Calendar,
  Clock,
  Home,
  ShoppingCart,
  CreditCard,
  DollarSign,
  BarChart
} from 'lucide-react'

export default function ButtonDemo() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [following, setFollowing] = useState(false)

  const handleLoadingClick = (key: string, duration = 2000) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }))
    }, duration)
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Button Component Showcase</h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive collection of button variants with perfect icon integration,
              smooth animations, and accessibility features.
            </p>
          </div>

          {/* Basic Variants */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Button Variants</h2>
              <p className="text-muted-foreground">
                Six carefully designed variants for different use cases.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link Button</Button>
            </div>
          </section>

          {/* Sizes with Icons */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Button Sizes</h2>
              <p className="text-muted-foreground">
                Four sizes with properly scaled icons (14px, 16px, 18px, 20px).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" leftIcon={Plus}>Small (14px icons)</Button>
              <Button size="md" leftIcon={Plus}>Medium (16px icons)</Button>
              <Button size="lg" leftIcon={Plus}>Large (18px icons)</Button>
              <Button size="xl" leftIcon={Plus}>Extra Large (20px icons)</Button>
            </div>
          </section>

          {/* Icon Positions */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Icon Positions</h2>
              <p className="text-muted-foreground">
                Icons can be placed on either side or both sides of the text.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Left Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={Send}>Send Message</Button>
                  <Button variant="secondary" leftIcon={Download}>Download File</Button>
                  <Button variant="outline" leftIcon={Save}>Save Draft</Button>
                  <Button variant="ghost" leftIcon={Copy}>Copy Text</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Right Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button rightIcon={ArrowRight}>Continue</Button>
                  <Button variant="secondary" rightIcon={ChevronRight}>Next Step</Button>
                  <Button variant="outline" rightIcon={ExternalLink}>Open Link</Button>
                  <Button variant="ghost" rightIcon={ChevronDown}>More Options</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Both Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={Plus} rightIcon={ArrowRight}>Create New</Button>
                  <Button variant="secondary" leftIcon={Search} rightIcon={Filter}>Search & Filter</Button>
                  <Button variant="outline" leftIcon={Upload} rightIcon={Check}>Upload Complete</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Icon-Only Buttons */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Icon Buttons</h2>
              <p className="text-muted-foreground">
                Square and circular icon-only buttons with tooltips and hover effects.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Square Icon Buttons (with tooltips)</h3>
                <div className="flex flex-wrap gap-3">
                  <IconButton aria-label="Edit" tooltip="Edit document" variant="outline">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="Delete" tooltip="Delete item" variant="destructive">
                    <Trash2 />
                  </IconButton>
                  <IconButton aria-label="Settings" tooltip="Open settings" variant="secondary">
                    <Settings />
                  </IconButton>
                  <IconButton aria-label="More" tooltip="More options" variant="ghost">
                    <MoreVertical />
                  </IconButton>
                  <IconButton aria-label="Share" tooltip="Share this page">
                    <Share2 />
                  </IconButton>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Circular Icon Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <IconButton aria-label="Play" shape="circle" tooltip="Play video" variant="outline">
                    <Play />
                  </IconButton>
                  <IconButton aria-label="Pause" shape="circle" tooltip="Pause video" variant="secondary">
                    <Pause />
                  </IconButton>
                  <IconButton aria-label="Next" shape="circle" tooltip="Next track">
                    <SkipForward />
                  </IconButton>
                  <IconButton aria-label="Volume" shape="circle" tooltip="Adjust volume" variant="ghost">
                    <Volume2 />
                  </IconButton>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Different Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <IconButton size="sm" aria-label="Small" tooltip="Small button">
                    <Star />
                  </IconButton>
                  <IconButton size="md" aria-label="Medium" tooltip="Medium button">
                    <Star />
                  </IconButton>
                  <IconButton size="lg" aria-label="Large" tooltip="Large button">
                    <Star />
                  </IconButton>
                  <IconButton size="xl" aria-label="Extra Large" tooltip="Extra large button">
                    <Star />
                  </IconButton>
                </div>
              </div>
            </div>
          </section>

          {/* Loading States */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Loading States</h2>
              <p className="text-muted-foreground">
                Buttons with integrated loading spinners that prevent layout shift.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Click to Load</h3>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => handleLoadingClick('save')}
                    loading={loadingStates['save']}
                    leftIcon={!loadingStates['save'] ? Save : undefined}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => handleLoadingClick('upload')}
                    loading={loadingStates['upload']}
                    loadingText="Uploading..."
                    leftIcon={!loadingStates['upload'] ? Upload : undefined}
                  >
                    Upload File
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleLoadingClick('download')}
                    loading={loadingStates['download']}
                    spinnerPlacement="right"
                    rightIcon={!loadingStates['download'] ? Download : undefined}
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Icon Button Loading</h3>
                <div className="flex flex-wrap gap-3">
                  <IconButton 
                    aria-label="Refresh"
                    tooltip="Refresh data"
                    onClick={() => handleLoadingClick('refresh', 1000)}
                    loading={loadingStates['refresh']}
                  >
                    <RefreshCw />
                  </IconButton>
                  <IconButton 
                    aria-label="Sync"
                    tooltip="Sync changes"
                    variant="outline"
                    shape="circle"
                    onClick={() => handleLoadingClick('sync', 1500)}
                    loading={loadingStates['sync']}
                  >
                    <RefreshCw />
                  </IconButton>
                </div>
              </div>
            </div>
          </section>

          {/* Button Groups */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Button Groups</h2>
              <p className="text-muted-foreground">
                Grouped buttons for related actions with seamless borders.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Horizontal Groups</h3>
                <div className="flex flex-wrap gap-4">
                  <ButtonGroup>
                    <Button variant="outline" leftIcon={ArrowLeft}>Previous</Button>
                    <Button variant="outline">Current</Button>
                    <Button variant="outline" rightIcon={ArrowRight}>Next</Button>
                  </ButtonGroup>

                  <ButtonGroup>
                    <Button variant="secondary" leftIcon={Edit}>Edit</Button>
                    <Button variant="secondary" leftIcon={Copy}>Copy</Button>
                    <Button variant="secondary" leftIcon={Trash2}>Delete</Button>
                  </ButtonGroup>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Mixed Groups</h3>
                <div className="flex flex-wrap gap-4">
                  <ButtonGroup>
                    <Button leftIcon={Save}>Save</Button>
                    <IconButton aria-label="Save options" tooltip="More save options">
                      <ChevronDown />
                    </IconButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <Button variant="outline" leftIcon={File}>New File</Button>
                    <Button variant="outline" leftIcon={Folder}>New Folder</Button>
                    <IconButton variant="outline" aria-label="More" tooltip="More options">
                      <MoreVertical />
                    </IconButton>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </section>

          {/* Common Actions Showcase */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Common Action Buttons</h2>
              <p className="text-muted-foreground">
                Pre-styled buttons for common application actions.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* CRUD Operations */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">CRUD Operations</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" leftIcon={Plus}>Create</Button>
                  <Button size="sm" variant="outline" leftIcon={Eye}>View</Button>
                  <Button size="sm" variant="secondary" leftIcon={Edit}>Edit</Button>
                  <Button size="sm" variant="destructive" leftIcon={Trash2}>Delete</Button>
                </div>
              </div>

              {/* File Operations */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">File Operations</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" leftIcon={Upload}>Upload</Button>
                  <Button size="sm" variant="outline" leftIcon={Download}>Download</Button>
                  <Button size="sm" variant="secondary" leftIcon={Save}>Save</Button>
                  <Button size="sm" variant="ghost" leftIcon={FileText}>Preview</Button>
                </div>
              </div>

              {/* User Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">User Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" leftIcon={LogIn}>Sign In</Button>
                  <Button size="sm" variant="outline" leftIcon={UserPlus}>Register</Button>
                  <Button size="sm" variant="secondary" leftIcon={User}>Profile</Button>
                  <Button size="sm" variant="ghost" leftIcon={LogOut}>Logout</Button>
                </div>
              </div>

              {/* Communication */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Communication</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" leftIcon={Mail}>Email</Button>
                  <Button size="sm" variant="outline" leftIcon={MessageSquare}>Chat</Button>
                  <Button size="sm" variant="secondary" leftIcon={Phone}>Call</Button>
                  <Button size="sm" variant="ghost" leftIcon={Send}>Send</Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Navigation</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" leftIcon={Home}>Home</Button>
                  <Button size="sm" variant="outline" leftIcon={ArrowLeft}>Back</Button>
                  <Button size="sm" variant="secondary" rightIcon={ArrowRight}>Next</Button>
                  <Button size="sm" variant="ghost" rightIcon={ExternalLink}>Open</Button>
                </div>
              </div>

              {/* Status Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Status Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" leftIcon={Check} variant="secondary">Approve</Button>
                  <Button size="sm" leftIcon={X} variant="destructive">Reject</Button>
                  <Button size="sm" leftIcon={Clock} variant="outline">Pending</Button>
                  <Button size="sm" leftIcon={AlertCircle} variant="ghost">Review</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Buttons */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Social Media Buttons</h2>
              <p className="text-muted-foreground">
                Branded social media buttons with proper styling.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Full Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={Github}>Continue with GitHub</Button>
                  <Button variant="outline" leftIcon={Twitter}>Share on Twitter</Button>
                  <Button variant="secondary" leftIcon={Linkedin}>Connect on LinkedIn</Button>
                  <Button variant="ghost" leftIcon={Facebook}>Share to Facebook</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Icon Only</h3>
                <div className="flex flex-wrap gap-3">
                  <IconButton aria-label="GitHub" tooltip="View on GitHub" shape="circle">
                    <Github />
                  </IconButton>
                  <IconButton aria-label="Twitter" tooltip="Share on Twitter" shape="circle" variant="outline">
                    <Twitter />
                  </IconButton>
                  <IconButton aria-label="LinkedIn" tooltip="Share on LinkedIn" shape="circle" variant="secondary">
                    <Linkedin />
                  </IconButton>
                  <IconButton aria-label="Facebook" tooltip="Share on Facebook" shape="circle" variant="ghost">
                    <Facebook />
                  </IconButton>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Examples */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Interactive Examples</h2>
              <p className="text-muted-foreground">
                Buttons with state changes and interactive feedback.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={liked ? "destructive" : "outline"}
                leftIcon={Heart}
                onClick={() => setLiked(!liked)}
              >
                {liked ? "Liked" : "Like"}
              </Button>
              
              <Button 
                variant={bookmarked ? "secondary" : "outline"}
                leftIcon={Bookmark}
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              
              <Button 
                variant={following ? "secondary" : "default"}
                leftIcon={following ? Check : UserPlus}
                onClick={() => setFollowing(!following)}
              >
                {following ? "Following" : "Follow"}
              </Button>
              
              <IconButton
                aria-label={liked ? "Unlike" : "Like"}
                tooltip={liked ? "Unlike" : "Like"}
                variant={liked ? "destructive" : "outline"}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={liked ? "fill-current" : ""} />
              </IconButton>
              
              <IconButton
                aria-label="Notifications"
                tooltip="Toggle notifications"
                variant="outline"
                shape="circle"
              >
                <Bell />
              </IconButton>
            </div>
          </section>

          {/* Code Examples */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Code Examples</h2>
              <p className="text-muted-foreground">
                Example code for implementing various button patterns.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 font-mono text-sm font-medium">Basic Button with Icon</h3>
                <pre className="text-xs text-muted-foreground">
{`<Button leftIcon={Send}>
  Send Message
</Button>`}
                </pre>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 font-mono text-sm font-medium">Icon Button with Tooltip</h3>
                <pre className="text-xs text-muted-foreground">
{`<IconButton 
  aria-label="Settings" 
  tooltip="Open settings"
  variant="outline"
>
  <Settings />
</IconButton>`}
                </pre>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 font-mono text-sm font-medium">Loading Button</h3>
                <pre className="text-xs text-muted-foreground">
{`<Button 
  loading={isLoading}
  loadingText="Saving..."
  leftIcon={!isLoading ? Save : undefined}
  onClick={handleSave}
>
  Save Changes
</Button>`}
                </pre>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 font-mono text-sm font-medium">Button Group</h3>
                <pre className="text-xs text-muted-foreground">
{`<ButtonGroup>
  <Button variant="outline" leftIcon={ArrowLeft}>
    Previous
  </Button>
  <Button variant="outline">
    Current
  </Button>
  <Button variant="outline" rightIcon={ArrowRight}>
    Next
  </Button>
</ButtonGroup>`}
                </pre>
              </div>
            </div>
          </section>

          {/* States & Accessibility */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">States & Accessibility</h2>
              <p className="text-muted-foreground">
                Disabled states and keyboard navigation demonstration.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Disabled States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled Default</Button>
                  <Button variant="secondary" disabled leftIcon={Save}>Disabled with Icon</Button>
                  <Button variant="outline" disabled rightIcon={ArrowRight}>Disabled Outline</Button>
                  <IconButton aria-label="Disabled" disabled tooltip="This action is disabled">
                    <Settings />
                  </IconButton>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Focus States (Tab through these)</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>First</Button>
                  <Button variant="secondary">Second</Button>
                  <Button variant="outline">Third</Button>
                  <IconButton aria-label="Fourth" tooltip="Fourth button">
                    <Star />
                  </IconButton>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  )
}