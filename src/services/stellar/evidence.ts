import { Account, Memo, Networks, Operation, StrKey, Transaction, TransactionBuilder } from '@stellar/stellar-sdk'
import * as freighter from '@stellar/freighter-api'
import { bytesToHex, equalHashes, hashBytes, isSha256 } from '../documents/fingerprints'

export const HORIZON = 'https://horizon-testnet.stellar.org'
export const TESTNET = Networks.TESTNET
export const explorerUrl = (hash: string) => `https://stellar.expert/explorer/testnet/tx/${hash}`
const referencePattern = /^as-v1-[a-f0-9]{32}$/
type WalletApi = Pick<typeof freighter, 'isConnected' | 'requestAccess' | 'getAddress' | 'getNetworkDetails' | 'signTransaction'>
type JsonObject = Record<string, unknown>
const object = (value: unknown): value is JsonObject => typeof value === 'object' && value !== null && !Array.isArray(value)
export class EvidenceError extends Error {}
function fail(message: string): never { throw new EvidenceError(message) }
export const evidenceMessage = (error: unknown) => error instanceof EvidenceError ? error.message : 'No se pudo completar la operación. No se ha confirmado evidencia en Stellar.'

export type PreparedEvidence = {
  unsignedXdr: string
  transactionHash: string
  sha256: string
  reference: string
  address: string
  feeStroops: string
  reserveStroops: string
}
export type EvidenceReceipt = {
  format_version: 1
  network: 'Stellar Testnet'
  sha256: string
  transaction_hash: string
  signer_address: string
  confirmed_at: string
  reference: string
}
export type Verification =
  | { status: 'confirmed'; receipt: EvidenceReceipt }
  | { status: 'pending' | 'failed' | 'mismatch' | 'unavailable'; message: string }

async function jsonRequest(path: string, fetchImpl: typeof fetch = fetch): Promise<{ status: number; body: unknown }> {
  const response = await fetchImpl(HORIZON + path, {
    method: 'GET', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15000),
    headers: { Accept: 'application/json' },
  })
  if (response.status === 404) return { status: 404, body: null }
  if (!response.ok) fail('Horizon Testnet no está disponible o limitó la consulta. Inténtalo más tarde.')
  return { status: response.status, body: await response.json() }
}

async function checkHorizon(fetchImpl: typeof fetch) {
  const { body } = await jsonRequest('/', fetchImpl)
  if (!object(body) || body.network_passphrase !== TESTNET) fail('El servidor no confirmó Stellar Testnet. Operación detenida.')
}

export async function checkWallet(address?: string, wallet: WalletApi = freighter): Promise<string> {
  const network = await wallet.getNetworkDetails()
  if (network.error || network.networkPassphrase !== TESTNET || network.network !== 'TESTNET') {
    fail('Selecciona Stellar Testnet en Freighter. Mainnet y otras redes están bloqueadas.')
  }
  const current = await wallet.getAddress()
  if (current.error || !StrKey.isValidEd25519PublicKey(current.address)) fail('No se pudo obtener una dirección pública válida de Freighter.')
  if (address && current.address !== address) fail('La cuenta de Freighter cambió. Conecta y prepara de nuevo.')
  return current.address
}

export async function connectFreighter(wallet: WalletApi = freighter): Promise<string> {
  try {
    const available = await wallet.isConnected()
    if (available.error || !available.isConnected) fail('Freighter no está disponible. Instala o habilita la extensión en este navegador.')
    const access = await wallet.requestAccess()
    if (access.error || !access.address) fail('No se autorizó la conexión con Freighter.')
    return await checkWallet(access.address, wallet)
  } catch (error) {
    if (error instanceof EvidenceError) throw error
    fail('Freighter no respondió o la conexión fue rechazada.')
  }
}

function stroops(value: unknown): bigint {
  if (typeof value !== 'string' || !/^\d+(\.\d{1,7})?$/.test(value)) fail('Horizon devolvió un saldo no válido.')
  const [whole, fraction = ''] = (value as string).split('.')
  return BigInt(whole) * 10000000n + BigInt(fraction.padEnd(7, '0'))
}
function integer(value: unknown): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) fail('Horizon devolvió metadatos incompletos.')
  return value as number
}
export function xlm(stroopValue: string): string {
  const value = BigInt(stroopValue)
  return `${value / 10000000n}.${(value % 10000000n).toString().padStart(7, '0')}`
}

