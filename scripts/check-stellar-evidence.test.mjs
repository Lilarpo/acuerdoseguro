import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'
import { Account, Keypair, Memo, Networks, Operation, TransactionBuilder } from '@stellar/stellar-sdk'

// Actual Web Crypto and SDK; deterministic, unfunded signing fixtures only in tests.
// All wallet responses and HTTP are controlled doubles. Never contacts a network.
const compile = (source) => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText).toString('base64')
const fingerprintUrl = compile(await readFile(new URL('../src/services/documents/fingerprints.ts', import.meta.url), 'utf8'))
const fingerprint = await import(fingerprintUrl)
const source = (await readFile(new URL('../src/services/stellar/evidence.ts', import.meta.url), 'utf8'))
  .replace("'@stellar/stellar-sdk'", JSON.stringify(import.meta.resolve('@stellar/stellar-sdk')))
  .replace("import * as freighter from '@stellar/freighter-api'", 'const freighter = {}')
  .replace("'../documents/fingerprints'", JSON.stringify(fingerprintUrl))
const stellar = await import(compile(source))
const key = Keypair.fromRawEd25519Seed(new Uint8Array(32).fill(7))
const address = key.publicKey()
const reference = 'as-v1-' + 'a'.repeat(32)
const digest = 'ab'.repeat(32)
const toBase64 = (hex) => Buffer.from(hex, 'hex').toString('base64')
function transaction(hash = digest, ref = reference) {
  const tx = new TransactionBuilder(new Account(address, '1'), { fee: '100', networkPassphrase: Networks.TESTNET })
    .addOperation(Operation.manageData({ name: ref, value: fingerprint.hashBytes(hash) }))
    .addMemo(Memo.hash(hash)).setTimeout(180).build()
  tx.sign(key)
  return tx
}
const tx = transaction()
const txHash = fingerprint.bytesToHex(tx.hash())
const txRecord = {
  hash: txHash, successful: true, ledger: 10, created_at: '2026-10-18T12:00:00Z', source_account: address,
  envelope_xdr: tx.toXDR(), memo_type: 'hash', memo: toBase64(digest),
}
const operationRecord = {
  type: 'manage_data', transaction_hash: txHash, transaction_successful: true,
  source_account: address, name: reference, value: toBase64(digest),
}
function fixture({ network = Networks.TESTNET, record = txRecord, operations = [operationRecord], missing = false, offline = false, balance = '1000.0000000' } = {}) {
  const calls = []
  const fetchImpl = async (url, options = {}) => {
    assert.ok(String(url).startsWith(stellar.HORIZON + '/'))
    assert.equal(options.redirect, 'error')
    calls.push({ url: String(url), method: options.method, body: options.body })
    if (offline) throw new TypeError('Controlled offline')
    const path = new URL(url).pathname
    if (options.method === 'POST') return Response.json({ hash: txHash })
    if (path === '/') return Response.json({ network_passphrase: network })
    if (path.startsWith('/accounts/')) return Response.json({ account_id: address, sequence: '1', subentry_count: 0, num_sponsoring: 0, num_sponsored: 0,
      balances: [{ asset_type: 'native', balance, selling_liabilities: '0.0000000' }] })
    if (path === '/ledgers') return Response.json({ _embedded: { records: [{ base_reserve_in_stroops: 5000000, base_fee_in_stroops: 100 }] } })
    if (path.endsWith('/operations')) return Response.json({ _embedded: { records: operations } })
    if (missing) return new Response(null, { status: 404 })
    return Response.json(record)
  }
  return { fetchImpl, calls }
}
const wallet = (overrides = {}) => ({
  isConnected: async () => ({ isConnected: true }), requestAccess: async () => ({ address }), getAddress: async () => ({ address }),
  getNetworkDetails: async () => ({ network: 'TESTNET', networkPassphrase: Networks.TESTNET, networkUrl: stellar.HORIZON }),
  signTransaction: async (xdr, options) => {
    assert.deepEqual(options, { networkPassphrase: Networks.TESTNET, address })
    const signed = TransactionBuilder.fromXDR(xdr, Networks.TESTNET)
    signed.sign(key)
    return { signedTxXdr: signed.toXDR(), signerAddress: address }
  }, ...overrides,
})
const prepared = { unsignedXdr: tx.toXDR(), transactionHash: txHash, sha256: digest, reference, address, feeStroops: '100', reserveStroops: '5000000' }
const draft = {
  id: '11111111-1111-4111-8111-111111111111', created_by: '22222222-2222-4222-8222-222222222222', status: 'draft',
  title: 'Prueba', description: 'Objeto', terms: 'Condiciones', created_at: '2026-10-18T12:00:00Z',
}

