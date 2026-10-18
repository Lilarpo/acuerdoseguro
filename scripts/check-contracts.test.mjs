import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'

// Execute the actual TypeScript service using the installed compiler and a controlled client.
// No environment files, real credentials, SDK clients or network requests are used.
const compile = (source) => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText).toString('base64')
const validationUrl = compile(await readFile(new URL('../src/services/supabase/contractValidation.ts', import.meta.url), 'utf8'))
const validation = await import(validationUrl)
const source = (await readFile(new URL('../src/services/supabase/contracts.ts', import.meta.url), 'utf8'))
  .replace("import { getSupabaseClient } from '../../lib/supabaseClient'", 'const getSupabaseClient = () => globalThis.__contractTestClient')
  .replace("'./contractValidation'", JSON.stringify(validationUrl))
const service = await import(compile(source))
const uid = '11111111-1111-4111-8111-111111111111'
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
const content = { title: 'Acuerdo de prueba', description: 'Objeto', terms: 'Cláusulas' }
const row = { ...content, id, created_by: uid, status: 'draft', created_at: '2026-10-18T12:00:00Z' }

function fixture({ data = row, error = null, noSession = false, thrown, delayed = false } = {}) {
  const calls = []
  const listeners = new Set()
  let release
  const pending = new Promise((resolve) => { release = resolve })
  const builder = {}
  for (const method of ['select', 'insert', 'update', 'eq', 'order', 'maybeSingle']) {
    builder[method] = (...args) => { calls.push([method, ...args]); return builder }
  }
  builder.then = async (resolve, reject) => {
    if (delayed) await pending
    if (thrown) return reject(thrown)
    return resolve({ data, error })
  }
  globalThis.__contractTestClient = {
    auth: {
      getSession: async () => ({ data: { session: noSession ? null : { user: { id: uid } } }, error: null }),
      onAuthStateChange: (callback) => {
        listeners.add(callback)
        return { data: { subscription: { unsubscribe: () => listeners.delete(callback) } } }
      },
    },
    from: (table) => { assert.equal(table, 'contracts'); return builder },
  }
  return { calls, release, listeners, emit: (event, userId) => {
    for (const callback of listeners) callback(event, userId ? { user: { id: userId } } : null)
  } }
}

