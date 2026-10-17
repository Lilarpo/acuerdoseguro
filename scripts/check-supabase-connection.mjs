import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const PROJECT_HOST = /^[a-z0-9]{20}\.supabase\.co$/
const PUBLISHABLE_KEY = /^sb_publishable_[A-Za-z0-9_-]{20,}$/
const PLACEHOLDER = /example|placeholder|your|test/i

function result(status, exitCode, message, httpStatus) {
  return { status, exitCode, message, ...(httpStatus === undefined ? {} : { httpStatus }) }
}

function validateConfiguration(env) {
  const rawUrl = env.VITE_SUPABASE_URL?.trim()
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

  if (!rawUrl || !key) {
    return { result: result('CONFIGURACIÓN AUSENTE', 2, 'Supabase no está configurado localmente. No se realizó ninguna petición de red.') }
  }

  if (!PUBLISHABLE_KEY.test(key) || PLACEHOLDER.test(key.slice('sb_publishable_'.length))) {
    return { result: result('CONFIGURACIÓN INVÁLIDA', 1, 'La clave no tiene el formato publishable admitido. No se realizó ninguna petición de red.') }
  }

  let projectUrl
  try {
    projectUrl = new URL(rawUrl)
  } catch {
    return { result: result('CONFIGURACIÓN INVÁLIDA', 1, 'La URL del proyecto no es válida. No se realizó ninguna petición de red.') }
  }

  if (projectUrl.protocol !== 'https:' || projectUrl.username || projectUrl.password || projectUrl.port ||
      projectUrl.pathname !== '/' || projectUrl.search || projectUrl.hash) {
    return { result: result('CONFIGURACIÓN INVÁLIDA', 1, 'La URL debe ser el origen HTTPS del proyecto, sin credenciales, rutas ni parámetros. No se realizó ninguna petición de red.') }
  }

  if (!PROJECT_HOST.test(projectUrl.hostname)) {
    return { result: result('CONFIGURACIÓN INVÁLIDA', 1, 'El dominio no corresponde a un proyecto alojado oficialmente en Supabase. No se envió la clave.') }
  }

  return { endpoint: new URL('/auth/v1/health', projectUrl), key }
}

function validHealth(body) {
  return body !== null && typeof body === 'object' && !Array.isArray(body) &&
    (body.name === 'GoTrue' || body.name === 'Auth') &&
    typeof body.version === 'string' &&
    typeof body.description === 'string' &&
    /authentication api/i.test(body.description)
}

export async function diagnoseSupabase({ env, fetchImpl, timeoutMs = 8000 }) {
  const configuration = validateConfiguration(env)
  if (configuration.result) return configuration.result

  const signal = AbortSignal.timeout(timeoutMs)
  let response
  try {
    response = await fetchImpl(configuration.endpoint, {
      method: 'GET',
      headers: { apikey: configuration.key, accept: 'application/json' },
      redirect: 'manual',
      signal,
    })
  } catch (error) {
    if (signal.aborted || error?.name === 'TimeoutError') {
      return result('CONEXIÓN NO CONFIRMADA', 1, 'La consulta de salud superó el tiempo de espera.')
    }
    const code = error?.cause?.code
    if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
      return result('CONEXIÓN NO CONFIRMADA', 1, 'No se pudo resolver el dominio del proyecto (DNS).')
    }
    if (typeof code === 'string' && (code.startsWith('ERR_TLS_') || code.includes('CERT'))) {
      return result('CONEXIÓN NO CONFIRMADA', 1, 'Falló la validación TLS del servicio.')
    }
    return result('CONEXIÓN NO CONFIRMADA', 1, 'Falló la conexión de red con el servicio.')
  }

  if (response.status >= 300 && response.status < 400) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'El servicio respondió con una redirección inesperada.', response.status)
  }
  if (response.status === 401 || response.status === 403) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'El servicio rechazó la solicitud; no se puede determinar la causa solo con este estado HTTP.', response.status)
  }
  if (response.status === 404) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'El endpoint de salud no está disponible.', response.status)
  }
  if (response.status === 429) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'El servicio limitó la solicitud.', response.status)
  }
  if (response.status >= 500) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'El servicio devolvió un error de servidor.', response.status)
  }
  if (response.status !== 200) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'El servicio devolvió un estado HTTP inesperado.', response.status)
  }

  if (!response.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'La respuesta de salud no es JSON.', response.status)
  }

  let body
  try {
    body = await response.json()
  } catch {
    if (signal.aborted) {
      return result('CONEXIÓN NO CONFIRMADA', 1, 'La consulta de salud superó el tiempo de espera.')
    }
    return result('CONEXIÓN NO CONFIRMADA', 1, 'La respuesta de salud contiene JSON inválido.', response.status)
  }
  if (!validHealth(body)) {
    return result('CONEXIÓN NO CONFIRMADA', 1, 'La respuesta no identifica de forma coherente a Supabase Auth.', response.status)
  }

  return result('SERVICIO ACCESIBLE', 0, 'El endpoint de salud de Supabase Auth respondió correctamente.', response.status)
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const check = await diagnoseSupabase({ env: process.env, fetchImpl: fetch })
  console.log(`${check.status}: ${check.message}${check.httpStatus === undefined ? '' : ` HTTP ${check.httpStatus}.`}`)
  process.exitCode = check.exitCode
}