export async function prepareEvidence(sha: string, address: string, fetchImpl: typeof fetch = fetch): Promise<PreparedEvidence> {
  if (!isSha256(sha) || !StrKey.isValidEd25519PublicKey(address)) fail('Huella o dirección pública no válidas.')
  await checkHorizon(fetchImpl)
  const accountResponse = await jsonRequest('/accounts/' + address, fetchImpl)
  if (accountResponse.status === 404) fail('La cuenta no existe en Testnet. Obtén XLM de prueba con Friendbot y vuelve a preparar; no se financiará automáticamente.')
  const account = accountResponse.body
  const { body: ledgers } = await jsonRequest('/ledgers?order=desc&limit=1', fetchImpl)
  const ledger = object(ledgers) && object(ledgers._embedded) && Array.isArray(ledgers._embedded.records) ? ledgers._embedded.records[0] : null
  if (!object(account) || account.account_id !== address || typeof account.sequence !== 'string' || !/^\d+$/.test(account.sequence) ||
      !Array.isArray(account.balances) || !object(ledger)) fail('Horizon devolvió una cuenta o ledger incompletos.')
  const native = account.balances.find((balance: unknown) => object(balance) && balance.asset_type === 'native')
  if (!object(native)) fail('No se pudo comprobar el saldo XLM de Testnet.')
  const baseReserve = BigInt(integer(ledger.base_reserve_in_stroops))
  const baseFee = BigInt(integer(ledger.base_fee_in_stroops))
  if (baseReserve <= 0n || baseFee <= 0n) fail('No se pudo comprobar reserva y comisión de Testnet.')
  const units = 3 + integer(account.subentry_count) + integer(account.num_sponsoring) - integer(account.num_sponsored)
  if (units < 0) fail('Horizon devolvió una reserva incoherente.')
  const requiredReserve = BigInt(units) * baseReserve
  if (stroops(native.balance) - stroops(native.selling_liabilities) < requiredReserve + baseFee) {
    fail('Saldo Testnet insuficiente para reserva adicional y comisión. Usa Friendbot por tu cuenta y vuelve a preparar.')
  }
  const reference = 'as-v1-' + bytesToHex(crypto.getRandomValues(new Uint8Array(16)))
  const tx = new TransactionBuilder(new Account(address, account.sequence), { fee: baseFee.toString(), networkPassphrase: TESTNET })
    .addOperation(Operation.manageData({ name: reference, value: hashBytes(sha) }))
    .addMemo(Memo.hash(hashBytes(sha))).setTimeout(180).build()
  return {
    unsignedXdr: tx.toXDR(), transactionHash: bytesToHex(tx.hash()), sha256: sha.trim().toLowerCase(), reference, address,
    feeStroops: baseFee.toString(), reserveStroops: baseReserve.toString(),
  }
}

function base64Hash(value: unknown): string | null {
  if (typeof value !== 'string' || !/^[A-Za-z0-9+/]{43}=$/.test(value)) return null
  try {
    const binary = atob(value)
    return binary.length === 32 && btoa(binary) === value ? bytesToHex(Uint8Array.from(binary, (char) => char.charCodeAt(0))) : null
  } catch { return null }
}

export async function verifyEvidence(txHash: string, expectedHash: string, reference?: string, signer?: string, fetchImpl: typeof fetch = fetch): Promise<Verification> {
  if (!isSha256(txHash) || !isSha256(expectedHash)) return { status: 'unavailable', message: 'Introduce dos hashes distintos en sus campos: transacción y SHA-256, ambos de 64 caracteres hexadecimales.' }
  const hash = txHash.trim().toLowerCase()
  try {
    await checkHorizon(fetchImpl)
    const { status, body: record } = await jsonRequest('/transactions/' + hash, fetchImpl)
    if (status === 404) return { status: 'pending', message: 'Transacción no encontrada o aún pendiente en Testnet. No se confirma evidencia ni se reenvía automáticamente.' }
    if (object(record) && record.successful === false) return { status: 'failed', message: 'La transacción fue encontrada pero falló; no registra evidencia válida.' }
    if (!object(record) || record.hash !== hash || record.successful !== true || !Number.isSafeInteger(record.ledger) || (record.ledger as number) <= 0 ||
        typeof record.created_at !== 'string' || !Number.isFinite(Date.parse(record.created_at)) || typeof record.source_account !== 'string' ||
        !StrKey.isValidEd25519PublicKey(record.source_account) || typeof record.envelope_xdr !== 'string') fail('Respuesta Horizon incompleta: evidencia no confirmada.')
    const tx = TransactionBuilder.fromXDR(record.envelope_xdr, TESTNET)
    if (!(tx instanceof Transaction) || bytesToHex(tx.hash()) !== hash || tx.source !== record.source_account || tx.operations.length !== 1 || tx.signatures.length === 0) fail('La transacción XDR no coincide con los metadatos Testnet.')
    const operation = tx.operations[0]
    if (operation.type !== 'manageData' || !referencePattern.test(operation.name) || !(operation.value instanceof Uint8Array) || operation.value.length !== 32 ||
        !equalHashes(bytesToHex(operation.value), expectedHash) || (operation.source && operation.source !== tx.source) ||
        tx.memo.type !== 'hash' || !(tx.memo.value instanceof Uint8Array) || !equalHashes(bytesToHex(tx.memo.value), expectedHash) ||
        record.memo_type !== 'hash' || !equalHashes(base64Hash(record.memo) ?? '', expectedHash) ||
        (reference && reference !== operation.name) || (signer && signer !== tx.source)) {
      return { status: 'mismatch', message: 'La transacción no contiene esta huella, referencia o dirección en el formato de AcuerdoSeguro v1.' }
    }
    const { body: operations } = await jsonRequest('/transactions/' + hash + '/operations?limit=100', fetchImpl)
    const rows = object(operations) && object(operations._embedded) ? operations._embedded.records : null
    if (!Array.isArray(rows) || rows.length !== 1 || !object(rows[0]) || rows[0].type !== 'manage_data' || rows[0].transaction_successful !== true ||
        rows[0].transaction_hash !== hash || rows[0].source_account !== tx.source || rows[0].name !== operation.name ||
        !equalHashes(base64Hash(rows[0].value) ?? '', expectedHash)) fail('Horizon no confirmó la operación manageData esperada.')
    return { status: 'confirmed', receipt: {
      format_version: 1, network: 'Stellar Testnet', sha256: expectedHash.trim().toLowerCase(), transaction_hash: hash,
      signer_address: tx.source, confirmed_at: record.created_at, reference: operation.name,
    } }
  } catch (error) {
    return { status: 'unavailable', message: evidenceMessage(error) }
  }
}

