import { getSupabaseClient } from '../../lib/supabaseClient'

export type RegisterUserInput = {
  name: string
  email: string
  password: string
}

export type RegisterUserResult =
  | { status: 'accepted'; message: string }
  | { status: 'session_present'; message: string }
  | { status: 'configuration_error'; message: string }
  | { status: 'validation_error'; message: string }
  | { status: 'connectivity_error'; message: string }
  | { status: 'rate_limited'; message: string }
  | { status: 'rejected'; message: string }

function registrationError(error: unknown): RegisterUserResult {
  const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined
  const status = typeof error === 'object' && error !== null && 'status' in error ? error.status : undefined
  const name = typeof error === 'object' && error !== null && 'name' in error ? error.name : undefined

  if (status === 429 || code === 'over_request_rate_limit' || code === 'over_email_send_rate_limit') {
    return { status: 'rate_limited', message: 'Se alcanzó el límite de solicitudes. Espera antes de volver a intentarlo.' }
  }
  if (code === 'weak_password') {
    return { status: 'validation_error', message: 'La contraseña no cumple la política de seguridad del servicio. Elige otra contraseña e inténtalo nuevamente.' }
  }
  if (code === 'email_address_invalid' || code === 'validation_failed') {
    return { status: 'validation_error', message: 'El servicio no pudo validar los datos. Revisa el correo y los demás campos.' }
  }
  if (error instanceof TypeError || name === 'AuthRetryableFetchError' || status === 0) {
    return { status: 'connectivity_error', message: 'No fue posible completar la solicitud. Comprueba tu conexión e inténtalo nuevamente.' }
  }
  // Use the same neutral response for existing accounts and other rejections.
  // Never expose the SDK message, email, session or tokens to the UI.
  return { status: 'rejected', message: 'No fue posible completar la solicitud. Revisa los datos o inténtalo más tarde.' }
}

export async function registerUser(input: RegisterUserInput): Promise<RegisterUserResult> {
  let client
  try {
    client = getSupabaseClient()
  } catch {
    return { status: 'configuration_error', message: 'El servicio de registro no está disponible. Inténtalo más tarde.' }
  }
  if (!client) {
    return { status: 'configuration_error', message: 'El servicio de registro no está disponible. Inténtalo más tarde.' }
  }

  try {
    const { data, error } = await client.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      // User-provided metadata is not verified legal identity or authorization.
      options: { data: { full_name: input.name.trim() } },
    })
    if (error) return registrationError(error)
    if (data.session) {
      return { status: 'session_present', message: 'La solicitud de registro fue procesada. La gestión de acceso y navegación se completará en los siguientes bloques.' }
    }
    // Preserve ambiguous responses, including obfuscated users for existing accounts.
    return { status: 'accepted', message: 'Si el registro puede completarse, recibirás instrucciones en tu correo electrónico. Revisa también la carpeta de spam.' }
  } catch (error: unknown) {
    return registrationError(error)
  }
}
