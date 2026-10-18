import { useEffect, useRef, useState } from 'react'
import type { ContractDraft } from '../../services/supabase/contracts'
import { canonicalContract, downloadJson, sha256 } from '../../services/documents/fingerprints'
import { checkWallet, connectFreighter, evidenceMessage, explorerUrl, prepareEvidence, signAndSubmit, verifyEvidence, xlm, type PreparedEvidence, type Verification } from '../../services/stellar/evidence'
import { Button } from '../ui'
import { CopyHashButton } from './CopyHashButton'

export function ContractEvidence({ draft, editing }: { draft: ContractDraft; editing: boolean }) {
  const canonical = canonicalContract(draft)
  const [calculated, setCalculated] = useState<{ canonical: string; hash: string } | null>(null)
  const [address, setAddress] = useState('')
  const [prepared, setPrepared] = useState<PreparedEvidence | null>(null)
  const [sent, setSent] = useState(false)
  const [verification, setVerification] = useState<Verification | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const locked = useRef(false)
  const alive = useRef(false)
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])
  const current = calculated?.canonical === canonical
  const unresolved = sent && verification?.status !== 'confirmed' && verification?.status !== 'failed'

  async function run(action: () => Promise<void>) {
    if (locked.current) return
    locked.current = true; setBusy(true); setMessage('')
    try { await action() } catch (error) { if (alive.current) setMessage(evidenceMessage(error)) }
    finally { locked.current = false; if (alive.current) setBusy(false) }
  }

  return <section className="mt-10 border-t border-outline pt-6" aria-labelledby="evidence-title" aria-busy={busy}>
    <h2 id="evidence-title" className="text-2xl font-semibold text-brand">Huella y evidencia Testnet</h2>
    <p className="mt-3 text-sm leading-relaxed">El borrador guardado, su huella y una transacción confirmada son estados diferentes. Solo se publica la huella; el contenido permanece privado. La dirección Stellar no acredita identidad legal ni aceptación bilateral.</p>
    <p className="mt-2 text-sm text-muted">Una huella representa esta versión exacta. Editar después no actualiza evidencias anteriores.</p>
    <div className="mt-5 flex flex-wrap gap-3">
      <Button disabled={busy || editing || unresolved} onClick={() => void run(async () => {
        const hash = await sha256(canonical)
        if (!alive.current) return
        setCalculated({ canonical, hash }); setPrepared(null); setSent(false); setVerification(null)
      })}>Calcular huella SHA-256</Button>
      <Button variant="outline" disabled={busy || editing || unresolved} onClick={() => void run(async () => {
        const connected = await connectFreighter()
        if (alive.current) { setAddress(connected); setPrepared(null); setVerification(null); setSent(false) }
      })}>Conectar Freighter</Button>
    </div>
    {calculated && <div className="mt-5 space-y-3">
      <p className="font-medium">SHA-256 {current ? 'de la versión guardada' : 'de una versión anterior: recalcula antes de registrar'}:</p>
      <p className="font-mono text-sm wrap-anywhere">{calculated.hash}</p>
      <CopyHashButton key={calculated.hash} value={calculated.hash} />
      <p className="text-sm text-muted">Formato canónico v1: JSON compacto UTF-8; verificar un PDF u otro archivo compara sus propios bytes y puede producir otra huella.</p>
    </div>}
    {address && <p className="mt-4 text-sm wrap-anywhere">Freighter / Stellar Testnet: {address}</p>}
    <div className="mt-5 flex flex-wrap gap-3">
      <Button variant="secondary" disabled={busy || editing || !current || !address || sent} onClick={() => void run(async () => {
        if (!calculated) return
        await checkWallet(address)
        const next = await prepareEvidence(calculated.hash, address)
        if (alive.current) { setPrepared(next); setVerification(null) }
      })}>Preparar evidencia Testnet</Button>
    </div>
    {prepared && <div className="mt-5 space-y-3 rounded-control border border-outline p-4">
      <p>Red: Stellar Testnet. Una operación manageData + Memo.hash, ambos con los mismos 32 bytes SHA-256.</p>
      <p>Comisión máxima preparada: {xlm(prepared.feeStroops)} XLM de prueba. Reserva adicional: {xlm(prepared.reserveStroops)} XLM de prueba. La transacción vence en 3 minutos.</p>
      <p className="text-sm wrap-anywhere">Referencia opaca: {prepared.reference}</p>
      <p className="text-sm wrap-anywhere">Hash de transacción (aún no prueba confirmación): {prepared.transactionHash}</p>
      <CopyHashButton key={prepared.transactionHash} value={prepared.transactionHash} />
      <p className="text-sm">Al pulsar Registrar solicitarás una firma en Freighter. Solo tras aprobarla se realizará un único envío a Testnet. Conserva el hash si el resultado queda incierto.</p>
      <Button disabled={busy || editing || !current || sent || calculated?.hash !== prepared.sha256} onClick={() => void run(async () => {
        setSent(true)
        const result = await signAndSubmit(prepared, undefined, undefined, () => alive.current)
        if (!alive.current) return
        if (!result.sent) { setSent(false); setMessage(result.message) }
        else setVerification(result.verification)
      })}>Registrar evidencia en Stellar Testnet</Button>
      {sent && <Button className="ml-2" variant="outline" disabled={busy} onClick={() => void run(async () => {
        const result = await verifyEvidence(prepared.transactionHash, prepared.sha256, prepared.reference, prepared.address)
        if (alive.current) setVerification(result)
      })}>Consultar confirmación sin reenviar</Button>}
    </div>}
    {busy && <p role="status" className="mt-4">Procesando… Si hay una solicitud en Freighter, revisa red, operación y comisión.</p>}
    {message && <p role="alert" className="mt-4 text-red-700">{message}</p>}
    {verification && (verification.status === 'confirmed' ? <div role="status" className="mt-5 space-y-3">
      <p className="font-semibold">Evidencia confirmada en Stellar Testnet para la huella indicada.</p>
      <a href={explorerUrl(verification.receipt.transaction_hash)} target="_blank" rel="noreferrer" className="underline text-accent-strong">Ver transacción Testnet</a>
      <p className="text-sm">Confirmación: {verification.receipt.confirmed_at}. El recibo no contiene el contrato y debe contrastarse de nuevo con Horizon.</p>
      <Button onClick={() => downloadJson(verification.receipt, 'acuerdoseguro-evidencia-testnet.json')}>Descargar recibo de evidencia</Button>
    </div> : <p role="status" className="mt-4">{verification.message}</p>)}
    <p className="mt-5 text-sm">Si falta saldo, {address ? <a className="underline text-accent-strong" href={'https://friendbot.stellar.org/?addr=' + encodeURIComponent(address)} target="_blank" rel="noreferrer">solicita XLM de prueba a Friendbot mediante este enlace (acción manual)</a> : 'conecta una cuenta Freighter en Testnet para acceder a Friendbot'}. No se crean ni financian cuentas automáticamente. Testnet puede reiniciarse; conserva tus recibos.</p>
  </section>
}
