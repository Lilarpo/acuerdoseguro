// Reuse the controlled Chrome/Supabase driver; no real wallet or network writes.
// Requires Vite at 127.0.0.1:5173 and google-chrome on PATH.
import { readFile } from 'node:fs/promises'

let driver = await readFile(new URL('./check-contracts-browser.mjs', import.meta.url), 'utf8')
const hashMarker = "  pass('crear en límites exactos y Unicode; detalle por UUID confirmado')"
const editMarker = "  pass('edición únicamente de contenido y éxito confirmado')"
const finalMarker = "  console.log('TOTAL: ' + passed"
if (![hashMarker, editMarker, finalMarker].every((marker) => driver.includes(marker))) throw Error('El driver contractual cambió; revisar anclajes de integración.')

driver = driver.replace(hashMarker, hashMarker + String.raw`
  await evaluate("[...document.querySelectorAll('button')].find(x=>x.textContent==='Calcular huella SHA-256').click();true")
  await wait(has('SHA-256 de la versión guardada'))
  const calculated = await evaluate("document.querySelector('section[aria-labelledby=evidence-title] p.font-mono').textContent")
  assert.match(calculated, /^[a-f0-9]{64}$/)
  assert.ok(!(await evaluate(has('Evidencia confirmada en Stellar Testnet'))))
  assert.ok(await evaluate("[...document.querySelectorAll('button')].find(x=>x.textContent==='Preparar evidencia Testnet').disabled"))
  pass('SHA-256 real en navegador, sin afirmar registro ni enviar automáticamente')
`)
driver = driver.replace(editMarker, editMarker + String.raw`
  await wait(has('de una versión anterior'))
  pass('edición invalida la huella anterior para nuevos registros')
`)
driver = driver.replace(finalMarker, String.raw`
  await go('/verificar'); await wait("document.getElementById('verify-file')")
  await evaluate("(()=>{const dt=new DataTransfer();dt.items.add(new File(['abc'],'fixture.txt'));const n=document.getElementById('verify-file');n.files=dt.files;n.dispatchEvent(new Event('change',{bubbles:true}));const input=document.getElementById('verify-fingerprint');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');input.dispatchEvent(new Event('input',{bubbles:true}));return true})()")
  await delay(100); await submit()
  await wait("[...document.querySelectorAll('[role=status]')].some(x=>x.textContent==='COINCIDE')")
  pass('archivo abc: SHA-256 Web Crypto coincide con vector conocido en navegador')
  await evaluate("(()=>{const input=document.getElementById('verify-fingerprint');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'ab'.repeat(32));input.dispatchEvent(new Event('input',{bubbles:true}));return true})()")
  await delay(100); await submit()
  await wait("[...document.querySelectorAll('[role=status]')].some(x=>x.textContent==='NO COINCIDE')")
  pass('archivo con referencia distinta: NO COINCIDE')
  await evaluate("(()=>{const dt=new DataTransfer();dt.items.add(new File([],'empty.txt'));const n=document.getElementById('verify-file');n.files=dt.files;n.dispatchEvent(new Event('change',{bubbles:true}));return true})()")
  await delay(100); await submit(); await wait(has('El archivo está vacío'))
  pass('archivo vacío: error explícito sin subida')
  await evaluate("(()=>{const dt=new DataTransfer();dt.items.add(new File([new Uint8Array(10*1024*1024+1)],'large.bin'));const n=document.getElementById('verify-file');n.files=dt.files;n.dispatchEvent(new Event('change',{bubbles:true}));return true})()")
  await delay(100); await submit(); await wait(has('supera el máximo'))
  pass('archivo excesivo: rechazado antes de leer/hash')
  await evaluate("(()=>{const dt=new DataTransfer();dt.items.add(new File(['{}'],'receipt.json',{type:'application/json'}));const n=document.getElementById('evidence-receipt');n.files=dt.files;n.dispatchEvent(new Event('change',{bubbles:true}));return true})()")
  await wait(has('Recibo inválido'))
  pass('recibo incompleto no acredita evidencia')
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'))
  assert.deepEqual(exceptions, [])
  pass('verificación móvil sin desbordamiento ni excepciones JS')
` + finalMarker)
await import('data:text/javascript;base64,' + Buffer.from(driver).toString('base64'))
