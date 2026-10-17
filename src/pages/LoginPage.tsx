import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Button, Card, PageContainer, TextField } from '../components/ui'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailFormatInvalid, setEmailFormatInvalid] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const emailError = emailTouched || submitted
    ? email.trim() === ''
      ? 'Ingresa tu correo electrónico.'
      : emailFormatInvalid
        ? 'Ingresa un correo electrónico válido.'
        : undefined
    : undefined
  const passwordError = passwordTouched || submitted
    ? password === '' ? 'Ingresa tu contraseña.' : undefined
    : undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setFormValid(false)

    if (email.trim() === '' || emailRef.current?.validity.typeMismatch) {
      emailRef.current?.focus()
      return
    }

    if (password === '') {
      passwordRef.current?.focus()
      return
    }

    setFormValid(true)
  }

  return (
    <PageContainer className="flex flex-1 items-start justify-center py-10 sm:items-center sm:py-16">
      <div className="w-full max-w-lg">
        <Card>
          <h1 className="text-2xl font-semibold text-brand sm:text-3xl">Iniciar sesión</h1>
          <p className="mt-3 leading-relaxed text-ink">Accede a tu espacio de AcuerdoSeguro.</p>
          <p className="mt-5 rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">
            El inicio de sesión estará disponible próximamente. Por ahora, esta pantalla permite explorar y validar el formulario.
          </p>

          <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-5">
            <TextField
              ref={emailRef}
              id="login-email"
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
              onBlur={() => setEmailTouched(true)}
            />
            <TextField
              ref={passwordRef}
              id="login-password"
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              error={passwordError}
              onChange={(event) => {
                setPassword(event.currentTarget.value)
                setFormValid(false)
              }}
              onBlur={() => setPasswordTouched(true)}
            />

            <Button type="submit" size="lg" className="w-full">Continuar</Button>
            {formValid && (
              <p role="status" className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">
                El formulario es válido, pero el inicio de sesión todavía no está habilitado.
              </p>
            )}
          </form>

          <p className="mt-7 text-center text-sm text-ink">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/registro" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">
              Regístrate
            </Link>
          </p>
        </Card>
      </div>
    </PageContainer>
  )
}