for (const field of validation.contractFields) {
  test(`${field}: vacío y solo espacios rechazados`, () => {
    for (const value of ['', '   ']) assert.ok(validation.validateContractContent({ ...content, [field]: value })[field])
  })
  test(`${field}: debajo, en y sobre el límite, ASCII y Unicode`, () => {
    const limit = validation.contractLimits[field]
    for (const char of ['a', '😀']) {
      for (const size of [limit - 1, limit, limit + 1]) {
        assert.equal(Boolean(validation.validateContractContent({ ...content, [field]: char.repeat(size) })[field]), size > limit)
      }
    }
  })
}
test('Unicode por puntos de código, normalización LF sin truncado ni recorte', () => {
  assert.equal(validation.countCharacters('😀'), 1)
  assert.equal(validation.countCharacters('e\u0301'), 2)
  assert.equal(validation.countCharacters('👩‍💻'), 3)
  assert.deepEqual(validation.normalizeContractContent({ ...content, description: ' a\r\nb\rc ' }), { ...content, description: ' a\nb\nc ' })
  for (const value of ['\0', '\ud800', '\udc00']) assert.ok(validation.validateContractContent({ ...content, terms: value }).terms)
  // Characterize the existing btrim rule, without silently broadening SQL constraints.
  assert.deepEqual(validation.validateContractContent({ ...content, terms: '\t\n' }), {})
})
test('crear: solo tres columnas y respuesta confirmada', async () => {
  const f = fixture()
  const result = await service.createContractDraft({ ...content, id: 'forbidden', created_by: 'other', status: 'signed', created_at: 'x' })
  assert.equal(result.ok, true)
  assert.deepEqual(f.calls.find(([name]) => name === 'insert')[1], content)
  assert.equal(f.listeners.size, 0)
})
test('entrada inválida: no consulta ni escribe', async () => {
  const f = fixture()
  assert.equal((await service.createContractDraft({ ...content, description: 'a'.repeat(4001) })).code, 'invalid_input')
  assert.equal(f.calls.length, 0)
})
test('listado vacío y listado con respuesta recibida', async () => {
  fixture({ data: [] }); assert.deepEqual(await service.listMyContractDrafts(), { ok: true, data: [] })
  const f = fixture({ data: [row] })
  assert.deepEqual((await service.listMyContractDrafts()).data, [row])
  assert.ok(f.calls.some((call) => call[0] === 'eq' && call[1] === 'created_by' && call[2] === uid))
})
test('detalle válido; UUID inválido no llega al cliente', async () => {
  const f = fixture()
  assert.deepEqual((await service.getContractDraftById(id)).data, row)
  const previous = f.calls.length
  assert.equal((await service.getContractDraftById('invalid')).code, 'unavailable')
  assert.equal(f.calls.length, previous)
})
test('editar: solo contenido, ID y usuario filtrados, retorno confirmado', async () => {
  const f = fixture()
  assert.equal((await service.updateContractDraft(id, { ...content, id: 'no', status: 'signed', created_by: 'no' })).ok, true)
  assert.deepEqual(f.calls.find(([name]) => name === 'update')[1], content)
  assert.ok(f.calls.some((call) => call[0] === 'eq' && call[1] === 'id' && call[2] === id))
})
test('cero filas y denegación no revelan existencia ni propiedad', async () => {
  fixture({ data: null })
  const missing = await service.getContractDraftById(id)
  fixture({ error: { code: '42501', message: 'private detail' } })
  assert.deepEqual(await service.getContractDraftById(id), missing)
  fixture({ data: null }); assert.equal((await service.updateContractDraft(id, content)).code, 'unavailable')
  fixture({ data: null }); assert.equal((await service.createContractDraft(content)).ok, false)
})
test('fila de otra cuenta o malformada se descarta defensivamente', async () => {
  fixture({ data: { ...row, created_by: 'other' } })
  assert.equal((await service.getContractDraftById(id)).ok, false)
  fixture({ data: [{ ...row, status: 'signed' }] })
  assert.equal((await service.listMyContractDrafts()).ok, false)
})
for (const code of ['42P01', 'PGRST205']) {
  test(`tabla no habilitada: ${code}`, async () => {
    fixture({ error: { code, message: 'internal secret' } })
    const result = await service.createContractDraft(content)
    assert.equal(result.code, 'storage_unavailable')
    assert.ok(!result.message.includes('internal'))
  })
}
test('red, restricciones y error desconocido: mensajes seguros', async () => {
  fixture({ thrown: new TypeError('private network') })
  assert.equal((await service.listMyContractDrafts()).code, 'network_error')
  fixture({ error: { code: '23514', message: 'private SQL' } })
  assert.equal((await service.updateContractDraft(id, content)).code, 'invalid_input')
  fixture({ error: { message: 'private SQL' } })
  assert.ok(!JSON.stringify(await service.listMyContractDrafts()).includes('private SQL'))
})
test('sin configuración y sin sesión no se consulta la tabla', async () => {
  globalThis.__contractTestClient = null
  assert.equal((await service.listMyContractDrafts()).code, 'not_configured')
  const f = fixture({ noSession: true })
  assert.equal((await service.listMyContractDrafts()).code, 'signed_out')
  assert.equal(f.calls.length, 0)
})
for (const event of ['logout', 'switch', 'A-B-A']) {
  test(`respuesta tardía descartada tras ${event}`, async () => {
    const f = fixture({ delayed: true })
    const result = service.getContractDraftById(id)
    await new Promise((resolve) => setImmediate(resolve))
    if (event === 'logout') f.emit('SIGNED_OUT')
    else {
      f.emit('SIGNED_IN', '22222222-2222-4222-8222-222222222222')
      if (event === 'A-B-A') f.emit('SIGNED_IN', uid)
    }
    f.release()
    assert.equal((await result).code, 'signed_out')
    assert.equal(f.listeners.size, 0)
  })
}
test('SQL local: límites añadidos y protecciones originales conservadas por inspección', async () => {
  const sql = await readFile(new URL('../supabase/migrations/20261018032013_create_private_contract_drafts.sql', import.meta.url), 'utf8')
  assert.match(sql, /char_length\(description\) <= 4000/)
  assert.match(sql, /char_length\(terms\) <= 20000/)
  assert.match(sql, /on delete restrict/)
  assert.match(sql, /revoke all on table public.contracts from public, anon, authenticated/)
  assert.match(sql, /grant update \(title, description, terms\) on (?:table )?public\.contracts to authenticated/)
  assert.match(sql, /enable row level security/)
  assert.equal((sql.match(/create policy /g) ?? []).length, 3)
  assert.ok(!/grant delete|for delete|to anon;/i.test(sql))
  assert.ok(sql.indexOf('begin;') < sql.indexOf('create table') && sql.indexOf('commit;') > sql.indexOf('create policy contracts_update'))
})
