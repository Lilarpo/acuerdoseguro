import { useId, type ComponentProps } from 'react'

export type TextareaFieldProps = Omit<ComponentProps<'textarea'>, 'children'> & {
  label: string
  error?: string
  helperText?: string
}

export function TextareaField({
  label,
  id,
  rows = 4,
  required,
  error,
  helperText,
  className = '',
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaFieldProps) {
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
      <textarea
        {...props}
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={description}
        className={`block min-h-24 w-full min-w-0 resize-y rounded-control border bg-surface px-3 py-2.5 text-base text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted ${error ? 'border-red-700' : 'border-muted'} ${className}`}
      />
      {helperText && <p id={helperId} className="text-sm text-muted">{helperText}</p>}
      {error && <p id={errorId} className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
