import type { ComponentProps, ReactNode } from 'react'

const tones = {
  neutral: 'bg-canvas text-ink',
  info: 'bg-brand text-surface',
  success: 'bg-accent-strong text-surface',
  warning: 'bg-amber-50 text-amber-900',
  danger: 'bg-red-50 text-red-800',
}

export type BadgeProps = ComponentProps<'span'> & {
  children: ReactNode
  tone?: keyof typeof tones
}

export function Badge({ children, tone = 'neutral', className = '', ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-normal wrap-anywhere ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
