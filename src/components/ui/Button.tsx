import type { ComponentProps } from 'react'

const variants = {
  primary: 'border-transparent bg-accent text-brand enabled:hover:bg-accent-strong enabled:hover:text-surface',
  secondary: 'border-transparent bg-brand text-surface enabled:hover:bg-brand/90',
  outline: 'border-muted bg-surface text-brand enabled:hover:bg-canvas',
}

const sizes = {
  sm: 'min-h-9 px-3 py-2 text-sm',
  md: 'min-h-11 px-4 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
}

export type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex max-w-full items-center justify-center gap-2 rounded-control border font-semibold text-center wrap-anywhere disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
