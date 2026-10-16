import { Link } from 'react-router'
import { Card, PageContainer } from '../components/ui'

type PlaceholderPageProps = {
  title: string
  description?: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PageContainer className="py-10 sm:py-14">
      <Card className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-brand sm:text-3xl">{title}</h1>
        <p className="mt-4 leading-relaxed text-muted">
          En construcción. Esta funcionalidad está pendiente de implementación.
        </p>
        {description && <p className="mt-3 leading-relaxed text-ink">{description}</p>}
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
