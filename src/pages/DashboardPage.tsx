import { Link } from 'react-router'
import { useAuth } from '../auth/useAuth'
import { useContractQuery } from '../components/contracts/useContractQuery'
import { Badge, Button, Card, PageContainer } from '../components/ui'
import { listMyContractDrafts } from '../services/supabase/contracts'

function MyDrafts() {
  const { result, reload } = useContractQuery(listMyContractDrafts)
  return (
    <>
      <Button onClick={reload} disabled={!result} variant="outline">Actualizar listado</Button>
      {!result ? <p role="status" className="mt-5">Cargando borradores…</p>
        : !result.ok ? <p role="alert" className="mt-5 text-red-700">{result.message}</p>
          : result.data.length === 0 ? <Card className="mt-5"><p>No tienes borradores disponibles. Crea tu primer acuerdo.</p></Card>
            : <ul className="mt-5 space-y-4">
              {result.data.map((draft) => (
                <li key={draft.id}>
                  <Card>
                    <Badge>Borrador</Badge>
                    <h2 className="mt-3 text-xl font-semibold text-brand wrap-anywhere">
                      <Link to={'/contratos/' + draft.id} className="underline underline-offset-4">{draft.title}</Link>
                    </h2>
                    <p className="mt-2 text-muted">Creado: <time dateTime={draft.created_at}>{new Date(draft.created_at).toLocaleString('es')}</time></p>
                  </Card>
                </li>
              ))}
            </ul>}
    </>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  return (
    <PageContainer className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold text-brand">Mis acuerdos</h1>
      <p className="mt-4 leading-relaxed text-ink">Borradores privados de tu cuenta. Las firmas y la verificación blockchain siguen en desarrollo.</p>
      <Link to="/contratos/nuevo" className="my-6 inline-flex min-h-11 items-center rounded-control bg-accent px-5 font-semibold text-brand">Crear acuerdo</Link>
      {user && <MyDrafts key={user.id} />}
    </PageContainer>
  )
}
