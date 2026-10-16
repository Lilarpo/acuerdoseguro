import type { ComponentProps } from 'react'

export type PageContainerProps = ComponentProps<'div'>

export function PageContainer({ children, className = '', ...props }: PageContainerProps) {
  return (
    <div {...props} className={`mx-auto w-full min-w-0 max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  )
}
