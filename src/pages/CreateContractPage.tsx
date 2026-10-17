import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ContractDraftReview } from '../components/contracts/ContractDraftReview'
import { Button, Card, PageContainer, TextareaField, TextField } from '../components/ui'

type DraftValues = {
  title: string
  description: string
  participantOneName: string
  participantOneEmail: string
  participantTwoName: string
  participantTwoEmail: string
  terms: string
}

type FieldName = keyof DraftValues
type DraftErrors = Partial<Record<FieldName, string>>

const fieldOrder: FieldName[] = [
  'title',
  'description',
  'participantOneName',
  'participantOneEmail',
  'participantTwoName',
  'participantTwoEmail',
  'terms',
]

function validateDraft(
  values: DraftValues,
  participantOneEmailInvalid: boolean,
  participantTwoEmailInvalid: boolean,
): DraftErrors {
  const errors: DraftErrors = {}

  if (values.title.trim() === '') {
    errors.title = 'Ingresa un título para el acuerdo.'
  } else if (values.title.length > 120) {
    errors.title = 'El título no puede superar los 120 caracteres.'
  }
  if (values.description.trim() === '') {
    errors.description = 'Describe el objeto del acuerdo.'
  }
  if (values.participantOneName.trim() === '') {
    errors.participantOneName = 'Ingresa el nombre del participante 1.'
  }
  if (values.participantOneEmail.trim() === '') {
    errors.participantOneEmail = 'Ingresa el correo electrónico del participante 1.'
  } else if (participantOneEmailInvalid) {
    errors.participantOneEmail = 'Ingresa un correo electrónico válido.'
  }
  if (values.participantTwoName.trim() === '') {
    errors.participantTwoName = 'Ingresa el nombre del participante 2.'
  }
  if (values.participantTwoEmail.trim() === '') {
    errors.participantTwoEmail = 'Ingresa el correo electrónico del participante 2.'
  } else if (participantTwoEmailInvalid) {
    errors.participantTwoEmail = 'Ingresa un correo electrónico válido.'
  }

  const firstEmail = values.participantOneEmail.trim().toLowerCase()
  const secondEmail = values.participantTwoEmail.trim().toLowerCase()
  if (firstEmail && secondEmail && firstEmail === secondEmail && !errors.participantOneEmail && !errors.participantTwoEmail) {
    errors.participantTwoEmail = 'Los participantes deben tener correos electrónicos diferentes.'
  }
  if (values.terms.trim() === '') {
    errors.terms = 'Ingresa las cláusulas y condiciones del acuerdo.'
  }

  return errors
}

