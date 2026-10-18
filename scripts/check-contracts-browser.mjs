// Local Chrome + Vite integration checks with an in-memory Supabase double.
// Start Vite on 127.0.0.1:5173 first; no real environment values or backend are used.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

const base = 'http://127.0.0.1:5173'
const port = 9250
const profile = await mkdtemp(join(tmpdir(), 'acuerdoseguro-contracts-'))
const browser = spawn('google-chrome', [
  '--headless', '--disable-gpu', '--disable-background-networking', '--no-first-run',
  '--user-data-dir=' + profile, '--remote-debugging-port=' + port, 'about:blank',
], { stdio: 'ignore' })
browser.on('error', (error) => { console.error(error.message); process.exitCode = 1 })

const mock = String.raw`
window.__user = '11111111-1111-4111-8111-111111111111';
window.__rows = []; window.__calls = []; window.__mode = ''; window.__pending = false;
const listeners = new Set();
const session = () => window.__user ? {user: {id: window.__user}} : null;
window.__changeUser = (id) => {window.__user = id; for (const listener of listeners) listener(id ? 'SIGNED_IN' : 'SIGNED_OUT', session());};
window.__contractClient = {
  auth: {
    getSession: async () => ({data: {session: session()}, error: null}),
    onAuthStateChange: (callback) => {
      listeners.add(callback);
      queueMicrotask(() => {if (listeners.has(callback)) callback('INITIAL_SESSION', session());});
      return {data: {subscription: {unsubscribe: () => listeners.delete(callback)}}};
    },
    signOut: async () => {window.__changeUser(null); return {error: null};},
  },
  from: (table) => {
    if (table !== 'contracts') throw Error('Unexpected table');
    let operation = 'select', payload, single = false;
    const filters = [];
    const query = {
      select: () => query,
      insert: (value) => {operation = 'insert'; payload = value; return query;},
      update: (value) => {operation = 'update'; payload = value; return query;},
      eq: (key, value) => {filters.push([key,value]); return query;},
      order: () => query,
      maybeSingle: () => {single = true; return query;},
      then: async (resolve, reject) => {
        window.__calls.push({operation, payload, filters});
        const mode = window.__mode, user = window.__user;
        if (window.__pending) await new Promise(done => window.__release = done);
        if (mode === 'network') return reject(new TypeError('Controlled offline'));
        if (mode === 'missing') return resolve({data: null, error: {code:'PGRST205'}});
        if (mode === 'denied') return resolve({data: null, error: {code:'42501'}});
        if (mode === 'empty') return resolve({data: single ? null : [], error: null});
        if (operation === 'insert') {
          const row = {...payload, id:crypto.randomUUID(), created_by:user, status:'draft', created_at:new Date().toISOString()};
          window.__rows.push(row); return resolve({data:row,error:null});
        }
        const found = window.__rows.filter(row => row.created_by === user && filters.every(([key,value]) => row[key] === value));
        if (operation === 'update') for (const row of found) Object.assign(row, payload);
        return resolve({data: single ? found[0] ?? null : found, error: null});
      }
    }; return query;
  }
};
export function getSupabaseClient() {return window.__contractClient;}
`

