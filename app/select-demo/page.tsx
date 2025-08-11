'use client'

import { useState } from 'react'
import {
  Select as ModernSelect,
  SelectContent as ModernContent,
  SelectGroup as ModernGroup,
  SelectItem as ModernItem,
  SelectLabel as ModernLabel,
  SelectTrigger as ModernTrigger,
  SelectValue as ModernValue,
  SelectSeparator as ModernSeparator,
} from '@/components/ui/primitives/select-modern'
import {
  Select as ClassicSelect,
  SelectContent as ClassicContent,
  SelectGroup as ClassicGroup,
  SelectItem as ClassicItem,
  SelectLabel as ClassicLabel,
  SelectTrigger as ClassicTrigger,
  SelectValue as ClassicValue,
  SelectSeparator as ClassicSeparator,
} from '@/components/ui/primitives/select-classic'
import { SearchableSelect, type SelectOption } from '@/components/ui/primitives/select-searchable'
import { MultiSelect, type MultiSelectOption } from '@/components/ui/primitives/multi-select'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Clock,
  Star,
  Heart,
  Zap,
  Shield,
  Award,
  Flag,
  Target,
  Palette,
  Code,
  Database,
  Server,
  Cloud,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Camera,
  Mic,
  Music,
  Video,
  Image,
  FileText,
  FolderOpen,
  Archive,
  Package,
  ShoppingBag,
  CreditCard,
  DollarSign,
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
} from 'lucide-react'

// Sample data for demonstrations
const countries = [
  { value: 'us', label: 'United States', icon: <Flag className="h-4 w-4" />, description: 'North America' },
  { value: 'uk', label: 'United Kingdom', icon: <Flag className="h-4 w-4" />, description: 'Europe' },
  { value: 'ca', label: 'Canada', icon: <Flag className="h-4 w-4" />, description: 'North America' },
  { value: 'au', label: 'Australia', icon: <Flag className="h-4 w-4" />, description: 'Oceania' },
  { value: 'de', label: 'Germany', icon: <Flag className="h-4 w-4" />, description: 'Europe' },
  { value: 'fr', label: 'France', icon: <Flag className="h-4 w-4" />, description: 'Europe' },
  { value: 'jp', label: 'Japan', icon: <Flag className="h-4 w-4" />, description: 'Asia' },
  { value: 'cn', label: 'China', icon: <Flag className="h-4 w-4" />, description: 'Asia' },
  { value: 'in', label: 'India', icon: <Flag className="h-4 w-4" />, description: 'Asia' },
  { value: 'br', label: 'Brazil', icon: <Flag className="h-4 w-4" />, description: 'South America' },
]

const teamMembers = [
  { 
    value: 'john', 
    label: 'John Doe', 
    role: 'Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    status: 'active'
  },
  { 
    value: 'jane', 
    label: 'Jane Smith', 
    role: 'Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    status: 'active'
  },
  { 
    value: 'bob', 
    label: 'Bob Johnson', 
    role: 'Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    status: 'busy'
  },
  { 
    value: 'alice', 
    label: 'Alice Williams', 
    role: 'Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    status: 'active'
  },
  { 
    value: 'charlie', 
    label: 'Charlie Brown', 
    role: 'QA Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    status: 'away'
  },
]

const techStack: SelectOption[] = [
  { value: 'react', label: 'React', icon: <Code />, group: 'Frontend', description: 'UI Library' },
  { value: 'vue', label: 'Vue.js', icon: <Code />, group: 'Frontend', description: 'Progressive Framework' },
  { value: 'angular', label: 'Angular', icon: <Code />, group: 'Frontend', description: 'Platform' },
  { value: 'svelte', label: 'Svelte', icon: <Code />, group: 'Frontend', description: 'Compiler' },
  { value: 'node', label: 'Node.js', icon: <Server />, group: 'Backend', description: 'Runtime' },
  { value: 'python', label: 'Python', icon: <Server />, group: 'Backend', description: 'Language' },
  { value: 'go', label: 'Go', icon: <Server />, group: 'Backend', description: 'Language' },
  { value: 'rust', label: 'Rust', icon: <Server />, group: 'Backend', description: 'Systems Language' },
  { value: 'postgres', label: 'PostgreSQL', icon: <Database />, group: 'Database', description: 'Relational DB' },
  { value: 'mongo', label: 'MongoDB', icon: <Database />, group: 'Database', description: 'NoSQL DB' },
  { value: 'redis', label: 'Redis', icon: <Database />, group: 'Database', description: 'In-memory DB' },
  { value: 'aws', label: 'AWS', icon: <Cloud />, group: 'Cloud', description: 'Amazon Web Services' },
  { value: 'gcp', label: 'Google Cloud', icon: <Cloud />, group: 'Cloud', description: 'Google Cloud Platform' },
  { value: 'azure', label: 'Azure', icon: <Cloud />, group: 'Cloud', description: 'Microsoft Azure' },
]

