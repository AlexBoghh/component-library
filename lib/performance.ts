/**
 * Performance monitoring utilities for the application
 */

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.init();
    }
  }

  private init() {
    // Observe Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeTTFB();
    this.observeINP();
    
    // Report metrics when page is about to unload
    if ('addEventListener' in window) {
      window.addEventListener('beforeunload', () => {
        this.reportMetrics();
      });
    }
  }

  private observeLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.set('lcp', observer);
    } catch (e) {
      console.warn('LCP observer not supported');
    }
  }

  private observeFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0] as any;
        this.metrics.fid = firstEntry.processingStart - firstEntry.startTime;
      });
      
      observer.observe({ type: 'first-input', buffered: true });
      this.observers.set('fid', observer);
    } catch (e) {
      console.warn('FID observer not supported');
    }
  }

  private observeCLS() {
    try {
      let clsValue = 0;
      let clsEntries: any[] = [];
      let sessionValue = 0;
      let sessionEntries: any[] = [];
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
            
            if (sessionValue &&
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }
            
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              clsEntries = sessionEntries;
              this.metrics.cls = clsValue;
            }
          }
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.set('cls', observer);
    } catch (e) {
      console.warn('CLS observer not supported');
    }
  }

  private observeTTFB() {
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
      if (navigationEntry) {
        this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      }
    } catch (e) {
      console.warn('TTFB measurement not supported');
    }
  }

  private observeINP() {
    try {
      let inpValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (entry.interactionId) {
            const inp = entry.processingEnd - entry.startTime;
            if (inp > inpValue) {
              inpValue = inp;
              this.metrics.inp = inpValue;
            }
          }
        }
      });
      
      observer.observe({ type: 'event', buffered: true });
      this.observers.set('inp', observer);
    } catch (e) {
      console.warn('INP observer not supported');
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public reportMetrics() {
    const metrics = this.getMetrics();
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metrics);
    }
    
    // Send to analytics service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag;
      
      Object.entries(metrics).forEach(([key, value]) => {
        if (value !== undefined) {
          gtag('event', key, {
            value: Math.round(value),
            metric_value: value,
            metric_delta: value,
          });
        }
      });
    }
    
    // Send to custom endpoint
    if (process.env.NEXT_PUBLIC_METRICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_METRICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          url: window.location.href,
          timestamp: Date.now(),
        }),
      }).catch(() => {
        // Silently fail
      });
    }
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Create singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}

export function getPerformanceMetrics() {
  return performanceMonitor?.getMetrics() || {};
}

export function reportPerformanceMetrics() {
  performanceMonitor?.reportMetrics();
}

// Utility function to measure component render time
export function measureComponentPerformance(componentName: string) {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return () => {};
  }
  
  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-render`;
  
  performance.mark(startMark);
  
  return () => {
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    const measure = performance.getEntriesByName(measureName)[0];
    if (measure && process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${measure.duration.toFixed(2)}ms`);
    }
    
    // Clean up marks and measures
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
  };
}

// Hook for measuring component performance
export function useComponentPerformance(componentName: string) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const measureEnd = measureComponentPerformance(componentName);
    
    // Measure after render
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(measureEnd);
    } else {
      setTimeout(measureEnd, 0);
    }
  }
}