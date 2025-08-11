import { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react'

export type ComponentSize = 'sm' | 'md' | 'lg'
export type ComponentVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'

export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  asChild?: boolean
}

export interface SizeProps {
  size?: ComponentSize
}

export interface VariantProps {
  variant?: ComponentVariant
}

export type PropsWithAsChild<T> = T & {
  asChild?: boolean
}

export type ComponentRef<T extends keyof JSX.IntrinsicElements | React.ComponentType<any>> = 
  ElementRef<T>

export type ComponentPropsWithRef<T extends keyof JSX.IntrinsicElements | React.ComponentType<any>> = 
  ComponentPropsWithoutRef<T> & {
    ref?: React.Ref<ComponentRef<T>>
  }

export type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = Props & {
  as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, keyof Props | 'as'>

export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref']

export type PolymorphicComponentPropsWithRef<
  T extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> }