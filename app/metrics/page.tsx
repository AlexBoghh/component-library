'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives/card'
import { Badge } from '@/components/ui/primitives/badge'
import { Button } from '@/components/ui/primitives/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs'
import { cn } from '@/lib/utils'
import {
  Activity,
  Zap,
  Shield,
  Gauge,
  Timer,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Battery,
  Eye,
  Accessibility,
  Globe,
  Smartphone,
  Monitor,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Download,
  Share2,
  Calendar,
  Clock
} from 'lucide-react'

// Mock performance data generator
const generateMetricData = (base: number, variance: number = 5) => {
  return Array.from({ length: 30 }, (_, i) => ({
    timestamp: Date.now() - (29 - i) * 60000, // Last 30 minutes
    value: Math.max(0, base + (Math.random() - 0.5) * variance)
  }))
}

// Performance metrics configuration
const performanceMetrics = {
  loadTime: {
    current: 0.3,
    target: 0.5,
    trend: 'up',
    data: generateMetricData(0.3, 0.1)
  },
  fcp: {
    current: 1.2,
    target: 1.8,
    trend: 'stable',
    data: generateMetricData(1.2, 0.2)
  },
  lcp: {
    current: 2.1,
    target: 2.5,
    trend: 'down',
    data: generateMetricData(2.1, 0.3)
  },
  cls: {
    current: 0.05,
    target: 0.1,
    trend: 'down',
    data: generateMetricData(0.05, 0.02)
  },
  fid: {
    current: 15,
    target: 100,
    trend: 'stable',
    data: generateMetricData(15, 5)
  }
}

// Accessibility metrics
const accessibilityMetrics = [
  { category: 'Color Contrast', score: 100, status: 'excellent', issues: 0 },
  { category: 'Keyboard Navigation', score: 98, status: 'excellent', issues: 2 },
  { category: 'Screen Reader', score: 95, status: 'good', issues: 3 },
  { category: 'Focus Management', score: 100, status: 'excellent', issues: 0 },
  { category: 'ARIA Labels', score: 97, status: 'excellent', issues: 1 },
  { category: 'Semantic HTML', score: 99, status: 'excellent', issues: 1 }
]

// Component performance data
const componentPerformance = [
  { name: 'Button', bundleSize: 2.3, renderTime: 0.8, memoryUsage: 12, score: 98 },
  { name: 'Dialog', bundleSize: 8.7, renderTime: 2.1, memoryUsage: 45, score: 95 },
  { name: 'Select', bundleSize: 12.1, renderTime: 3.2, memoryUsage: 67, score: 92 },
  { name: 'DataTable', bundleSize: 15.4, renderTime: 4.5, memoryUsage: 89, score: 89 },
  { name: 'Form', bundleSize: 6.2, renderTime: 1.9, memoryUsage: 34, score: 96 },
  { name: 'Toast', bundleSize: 3.8, renderTime: 1.2, memoryUsage: 18, score: 97 }
]

// Device performance
const deviceMetrics = [
  { device: 'Desktop', loadTime: 0.2, score: 100, usage: '45%' },
  { device: 'Mobile', loadTime: 0.4, score: 95, usage: '35%' },
  { device: 'Tablet', loadTime: 0.3, score: 98, usage: '20%' }
]

