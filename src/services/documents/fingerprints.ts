import type { ContractDraft } from '../supabase/contracts'

export const MAX_FILE_BYTES = 10 * 1024 * 1024
export const isSha256 = (value: string) => /^[a-f0-9]{64}$/i.test(value.trim())
export const bytesToHex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
export function hashBytes(hex: string): Uint8Array {
  if (!isSha256(hex)) throw new Error('La huella debe tener 64 caracteres hexadecimales.')
  return Uint8Array.from(hex.trim().match(/../g)!, (pair) => Number.parseInt(pair, 16))
}
export function equalHashes(left: string, right: string): boolean {
  return isSha256(left) && isSha256(right) && left.trim().toLowerCase() === right.trim().toLowerCase()
}

// v1: exact values from the saved row; fixed key order, compact JSON, UTF-8.
// No trim, Unicode normalization, date conversion, BOM or trailing newline.
export function canonicalContract(draft: ContractDraft): string {
  return JSON.stringify({
    format_version: 1,
    contract_id: draft.id,
    creator_id: draft.created_by,
    title: draft.title,
    description: draft.description,
    terms: draft.terms,
    created_at: draft.created_at,
  })
}

export async function sha256(value: string | ArrayBuffer): Promise<string> {
  if (!globalThis.crypto?.subtle) throw new Error('SHA-256 necesita HTTPS o localhost con Web Crypto disponible.')
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : new Uint8Array(value)
  return bytesToHex(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)))
}

export async function hashFile(file: Blob): Promise<string> {
  if (file.size === 0) throw new Error('El archivo está vacío. Selecciona un archivo con contenido.')
  if (file.size > MAX_FILE_BYTES) throw new Error('El archivo supera el máximo de 10 MiB.')
  let bytes: ArrayBuffer
  try { bytes = await file.arrayBuffer() } catch { throw new Error('No se pudo leer el archivo local.') }
  return sha256(bytes)
}

export function downloadJson(value: unknown, filename: string) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
