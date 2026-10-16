import { Link } from 'react-router'
import { Card, PageContainer } from '../components/ui'

export function NotFoundPage() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <Card className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
          404 — Página no encontrada
        </h1>
        <p className="mt-4 leading-relaxed text-muted">La página que buscas no existe.</p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </Card>
    </PageContainer>
  )
}
