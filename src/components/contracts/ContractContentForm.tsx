import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button, TextareaField, TextField } from '../ui'
import {
  contractFields, contractLabels, contractLimits, countCharacters, normalizeContractContent,
  validateContractContent, type ContractContent, type ContractErrors,
} from '../../services/supabase/contractValidation'
import type { ContractDraft, ContractResult } from '../../services/supabase/contracts'

type Props = {
  initialValue?: ContractContent
  submitLabel: string
  onSave: (content: ContractContent) => Promise<ContractResult<ContractDraft>>
  onSaved: (draft: ContractDraft) => void
  onUnavailable?: () => void
}

export function ContractContentForm({ initialValue, submitLabel, onSave, onSaved, onUnavailable }: Props) {
  const [values, setValues] = useState<ContractContent>(() => initialValue
    ? normalizeContractContent(initialValue) : { title: '', description: '', terms: '' })
  const [errors, setErrors] = useState<ContractErrors>({})
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const locked = useRef(false)
  const alive = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    alive.current = true
    return () => { alive.current = false }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (locked.current) return
    const content = normalizeContractContent(values)
    const nextErrors = validateContractContent(content)
    setErrors(nextErrors)
    setMessage('')
    const firstError = contractFields.find((field) => nextErrors[field])
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus()
      return
    }
    locked.current = true
    setBusy(true)
    try {
      const result = await onSave(content)
      if (!alive.current) return
      if (result.ok) onSaved(result.data)
      else if (onUnavailable && (result.code === 'unavailable' || result.code === 'signed_out')) onUnavailable()
      else setMessage(result.message)
    } catch {
      if (alive.current) setMessage('No se pudo confirmar el guardado. Revisa el panel antes de volver a crear el borrador.')
    } finally {
      locked.current = false
      if (alive.current) setBusy(false)
    }
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-6" aria-busy={busy}>
      {contractFields.map((field) => {
        const props = {
          name: field, label: contractLabels[field], required: true, disabled: busy,
          value: values[field], error: errors[field],
          helperText: `${countCharacters(values[field]).toLocaleString('es')} / ${contractLimits[field].toLocaleString('es')} caracteres (puntos de código Unicode).`,
          onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.currentTarget.value.replace(/\r\n?/g, '\n')
            setValues((previous) => ({ ...previous, [field]: value }))
            setErrors((previous) => ({ ...previous, [field]: undefined }))
            setMessage('')
          },
        }
        return field === 'title'
          ? <TextField key={field} {...props} />
          : <TextareaField key={field} {...props} rows={field === 'terms' ? 10 : 5} />
      })}
      <Button type="submit" disabled={busy}>{busy ? 'Guardando…' : submitLabel}</Button>
      {message && <p role="alert" className="text-red-700">{message}</p>}
      <p className="text-sm text-muted">Se conservan espacios y composición Unicode; los saltos de línea se normalizan a LF. El texto no se recorta automáticamente.</p>
    </form>
  )
}
