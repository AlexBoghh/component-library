'use client'

import React from 'react'
import { CyberpunkInput } from '@/components/ui/primitives/input-cyberpunk'
import { 
  CyberpunkSelect,
  CyberpunkSelectContent,
  CyberpunkSelectItem,
  CyberpunkSelectTrigger,
  CyberpunkSelectValue
} from '@/components/ui/primitives/select-cyberpunk'
import { CyberpunkCheckbox } from '@/components/ui/primitives/checkbox-cyberpunk'
import { CyberpunkRadioGroup, CyberpunkRadioItem } from '@/components/ui/primitives/radio-cyberpunk'
import { CyberpunkSwitch } from '@/components/ui/primitives/switch-cyberpunk'
import { CyberpunkButton } from '@/components/ui/primitives/button-cyberpunk'
import { Card } from '@/components/ui/primitives/card'
import { 
  User, 
  Mail, 
  Lock, 
  CreditCard, 
  Phone,
  Globe,
  Shield,
  Wifi,
  Database,
  Terminal,
  Server,
  Cpu,
  HardDrive,
  Activity
} from 'lucide-react'

export default function CyberpunkFormsPage() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    server: '',
    connection: 'stable',
    notifications: {
      email: true,
      push: false,
      sms: false,
      security: true
    },
    features: {
      darkMode: true,
      analytics: false,
      backup: true
    }
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            CYBERPUNK FORMS
          </h1>
          <p className="text-cyan-400 text-lg font-mono">
            NEURAL INTERFACE FORM COMPONENTS v2.077
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Text Inputs Section */}
          <Card className="bg-black/50 backdrop-blur border-cyan-400/20 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              TEXT INPUTS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CyberpunkInput
                label="Username"
                placeholder="Enter username..."
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                variant="default"
              />
              
              <CyberpunkInput
                label="Email"
                type="email"
                placeholder="user@cyber.net"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={errors.email}
                variant="grid"
              />
              
              <CyberpunkInput
                label="Password"
                type="password"
                placeholder="Enter secure password..."
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                showPasswordToggle
                variant="secure"
              />
              
              <CyberpunkInput
                label="Terminal Access"
                placeholder="root@system:~$"
                variant="terminal"
                success={formData.username === 'admin'}
              />
            </div>
          </Card>

          {/* Select Dropdowns Section */}
          <Card className="bg-black/50 backdrop-blur border-purple-400/20 p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Server className="w-6 h-6" />
              SELECT DROPDOWNS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-mono text-cyan-400">Server Region</label>
                <CyberpunkSelect value={formData.server} onValueChange={(value) => setFormData({...formData, server: value})}>
                  <CyberpunkSelectTrigger>
                    <CyberpunkSelectValue placeholder="Select server..." />
                  </CyberpunkSelectTrigger>
                  <CyberpunkSelectContent>
                    <CyberpunkSelectItem value="us-west">US West - Neo Angeles</CyberpunkSelectItem>
                    <CyberpunkSelectItem value="us-east">US East - Mega City</CyberpunkSelectItem>
                    <CyberpunkSelectItem value="eu-central">EU Central - Berlin Grid</CyberpunkSelectItem>
                    <CyberpunkSelectItem value="asia-pacific">Asia Pacific - Tokyo Node</CyberpunkSelectItem>
                    <CyberpunkSelectItem value="quantum">Quantum Server - Experimental</CyberpunkSelectItem>
                  </CyberpunkSelectContent>
                </CyberpunkSelect>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-mono text-cyan-400">Connection Type</label>
                <CyberpunkSelect value={formData.connection} onValueChange={(value) => setFormData({...formData, connection: value})}>
                  <CyberpunkSelectTrigger>
                    <CyberpunkSelectValue placeholder="Select connection..." />
                  </CyberpunkSelectTrigger>
                  <CyberpunkSelectContent>
                    <CyberpunkSelectItem value="stable">Stable - Low Latency</CyberpunkSelectItem>
                    <CyberpunkSelectItem value="fast">Fast - High Bandwidth</CyberpunkSelectItem>
                    <CyberpunkSelectItem value="secure">Secure - Encrypted</CyberpunkSelectItem>
                    <CyberpunkSelectItem value="stealth">Stealth - Anonymous</CyberpunkSelectItem>
                  </CyberpunkSelectContent>
                </CyberpunkSelect>
              </div>
            </div>
          </Card>

          {/* Checkboxes Section */}
          <Card className="bg-black/50 backdrop-blur border-green-400/20 p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
              <Database className="w-6 h-6" />
              CHECKBOXES
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-cyan-400 mb-2">Notification Settings</h3>
                <CyberpunkCheckbox
                  label="Email Notifications"
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    notifications: {...formData.notifications, email: checked as boolean}
                  })}
                  variant="default"
                />
                <CyberpunkCheckbox
                  label="Push Notifications"
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    notifications: {...formData.notifications, push: checked as boolean}
                  })}
                  variant="data"
                />
                <CyberpunkCheckbox
                  label="SMS Alerts"
                  checked={formData.notifications.sms}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    notifications: {...formData.notifications, sms: checked as boolean}
                  })}
                  variant="terminal"
                />
                <CyberpunkCheckbox
                  label="Security Warnings"
                  checked={formData.notifications.security}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    notifications: {...formData.notifications, security: checked as boolean}
                  })}
                  variant="secure"
                  error={!formData.notifications.security}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-cyan-400 mb-2">Privacy Settings</h3>
                <CyberpunkCheckbox
                  label="Accept Terms & Conditions"
                  variant="default"
                />
                <CyberpunkCheckbox
                  label="Share Usage Analytics"
                  variant="data"
                />
                <CyberpunkCheckbox
                  label="Enable Location Tracking"
                  variant="secure"
                />
                <CyberpunkCheckbox
                  label="Marketing Communications"
                  variant="terminal"
                />
              </div>
            </div>
          </Card>

          {/* Radio Buttons Section */}
          <Card className="bg-black/50 backdrop-blur border-yellow-400/20 p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              RADIO SELECTIONS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-cyan-400 mb-2">Connection Protocol</h3>
                <CyberpunkRadioGroup defaultValue="tcp">
                  <CyberpunkRadioItem 
                    value="tcp" 
                    label="TCP/IP"
                    description="Standard protocol"
                    variant="hex"
                  />
                  <CyberpunkRadioItem 
                    value="udp" 
                    label="UDP"
                    description="Fast, unreliable"
                    variant="hex"
                  />
                  <CyberpunkRadioItem 
                    value="quantum" 
                    label="Quantum"
                    description="Experimental"
                    variant="hex"
                  />
                </CyberpunkRadioGroup>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-cyan-400 mb-2">Neural Interface Type</h3>
                <CyberpunkRadioGroup defaultValue="standard">
                  <CyberpunkRadioItem 
                    value="standard" 
                    label="Standard Neural Link"
                    variant="circuit"
                  />
                  <CyberpunkRadioItem 
                    value="enhanced" 
                    label="Enhanced Cortex Bridge"
                    variant="circuit"
                  />
                  <CyberpunkRadioItem 
                    value="military" 
                    label="Military Grade Interface"
                    variant="circuit"
                  />
                </CyberpunkRadioGroup>
              </div>
            </div>
          </Card>

          {/* Switches Section */}
          <Card className="bg-black/50 backdrop-blur border-pink-400/20 p-6">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              SWITCHES & TOGGLES
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <CyberpunkSwitch
                  label="System Power"
                  checked={formData.features.darkMode}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    features: {...formData.features, darkMode: checked}
                  })}
                  variant="power"
                />
                <CyberpunkSwitch
                  label="Data Stream"
                  checked={formData.features.analytics}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    features: {...formData.features, analytics: checked}
                  })}
                  variant="data"
                  showIcon
                />
                <CyberpunkSwitch
                  label="Security Lock"
                  checked={formData.features.backup}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    features: {...formData.features, backup: checked}
                  })}
                  variant="security"
                  showIcon
                />
                <CyberpunkSwitch
                  label="Neon Mode"
                  variant="neon"
                />
              </div>
              
              <div className="space-y-4">
                <CyberpunkSwitch
                  label="Auto Save"
                  variant="power"
                  showLabels={false}
                />
                <CyberpunkSwitch
                  label="Cloud Sync"
                  variant="data"
                  showLabels={false}
                />
                <CyberpunkSwitch
                  label="2FA Authentication"
                  variant="security"
                  showLabels={false}
                />
                <CyberpunkSwitch
                  label="Experimental Features"
                  variant="neon"
                  showLabels={false}
                />
              </div>
            </div>
          </Card>

          {/* Submit Section */}
          <div className="flex justify-center gap-4 pt-8">
            <CyberpunkButton 
              type="submit"
              variant="neon-primary"
              size="lg"
              className="min-w-[200px]"
            >
              <Shield className="mr-2 h-5 w-5" />
              SUBMIT DATA
            </CyberpunkButton>
            <CyberpunkButton 
              type="button"
              variant="outline"
              size="lg"
              className="min-w-[200px]"
              onClick={() => console.log('Form reset')}
            >
              RESET FORM
            </CyberpunkButton>
          </div>
        </form>

        {/* Form State Display */}
        <Card className="mt-8 bg-black/50 backdrop-blur border-gray-700 p-4">
          <h3 className="text-sm font-mono text-gray-400 mb-2">FORM STATE [DEBUG]</h3>
          <pre className="text-xs text-green-400 font-mono overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  )
}