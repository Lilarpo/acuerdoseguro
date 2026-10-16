import type { ComponentProps } from 'react'

export type CardProps = ComponentProps<'div'>

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`w-full min-w-0 rounded-panel border border-outline bg-surface p-6 shadow-panel sm:p-8 ${className}`}
    >
      {children}
    </div>
  )
}