let socket
try {
  let targets
  for (let i = 0; i < 100; i++) {
    try {
      targets = await (await fetch('http://127.0.0.1:' + port + '/json')).json()
      if (targets.some((item) => item.type === 'page')) break
    } catch { /* Chrome is starting. */ }
    await delay(100)
  }
  assert.ok(targets, 'Chrome no inició')
  socket = new WebSocket(targets.find((item) => item.type === 'page').webSocketDebuggerUrl)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  let nextId = 0
  const pending = new Map()
  const exceptions = []
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
  socket.onmessage = ({ data }) => {
    const event = JSON.parse(data)
    if (pending.has(event.id)) {
      const result = pending.get(event.id); pending.delete(event.id)
      if (event.error) result.reject(Error(event.error.message))
      else result.resolve(event.result)
    }
    if (event.method === 'Runtime.exceptionThrown') exceptions.push(event.params.exceptionDetails.text)
    if (event.method === 'Fetch.requestPaused') {
      void send('Fetch.fulfillRequest', {
        requestId: event.params.requestId, responseCode: 200,
        responseHeaders: [{ name: 'Content-Type', value: 'application/javascript' }],
        body: Buffer.from(mock).toString('base64'),
      }).catch((error) => exceptions.push(error.message))
    }
  }
  const evaluate = async (expression) => {
    const response = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (response.exceptionDetails) throw Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text)
    return response.result.value
  }
  const wait = async (expression) => {
    for (let i = 0; i < 100; i++) {
      if (await evaluate('Boolean(' + expression + ')')) return
      await delay(75)
    }
    throw Error('Tiempo agotado: ' + expression)
  }
  const go = async (path) => {
    // Use the application's router through a real link when possible.
    await evaluate(`(()=>{const a=document.createElement('a');a.href=${JSON.stringify(path)};a.textContent='test';document.body.append(a);a.remove();history.pushState({...history.state,usr:null,key:crypto.randomUUID()},'',${JSON.stringify(path)});window.dispatchEvent(new PopStateEvent('popstate'));return true})()`)
    await delay(120)
  }
  const fill = async (values) => {
    await evaluate(`(()=>{for(const [name,value] of Object.entries(${JSON.stringify(values)})){const input=document.querySelector('[name="'+name+'"]');const proto=input.tagName==='INPUT'?HTMLInputElement.prototype:HTMLTextAreaElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(input,value);input.dispatchEvent(new Event('input',{bubbles:true}));}return true})()`)
    await delay(70)
  }
  const submit = () => evaluate("document.querySelector('form').requestSubmit();true")
  const has = (text) => 'document.body.textContent.includes(' + JSON.stringify(text) + ')'
  let passed = 0
  const pass = (name) => { passed++; console.log('PASS SIMULADO navegador: ' + name) }
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Network.enable')
  await send('Network.setBlockedURLs', { urls: ['https://*', 'http://*.supabase.co/*'] })
  await send('Fetch.enable', { patterns: [{ urlPattern: '*/src/lib/supabaseClient.ts*', requestStage: 'Request' }] })
  await send('Page.navigate', { url: base + '/panel' })
  await wait(has('No tienes borradores disponibles'))
  pass('lista vacía, sin contratos inventados')
  await go('/contratos/nuevo'); await wait("document.querySelector('[name=terms]')")
  const valid = { title: 'Borrador controlado', description: 'Objeto de prueba', terms: 'Condiciones de prueba' }
  for (const field of ['title', 'description', 'terms']) {
    await fill({ ...valid, [field]: '   ' }); await submit()
    assert.ok(await evaluate("document.querySelector('[name=" + field + "]')?.getAttribute('aria-invalid')==='true'"))
    assert.equal(await evaluate("window.__calls.filter(x=>x.operation==='insert').length"), 0)
    pass(field + ' vacío/espacios rechazado')
  }
  for (const [field, limit] of [['description', 4000], ['terms', 20000]]) {
    await fill({ ...valid, [field]: 'a'.repeat(limit + 1) }); await submit()
    assert.ok(await evaluate("document.querySelector('[name=" + field + "]')?.getAttribute('aria-invalid')==='true'"))
    pass(field + ' exceso rechazado')
  }
  await fill({ title: '😀'.repeat(120), description: 'a'.repeat(4000), terms: 'b'.repeat(20000) })
  await evaluate('window.__pending=true;true')
  await evaluate("document.querySelector('form').requestSubmit();document.querySelector('form').requestSubmit();true")
  await wait("typeof window.__release==='function'")
  assert.equal(await evaluate("window.__calls.filter(x=>x.operation==='insert').length"), 1)
  assert.ok(await evaluate("document.querySelector('button[type=submit]').disabled"))
  assert.equal(await evaluate('window.__rows.length'), 0)
  pass('doble envío bloqueado y sin éxito anticipado')
  await evaluate('window.__pending=false;window.__release();true')
  await wait("location.pathname.startsWith('/contratos/')&&!location.pathname.endsWith('nuevo')&&!document.querySelector('form')")
  await wait(has('Condiciones') + '||' + has('Cláusulas y condiciones'))
  const id = await evaluate('window.__rows[0].id')
  assert.ok(await evaluate('window.__rows[0].title.length===240&&window.__rows[0].description.length===4000&&window.__rows[0].terms.length===20000'))
  assert.deepEqual(await evaluate('Object.keys(window.__calls.find(x=>x.operation===\'insert\').payload).sort()'), ['description', 'terms', 'title'])
  pass('crear en límites exactos y Unicode; detalle por UUID confirmado')
  await evaluate("[...document.querySelectorAll('button')].find(x=>x.textContent==='Editar borrador').click();true")
  await wait("document.querySelector('[name=title]')")
  await fill({ ...valid, title: 'Contenido editado' }); await submit()
  await wait(has('Cambios guardados correctamente'))
  assert.deepEqual(await evaluate('Object.keys(window.__calls.find(x=>x.operation===\'update\').payload).sort()'), ['description', 'terms', 'title'])
  pass('edición únicamente de contenido y éxito confirmado')
  await go('/panel'); await wait(has('Contenido editado'))
  pass('listado actualizado con respuesta real del doble tras crear/editar')
  const before = await evaluate('window.__calls.length')
  await go('/contratos/invalid'); await wait(has('El borrador no está disponible'))
  assert.equal(await evaluate('window.__calls.length'), before)
  pass('UUID inválido no consulta el cliente')
  await evaluate("window.__mode='empty';true"); await go('/contratos/' + id)
  await wait(has('El borrador no está disponible'))
  pass('detalle vacío/no autorizado neutral')
  await evaluate("window.__mode='network';true"); await go('/panel'); await wait(has('Comprueba tu conexión'))
  pass('error de conexión visible')
  await evaluate("window.__mode='missing';true"); await go('/contratos/nuevo'); await wait("document.querySelector('form')")
  await fill(valid); await submit(); await wait(has('almacenamiento contractual aún no está habilitado'))
  assert.ok(await evaluate("location.pathname==='/contratos/nuevo'&&document.querySelector('[name=title]').value==='Borrador controlado'"))
  pass('tabla ausente: error comprensible, conserva texto, no simula guardado')
  await evaluate("window.__mode='';window.__changeUser('22222222-2222-4222-8222-222222222222');true")
  await go('/panel'); await wait(has('No tienes borradores disponibles'))
  assert.ok(!(await evaluate(has('Contenido editado'))))
  pass('cambio de cuenta limpia datos')
  await evaluate("window.__changeUser('11111111-1111-4111-8111-111111111111');window.__pending=true;window.__release=null;true")
  await go('/contratos/' + id); await wait("typeof window.__release==='function'")
  await evaluate("window.__changeUser(null);true"); await wait("location.pathname==='/login'")
  await evaluate('window.__pending=false;window.__release();true'); await delay(150)
  assert.ok(!(await evaluate(has('Contenido editado'))))
  assert.equal(await evaluate('location.pathname'), '/login')
  pass('logout durante consulta: respuesta tardía descartada, guard conservado')
  await evaluate("window.__changeUser('11111111-1111-4111-8111-111111111111');true")
  await go('/panel'); await wait(has('Contenido editado'))
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'))
  await go('/contratos/nuevo'); await wait("document.querySelector('form')")
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'))
  assert.deepEqual(exceptions, [])
  pass('panel/formulario móvil 390 px sin desbordamiento ni excepciones JS')
  await go('/contratos/' + id); await wait(has('Contenido editado'))
  await evaluate("[...document.querySelectorAll('button')].find(x=>x.textContent==='Editar borrador').click();true")
  await wait("document.querySelector('form')")
  await evaluate("window.__mode='empty';true"); await submit()
  await wait(has('El borrador no está disponible'))
  assert.ok(!(await evaluate("!!document.querySelector('form')||document.body.textContent.includes('Contenido editado')")))
  pass('edición sin filas: retira datos y muestra estado neutral')
  console.log('TOTAL: ' + passed + ' PASS SIMULADO; RLS real NO EJECUTADA; Supabase remoto sin acceso.')
} finally {
  socket?.close()
  browser.kill('SIGTERM')
}