export default function MetricsDashboard() {
  const [refreshing, setRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h')
  const [selectedMetric, setSelectedMetric] = useState('loadTime')
  const [realTimeData, setRealTimeData] = useState(performanceMetrics)
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        loadTime: {
          ...prev.loadTime,
          current: Math.max(0.1, 0.3 + (Math.random() - 0.5) * 0.1),
          data: [
            ...prev.loadTime.data.slice(1),
            {
              timestamp: Date.now(),
              value: Math.max(0.1, 0.3 + (Math.random() - 0.5) * 0.1)
            }
          ]
        }
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-500'
    if (score >= 80) return 'text-yellow-500'
    return 'text-red-500'
  }
  
  const getScoreIcon = (score: number) => {
    if (score >= 95) return CheckCircle
    if (score >= 80) return AlertTriangle
    return XCircle
  }
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUp
      case 'down': return ArrowDown
      default: return Minus
    }
  }

  const overallScore = useMemo(() => {
    const scores = [
      realTimeData.loadTime.current <= realTimeData.loadTime.target ? 100 : 80,
      realTimeData.fcp.current <= realTimeData.fcp.target ? 100 : 85,
      realTimeData.lcp.current <= realTimeData.lcp.target ? 100 : 90,
      realTimeData.cls.current <= realTimeData.cls.target ? 100 : 95,
      realTimeData.fid.current <= realTimeData.fid.target ? 100 : 92,
    ]
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }, [realTimeData])

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Performance Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time metrics and performance monitoring for Radix UI Lab
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              Refresh
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-8 border-muted flex items-center justify-center">
                  <span className={cn("text-2xl font-bold", getScoreColor(overallScore))}>
                    {overallScore}
                  </span>
                </div>
                <div className={cn(
                  "absolute inset-0 rounded-full border-8 border-transparent transition-all",
                  overallScore >= 95 && "border-t-green-500 border-r-green-500",
                  overallScore >= 80 && overallScore < 95 && "border-t-yellow-500 border-r-yellow-500",
                  overallScore < 80 && "border-t-red-500 border-r-red-500"
                )} 
                style={{
                  transform: `rotate(${(overallScore / 100) * 360}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + (overallScore / 100) * 50}% 0%, 100% 100%, 0% 100%)`
                }} />
              </div>
            </div>
            <CardTitle className="text-lg">Overall Score</CardTitle>
            <CardDescription>Performance & Accessibility</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Load Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeData.loadTime.current.toFixed(1)}s</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
              Target: {realTimeData.loadTime.target}s
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accessibility</CardTitle>
            <Accessibility className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">98%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              WCAG 2.1 AA Compliant
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bundle Size</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142KB</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
              Gzipped: 45KB
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Core Web Vitals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Core Web Vitals
              </CardTitle>
              <CardDescription>
                Key metrics that measure user experience quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.entries(realTimeData).map(([key, metric]) => {
                  const TrendIcon = getTrendIcon(metric.trend)
                  const isGood = metric.current <= metric.target
                  
                  return (
                    <div
                      key={key}
                      className={cn(
                        "p-4 rounded-lg border transition-all cursor-pointer",
                        selectedMetric === key && "ring-2 ring-primary",
                        isGood ? "bg-green-50 dark:bg-green-950/20" : "bg-yellow-50 dark:bg-yellow-950/20"
                      )}
                      onClick={() => setSelectedMetric(key)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </div>
                        <TrendIcon className={cn(
                          "h-3 w-3",
                          metric.trend === 'up' && "text-red-500",
                          metric.trend === 'down' && "text-green-500",
                          metric.trend === 'stable' && "text-yellow-500"
                        )} />
                      </div>
                      <div className={cn(
                        "text-2xl font-bold",
                        isGood ? "text-green-600" : "text-yellow-600"
                      )}>
                        {typeof metric.current === 'number' ? 
                          (metric.current < 1 ? metric.current.toFixed(2) : metric.current.toFixed(1))
                          : metric.current
                        }
                        {key === 'loadTime' || key === 'fcp' || key === 'lcp' ? 's' : 
                         key === 'fid' ? 'ms' : ''}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Target: {metric.target}{key === 'loadTime' || key === 'fcp' || key === 'lcp' ? 's' : key === 'fid' ? 'ms' : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Performance Over Time
              </CardTitle>
              <CardDescription>
                {selectedMetric.replace(/([A-Z])/g, ' $1').toUpperCase()} for the last {timeRange}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Performance chart for {selectedMetric}</p>
                  <p className="text-sm">{realTimeData[selectedMetric as keyof typeof realTimeData].data.length} data points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Accessibility Tab */}
        <TabsContent value="accessibility" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessibilityMetrics.map((metric) => {
              const ScoreIcon = getScoreIcon(metric.score)
              
              return (
                <Card key={metric.category}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.category}</CardTitle>
                    <ScoreIcon className={cn("h-4 w-4", getScoreColor(metric.score))} />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className={cn("text-3xl font-bold", getScoreColor(metric.score))}>
                        {metric.score}%
                      </div>
                      <Badge variant={metric.status === 'excellent' ? 'default' : 'secondary'}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {metric.issues === 0 ? 'No issues found' : `${metric.issues} issue${metric.issues > 1 ? 's' : ''} found`}
                    </div>
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all",
                          metric.score >= 95 && "bg-green-500",
                          metric.score >= 80 && metric.score < 95 && "bg-yellow-500",
                          metric.score < 80 && "bg-red-500"
                        )}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
        
        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Performance</CardTitle>
              <CardDescription>
                Performance metrics for individual components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Component</th>
                      <th className="text-left p-2">Bundle Size</th>
                      <th className="text-left p-2">Render Time</th>
                      <th className="text-left p-2">Memory</th>
                      <th className="text-left p-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {componentPerformance.map((component) => (
                      <tr key={component.name} className="border-b">
                        <td className="p-2 font-medium">{component.name}</td>
                        <td className="p-2">{component.bundleSize}KB</td>
                        <td className="p-2">{component.renderTime}ms</td>
                        <td className="p-2">{component.memoryUsage}KB</td>
                        <td className="p-2">
                          <span className={cn("font-bold", getScoreColor(component.score))}>
                            {component.score}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deviceMetrics.map((device) => {
              const DeviceIcon = device.device === 'Desktop' ? Monitor : 
                               device.device === 'Mobile' ? Smartphone : 
                               Tablet
              
              return (
                <Card key={device.device}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{device.device}</CardTitle>
                    <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Load Time</span>
                        <span className="font-medium">{device.loadTime}s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Score</span>
                        <span className={cn("font-bold", getScoreColor(device.score))}>
                          {device.score}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Usage</span>
                        <Badge variant="outline">{device.usage}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}