import { useEffect, useState } from 'react'
import type { ContractResult } from '../../services/supabase/contracts'

export function useContractQuery<T>(load: () => Promise<ContractResult<T>>) {
  const [result, setResult] = useState<ContractResult<T> | null>(null)
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    let active = true
    void load().then((response) => {
      if (active) setResult(response)
    }).catch(() => {
      if (active) setResult({ ok: false, code: 'unknown_error', message: 'No se pudo cargar el borrador. Inténtalo nuevamente.' })
    })
    return () => { active = false }
  }, [load, revision])
  function reload() {
    setResult(null)
    setRevision((value) => value + 1)
  }
  return { result, reload, setResult }
}
