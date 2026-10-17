import { Link, useParams } from 'react-router'
import { Badge, Card, PageContainer } from '../components/ui'

const unavailable = 'Información todavía no disponible.'

export function ContractDetailPage() {
  const { id } = useParams<'id'>()
  const referenceCharacters = Array.from(id ?? '')
  const reference = referenceCharacters.slice(0, 120).join('')
  const referenceTruncated = referenceCharacters.length > 120

  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="max-w-3xl">
        <Badge tone="info">Vista preliminar</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-brand sm:text-4xl">Detalle del acuerdo</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Consulta la estructura de información y evidencia que estará disponible para cada acuerdo digital.
        </p>
        <p className="mt-5 rounded-control border border-outline bg-surface p-4 leading-relaxed text-ink">
          La consulta de contratos todavía no está conectada. No se ha comprobado que la referencia solicitada
          corresponda a un acuerdo existente.
        </p>
        <div className="mt-5 min-w-0 rounded-control border border-outline bg-surface p-4">
          <p className="text-sm font-semibold text-muted">Referencia solicitada en la URL (no verificada)</p>
          <p className="mt-2 whitespace-pre-wrap wrap-anywhere text-ink">
            {reference || 'No disponible.'}
            {referenceTruncated && <span>… (referencia recortada para visualización)</span>}
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <section aria-labelledby="detail-information-title">
          <Card>
            <h2 id="detail-information-title" className="text-2xl font-semibold text-brand">Información del acuerdo</h2>
            <p className="mt-3 leading-relaxed text-ink">Los datos del acuerdo estarán disponibles cuando se habilite su consulta.</p>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {['Título', 'Descripción u objeto', 'Identificador real', 'Fecha de creación', 'Estado contractual'].map((label) => (
                <div key={label} className="min-w-0">
                  <dt className="text-sm font-semibold text-muted">{label}</dt>
                  <dd className="mt-1 leading-relaxed text-ink">{unavailable}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </section>

        <section aria-labelledby="detail-participants-title">
          <Card>
            <h2 id="detail-participants-title" className="text-2xl font-semibold text-brand">Participantes</h2>
            <p className="mt-3 leading-relaxed text-ink">La información de los participantes todavía no se consulta.</p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {['Participante 1', 'Participante 2'].map((participant) => (
                <div key={participant} className="min-w-0 rounded-panel border border-outline bg-canvas p-4 sm:p-5">
                  <h3 className="text-lg font-semibold text-brand">{participant}</h3>
                  <dl className="mt-4 space-y-4">
                    {['Nombre', 'Correo electrónico', 'Billetera Stellar vinculada'].map((label) => (
                      <div key={label}>
                        <dt className="text-sm font-semibold text-muted">{label}</dt>
                        <dd className="mt-1 leading-relaxed text-ink">Datos no disponibles.</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section aria-labelledby="detail-approvals-title">
          <Card>
            <h2 id="detail-approvals-title" className="text-2xl font-semibold text-brand">Aprobaciones del acuerdo</h2>
            <p className="mt-3 leading-relaxed text-ink">
              Cuando esté disponible la integración, cada participante podrá autorizar el acuerdo con su billetera Stellar.
            </p>
            <p className="mt-4 font-medium text-ink">El estado de las aprobaciones todavía no está disponible.</p>
          </Card>
        </section>

        <section aria-labelledby="detail-evidence-title">
          <Card>
            <h2 id="detail-evidence-title" className="text-2xl font-semibold text-brand">Evidencia e integridad</h2>
            <p className="mt-3 leading-relaxed text-ink">Esta información está pendiente de integración; no se ha consultado evidencia de ningún acuerdo.</p>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-brand">Hash SHA-256</dt>
                <dd className="mt-1 leading-relaxed text-ink">Huella digital prevista para comparar la integridad del documento definitivo. Información todavía no disponible.</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand">Red Stellar</dt>
                <dd className="mt-1 leading-relaxed text-ink">Registro previsto de evidencia criptográfica verificable. Información todavía no disponible.</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand">Transacción o referencia blockchain</dt>
                <dd className="mt-1 leading-relaxed text-ink">Identificación futura de la operación registrada. Información todavía no disponible.</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand">Soroban</dt>
                <dd className="mt-1 leading-relaxed text-ink">Lógica de contratos inteligentes prevista para las reglas del acuerdo. Información todavía no disponible.</dd>
              </div>
            </dl>
          </Card>
        </section>
      </div>

      <nav aria-label="Acciones relacionadas" className="mt-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link to="/panel" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">Volver al panel</Link></li>
          <li><Link to="/contratos/nuevo" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">Crear acuerdo</Link></li>
          <li><Link to="/verificar" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">Verificar documento</Link></li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-ink">La creación y la verificación reales siguen en desarrollo.</p>
      </nav>
    </PageContainer>
  )
}
