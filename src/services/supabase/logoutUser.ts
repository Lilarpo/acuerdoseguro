import { getSupabaseClient } from '../../lib/supabaseClient'

export type LogoutUserResult = {
  status: 'success' | 'not_configured' | 'network_error' | 'rate_limited' | 'auth_error' | 'unknown_error'
  message: string
}

function logoutError(error: unknown): LogoutUserResult {
  const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined
  const status = typeof error === 'object' && error !== null && 'status' in error ? error.status : undefined
  const name = typeof error === 'object' && error !== null && 'name' in error ? error.name : undefined

  if (status === 429 || code === 'over_request_rate_limit') {
    return { status: 'rate_limited', message: 'Se han realizado demasiados intentos. Espera un momento antes de volver a intentar.' }
  }
  if (error instanceof TypeError || name === 'AuthRetryableFetchError' || status === 0) {
    return { status: 'network_error', message: 'No fue posible cerrar la sesión. Comprueba tu conexión e inténtalo nuevamente.' }
  }
  if (name === 'AuthApiError' || typeof code === 'string') {
    return { status: 'auth_error', message: 'No fue posible cerrar la sesión. Inténtalo nuevamente.' }
  }
  return { status: 'unknown_error', message: 'No fue posible cerrar la sesión. Inténtalo nuevamente.' }
}

export async function logoutUser(): Promise<LogoutUserResult> {
  let client: ReturnType<typeof getSupabaseClient>
  try {
    client = getSupabaseClient()
  } catch {
    return { status: 'not_configured', message: 'El servicio de autenticación no está disponible en este momento.' }
  }
  if (!client) {
    return { status: 'not_configured', message: 'El servicio de autenticación no está disponible en este momento.' }
  }

  try {
    // End only the current session; the SDK notifies AuthProvider via SIGNED_OUT.
    const response = await client.auth.signOut({ scope: 'local' })
    if (!response || !('error' in response)) return logoutError(undefined)
    if (response.error) return logoutError(response.error)
    // This confirms the operation, not that React has observed signed_out yet.
    return { status: 'success', message: 'La operación de cierre de sesión se completó.' }
  } catch (error: unknown) {
    return logoutError(error)
  }
}
