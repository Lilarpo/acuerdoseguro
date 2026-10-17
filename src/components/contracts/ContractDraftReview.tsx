import type { Ref } from 'react'
import { Badge, Button, Card, PageContainer } from '../ui'

type DraftContent = {
  title: string
  description: string
  participantOneName: string
  participantOneEmail: string
  participantTwoName: string
  participantTwoEmail: string
  terms: string
}

type ContractDraftReviewProps = {
  draft: DraftContent
  headingRef: Ref<HTMLHeadingElement>
  onEdit: () => void
}

export function ContractDraftReview({ draft, headingRef, onEdit }: ContractDraftReviewProps) {
  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="max-w-3xl">
        <Badge tone="info">Borrador local</Badge>
        <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-3xl font-semibold text-brand sm:text-4xl">
          Revisión del borrador
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Comprueba cuidadosamente los datos y las condiciones antes de continuar con las futuras etapas del acuerdo.
        </p>
        <p className="mt-5 rounded-control border border-outline bg-surface p-4 leading-relaxed text-ink">
          Esta es una vista previa local. El contrato todavía no se ha guardado, aprobado ni registrado en Stellar.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <section aria-labelledby="review-information-title">
          <Card>
            <h2 id="review-information-title" className="text-2xl font-semibold text-brand">Información del acuerdo</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm font-semibold text-muted">Título del acuerdo</dt>
                <dd className="mt-2 whitespace-pre-wrap wrap-anywhere text-ink">{draft.title}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-muted">Descripción</dt>
                <dd className="mt-2 whitespace-pre-wrap wrap-anywhere text-ink">{draft.description}</dd>
              </div>
            </dl>
          </Card>
        </section>

        <section aria-labelledby="review-participants-title">
          <Card>
            <h2 id="review-participants-title" className="text-2xl font-semibold text-brand">Participantes del acuerdo</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="min-w-0 rounded-panel border border-outline bg-canvas p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-brand">Participante 1</h3>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-muted">Nombre completo</dt>
                    <dd className="mt-1 whitespace-pre-wrap wrap-anywhere text-ink">{draft.participantOneName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-muted">Correo electrónico</dt>
                    <dd className="mt-1 whitespace-pre-wrap wrap-anywhere text-ink">{draft.participantOneEmail}</dd>
                  </div>
                </dl>
              </div>
              <div className="min-w-0 rounded-panel border border-outline bg-canvas p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-brand">Participante 2</h3>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-muted">Nombre completo</dt>
                    <dd className="mt-1 whitespace-pre-wrap wrap-anywhere text-ink">{draft.participantTwoName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-muted">Correo electrónico</dt>
                    <dd className="mt-1 whitespace-pre-wrap wrap-anywhere text-ink">{draft.participantTwoEmail}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Card>
        </section>

        <section aria-labelledby="review-terms-title">
          <Card>
            <h2 id="review-terms-title" className="text-2xl font-semibold text-brand">Cláusulas y condiciones</h2>
            <p className="mt-6 whitespace-pre-wrap wrap-anywhere leading-relaxed text-ink">{draft.terms}</p>
          </Card>
        </section>

        <p className="text-sm leading-relaxed text-ink">
          Este contenido solo permanece en esta pantalla. Si sales o recargas, perderás el borrador.
        </p>
        <Button type="button" variant="secondary" size="lg" onClick={onEdit}>Volver a editar</Button>
      </div>
    </PageContainer>
  )
}
