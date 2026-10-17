import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Badge, Button, Card, PageContainer, TextField } from '../components/ui'

const sha256Format = /^[a-fA-F0-9]{64}$/

function fingerprintError(value: string): string | undefined {
  const fingerprint = value.trim()
  if (!fingerprint) return 'Ingresa la huella SHA-256 de referencia.'
  if (!sha256Format.test(fingerprint)) return 'La huella debe contener exactamente 64 caracteres hexadecimales.'
  return undefined
}

export function VerifyDocumentPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fingerprint, setFingerprint] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [inputsValidated, setInputsValidated] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const fingerprintRef = useRef<HTMLInputElement>(null)

  const fileError = submitted && !selectedFile ? 'Selecciona un documento para continuar.' : undefined
  const hashError = submitted ? fingerprintError(fingerprint) : undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setInputsValidated(false)

    if (!selectedFile) {
      fileRef.current?.focus()
      return
    }
    if (fingerprintError(fingerprint)) {
      fingerprintRef.current?.focus()
      return
    }

    setInputsValidated(true)
  }

  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="max-w-3xl">
        <Badge tone="info">Funcionalidad en desarrollo</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-brand sm:text-4xl">Verificar documento</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Prepara la información necesaria para comprobar la integridad de un acuerdo digital.
        </p>
        <p className="mt-5 rounded-control border border-outline bg-surface p-4 leading-relaxed text-ink">
          Esta herramienta está en desarrollo. Por ahora solo valida los datos introducidos; no calcula la huella del archivo ni consulta registros en Stellar.
        </p>
      </div>

      <section aria-labelledby="verify-form-title" className="mt-10">
        <Card className="max-w-3xl">
          <h2 id="verify-form-title" className="text-2xl font-semibold text-brand">Datos para la futura verificación</h2>
          <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="min-w-0 space-y-2">
              <label htmlFor="verify-file" className="block text-sm font-medium text-ink">
                Documento a verificar<span aria-hidden="true"> *</span>
              </label>
              <input
                ref={fileRef}
                id="verify-file"
                name="document"
                type="file"
                required
                aria-invalid={fileError ? true : undefined}
                aria-describedby={fileError ? 'verify-file-help verify-file-error' : 'verify-file-help'}
                onChange={(event) => {
                  setSelectedFile(event.currentTarget.files?.[0] ?? null)
                  setInputsValidated(false)
                }}
                className={`block min-h-11 w-full min-w-0 rounded-control border bg-surface px-3 py-2.5 text-base text-ink file:mr-3 file:rounded-control file:border-0 file:bg-canvas file:px-3 file:py-1 file:font-medium file:text-brand ${fileError ? 'border-red-700' : 'border-muted'}`}
              />
              <p id="verify-file-help" className="text-sm text-muted">
                El archivo permanecerá seleccionado solo durante esta interacción. Su contenido no se lee ni se envía.
              </p>
              {fileError && <p id="verify-file-error" className="text-sm text-red-700">{fileError}</p>}
              {selectedFile && (
                <p className="min-w-0 text-sm leading-relaxed wrap-anywhere text-ink">
                  Archivo seleccionado en este navegador: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>

            <TextField
              ref={fingerprintRef}
              id="verify-fingerprint"
              name="fingerprint"
              label="Huella SHA-256 de referencia"
              type="text"
              required
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              helperText="Introduce la huella hexadecimal de referencia del documento: 64 caracteres de 0 a 9 y de a a f."
              error={hashError}
              value={fingerprint}
              onChange={(event) => {
                setFingerprint(event.currentTarget.value)
                setInputsValidated(false)
              }}
            />

            <Button type="submit" size="lg">Validar datos</Button>
            {inputsValidated && (
              <p role="status" className="rounded-control border border-outline bg-canvas p-4 leading-relaxed text-ink">
                Los datos tienen un formato válido. La comparación del archivo y la consulta de evidencia en Stellar todavía no están habilitadas.
              </p>
            )}
          </form>
        </Card>
      </section>

      <section aria-labelledby="verify-process-title" className="mt-10">
        <h2 id="verify-process-title" className="text-2xl font-semibold text-brand">¿Cómo funcionará la verificación?</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold text-brand">1. Seleccionar el documento</h3>
            <p className="mt-3 leading-relaxed text-ink">Proporcionarás el archivo cuya integridad deseas comprobar.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-brand">2. Comparar la huella digital</h3>
            <p className="mt-3 leading-relaxed text-ink">La plataforma calculará SHA-256 y lo comparará con una referencia confiable.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-brand">3. Consultar la evidencia</h3>
            <p className="mt-3 leading-relaxed text-ink">Podrás contrastar la información correspondiente con registros disponibles en Stellar.</p>
          </Card>
        </div>
        <p className="mt-6 max-w-3xl rounded-control border border-outline bg-surface p-4 leading-relaxed text-ink">
          Una huella SHA-256 permite comprobar si dos contenidos coinciden, pero por sí sola no demuestra la identidad de los participantes ni garantiza la validez jurídica del acuerdo. Una huella introducida manualmente tampoco es automáticamente una referencia confiable: su procedencia deberá verificarse en una fase posterior.
        </p>
      </section>

      <nav aria-label="Acciones relacionadas" className="mt-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link to="/panel" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">Volver al panel</Link></li>
          <li><Link to="/contratos/nuevo" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">Crear acuerdo</Link></li>
        </ul>
      </nav>
    </PageContainer>
  )
}
