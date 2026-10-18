import { getSupabaseClient } from '../../lib/supabaseClient'
import { isContractId, normalizeContractContent, validateContractContent, type ContractContent } from './contractValidation'

export type ContractDraft = ContractContent & {
  id: string
  created_by: string
  status: 'draft'
  created_at: string
}
type FailureCode = 'not_configured' | 'signed_out' | 'unavailable' | 'storage_unavailable' | 'invalid_input' | 'network_error' | 'unknown_error'
export type ContractResult<T> = { ok: true; data: T } | { ok: false; code: FailureCode; message: string }
const columns = 'id,created_by,status,title,description,terms,created_at'
const failure = (code: FailureCode, message: string): ContractResult<never> => ({ ok: false, code, message })
const unavailable = () => failure('unavailable', 'El borrador no está disponible para esta cuenta.')
const signedOut = () => failure('signed_out', 'La sesión cambió o terminó. Vuelve a iniciar sesión para continuar.')

function classifyError(error: unknown): ContractResult<never> {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined
  if (code === '42P01' || code === 'PGRST205') {
    return failure('storage_unavailable', 'El almacenamiento contractual aún no está habilitado. Inténtalo cuando se confirme su activación.')
  }
  if (code === '42501' || code === 'PGRST116') return unavailable()
  if (code === 'PGRST301' || code === 'PGRST303') return signedOut()
  if (code === '23514' || code === '23502' || code === '22001' || code === '22021') {
    return failure('invalid_input', 'Revisa los campos obligatorios y sus límites: título 120, descripción 4.000 y cláusulas 20.000 caracteres.')
  }
  // Supabase may return fetch errors as a result rather than throwing a TypeError.
  const message = error && typeof error === 'object' && 'message' in error ? error.message : ''
  if (error instanceof TypeError || (typeof message === 'string' && /fetch|network|connection/i.test(message))) {
    return failure('network_error', 'No se pudo confirmar la operación. Comprueba tu conexión; antes de volver a crear, revisa el panel para evitar duplicados.')
  }
  return failure('unknown_error', 'No se pudo confirmar la operación contractual. Inténtalo más tarde; si estabas creando, revisa antes el panel.')
}

function isDraft(value: unknown, userId: string): value is ContractDraft {
  if (!value || typeof value !== 'object') return false
  const row = value as Record<string, unknown>
  return typeof row.id === 'string' && isContractId(row.id) && row.created_by === userId && row.status === 'draft' &&
    typeof row.title === 'string' && typeof row.description === 'string' && typeof row.terms === 'string' &&
    typeof row.created_at === 'string' && Number.isFinite(Date.parse(row.created_at))
}

type Client = NonNullable<ReturnType<typeof getSupabaseClient>>

// One shared client. Session observation is a UI safeguard; PostgreSQL RLS authorizes rows.
async function withSession<T>(operation: (client: Client, userId: string) => Promise<ContractResult<T>>): Promise<ContractResult<T>> {
  let subscription: { unsubscribe(): void } | undefined
  try {
    const client = getSupabaseClient()
    if (!client) return failure('not_configured', 'El servicio contractual no está disponible en este momento.')
    let changed = false
    const identity: { userId?: string; observedId?: string; observed: boolean } = { observed: false }
    subscription = client.auth.onAuthStateChange((event, session) => {
      identity.observed = true
      identity.observedId = session?.user.id
      if (event === 'SIGNED_OUT' || (identity.userId && session?.user.id !== identity.userId)) changed = true
    }).data.subscription
    const { data, error } = await client.auth.getSession()
    const userId = data.session?.user.id
    identity.userId = userId
    if (error || !userId || changed || (identity.observed && identity.observedId !== userId)) return signedOut()
    const result = await operation(client, userId)
    // Drop results that completed after logout/account change, including A -> B -> A.
    return changed ? signedOut() : result
  } catch (error) {
    return classifyError(error)
  } finally {
    subscription?.unsubscribe()
  }
}

export async function createContractDraft(input: ContractContent): Promise<ContractResult<ContractDraft>> {
  const content = normalizeContractContent(input)
  if (Object.keys(validateContractContent(content)).length) return failure('invalid_input', 'Revisa los campos y los límites de contenido.')
  return withSession(async (client, userId) => {
    // Explicit allowlist: ignore extra runtime properties, never send identity/status/date.
    const { data, error } = await client.from('contracts').insert(content).select(columns).maybeSingle()
    if (error) return classifyError(error)
    return isDraft(data, userId) ? { ok: true, data } : unavailable()
  })
}

export async function listMyContractDrafts(): Promise<ContractResult<ContractDraft[]>> {
  return withSession(async (client, userId) => {
    const { data, error } = await client.from('contracts').select(columns)
      .eq('created_by', userId).eq('status', 'draft').order('created_at', { ascending: false }).order('id')
    if (error) return classifyError(error)
    if (!Array.isArray(data) || !data.every((row) => isDraft(row, userId))) return unavailable()
    return { ok: true, data }
  })
}

export async function getContractDraftById(id: string): Promise<ContractResult<ContractDraft>> {
  if (!isContractId(id)) return unavailable()
  return withSession(async (client, userId) => {
    const { data, error } = await client.from('contracts').select(columns)
      .eq('id', id).eq('created_by', userId).eq('status', 'draft').maybeSingle()
    if (error) return classifyError(error)
    return isDraft(data, userId) && data.id.toLowerCase() === id.toLowerCase() ? { ok: true, data } : unavailable()
  })
}

export async function updateContractDraft(id: string, input: ContractContent): Promise<ContractResult<ContractDraft>> {
  if (!isContractId(id)) return unavailable()
  const content = normalizeContractContent(input)
  if (Object.keys(validateContractContent(content)).length) return failure('invalid_input', 'Revisa los campos y los límites de contenido.')
  return withSession(async (client, userId) => {
    const { data, error } = await client.from('contracts').update(content)
      .eq('id', id).eq('created_by', userId).eq('status', 'draft').select(columns).maybeSingle()
    if (error) return classifyError(error)
    return isDraft(data, userId) && data.id.toLowerCase() === id.toLowerCase() ? { ok: true, data } : unavailable()
  })
}
