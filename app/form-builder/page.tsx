'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FloatingInput } from '@/components/ui/floating-input'
import { SearchableSelect } from '@/components/ui/searchable-select'
import { RadioCards, RadioCard } from '@/components/ui/radio-cards'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/primitives/button'
import { Switch } from '@/components/ui/primitives/switch'
import { Slider } from '@/components/ui/primitives/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs'
import { 
  User, 
  Mail, 
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Code2,
  Palette,
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  Coffee,
  Plane,
  CreditCard,
  Shield,
  Zap,
  Rocket,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Form validation schema
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number').optional(),
  
  // Location
  country: z.string().min(1, 'Please select a country'),
  
  // Employment
  employmentType: z.enum(['full-time', 'part-time', 'freelance', 'student'], {
    required_error: 'Please select an employment type',
  }),
  
  // Experience
  experience: z.number().min(0).max(50),
  
  // Interests (checkboxes)
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  
  // Plan (radio cards)
  plan: z.enum(['starter', 'professional', 'enterprise'], {
    required_error: 'Please select a plan',
  }),
  
  // Preferences
  newsletter: z.boolean(),
  notifications: z.boolean(),
  
  // Date
  startDate: z.date({
    required_error: 'Please select a start date',
  }),
})

type FormValues = z.infer<typeof formSchema>

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Brazil', value: 'br' },
]

const interests = [
  { value: 'coding', label: 'Coding', description: 'Software development & programming' },
  { value: 'design', label: 'Design', description: 'UI/UX and graphic design' },
  { value: 'music', label: 'Music', description: 'Playing or listening to music' },
  { value: 'photography', label: 'Photography', description: 'Capturing moments' },
  { value: 'gaming', label: 'Gaming', description: 'Video games & esports' },
  { value: 'reading', label: 'Reading', description: 'Books & literature' },
  { value: 'travel', label: 'Travel', description: 'Exploring new places' },
  { value: 'fitness', label: 'Fitness', description: 'Health & exercise' },
]

export default function FormBuilderPage() {
  const [submittedData, setSubmittedData] = React.useState<FormValues | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      employmentType: undefined,
      experience: 0,
      interests: [],
      plan: undefined,
      newsletter: false,
      notifications: true,
      startDate: undefined,
    },
  })

  const onSubmit = (data: FormValues) => {
    setSubmittedData(data)
    console.log('Form submitted:', data)
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dynamic Form Builder</h1>
        <p className="text-muted-foreground">
          Comprehensive form with react-hook-form, Zod validation, and beautiful Radix UI components
        </p>
      </div>

      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Form Builder</TabsTrigger>
          <TabsTrigger value="result">Submitted Data</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingInput
                            {...field}
                            label="First Name"
                            error={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingInput
                            {...field}
                            label="Last Name"
                            error={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingInput
                            {...field}
                            type="email"
                            label="Email Address"
                            error={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingInput
                            {...field}
                            type="tel"
                            label="Phone Number (Optional)"
                            error={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Location & Work Section */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Location & Work
                </h2>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <SearchableSelect
                            options={countries}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Select your country..."
                            error={!!fieldState.error}
                          />
                        </FormControl>
                        <FormDescription>
                          Choose your country of residence
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <FormControl>
                          <RadioCards value={field.value} onValueChange={field.onChange}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <RadioCard
                                value="full-time"
                                title="Full Time"
                                description="40+ hours per week"
                                icon={<Briefcase className="h-5 w-5" />}
                              />
                              <RadioCard
                                value="part-time"
                                title="Part Time"
                                description="Less than 40 hours"
                                icon={<Coffee className="h-5 w-5" />}
                              />
                              <RadioCard
                                value="freelance"
                                title="Freelance"
                                description="Independent contractor"
                                icon={<Zap className="h-5 w-5" />}
                              />
                              <RadioCard
                                value="student"
                                title="Student"
                                description="Currently studying"
                                icon={<GraduationCap className="h-5 w-5" />}
                              />
                            </div>
                          </RadioCards>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience: {field.value}</FormLabel>
                        <FormControl>
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={50}
                            step={1}
                            className="py-4"
                          />
                        </FormControl>
                        <FormDescription>
                          How many years of professional experience do you have?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Interests Section */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Interests
                </h2>

                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Select your interests</FormLabel>
                      <FormControl>
                        <CheckboxGroup
                          options={interests}
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          error={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Subscription Plan Section */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription Plan
                </h2>

                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioCards value={field.value} onValueChange={field.onChange}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <RadioCard
                              value="starter"
                              title="Starter"
                              description="Perfect for individuals"
                              icon={<Rocket className="h-5 w-5" />}
                            />
                            <RadioCard
                              value="professional"
                              title="Professional"
                              description="Great for teams"
                              icon={<Target className="h-5 w-5" />}
                            />
                            <RadioCard
                              value="enterprise"
                              title="Enterprise"
                              description="Custom solutions"
                              icon={<Shield className="h-5 w-5" />}
                            />
                          </div>
                        </RadioCards>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preferences Section */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferences
                </h2>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            onDateChange={field.onChange}
                            error={!!fieldState.error}
                          />
                        </FormControl>
                        <FormDescription>
                          When would you like to start?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Newsletter</FormLabel>
                          <FormDescription>
                            Receive updates about new features and tips
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Push Notifications</FormLabel>
                          <FormDescription>
                            Get notified about important updates
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset Form
                </Button>
                <Button type="submit">
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="result" className="mt-6">
          {submittedData ? (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
              <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 overflow-x-auto">
                <code className="text-sm">
                  {JSON.stringify(submittedData, null, 2)}
                </code>
              </pre>
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-12 text-center">
              <p className="text-muted-foreground">
                No data submitted yet. Fill out the form and submit to see the results here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add missing import
import { Settings } from 'lucide-react'