export async function signAndSubmit(prepared: PreparedEvidence, wallet: WalletApi = freighter, fetchImpl: typeof fetch = fetch, isActive: () => boolean = () => true): Promise<
  { sent: false; message: string } | { sent: true; verification: Verification }
> {
  let signedXdr: string
  try {
    await checkWallet(prepared.address, wallet)
    await checkHorizon(fetchImpl)
    const signed = await wallet.signTransaction(prepared.unsignedXdr, { networkPassphrase: TESTNET, address: prepared.address })
    if (signed.error || !signed.signedTxXdr) fail('La firma no fue autorizada por Freighter. No se envió la transacción.')
    if (signed.signerAddress !== prepared.address) fail('Freighter devolvió otra dirección. No se enviará la transacción.')
    const tx = TransactionBuilder.fromXDR(signed.signedTxXdr, TESTNET)
    if (!(tx instanceof Transaction) || bytesToHex(tx.hash()) !== prepared.transactionHash || tx.source !== prepared.address || tx.signatures.length === 0) fail('La transacción firmada cambió respecto a la preparada. Envío bloqueado.')
    await checkWallet(prepared.address, wallet)
    if (!isActive()) fail('La operación se canceló. No se envió la transacción.')
    signedXdr = signed.signedTxXdr
  } catch (error) {
    return { sent: false, message: error instanceof EvidenceError ? error.message : 'Freighter no respondió o rechazó la firma. No se envió la transacción.' }
  }
  // Exactly one POST. Even an interrupted response may have reached the network.
  let rejection: string | undefined
  try {
    const response = await fetchImpl(HORIZON + '/transactions', {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({ tx: signedXdr }),
    })
    if (response.status === 400) {
      const problem: unknown = await response.json()
      const codes = object(problem) && object(problem.extras) && object(problem.extras.result_codes) ? problem.extras.result_codes : null
      const definitive = ['tx_failed', 'tx_bad_auth', 'tx_no_source_account', 'tx_insufficient_fee', 'tx_insufficient_balance', 'tx_too_late', 'tx_too_early']
      if (codes && typeof codes.transaction === 'string' && definitive.includes(codes.transaction)) {
        const operations = Array.isArray(codes.operations) ? codes.operations.filter((code): code is string => typeof code === 'string' && /^op_[a-z_]+$/.test(code)) : []
        rejection = [codes.transaction, ...operations].join(', ')
      }
    }
  } catch { /* Query the precomputed hash; never automatically POST again. */ }
  const verification = await verifyEvidence(prepared.transactionHash, prepared.sha256, prepared.reference, prepared.address, fetchImpl)
  return { sent: true, verification: rejection && verification.status !== 'confirmed' && verification.status !== 'mismatch'
    ? { status: 'failed', message: `Horizon rechazó la transacción (${rejection}). No hay evidencia confirmada. Revisa la causa antes de preparar otra.` }
    : verification }
}

export function parseReceipt(value: unknown): EvidenceReceipt {
  if (!object(value) || value.format_version !== 1 || value.network !== 'Stellar Testnet' ||
      typeof value.sha256 !== 'string' || !isSha256(value.sha256) || typeof value.transaction_hash !== 'string' || !isSha256(value.transaction_hash) ||
      typeof value.signer_address !== 'string' || !StrKey.isValidEd25519PublicKey(value.signer_address) ||
      typeof value.reference !== 'string' || !referencePattern.test(value.reference) ||
      typeof value.confirmed_at !== 'string' || !Number.isFinite(Date.parse(value.confirmed_at))) fail('Recibo inválido o de otra red/formato.')
  return {
    format_version: 1, network: 'Stellar Testnet', sha256: value.sha256.toLowerCase(), transaction_hash: value.transaction_hash.toLowerCase(),
    signer_address: value.signer_address, confirmed_at: value.confirmed_at, reference: value.reference,
  }
}
