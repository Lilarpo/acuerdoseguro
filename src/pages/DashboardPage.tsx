import { Link } from 'react-router'
import { Badge, Card, PageContainer } from '../components/ui'

const futureCapabilities = [
  {
    title: 'Gestionar acuerdos',
    description: 'Podrás consultar los acuerdos asociados a tu cuenta cuando se habilite su almacenamiento.',
  },
  {
    title: 'Revisar aprobaciones',
    description: 'Podrás consultar el estado de aprobación de los participantes cuando exista esa integración.',
  },
  {
    title: 'Consultar evidencia verificable',
    description: 'Podrás acceder a la información de verificación registrada en Stellar cuando esté disponible.',
  },
]

export function DashboardPage() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="max-w-3xl">
        <Badge tone="info">Vista preliminar</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-brand sm:text-4xl">Panel de acuerdos</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Un espacio para organizar y consultar tus acuerdos digitales.
        </p>
        <p className="mt-5 rounded-control border border-outline bg-surface p-4 leading-relaxed text-ink">
          La gestión de contratos y la conexión con tu cuenta estarán disponibles en una etapa posterior.
          Esta vista no muestra datos de una cuenta.
        </p>
      </div>

      <section aria-labelledby="agreements-title" className="mt-12">
        <h2 id="agreements-title" className="text-2xl font-semibold text-brand sm:text-3xl">Mis acuerdos</h2>
        <Card className="mt-5">
          <div aria-hidden="true" className="mb-6 h-1 w-12 rounded-full bg-accent-strong" />
          <h3 className="text-xl font-semibold text-brand">Espacio para tus futuros acuerdos</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink">
            Tus acuerdos aparecerán aquí cuando se habilite la gestión de contratos.
            Todavía no se consultan datos de ninguna cuenta.
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Más adelante podrás consultar el estado y los detalles de cada acuerdo desde este espacio.
          </p>
          <Link
            to="/contratos/nuevo"
            className="mt-6 inline-flex min-h-11 max-w-full items-center justify-center rounded-control bg-accent px-5 py-2.5 text-center font-semibold text-brand hover:bg-accent-strong hover:text-surface"
          >
            Crear acuerdo
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            La página de creación está en desarrollo y aún no permite guardar contratos.
          </p>
        </Card>
      </section>

      <section aria-labelledby="quick-access-title" className="mt-12">
        <h2 id="quick-access-title" className="text-2xl font-semibold text-brand sm:text-3xl">Accesos rápidos</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Card>
            <Badge>En desarrollo</Badge>
            <h3 className="mt-4 text-lg font-semibold text-brand">
              <Link to="/contratos/nuevo" className="inline-flex min-h-11 items-center rounded-control text-accent-strong underline underline-offset-4">
                Crear acuerdo
              </Link>
            </h3>
            <p className="mt-2 leading-relaxed text-ink">Prepara un nuevo acuerdo digital cuando se habilite su creación.</p>
          </Card>
          <Card>
            <Badge>En desarrollo</Badge>
            <h3 className="mt-4 text-lg font-semibold text-brand">
              <Link to="/verificar" className="inline-flex min-h-11 items-center rounded-control text-accent-strong underline underline-offset-4">
                Verificar documento
              </Link>
            </h3>
            <p className="mt-2 leading-relaxed text-ink">Explora la futura verificación de integridad documental.</p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="future-title" className="mt-12">
        <h2 id="future-title" className="text-2xl font-semibold text-brand sm:text-3xl">
          ¿Qué podrás hacer desde aquí?
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {futureCapabilities.map(({ title, description }) => (
            <Card key={title}>
              <h3 className="text-lg font-semibold text-brand">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink">{description}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageContainer>
  )
}
