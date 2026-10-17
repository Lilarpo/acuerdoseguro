import assert from 'node:assert/strict'
import test from 'node:test'
import { diagnoseSupabase } from './check-supabase-connection.mjs'

const url = 'https://abcdefghijklmnopqrst.supabase.co'
const key = `sb_publishable_${'A'.repeat(32)}`
const configured = { VITE_SUPABASE_URL: url, VITE_SUPABASE_PUBLISHABLE_KEY: key }
const noNetwork = () => { throw new Error('La prueba intentó usar la red') }

function healthResponse(body = {
  name: 'GoTrue',
  version: 'v2.0.0',
  description: 'GoTrue is a user registration and authentication API',
}) {
  return Response.json(body)
}

for (const [name, env] of [
  ['sin variables', {}],
  ['solo URL', { VITE_SUPABASE_URL: url }],
  ['solo clave', { VITE_SUPABASE_PUBLISHABLE_KEY: key }],
]) {
  test(name, async () => {
    const check = await diagnoseSupabase({ env, fetchImpl: noNetwork })
    assert.equal(check.status, 'CONFIGURACIÓN AUSENTE')
    assert.equal(check.exitCode, 2)
  })
}

for (const [name, env] of [
  ['URL mal formada', { ...configured, VITE_SUPABASE_URL: 'no-es-url' }],
  ['URL sin HTTPS', { ...configured, VITE_SUPABASE_URL: 'http://abcdefghijklmnopqrst.supabase.co' }],
  ['URL con credenciales', { ...configured, VITE_SUPABASE_URL: 'https://user:pass@abcdefghijklmnopqrst.supabase.co' }],
  ['URL con parámetros', { ...configured, VITE_SUPABASE_URL: `${url}/?x=1` }],
  ['clave secreta', { ...configured, VITE_SUPABASE_PUBLISHABLE_KEY: `sb_secret_${'A'.repeat(32)}` }],
  ['clave de ejemplo', { ...configured, VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example_placeholder_value' }],
  ['dominio no autorizado', { ...configured, VITE_SUPABASE_URL: 'https://abcdefghijklmnopqrst.supabase.co.attacker.example' }],
  ['dominio personalizado', { ...configured, VITE_SUPABASE_URL: 'https://auth.example.org' }],
]) {
  test(name, async () => {
    const check = await diagnoseSupabase({ env, fetchImpl: noNetwork })
    assert.equal(check.status, 'CONFIGURACIÓN INVÁLIDA')
    assert.equal(check.exitCode, 1)
    assert.equal(check.message.includes(key), false)
  })
}

test('salud válida: una petición GET al endpoint oficial', async () => {
  let calls = 0
  const check = await diagnoseSupabase({
    env: configured,
    fetchImpl: async (endpoint, options) => {
      calls += 1
      assert.equal(endpoint.href, `${url}/auth/v1/health`)
      assert.equal(options.method, 'GET')
      assert.equal(options.headers.apikey, key)
      assert.equal(options.headers.accept, 'application/json')
      assert.equal(options.redirect, 'manual')
      assert.equal(options.signal.aborted, false)
      return healthResponse()
    },
  })
  assert.equal(calls, 1)
  assert.equal(check.status, 'SERVICIO ACCESIBLE')
  assert.equal(check.exitCode, 0)
  assert.equal(check.httpStatus, 200)
  assert.equal(JSON.stringify(check).includes(key), false)
})

for (const body of [{}, { name: 'AnotherSite', version: '1', description: 'Some API' }]) {
  test(`HTTP 200 engañoso: ${JSON.stringify(body)}`, async () => {
    const check = await diagnoseSupabase({ env: configured, fetchImpl: async () => healthResponse(body) })
    assert.equal(check.status, 'CONEXIÓN NO CONFIRMADA')
    assert.equal(check.exitCode, 1)
  })
}

for (const status of [302, 401, 403, 404, 429, 500]) {
  test(`HTTP ${status} no confirma la conexión`, async () => {
    let calls = 0
    const check = await diagnoseSupabase({
      env: configured,
      fetchImpl: async () => {
        calls += 1
        return new Response(null, { status })
      },
    })
    assert.equal(calls, 1)
    assert.equal(check.status, 'CONEXIÓN NO CONFIRMADA')
    assert.equal(check.httpStatus, status)
    assert.equal(check.exitCode, 1)
  })
}

test('fallo DNS se clasifica sin revelar la clave', async () => {
  const check = await diagnoseSupabase({
    env: configured,
    fetchImpl: async () => { throw new TypeError('fetch failed', { cause: { code: 'EAI_AGAIN' } }) },
  })
  assert.equal(check.status, 'CONEXIÓN NO CONFIRMADA')
  assert.match(check.message, /DNS/)
  assert.equal(JSON.stringify(check).includes(key), false)
})

test('timeout termina con un resultado controlado', async () => {
  const check = await diagnoseSupabase({
    env: configured,
    timeoutMs: 2,
    fetchImpl: async (_endpoint, options) => {
      await new Promise((resolve) => setTimeout(resolve, 20))
      if (options.signal.aborted) throw options.signal.reason
      return healthResponse()
    },
  })
  assert.equal(check.status, 'CONEXIÓN NO CONFIRMADA')
  assert.match(check.message, /tiempo de espera/)
  assert.equal(check.exitCode, 1)
})
