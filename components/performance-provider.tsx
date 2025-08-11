'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring, reportPerformanceMetrics } from '@/lib/performance';

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    // Initialize performance monitoring
    const monitor = initPerformanceMonitoring();
    
    // Report metrics on page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        reportPerformanceMetrics();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Report metrics before unload
    const handleBeforeUnload = () => {
      reportPerformanceMetrics();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      monitor?.destroy();
    };
  }, []);
  
  return <>{children}</>;
}