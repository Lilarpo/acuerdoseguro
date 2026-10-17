import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Button, Card, PageContainer, TextField } from '../components/ui'

type FieldName = 'name' | 'email' | 'password' | 'confirmation'

export function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [emailFormatInvalid, setEmailFormatInvalid] = useState(false)
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    password: false,
    confirmation: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmationRef = useRef<HTMLInputElement>(null)

  const showError = (field: FieldName) => touched[field] || submitted
  const nameError = showError('name') && fullName.trim() === ''
    ? 'Ingresa tu nombre completo.'
    : undefined
  const emailError = showError('email')
    ? email.trim() === ''
      ? 'Ingresa tu correo electrónico.'
      : emailFormatInvalid
        ? 'Ingresa un correo electrónico válido.'
        : undefined
    : undefined
  const passwordError = showError('password')
    ? password === ''
      ? 'Ingresa una contraseña.'
      : password.length < 8
        ? 'La contraseña debe tener al menos 8 caracteres.'
        : undefined
    : undefined
  const confirmationError = showError('confirmation')
    ? confirmation === ''
      ? 'Confirma tu contraseña.'
      : confirmation !== password
        ? 'Las contraseñas no coinciden.'
        : undefined
    : undefined

  function markTouched(field: FieldName) {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setFormValid(false)

    if (fullName.trim() === '') {
      nameRef.current?.focus()
      return
    }
    if (email.trim() === '' || emailRef.current?.validity.typeMismatch) {
      emailRef.current?.focus()
      return
    }
    if (password.length < 8) {
      passwordRef.current?.focus()
      return
    }
    if (confirmation === '' || confirmation !== password) {
      confirmationRef.current?.focus()
      return
    }

    setFormValid(true)
  }

  return (
    <PageContainer className="flex flex-1 items-start justify-center py-10 sm:items-center sm:py-16">
      <div className="w-full max-w-lg">
        <Card>
          <h1 className="text-2xl font-semibold text-brand sm:text-3xl">Crear cuenta</h1>
          <p className="mt-3 leading-relaxed text-ink">Prepara tu acceso a AcuerdoSeguro.</p>
          <p className="mt-5 rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">
            El registro de usuarios todavía no está habilitado. Esta pantalla permite explorar y validar el formulario.
          </p>

          <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-5">
            <TextField
              ref={nameRef}
              id="register-name"
              name="name"
              label="Nombre completo"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              error={nameError}
              onChange={(event) => {
                setFullName(event.currentTarget.value)
                setFormValid(false)
              }}
              onBlur={() => markTouched('name')}
            />
            <TextField
              ref={emailRef}
              id="register-email"
              name="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              required
              placeholder="nombre@ejemplo.com"
              value={email}
              error={emailError}
              onChange={(event) => {
                setEmail(event.currentTarget.value)
                setEmailFormatInvalid(event.currentTarget.validity.typeMismatch)
                setFormValid(false)
              }}
              onBlur={() => markTouched('email')}
            />
            <TextField
              ref={passwordRef}
              id="register-password"
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              helperText="Utiliza al menos 8 caracteres."
              value={password}
              error={passwordError}
              onChange={(event) => {
                setPassword(event.currentTarget.value)
                setFormValid(false)
              }}
              onBlur={() => markTouched('password')}
            />
            <TextField
              ref={confirmationRef}
              id="register-confirmation"
              name="confirmation"
              label="Confirmar contraseña"
              type="password"
              autoComplete="new-password"
              required
              value={confirmation}
              error={confirmationError}
              onChange={(event) => {
                setConfirmation(event.currentTarget.value)
                setFormValid(false)
              }}
              onBlur={() => markTouched('confirmation')}
            />

            <Button type="submit" size="lg" className="w-full">Validar formulario</Button>
            {formValid && (
              <p role="status" className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">
                Los datos del formulario son válidos, pero el registro de cuentas todavía no está habilitado.
              </p>
            )}
          </form>

          <p className="mt-7 text-center text-sm text-ink">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">
              Inicia sesión
            </Link>
          </p>
        </Card>
      </div>
    </PageContainer>
  )
}
