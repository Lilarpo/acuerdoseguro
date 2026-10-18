import { useState } from 'react'
import { Button } from '../ui'

export function CopyHashButton({ value }: { value: string }) {
  const [message, setMessage] = useState('')
  return <span className="inline-flex flex-wrap items-center gap-2">
    <Button variant="outline" onClick={async () => {
      try { await navigator.clipboard.writeText(value); setMessage('Copiado.') }
      catch { setMessage('No se pudo copiar. Selecciona y copia el texto visible.') }
    }}>Copiar</Button>
    <span role="status" className="text-sm">{message}</span>
  </span>
}
