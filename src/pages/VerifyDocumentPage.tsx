import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { CopyHashButton } from '../components/contracts/CopyHashButton'
import { Button, Card, PageContainer, TextField } from '../components/ui'
import { downloadJson, equalHashes, hashFile, isSha256 } from '../services/documents/fingerprints'
import { evidenceMessage, explorerUrl, parseReceipt, verifyEvidence, type EvidenceReceipt, type Verification } from '../services/stellar/evidence'

export function VerifyDocumentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [expected, setExpected] = useState('')
  const [fileHash, setFileHash] = useState('')
  const [fileMessage, setFileMessage] = useState('')
  const [txHash, setTxHash] = useState('')
  const [receipt, setReceipt] = useState<EvidenceReceipt | null>(null)
  const [verification, setVerification] = useState<Verification | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const alive = useRef(false)
  const locked = useRef(false)
  const revision = useRef(0)
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])

  function invalidate() {
    revision.current++
    setFileHash(''); setFileMessage(''); setVerification(null); setError('')
  }
  async function compare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (locked.current) return
    invalidate()
    if (!file) { setError('Selecciona un archivo local.'); return }
    if (expected.trim() && !isSha256(expected)) { setError('La huella de referencia debe tener 64 caracteres hexadecimales.'); return }
    const version = revision.current
    locked.current = true; setBusy(true)
    try {
      const hash = await hashFile(file)
      if (!alive.current || version !== revision.current) return
      setFileHash(hash)
      setFileMessage(expected.trim() ? equalHashes(hash, expected) ? 'COINCIDE' : 'NO COINCIDE' : 'Huella calculada. Introduce una referencia para compararla.')
    } catch (failure) {
      if (alive.current && version === revision.current) setError(failure instanceof Error ? failure.message : 'No se pudo leer el archivo local.')
    } finally { locked.current = false; if (alive.current) setBusy(false) }
  }
  async function verify() {
    if (locked.current) return
    setVerification(null); setError('')
    if (!isSha256(expected) || !isSha256(txHash)) { setError('Introduce la huella documental y el hash de transacción, ambos de 64 caracteres hexadecimales.'); return }
    const version = revision.current
    locked.current = true; setBusy(true)
    try {
      const result = await verifyEvidence(txHash, expected, receipt?.reference, receipt?.signer_address)
      if (alive.current && version === revision.current) setVerification(result)
    } finally { locked.current = false; if (alive.current) setBusy(false) }
  }

  return <PageContainer className="py-10 sm:py-14">
    <h1 className="text-3xl font-semibold text-brand">Verificar documento</h1>
    <p className="mt-4 max-w-3xl leading-relaxed">Calcula SHA-256 localmente y compara bytes. El archivo no se sube a ningún servidor. Una coincidencia no demuestra identidad, autoría ni validez jurídica.</p>
    <Card className="mt-8 max-w-3xl">
      <h2 className="text-2xl font-semibold text-brand">Archivo y huella de referencia</h2>
      <form onSubmit={compare} noValidate className="mt-5 space-y-5" aria-busy={busy}>
        <div className="space-y-2">
          <label htmlFor="verify-file" className="block font-medium">Archivo local (máximo 10 MiB, no vacío)</label>
          <input id="verify-file" type="file" disabled={busy} className="block w-full min-w-0" onChange={(event) => {
            invalidate(); setFile(event.currentTarget.files?.[0] ?? null)
          }} />
        </div>
        <TextField id="verify-fingerprint" label="Huella SHA-256 documental de referencia" autoComplete="off" spellCheck={false}
          value={expected} disabled={busy} helperText="64 caracteres hexadecimales. Opcional para calcular el archivo; obligatoria para comparar o verificar Stellar."
          onChange={(event) => { invalidate(); setExpected(event.currentTarget.value); setReceipt(null) }} />
        <Button type="submit" disabled={busy}>Calcular y comparar SHA-256</Button>
      </form>
      {fileHash && <div className="mt-5 space-y-3">
        <p className="font-mono text-sm wrap-anywhere">{fileHash}</p>
        <CopyHashButton key={fileHash} value={fileHash} />
        <p role="status" className="font-semibold">{fileMessage}</p>
      </div>}
      <p className="mt-5 text-sm text-muted">La huella canónica de un borrador corresponde al JSON versionado exacto, no necesariamente a un PDF o archivo con otro formato.</p>
    </Card>

    <Card className="mt-8 max-w-3xl">
      <h2 className="text-2xl font-semibold text-brand">Consultar evidencia en Stellar Testnet</h2>
      <p className="mt-3 text-sm">Se consulta Horizon Testnet. El hash de transacción identifica la operación; la huella documental identifica los bytes del contenido. Son conceptos distintos.</p>
      <div className="mt-5 space-y-5">
        <TextField label="Hash de transacción Stellar Testnet" value={txHash} disabled={busy} autoComplete="off" spellCheck={false}
          onChange={(event) => { invalidate(); setTxHash(event.currentTarget.value); setReceipt(null) }} />
        <div className="space-y-2">
          <label htmlFor="evidence-receipt" className="block font-medium">Cargar recibo JSON opcional (máximo 8 KiB)</label>
          <input id="evidence-receipt" type="file" accept=".json,application/json" disabled={busy} className="block w-full min-w-0"
            onChange={async (event) => {
              invalidate(); setReceipt(null)
              const selected = event.currentTarget.files?.[0]
              if (!selected) return
              const version = revision.current
              try {
                if (selected.size === 0 || selected.size > 8192) throw new Error('Tamaño de recibo no válido.')
                const parsed = parseReceipt(JSON.parse(await selected.text()))
                if (!alive.current || version !== revision.current) return
                setReceipt(parsed); setExpected(parsed.sha256); setTxHash(parsed.transaction_hash)
              } catch (failure) {
                if (alive.current && version === revision.current) setError(failure instanceof SyntaxError ? 'El recibo no contiene JSON válido.' : failure instanceof Error && failure.message === 'Tamaño de recibo no válido.' ? failure.message : evidenceMessage(failure))
              }
            }} />
          {receipt && <p className="text-sm">Recibo cargado; todavía NO verificado contra blockchain.</p>}
        </div>
        <Button onClick={() => void verify()} disabled={busy}>Consultar Horizon Testnet</Button>
      </div>
      {verification && (verification.status === 'confirmed' ? <div className="mt-5 space-y-3" role="status">
        <p className="font-semibold">Evidencia confirmada: la transacción Testnet contiene la huella esperada.</p>
        <p className="font-mono text-sm wrap-anywhere">SHA-256: {verification.receipt.sha256}</p>
        <p className="text-sm wrap-anywhere">Transacción: {verification.receipt.transaction_hash}</p>
        <a href={explorerUrl(verification.receipt.transaction_hash)} target="_blank" rel="noreferrer" className="underline text-accent-strong">Ver en explorador Testnet</a>
        <p className="text-sm">Autorización de la billetera indicada, sin acreditar identidad legal ni aceptación bilateral.</p>
        <Button onClick={() => downloadJson(verification.receipt, 'acuerdoseguro-evidencia-verificada.json')}>Descargar recibo verificado</Button>
      </div> : <p role="status" className="mt-5">{verification.message}</p>)}
    </Card>
    {busy && <p className="mt-5" role="status">Procesando…</p>}
    {error && <p className="mt-5 text-red-700" role="alert">{error}</p>}
    <Link to="/panel" className="mt-6 inline-flex min-h-11 items-center text-accent-strong underline">Ir al panel (requiere sesión)</Link>
  </PageContainer>
}
