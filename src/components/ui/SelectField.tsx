import { useId, type ComponentProps } from 'react'

export type SelectFieldProps = ComponentProps<'select'> & {
  label: string
  error?: string
  helperText?: string
}

export function SelectField({
  label,
  id,
  required,
  error,
  helperText,
  children,
  className = '',
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const helperId = helperText ? `${fieldId}-help` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const description = [describedBy, helperId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="w-full min-w-0 space-y-2">
      <label htmlFor={fieldId} className="block text-sm font-medium text-ink">
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        {...props}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={description}
        className={`block min-h-11 w-full min-w-0 rounded-control border bg-surface px-3 py-2.5 text-base text-ink disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted ${error ? 'border-red-700' : 'border-muted'} ${className}`}
      >
        {children}
      </select>
      {helperText && <p id={helperId} className="text-sm text-muted">{helperText}</p>}
      {error && <p id={errorId} className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