test('Web Crypto SHA-256: vector conocido real', async () => {
  assert.equal(await fingerprint.sha256('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
})
test('canónico determinista con orden fijo, sin salto/BOM ni datos extra', async () => {
  const first = fingerprint.canonicalContract(draft)
  const reverse = Object.fromEntries(Object.entries(draft).reverse())
  assert.equal(first, fingerprint.canonicalContract({ ...reverse, access_token: 'not-included' }))
  assert.deepEqual(Object.keys(JSON.parse(first)), ['format_version', 'contract_id', 'creator_id', 'title', 'description', 'terms', 'created_at'])
  assert.equal(await fingerprint.sha256(first), await fingerprint.sha256(fingerprint.canonicalContract(reverse)))
  assert.ok(!first.endsWith('\n') && !first.includes('access_token'))
})
test('cambiar título o cláusulas cambia la huella', async () => {
  const original = await fingerprint.sha256(fingerprint.canonicalContract(draft))
  for (const field of ['title', 'terms']) assert.notEqual(original, await fingerprint.sha256(fingerprint.canonicalContract({ ...draft, [field]: 'Cambio' })))
})
test('Unicode UTF-8 real; no normaliza composición', async () => {
  const value = 'Acuerdo 😀 e\u0301'
  assert.equal(await fingerprint.sha256(value), createHash('sha256').update(value, 'utf8').digest('hex'))
  assert.notEqual(await fingerprint.sha256('é'), await fingerprint.sha256('e\u0301'))
})
test('igualdad/desigualdad de huellas y formato estricto', () => {
  assert.ok(fingerprint.equalHashes(digest, digest.toUpperCase()))
  assert.ok(!fingerprint.equalHashes(digest, 'cd'.repeat(32)))
  assert.ok(!fingerprint.equalHashes('abc', 'abc'))
  assert.throws(() => fingerprint.hashBytes('bad'))
})
test('archivo local real, vacío, exceso y error de lectura', async () => {
  assert.equal(await fingerprint.hashFile(new Blob(['abc'])), await fingerprint.sha256('abc'))
  await assert.rejects(fingerprint.hashFile(new Blob([])), /vacío/)
  await assert.rejects(fingerprint.hashFile({ size: fingerprint.MAX_FILE_BYTES + 1 }), /10 MiB/)
  await assert.rejects(fingerprint.hashFile({ size: 1, arrayBuffer: async () => { throw Error('read') } }), /leer/)
})
test('Freighter ausente: error explícito sin red', async () => {
  await assert.rejects(stellar.connectFreighter(wallet({ isConnected: async () => ({ isConnected: false }) })), /Freighter no está disponible/)
})
test('conexión rechazada por usuario y conexión válida simulada', async () => {
  await assert.rejects(stellar.connectFreighter(wallet({ requestAccess: async () => ({ error: { code: -1 } }) })), /autorizó/)
  assert.equal(await stellar.connectFreighter(wallet()), address)
})
test('red equivocada y cambio de cuenta bloqueados', async () => {
  await assert.rejects(stellar.checkWallet(address, wallet({ getNetworkDetails: async () => ({ network: 'PUBLIC', networkPassphrase: Networks.PUBLIC }) })), /Testnet/)
  await assert.rejects(stellar.checkWallet(Keypair.fromRawEd25519Seed(new Uint8Array(32).fill(8)).publicKey(), wallet()), /cambió/)
})
test('construcción SDK real: exactamente 32 bytes, referencia opaca, reserva/comisión', async () => {
  const f = fixture()
  const p = await stellar.prepareEvidence(digest, address, f.fetchImpl)
  const built = TransactionBuilder.fromXDR(p.unsignedXdr, Networks.TESTNET)
  assert.equal(built.operations.length, 1)
  assert.equal(built.operations[0].type, 'manageData')
  assert.equal(built.operations[0].value.length, 32)
  assert.equal(fingerprint.bytesToHex(built.operations[0].value), digest)
  assert.match(built.operations[0].name, /^as-v1-[0-9a-f]{32}$/)
  assert.equal(fingerprint.bytesToHex(built.memo.value), digest)
  assert.equal(p.transactionHash, fingerprint.bytesToHex(built.hash()))
  assert.equal(p.feeStroops, '100')
  assert.ok(f.calls.every((call) => call.method === 'GET'))
})
test('saldo insuficiente y servidor de otra red rechazados', async () => {
  await assert.rejects(stellar.prepareEvidence(digest, address, fixture({ balance: '1.0000000' }).fetchImpl), /Saldo/)
  await assert.rejects(stellar.prepareEvidence(digest, address, fixture({ network: Networks.PUBLIC }).fetchImpl), /Testnet/)
})
test('transacción no encontrada/pendiente no es confirmación', async () => {
  assert.equal((await stellar.verifyEvidence(txHash, digest, undefined, undefined, fixture({ missing: true }).fetchImpl)).status, 'pending')
})
test('transacción fallida no es evidencia', async () => {
  assert.equal((await stellar.verifyEvidence(txHash, digest, undefined, undefined, fixture({ record: { ...txRecord, successful: false } }).fetchImpl)).status, 'failed')
})
test('confirmación simulada valida XDR real, Memo.hash y manageData', async () => {
  const result = await stellar.verifyEvidence(txHash, digest, reference, address, fixture().fetchImpl)
  assert.equal(result.status, 'confirmed')
  assert.equal(result.receipt.sha256, digest)
  assert.equal(result.receipt.transaction_hash, txHash)
})
for (const record of [{}, { successful: true }, { ...txRecord, ledger: undefined }, { ...txRecord, envelope_xdr: 'false-envelope' }, { ...txRecord, hash: '00'.repeat(32) }]) {
  test('respuesta falsa/incompleta de Horizon no confirma: ' + Object.keys(record).join(','), async () => {
    assert.notEqual((await stellar.verifyEvidence(txHash, digest, undefined, undefined, fixture({ record }).fetchImpl)).status, 'confirmed')
  })
}
test('huella, memo u operación divergentes no confirman', async () => {
  assert.equal((await stellar.verifyEvidence(txHash, 'cd'.repeat(32), undefined, undefined, fixture().fetchImpl)).status, 'mismatch')
  assert.equal((await stellar.verifyEvidence(txHash, digest, undefined, undefined, fixture({ record: { ...txRecord, memo: toBase64('cd'.repeat(32)) } }).fetchImpl)).status, 'mismatch')
  assert.notEqual((await stellar.verifyEvidence(txHash, digest, undefined, undefined, fixture({ operations: [{ ...operationRecord, value: toBase64('cd'.repeat(32)) }] }).fetchImpl)).status, 'confirmed')
})
test('Horizon sin respuesta no genera éxito', async () => {
  assert.equal((await stellar.verifyEvidence(txHash, digest, undefined, undefined, fixture({ offline: true }).fetchImpl)).status, 'unavailable')
})
test('firma rechazada no produce POST', async () => {
  const f = fixture()
  const result = await stellar.signAndSubmit(prepared, wallet({ signTransaction: async () => ({ error: { code: -1 } }) }), f.fetchImpl)
  assert.equal(result.sent, false)
  assert.equal(f.calls.filter((call) => call.method === 'POST').length, 0)
})
test('firma modificada o vista desmontada bloquea envío', async () => {
  const f = fixture()
  const modified = transaction('cd'.repeat(32))
  assert.equal((await stellar.signAndSubmit(prepared, wallet({ signTransaction: async () => ({ signedTxXdr: modified.toXDR(), signerAddress: address }) }), f.fetchImpl)).sent, false)
  assert.equal((await stellar.signAndSubmit(prepared, wallet(), f.fetchImpl, () => false)).sent, false)
  assert.equal(f.calls.filter((call) => call.method === 'POST').length, 0)
})
test('envío simulado único y consulta posterior sin éxito anticipado', async () => {
  const f = fixture()
  const result = await stellar.signAndSubmit(prepared, wallet(), f.fetchImpl)
  assert.equal(result.sent, true)
  assert.equal(result.verification.status, 'confirmed')
  assert.equal(f.calls.filter((call) => call.method === 'POST').length, 1)
})
test('envío ambiguo: un solo POST, consulta estado y permanece pendiente', async () => {
  const f = fixture({ missing: true })
  let posts = 0
  const fetchImpl = (url, options) => {
    if (options.method === 'POST') { posts++; throw new TypeError('Interrupted response') }
    return f.fetchImpl(url, options)
  }
  const result = await stellar.signAndSubmit(prepared, wallet(), fetchImpl)
  assert.equal(result.sent, true)
  assert.equal(result.verification.status, 'pending')
  assert.equal(posts, 1)
})
test('rechazo definitivo de Horizon informa fallo sin reenvío', async () => {
  const f = fixture({ missing: true })
  let posts = 0
  const fetchImpl = (url, options) => {
    if (options.method === 'POST') {
      posts++
      return Promise.resolve(Response.json({ extras: { result_codes: { transaction: 'tx_failed', operations: ['op_low_reserve'] } } }, { status: 400 }))
    }
    return f.fetchImpl(url, options)
  }
  const result = await stellar.signAndSubmit(prepared, wallet(), fetchImpl)
  assert.equal(result.verification.status, 'failed')
  assert.match(result.verification.message, /op_low_reserve/)
  assert.equal(posts, 1)
})
test('recibo mínimo, sin contenido contractual; importación no acredita blockchain', async () => {
  const result = await stellar.verifyEvidence(txHash, digest, reference, address, fixture().fetchImpl)
  const receipt = stellar.parseReceipt({ ...result.receipt, title: 'must-not-leak', terms: 'must-not-leak' })
  assert.deepEqual(Object.keys(receipt).sort(), ['format_version', 'network', 'sha256', 'transaction_hash', 'signer_address', 'confirmed_at', 'reference'].sort())
  assert.ok(!JSON.stringify(receipt).includes('must-not-leak'))
  assert.throws(() => stellar.parseReceipt({ ...receipt, network: 'Mainnet' }))
  assert.throws(() => stellar.parseReceipt({ ...receipt, reference: 'contract-readable-id' }))
})
