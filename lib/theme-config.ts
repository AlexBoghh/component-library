export type ThemeMode = 'light' | 'dark' | 'system'

export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'slate'

export type FontFamily = 'inter' | 'roboto' | 'system'

export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type Density = 'compact' | 'comfortable' | 'spacious'

export interface ThemeConfig {
  mode: ThemeMode
  colorScheme: ColorScheme
  font: FontFamily
  radius: Radius
  density: Density
}

export const defaultTheme: ThemeConfig = {
  mode: 'dark',
  colorScheme: 'purple',
  font: 'inter',
  radius: 'md',
  density: 'comfortable',
}

export const colorSchemes = {
  blue: {
    light: {
      primary: '217 91% 60%',
      'primary-foreground': '0 0% 100%',
      secondary: '214 32% 91%',
      'secondary-foreground': '222 47% 11%',
      accent: '214 32% 91%',
      'accent-foreground': '222 47% 11%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 0% 100%',
      muted: '214 32% 91%',
      'muted-foreground': '215 16% 47%',
    },
    dark: {
      primary: '217 91% 60%',
      'primary-foreground': '0 0% 100%',
      secondary: '217 33% 17%',
      'secondary-foreground': '210 40% 98%',
      accent: '217 33% 17%',
      'accent-foreground': '210 40% 98%',
      destructive: '0 63% 31%',
      'destructive-foreground': '210 40% 98%',
      muted: '217 33% 17%',
      'muted-foreground': '215 20% 65%',
    },
  },
  green: {
    light: {
      primary: '142 71% 45%',
      'primary-foreground': '0 0% 100%',
      secondary: '141 32% 91%',
      'secondary-foreground': '140 47% 11%',
      accent: '141 32% 91%',
      'accent-foreground': '140 47% 11%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 0% 100%',
      muted: '141 32% 91%',
      'muted-foreground': '140 16% 47%',
    },
    dark: {
      primary: '142 71% 45%',
      'primary-foreground': '0 0% 100%',
      secondary: '140 33% 17%',
      'secondary-foreground': '141 40% 98%',
      accent: '140 33% 17%',
      'accent-foreground': '141 40% 98%',
      destructive: '0 63% 31%',
      'destructive-foreground': '141 40% 98%',
      muted: '140 33% 17%',
      'muted-foreground': '140 20% 65%',
    },
  },
  purple: {
    light: {
      primary: '280 70% 55%',
      'primary-foreground': '0 0% 100%',
      secondary: '240 4.8% 95.9%',
      'secondary-foreground': '240 5.9% 10%',
      accent: '300 60% 50%',
      'accent-foreground': '0 0% 100%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 0% 100%',
      muted: '240 4.8% 95.9%',
      'muted-foreground': '240 3.8% 46.1%',
    },
    dark: {
      primary: '280 70% 55%',
      'primary-foreground': '0 0% 100%',
      secondary: '240 10% 20%',
      'secondary-foreground': '0 0% 95%',
      accent: '300 60% 50%',
      'accent-foreground': '0 0% 100%',
      destructive: '0 63% 31%',
      'destructive-foreground': '0 0% 98%',
      muted: '240 10% 15%',
      'muted-foreground': '240 5% 65%',
    },
  },
  orange: {
    light: {
      primary: '25 95% 53%',
      'primary-foreground': '0 0% 100%',
      secondary: '25 32% 91%',
      'secondary-foreground': '25 47% 11%',
      accent: '25 32% 91%',
      'accent-foreground': '25 47% 11%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 0% 100%',
      muted: '25 32% 91%',
      'muted-foreground': '25 16% 47%',
    },
    dark: {
      primary: '25 95% 53%',
      'primary-foreground': '0 0% 100%',
      secondary: '25 33% 17%',
      'secondary-foreground': '25 40% 98%',
      accent: '25 33% 17%',
      'accent-foreground': '25 40% 98%',
      destructive: '0 63% 31%',
      'destructive-foreground': '25 40% 98%',
      muted: '25 33% 17%',
      'muted-foreground': '25 20% 65%',
    },
  },
  rose: {
    light: {
      primary: '347 77% 50%',
      'primary-foreground': '0 0% 100%',
      secondary: '346 32% 91%',
      'secondary-foreground': '347 47% 11%',
      accent: '346 32% 91%',
      'accent-foreground': '347 47% 11%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 0% 100%',
      muted: '346 32% 91%',
      'muted-foreground': '346 16% 47%',
    },
    dark: {
      primary: '347 77% 50%',
      'primary-foreground': '0 0% 100%',
      secondary: '346 33% 17%',
      'secondary-foreground': '346 40% 98%',
      accent: '346 33% 17%',
      'accent-foreground': '346 40% 98%',
      destructive: '0 63% 31%',
      'destructive-foreground': '346 40% 98%',
      muted: '346 33% 17%',
      'muted-foreground': '346 20% 65%',
    },
  },
  slate: {
    light: {
      primary: '222 47% 11%',
      'primary-foreground': '0 0% 100%',
      secondary: '210 40% 96%',
      'secondary-foreground': '222 47% 11%',
      accent: '210 40% 96%',
      'accent-foreground': '222 47% 11%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 0% 100%',
      muted: '210 40% 96%',
      'muted-foreground': '215 16% 47%',
    },
    dark: {
      primary: '210 40% 98%',
      'primary-foreground': '222 47% 11%',
      secondary: '217 33% 17%',
      'secondary-foreground': '210 40% 98%',
      accent: '217 33% 17%',
      'accent-foreground': '210 40% 98%',
      destructive: '0 63% 31%',
      'destructive-foreground': '210 40% 98%',
      muted: '217 33% 17%',
      'muted-foreground': '215 20% 65%',
    },
  },
}

export const fontFamilies = {
  inter: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  roboto: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
}

export const radiusValues = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  full: '1rem',
}

export const densityValues = {
  compact: {
    spacing: '0.25rem',
    padding: '0.375rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  comfortable: {
    spacing: '0.375rem',
    padding: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  spacious: {
    spacing: '0.5rem',
    padding: '0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}