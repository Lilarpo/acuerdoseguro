import { Link } from 'react-router'
import { Badge, Card, PageContainer } from '../components/ui'

const steps = [
  { title: 'Guarda un borrador', description: 'Crea un borrador privado con título, descripción y cláusulas desde tu cuenta.' },
  { title: 'Revisa su contenido', description: 'Abre y edita tu borrador. La revisión por otra parte aún no está disponible.' },
  { title: 'Registra una huella', description: 'Freighter permite autorizar el registro de la huella en Stellar Testnet; no es aceptación bilateral.' },
  { title: 'Verifica la evidencia', description: 'Compara una huella SHA-256 y consulta una transacción existente en Horizon Testnet.' },
]

const capabilities = [
  { title: 'Integridad documental', description: 'Calcula SHA-256 y compara huellas para detectar cambios. La huella no impide modificar el archivo.' },
  { title: 'Aceptación bilateral pendiente', description: 'Aún no existen invitaciones ni aprobación verificable de ambas partes. Una operación Stellar no sustituye ese consentimiento.' },
  { title: 'Evidencia en Stellar Testnet', description: 'Registra y consulta huellas criptográficas en Testnet sin publicar el contenido del contrato.' },
]

const technologies = [
  { title: 'Stellar Testnet: evidencia consultable', description: 'Freighter autoriza el registro de huellas y Horizon permite verificar transacciones confirmadas en la red de prueba.' },
  { title: 'Soroban: etapa futura', description: 'Los contratos inteligentes y las reglas de aprobación todavía no están implementados en este MVP.' },
  { title: 'Privacidad documental', description: 'Los borradores se conservan fuera de la blockchain; en Testnet se registra solo la evidencia criptográfica.' },
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
              AcuerdoSeguro permite guardar borradores privados, calcular huellas
              SHA-256 y consultar evidencia en Stellar Testnet. La aceptación
              bilateral todavía está en desarrollo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#como-funciona" className="inline-flex min-h-12 items-center justify-center rounded-control bg-brand px-6 py-3 font-semibold text-surface hover:bg-ink">
                Cómo funciona
              </a>
              <Link to="/registro" className="inline-flex min-h-12 items-center justify-center rounded-control border border-brand bg-surface px-6 py-3 font-semibold text-brand hover:bg-canvas">
                Registrarse
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink">
              El registro está conectado a Supabase; la aprobación entre participantes sigue pendiente.
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
          <p className="text-sm font-semibold tracking-wide text-accent-strong">EL MVP Y SUS LÍMITES</p>
          <h2 id="proceso-title" className="mt-3 text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Del borrador a la evidencia
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Ya puedes guardar borradores, calcular huellas y consultar evidencia en
            Stellar Testnet. La revisión y aceptación por otra parte siguen pendientes.
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
          <p className="text-sm font-semibold tracking-wide text-accent-strong">CAPACIDADES Y PRÓXIMOS PASOS</p>
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
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">Supabase y Stellar Testnet forman parte del MVP. Soroban y la aceptación bilateral permanecen pendientes.</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {technologies.map(technology => (
              <div key={technology.title}>
                <h3 className="text-lg font-semibold text-brand">{technology.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{technology.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 border-l-4 border-accent-strong bg-canvas p-5 text-sm leading-relaxed text-ink">
            Una huella SHA-256 detecta cambios, pero no impide modificar archivos.
            La evidencia Testnet no acredita aceptación bilateral ni sustituye una
            firma digital certificada o una intervención notarial cuando correspondan.
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
                Registrarse
              </Link>
              <Link to="/verificar" className="inline-flex min-h-12 items-center justify-center rounded-control border border-surface bg-surface px-6 py-3 font-semibold text-brand hover:bg-canvas focus-visible:outline-surface">
                Verificar documento
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-surface">Puedes crear una cuenta y comparar huellas de archivos locales o consultar evidencia en Stellar Testnet. Invitaciones y aceptación bilateral aún no están disponibles.</p>
          </div>
        </PageContainer>
      </section>
    </div>
  )
}
