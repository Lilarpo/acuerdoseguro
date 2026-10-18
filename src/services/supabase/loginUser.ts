import { getSupabaseClient } from '../../lib/supabaseClient'

export type LoginUserInput = {
  email: string
  password: string
}

export type LoginUserResult = {
  status:
    | 'success'
    | 'invalid_credentials'
    | 'email_not_confirmed'
    | 'rate_limited'
    | 'network_error'
    | 'not_configured'
    | 'unexpected_response'
    | 'unknown_error'
  message: string
}

function loginError(error: unknown): LoginUserResult {
  const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined
  const status = typeof error === 'object' && error !== null && 'status' in error ? error.status : undefined
  const name = typeof error === 'object' && error !== null && 'name' in error ? error.name : undefined

  if (code === 'invalid_credentials' || code === 'user_not_found') {
    return { status: 'invalid_credentials', message: 'No pudimos iniciar sesión. Comprueba tu correo y contraseña.' }
  }
  if (code === 'email_not_confirmed') {
    return { status: 'email_not_confirmed', message: 'Si tu cuenta tiene una confirmación pendiente, revisa tu correo electrónico.' }
  }
  if (status === 429 || code === 'over_request_rate_limit') {
    return { status: 'rate_limited', message: 'Se han realizado demasiados intentos. Espera un momento antes de volver a intentar.' }
  }
  if (error instanceof TypeError || name === 'AuthRetryableFetchError' || status === 0) {
    return { status: 'network_error', message: 'No fue posible conectar con el servicio. Comprueba tu conexión e inténtalo nuevamente.' }
  }
  if (name === 'AuthInvalidTokenResponseError') {
    return { status: 'unexpected_response', message: 'El servicio no devolvió una sesión válida. Inténtalo nuevamente más tarde.' }
  }
  // Never expose SDK messages or distinguish an unknown account from a bad password.
  return { status: 'unknown_error', message: 'No pudimos iniciar sesión. Comprueba tu correo y contraseña.' }
}

export async function loginUser(input: LoginUserInput): Promise<LoginUserResult> {
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
    const { data, error } = await client.auth.signInWithPassword({
      email: input.email.trim(),
      password: input.password,
    })
    if (error) return loginError(error)

    const session = data?.session
    // Inspect the response only; observing a client session is not data authorization.
    if (!session || !data?.user || typeof data.user.id !== 'string' || !data.user.id.trim() || session.user?.id !== data.user.id ||
        typeof session.access_token !== 'string' || !session.access_token.trim() ||
        typeof session.refresh_token !== 'string' || !session.refresh_token.trim() ||
        session.token_type !== 'bearer' || typeof session.expires_at !== 'number' ||
        !Number.isFinite(session.expires_at) || session.expires_at <= Date.now() / 1000) {
      return { status: 'unexpected_response', message: 'El servicio no devolvió una sesión válida. Inténtalo nuevamente más tarde.' }
    }

    // The SDK notifies AuthProvider; no tokens or session are returned to the page.
    return { status: 'success', message: 'Inicio de sesión correcto. Tu sesión está activa durante esta ejecución de la aplicación.' }
  } catch (error: unknown) {
    return loginError(error)
  }
}