export function CreateContractPage() {
  const [values, setValues] = useState<DraftValues>({
    title: '',
    description: '',
    participantOneName: '',
    participantOneEmail: '',
    participantTwoName: '',
    participantTwoEmail: '',
    terms: '',
  })
  const [participantOneEmailInvalid, setParticipantOneEmailInvalid] = useState(false)
  const [participantTwoEmailInvalid, setParticipantTwoEmailInvalid] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [validatedDraft, setValidatedDraft] = useState<DraftValues | null>(null)
  const [view, setView] = useState<'edit' | 'review'>('edit')
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null)
  const reviewWasOpened = useRef(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const participantOneNameRef = useRef<HTMLInputElement>(null)
  const participantOneEmailRef = useRef<HTMLInputElement>(null)
  const participantTwoNameRef = useRef<HTMLInputElement>(null)
  const participantTwoEmailRef = useRef<HTMLInputElement>(null)
  const termsRef = useRef<HTMLTextAreaElement>(null)
  const fieldRefs = {
    title: titleRef,
    description: descriptionRef,
    participantOneName: participantOneNameRef,
    participantOneEmail: participantOneEmailRef,
    participantTwoName: participantTwoNameRef,
    participantTwoEmail: participantTwoEmailRef,
    terms: termsRef,
  }

  const errors = submitted
    ? validateDraft(values, participantOneEmailInvalid, participantTwoEmailInvalid)
    : {}
  const canReview = validatedDraft !== null && fieldOrder.every((field) => values[field] === validatedDraft[field])

  useEffect(() => {
    if (view === 'review') {
      reviewHeadingRef.current?.focus()
      reviewWasOpened.current = true
    } else if (reviewWasOpened.current) {
      titleRef.current?.focus()
    }
  }, [view])

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setValidatedDraft(null)
  }

  function runValidation(): DraftErrors {
    const firstEmailInvalid = participantOneEmailRef.current?.validity.typeMismatch ?? false
    const secondEmailInvalid = participantTwoEmailRef.current?.validity.typeMismatch ?? false
    setParticipantOneEmailInvalid(firstEmailInvalid)
    setParticipantTwoEmailInvalid(secondEmailInvalid)
    return validateDraft(values, firstEmailInvalid, secondEmailInvalid)
  }

  function focusFirstError(currentErrors: DraftErrors) {
    const firstInvalid = fieldOrder.find((field) => currentErrors[field])
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus()
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setValidatedDraft(null)

    const currentErrors = runValidation()
    if (fieldOrder.some((field) => currentErrors[field])) {
      focusFirstError(currentErrors)
      return
    }

    setValidatedDraft({ ...values })
  }

  function handleReview() {
    if (!canReview) return

    const currentErrors = runValidation()
    if (fieldOrder.some((field) => currentErrors[field])) {
      setSubmitted(true)
      setValidatedDraft(null)
      focusFirstError(currentErrors)
      return
    }

    setView('review')
  }

  if (view === 'review') {
    return (
      <ContractDraftReview
        draft={values}
        headingRef={reviewHeadingRef}
        onEdit={() => setView('edit')}
      />
    )
  }

  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-brand sm:text-4xl">Crear acuerdo</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Define los participantes y las condiciones de tu acuerdo digital.
        </p>
        <p className="mt-5 rounded-control border border-outline bg-surface p-4 leading-relaxed text-ink">
          Esta es una interfaz preliminar. Puedes completar y validar un borrador local,
          pero la información no se guarda, no se genera un documento y no se solicitan aprobaciones.
          La validación local no determina su validez jurídica.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-6">
        <section aria-labelledby="agreement-info-title">
          <Card>
            <h2 id="agreement-info-title" className="text-2xl font-semibold text-brand">Información del acuerdo</h2>
            <div className="mt-6 space-y-5">
              <TextField
                ref={titleRef}
                id="contract-title"
                name="title"
                label="Título del acuerdo"
                required
                placeholder="Acuerdo de prestación de servicios"
                helperText="Máximo 120 caracteres."
                value={values.title}
                error={errors.title}
                onChange={(event) => updateField('title', event.currentTarget.value)}
              />
              <TextareaField
                ref={descriptionRef}
                id="contract-description"
                name="description"
                label="Descripción del acuerdo"
                required
                rows={5}
                helperText="Describe el propósito del acuerdo y qué se comprometen a realizar sus participantes."
                value={values.description}
                error={errors.description}
                onChange={(event) => updateField('description', event.currentTarget.value)}
              />
            </div>
          </Card>
        </section>

        <section aria-labelledby="participants-title">
          <Card>
            <h2 id="participants-title" className="text-2xl font-semibold text-brand">Participantes</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="min-w-0 rounded-panel border border-outline bg-canvas p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-brand">Participante 1</h3>
                <div className="mt-5 space-y-5">
                  <TextField
                    ref={participantOneNameRef}
                    id="participant-one-name"
                    name="participantOneName"
                    label="Nombre completo del participante 1"
                    autoComplete="name"
                    required
                    value={values.participantOneName}
                    error={errors.participantOneName}
                    onChange={(event) => updateField('participantOneName', event.currentTarget.value)}
                  />
                  <TextField
                    ref={participantOneEmailRef}
                    id="participant-one-email"
                    name="participantOneEmail"
                    label="Correo electrónico del participante 1"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.participantOneEmail}
                    error={errors.participantOneEmail}
                    onChange={(event) => {
                      updateField('participantOneEmail', event.currentTarget.value)
                      setParticipantOneEmailInvalid(event.currentTarget.validity.typeMismatch)
                    }}
                  />
                </div>
              </div>
              <div className="min-w-0 rounded-panel border border-outline bg-canvas p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-brand">Participante 2</h3>
                <div className="mt-5 space-y-5">
                  <TextField
                    ref={participantTwoNameRef}
                    id="participant-two-name"
                    name="participantTwoName"
                    label="Nombre completo del participante 2"
                    autoComplete="name"
                    required
                    value={values.participantTwoName}
                    error={errors.participantTwoName}
                    onChange={(event) => updateField('participantTwoName', event.currentTarget.value)}
                  />
                  <TextField
                    ref={participantTwoEmailRef}
                    id="participant-two-email"
                    name="participantTwoEmail"
                    label="Correo electrónico del participante 2"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.participantTwoEmail}
                    error={errors.participantTwoEmail}
                    onChange={(event) => {
                      updateField('participantTwoEmail', event.currentTarget.value)
                      setParticipantTwoEmailInvalid(event.currentTarget.validity.typeMismatch)
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink">
              Las billeteras Stellar se vincularán cuando esté habilitada la aprobación criptográfica.
            </p>
          </Card>
        </section>

        <section aria-labelledby="terms-title">
          <Card>
            <h2 id="terms-title" className="text-2xl font-semibold text-brand">Condiciones del acuerdo</h2>
            <div className="mt-6">
              <TextareaField
                ref={termsRef}
                id="contract-terms"
                name="terms"
                label="Cláusulas y condiciones"
                required
                rows={8}
                helperText="Escribe las obligaciones, condiciones y acuerdos establecidos entre los participantes."
                value={values.terms}
                error={errors.terms}
                onChange={(event) => updateField('terms', event.currentTarget.value)}
              />
            </div>
          </Card>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg">Validar borrador</Button>
          {canReview && (
            <Button type="button" variant="secondary" size="lg" onClick={handleReview}>
              Revisar borrador
            </Button>
          )}
          <Link to="/panel" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">
            Volver al panel
          </Link>
        </div>
        {canReview && (
          <p role="status" className="rounded-control border border-outline bg-surface p-4 leading-relaxed text-ink">
            El borrador es válido localmente. Puedes revisar los datos; el acuerdo todavía no se guarda.
          </p>
        )}
        <p className="text-sm leading-relaxed text-ink">
          Los datos de este borrador no se guardan. Si sales de la página o la recargas, perderás lo escrito.
        </p>
      </form>
    </PageContainer>
  )
}