const categories: MultiSelectOption[] = [
  { value: 'electronics', label: 'Electronics', icon: <Cpu />, group: 'Products' },
  { value: 'clothing', label: 'Clothing', icon: <ShoppingBag />, group: 'Products' },
  { value: 'books', label: 'Books', icon: <FileText />, group: 'Products' },
  { value: 'home', label: 'Home & Garden', icon: <Package />, group: 'Products' },
  { value: 'sports', label: 'Sports', icon: <Activity />, group: 'Products' },
  { value: 'premium', label: 'Premium', icon: <Star />, group: 'Features' },
  { value: 'sale', label: 'On Sale', icon: <TrendingUp />, group: 'Features' },
  { value: 'new', label: 'New Arrivals', icon: <Zap />, group: 'Features' },
  { value: 'featured', label: 'Featured', icon: <Award />, group: 'Features' },
]

export default function SelectDemo() {
  // State for all select components
  const [modern1, setModern1] = useState<string>('')
  const [modern2, setModern2] = useState<string>('')
  const [classic1, setClassic1] = useState<string>('')
  const [classic2, setClassic2] = useState<string>('')
  const [searchable1, setSearchable1] = useState<string>('')
  const [searchable2, setSearchable2] = useState<string>('')
  const [multi1, setMulti1] = useState<string[]>([])
  const [multi2, setMulti2] = useState<string[]>([])

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Select Component Showcase</h1>
          <p className="text-lg text-muted-foreground">
            Three different Select component styles with unique animations, features, and use cases.
          </p>
        </div>

        {/* Modern Minimal Select */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Modern Minimal Select</h2>
            <p className="text-muted-foreground">
              Clean, minimal design with smooth slide animations and subtle hover effects.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Simple Selection</label>
              <ModernSelect value={modern1} onValueChange={setModern1}>
                <ModernTrigger>
                  <ModernValue placeholder="Select a country" />
                </ModernTrigger>
                <ModernContent>
                  {countries.map(country => (
                    <ModernItem 
                      key={country.value} 
                      value={country.value}
                      icon={country.icon}
                      description={country.description}
                    >
                      {country.label}
                    </ModernItem>
                  ))}
                </ModernContent>
              </ModernSelect>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">With Groups & Disabled</label>
              <ModernSelect value={modern2} onValueChange={setModern2}>
                <ModernTrigger>
                  <ModernValue placeholder="Select team member" />
                </ModernTrigger>
                <ModernContent>
                  <ModernGroup>
                    <ModernLabel>Active Members</ModernLabel>
                    {teamMembers
                      .filter(m => m.status === 'active')
                      .map(member => (
                        <ModernItem 
                          key={member.value} 
                          value={member.value}
                          icon={<User className="h-4 w-4" />}
                          description={member.role}
                        >
                          {member.label}
                        </ModernItem>
                      ))}
                  </ModernGroup>
                  <ModernSeparator />
                  <ModernGroup>
                    <ModernLabel>Other Members</ModernLabel>
                    {teamMembers
                      .filter(m => m.status !== 'active')
                      .map(member => (
                        <ModernItem 
                          key={member.value} 
                          value={member.value}
                          icon={<User className="h-4 w-4" />}
                          description={member.role}
                          disabled={member.status === 'away'}
                        >
                          {member.label}
                        </ModernItem>
                      ))}
                  </ModernGroup>
                </ModernContent>
              </ModernSelect>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimal design with bottom border animation</li>
              <li>• Slide-in animation from bottom</li>
              <li>• Support for icons and descriptions</li>
              <li>• Smooth hover transitions</li>
              <li>• Check icon appears on selection</li>
            </ul>
          </div>
        </section>

        {/* Classic Dropdown Select */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Classic Dropdown Select</h2>
            <p className="text-muted-foreground">
              Traditional dropdown style with borders, classic hover states, and avatars support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">With Icons</label>
              <ClassicSelect value={classic1} onValueChange={setClassic1}>
                <ClassicTrigger>
                  <ClassicValue placeholder="Select technology" />
                </ClassicTrigger>
                <ClassicContent>
                  <ClassicGroup>
                    <ClassicLabel>Frontend</ClassicLabel>
                    {techStack
                      .filter(t => t.group === 'Frontend')
                      .map(tech => (
                        <ClassicItem 
                          key={tech.value} 
                          value={tech.value}
                          icon={tech.icon}
                          description={tech.description}
                        >
                          {tech.label}
                        </ClassicItem>
                      ))}
                  </ClassicGroup>
                  <ClassicSeparator />
                  <ClassicGroup>
                    <ClassicLabel>Backend</ClassicLabel>
                    {techStack
                      .filter(t => t.group === 'Backend')
                      .map(tech => (
                        <ClassicItem 
                          key={tech.value} 
                          value={tech.value}
                          icon={tech.icon}
                          description={tech.description}
                        >
                          {tech.label}
                        </ClassicItem>
                      ))}
                  </ClassicGroup>
                </ClassicContent>
              </ClassicSelect>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">With Avatars</label>
              <ClassicSelect value={classic2} onValueChange={setClassic2}>
                <ClassicTrigger>
                  <ClassicValue placeholder="Assign to member" />
                </ClassicTrigger>
                <ClassicContent>
                  {teamMembers.map(member => (
                    <ClassicItem 
                      key={member.value} 
                      value={member.value}
                      avatar={
                        <img 
                          src={member.avatar} 
                          alt={member.label}
                          className="h-6 w-6 rounded-full"
                        />
                      }
                      description={member.role}
                    >
                      {member.label}
                    </ClassicItem>
                  ))}
                </ClassicContent>
              </ClassicSelect>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Classic bordered design</li>
              <li>• Fade-in animation</li>
              <li>• Support for avatars and icons</li>
              <li>• Traditional hover state</li>
              <li>• Check icon on the right</li>
            </ul>
          </div>
        </section>

        {/* Searchable Select */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Searchable Select</h2>
            <p className="text-muted-foreground">
              Advanced select with search functionality, filtering, and clear button.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Countries</label>
              <SearchableSelect
                options={countries}
                value={searchable1}
                onValueChange={setSearchable1}
                placeholder="Select a country"
                searchPlaceholder="Search countries..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search Tech Stack</label>
              <SearchableSelect
                options={techStack}
                value={searchable2}
                onValueChange={setSearchable2}
                placeholder="Choose technology"
                searchPlaceholder="Search technologies..."
              />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Real-time search filtering</li>
              <li>• Clear selection button</li>
              <li>• Search across labels, descriptions, and groups</li>
              <li>• Auto-focus search input</li>
              <li>• Group support with filtering</li>
            </ul>
          </div>
        </section>

        {/* Multi-Select */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Multi-Select</h2>
            <p className="text-muted-foreground">
              Select multiple options with search, selection count, and bulk actions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Categories</label>
              <MultiSelect
                options={categories}
                value={multi1}
                onValueChange={setMulti1}
                placeholder="Select categories"
                searchPlaceholder="Search categories..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Assign Team (Max 3)</label>
              <MultiSelect
                options={teamMembers.map(m => ({
                  value: m.value,
                  label: m.label,
                  icon: <User className="h-4 w-4" />,
                  group: m.status === 'active' ? 'Active' : 'Inactive'
                }))}
                value={multi2}
                onValueChange={setMulti2}
                placeholder="Select team members"
                searchPlaceholder="Search members..."
                maxItems={3}
                maxDisplay={2}
              />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Select multiple options with checkboxes</li>
              <li>• Search and filter functionality</li>
              <li>• Selection count and limit display</li>
              <li>• Select all / Clear all actions</li>
              <li>• Chip display for selected items</li>
              <li>• Max items limit support</li>
            </ul>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Feature</th>
                  <th className="p-3 text-center font-medium">Modern</th>
                  <th className="p-3 text-center font-medium">Classic</th>
                  <th className="p-3 text-center font-medium">Searchable</th>
                  <th className="p-3 text-center font-medium">Multi-Select</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">Animation Style</td>
                  <td className="p-3 text-center">Slide</td>
                  <td className="p-3 text-center">Fade</td>
                  <td className="p-3 text-center">Slide</td>
                  <td className="p-3 text-center">Slide</td>
                </tr>
                <tr>
                  <td className="p-3">Search/Filter</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="p-3">Multiple Selection</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="p-3">Icons Support</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="p-3">Avatars Support</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">❌</td>
                </tr>
                <tr>
                  <td className="p-3">Groups</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="p-3">Clear Button</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="p-3">Bulk Actions</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Code Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Usage Examples</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 font-mono text-sm font-medium">Modern Select</h3>
              <pre className="text-xs text-muted-foreground overflow-x-auto">
{`<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1" icon={<Icon />}>
      Option 1
    </SelectItem>
  </SelectContent>
</Select>`}
              </pre>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 font-mono text-sm font-medium">Searchable Select</h3>
              <pre className="text-xs text-muted-foreground overflow-x-auto">
{`<SearchableSelect
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="Select option"
  searchPlaceholder="Search..."
/>`}
              </pre>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 font-mono text-sm font-medium">Multi-Select</h3>
              <pre className="text-xs text-muted-foreground overflow-x-auto">
{`<MultiSelect
  options={options}
  value={values}
  onValueChange={setValues}
  placeholder="Select multiple"
  maxItems={5}
/>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}