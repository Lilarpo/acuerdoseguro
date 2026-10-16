import { Link } from 'react-router'
import { Badge, Card, PageContainer } from '../components/ui'

const steps = [
  { title: 'Crea el acuerdo', description: 'Podrás establecer el contenido y las condiciones que se propondrán a los participantes.' },
  { title: 'Revisa las condiciones', description: 'Cada participante podrá revisar el documento final antes de aprobarlo.' },
  { title: 'Autoriza con tu billetera', description: 'Cada participante podrá autorizar su aprobación mediante una operación criptográfica verificable.' },
  { title: 'Verifica la evidencia', description: 'El sistema permitirá consultar las aprobaciones y comprobar la integridad del documento.' },
]

const capabilities = [
  { title: 'Integridad documental', description: 'Una huella digital del documento, calculada con SHA-256, permitirá detectar cambios al compararla con la original. No impedirá editar el archivo.' },
  { title: 'Aprobaciones verificables', description: 'El sistema está diseñado para vincular las aprobaciones a las billeteras de los participantes mediante autorizaciones criptográficas verificables.' },
  { title: 'Evidencia en Stellar', description: 'Está previsto registrar evidencia criptográfica en Stellar, sin almacenar documentos confidenciales completos en la blockchain.' },
]

const technologies = [
  { title: 'Stellar: evidencia consultable', description: 'Se utilizará para registrar evidencia criptográfica que los participantes podrán consultar y verificar.' },
  { title: 'Soroban: reglas del acuerdo', description: 'Permitirá expresar las reglas de aprobación y los estados del acuerdo mediante contratos inteligentes, programas que ejecutan reglas definidas.' },
  { title: 'Privacidad documental', description: 'El diseño prevé mantener los documentos privados fuera de la blockchain y registrar únicamente la evidencia necesaria.' },
]

export function HomePage() {
  return (
    <div>
      <section aria-labelledby="hero-title" className="py-14 sm:py-20 lg:py-24">
        <PageContainer className="grid items-center gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Badge tone="info">Prototipo en desarrollo</Badge>
            <h1 id="hero-title" className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-brand sm:text-5xl lg:text-6xl">
              Acuerdos digitales claros, con evidencia verificable.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              AcuerdoSeguro es una plataforma en desarrollo para crear acuerdos,
              obtener la aprobación de sus participantes y verificar su integridad
              mediante tecnología Stellar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#como-funciona" className="inline-flex min-h-12 items-center justify-center rounded-control bg-brand px-6 py-3 font-semibold text-surface hover:bg-ink">
                Cómo funciona
              </a>
              <Link to="/registro" className="inline-flex min-h-12 items-center justify-center rounded-control border border-brand bg-surface px-6 py-3 font-semibold text-brand hover:bg-canvas">
                Explorar registro
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink">
              El registro aún está en desarrollo. Puedes explorar su página provisional.
            </p>
          </div>
          <Card className="border-t-4 border-t-accent-strong">
            <p className="text-sm font-semibold tracking-wide text-accent-strong">EL PROPÓSITO</p>
            <p className="mt-5 text-2xl font-semibold leading-snug text-brand">
              Claridad para acordar.<br />Evidencia para verificar.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              El diseño de AcuerdoSeguro parte de una idea: que cada participante
              pueda revisar lo que aprueba y consultar después la evidencia del acuerdo.
            </p>
            <div aria-hidden="true" className="mt-8 h-1 w-12 rounded-full bg-accent-strong" />
          </Card>
        </PageContainer>
      </section>

      <section id="como-funciona" tabIndex={-1} aria-labelledby="proceso-title" className="scroll-mt-8 border-y border-outline bg-surface py-14 sm:py-20">
        <PageContainer>
          <p className="text-sm font-semibold tracking-wide text-accent-strong">EL PROCESO PREVISTO</p>
          <h2 id="proceso-title" className="mt-3 text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Cómo funcionará AcuerdoSeguro
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Cuatro pasos para acompañar un acuerdo, desde sus condiciones hasta su
            evidencia. Este flujo está previsto y todavía no está operativo.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex">
                <Card>
                  <span aria-hidden="true" className="text-3xl font-semibold text-accent-strong">0{index + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold text-brand">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
                </Card>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>

      <section aria-labelledby="capacidades-title" className="py-14 sm:py-20">
        <PageContainer>
          <p className="text-sm font-semibold tracking-wide text-accent-strong">LAS CAPACIDADES PREVISTAS</p>
          <h2 id="capacidades-title" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Diseñado para acuerdos más transparentes
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {capabilities.map(capability => (
              <Card key={capability.title}>
                <h3 className="text-xl font-semibold text-brand">{capability.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{capability.description}</p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      <section aria-labelledby="tecnologia-title" className="border-y border-outline bg-surface py-14 sm:py-20">
        <PageContainer>
          <p className="text-sm font-semibold tracking-wide text-accent-strong">TECNOLOGÍA CON LÍMITES CLAROS</p>
          <h2 id="tecnologia-title" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Transparencia respaldada por tecnología
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">Estas tecnologías forman parte de la arquitectura prevista. Aún no están conectadas a la aplicación.</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {technologies.map(technology => (
              <div key={technology.title}>
                <h3 className="text-lg font-semibold text-brand">{technology.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{technology.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 border-l-4 border-accent-strong bg-canvas p-5 text-sm leading-relaxed text-ink">
            La evidencia blockchain no sustituye automáticamente los requisitos legales
            de una firma digital certificada o de una intervención notarial cuando correspondan.
          </p>
        </PageContainer>
      </section>

      <section aria-labelledby="explorar-title" className="py-14 sm:py-20">
        <PageContainer>
          <div className="rounded-panel bg-brand px-6 py-10 sm:px-12 sm:py-14">
            <h2 id="explorar-title" className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-surface sm:text-4xl">
              Conoce una nueva forma de gestionar acuerdos digitales
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-surface">Explora el prototipo y conoce el punto de partida de AcuerdoSeguro.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/registro" className="inline-flex min-h-12 items-center justify-center rounded-control bg-accent px-6 py-3 font-semibold text-brand hover:bg-surface focus-visible:outline-surface">
                Explorar registro
              </Link>
              <Link to="/verificar" className="inline-flex min-h-12 items-center justify-center rounded-control border border-surface bg-surface px-6 py-3 font-semibold text-brand hover:bg-canvas focus-visible:outline-surface">
                Explorar verificación
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-surface">Registro y verificación están en desarrollo. Los enlaces llevan a páginas provisionales; aún no permiten registrar cuentas ni verificar documentos.</p>
          </div>
        </PageContainer>
      </section>
    </div>
  )
}
