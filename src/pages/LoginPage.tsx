import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Button, Card, PageContainer, TextField } from '../components/ui'
import { loginUser, type LoginUserResult } from '../services/supabase/loginUser'
import { logoutUser, type LogoutUserResult } from '../services/supabase/logoutUser'
import { useAuth } from '../auth/useAuth'
import { getSafeReturnPath } from '../auth/RequireAuth'

type LogoutConfirmation = {
  operationId: number
  status: 'awaiting' | 'confirmed' | 'delayed'
}

export function LoginPage() {
  const { state, hasSession } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const navigationState: unknown = location.state
  const returnPath = getSafeReturnPath(
    navigationState && typeof navigationState === 'object' && !Array.isArray(navigationState) && 'from' in navigationState
      ? navigationState.from
      : null,
  )
  const returnedLocationRef = useRef<string | null>(null)
  const isInitializing = state.status === 'initializing'
  const showSignInInformation = !hasSession && !isInitializing
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailFormatInvalid, setEmailFormatInvalid] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<LoginUserResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittingRef = useRef(false)
  const [logoutResult, setLogoutResult] = useState<LogoutUserResult | null>(null)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const signingOutRef = useRef(false)
  const nextLogoutOperationRef = useRef(0)
  const activeLogoutOperationRef = useRef<number | null>(null)
  const signedOutObservedForRef = useRef<number | null>(null)
  const mountedRef = useRef(false)
  const [logoutConfirmation, setLogoutConfirmation] = useState<LogoutConfirmation | null>(null)
  const awaitingSignOut = logoutConfirmation?.status === 'awaiting'
  const logoutResultBlocksReturn = logoutResult !== null && !(logoutConfirmation?.status === 'confirmed' && hasSession)
  const loginDisabled = isInitializing || isSubmitting || isSigningOut || hasSession || awaitingSignOut
  const canReturn = hasSession && !isSubmitting && !isSigningOut && !logoutResultBlocksReturn && (result === null || result.status === 'success')

  useEffect(() => {
    document.getElementById('contenido-principal')?.focus()
  }, [location.key])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      activeLogoutOperationRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!canReturn || !returnPath || returnedLocationRef.current === location.key) return
    returnedLocationRef.current = location.key
    navigate(returnPath, { replace: true, state: null })
  }, [canReturn, returnPath, location.key, navigate])

  useEffect(() => {
    const operationId = activeLogoutOperationRef.current
    if (state.status !== 'signed_out' || operationId === null) return

    signedOutObservedForRef.current = operationId
    if (logoutConfirmation?.operationId === operationId && logoutConfirmation.status === 'awaiting') {
      activeLogoutOperationRef.current = null
      setLogoutConfirmation({ operationId, status: 'confirmed' })
    }
  }, [logoutConfirmation, state.status])

  useEffect(() => {
    if (logoutConfirmation?.status !== 'awaiting') return

    const { operationId } = logoutConfirmation
    const timer = window.setTimeout(() => {
      if (!mountedRef.current || activeLogoutOperationRef.current !== operationId) return
      activeLogoutOperationRef.current = null
      setLogoutConfirmation((current) =>
        current?.operationId === operationId && current.status === 'awaiting'
          ? { operationId, status: 'delayed' }
          : current,
      )
    }, 8000)
    return () => window.clearTimeout(timer)
  }, [logoutConfirmation])

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isInitializing || submittingRef.current || signingOutRef.current || hasSession || awaitingSignOut) return
    setSubmitted(true)
    setResult(null)
    setLogoutResult(null)
    setLogoutConfirmation(null)

    if (email.trim() === '' || emailRef.current?.validity.typeMismatch) {
      emailRef.current?.focus()
      return
    }

    if (password === '') {
      passwordRef.current?.focus()
      return
    }

    submittingRef.current = true
    setIsSubmitting(true)
    try {
      const response = await loginUser({ email, password })
      setResult(response)
      if (response.status === 'success') {
        setPassword('')
        setPasswordTouched(false)
        setSubmitted(false)
      }
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  async function handleLogout() {
    if (!hasSession || signingOutRef.current || submittingRef.current || awaitingSignOut) return
    const operationId = ++nextLogoutOperationRef.current
    activeLogoutOperationRef.current = operationId
    signedOutObservedForRef.current = null
    signingOutRef.current = true
    setIsSigningOut(true)
    setLogoutResult(null)
    setLogoutConfirmation(null)
    setResult(null)
    try {
      const response = await logoutUser()
      if (!mountedRef.current || activeLogoutOperationRef.current !== operationId) return

      setLogoutResult(response)
      if (response.status !== 'success') {
        activeLogoutOperationRef.current = null
        setLogoutConfirmation(null)
      } else if (signedOutObservedForRef.current === operationId) {
        activeLogoutOperationRef.current = null
        setLogoutConfirmation({ operationId, status: 'confirmed' })
      } else {
        setLogoutConfirmation({ operationId, status: 'awaiting' })
      }
    } finally {
      signingOutRef.current = false
      if (mountedRef.current) setIsSigningOut(false)
    }
  }

  return (
    <PageContainer className="flex flex-1 items-start justify-center py-10 sm:items-center sm:py-16">
      <div className="w-full max-w-lg">
        <Card>
          <h1 className="text-2xl font-semibold text-brand sm:text-3xl">{isInitializing ? 'Comprobando sesión' : hasSession ? 'Tu sesión' : 'Iniciar sesión'}</h1>
          {showSignInInformation && (
            <>
              <p className="mt-3 leading-relaxed text-ink">Accede a tu espacio de AcuerdoSeguro.</p>
              <p className="mt-5 rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">
                Tu sesión puede mantenerse al recargar mientras siga siendo válida. Ciérrala al terminar si utilizas un equipo compartido.
              </p>
            </>
          )}

          <form hidden={hasSession || isInitializing} noValidate aria-busy={isSubmitting || isSigningOut || awaitingSignOut} onSubmit={handleSubmit} className="mt-7 space-y-5">
            <TextField
              ref={emailRef}
              id="login-email"
              name="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              required
              disabled={loginDisabled}
              placeholder="nombre@ejemplo.com"
              value={email}
              error={emailError}
              onChange={(event) => {
                setEmail(event.currentTarget.value)
                setEmailFormatInvalid(event.currentTarget.validity.typeMismatch)
                setResult(null)
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
              disabled={loginDisabled}
              value={password}
              error={passwordError}
              onChange={(event) => {
                setPassword(event.currentTarget.value)
                setResult(null)
              }}
              onBlur={() => setPasswordTouched(true)}
            />

            <Button type="submit" size="lg" disabled={loginDisabled} className="w-full">
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          {hasSession && (
            <section aria-labelledby="active-session-title" aria-busy={isSigningOut || awaitingSignOut} className="mt-7 space-y-5">
              <h2 id="active-session-title" className="text-xl font-semibold text-brand">Sesión activa</h2>
              <p className="text-sm leading-relaxed text-ink">El cliente observa una sesión actual. Puedes cerrarla desde aquí.</p>
              <Button type="button" size="lg" variant="secondary" disabled={isSubmitting || isSigningOut || awaitingSignOut} onClick={handleLogout} className="w-full">
                {isSigningOut ? 'Cerrando sesión...' : awaitingSignOut ? 'Confirmando cierre...' : 'Cerrar sesión'}
              </Button>
            </section>
          )}
          <div role="status" aria-atomic="true" className="mt-5">
            {isInitializing ? (
              <p className="text-sm text-ink">Comprobando tu sesión…</p>
            ) : isSubmitting ? (
              <p className="text-sm text-ink">La solicitud de inicio de sesión está en proceso.</p>
            ) : isSigningOut ? (
              <p className="text-sm text-ink">Cerrando sesión...</p>
            ) : logoutResult?.status === 'success' && logoutConfirmation?.status === 'confirmed' && state.status === 'signed_out' ? (
              <p className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">Has cerrado sesión correctamente.</p>
            ) : awaitingSignOut ? (
              <p className="text-sm leading-relaxed text-ink">El servicio respondió. Esperando la confirmación del estado de sesión...</p>
            ) : result?.status === 'success' && hasSession ? (
              <p className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">{result.message}</p>
            ) : null}
          </div>
          <div role="alert" aria-atomic="true">
            {logoutResult && logoutResult.status !== 'success' ? (
              <p className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">{logoutResult.message}</p>
            ) : logoutConfirmation?.status === 'delayed' && logoutResult?.status === 'success' && state.status !== 'signed_out' ? (
              <p className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">El servicio respondió, pero no se pudo confirmar el cierre en el estado de sesión. Puedes volver a intentarlo.</p>
            ) : result && result.status !== 'success' ? (
              <p className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">{result.message}</p>
            ) : state.status === 'error' ? (
              <p className="rounded-control border border-outline bg-canvas p-4 text-sm leading-relaxed text-ink">No fue posible comprobar la sesión. Puedes intentar iniciar sesión nuevamente.</p>
            ) : null}
          </div>

          {showSignInInformation && (
            <p className="mt-7 text-center text-sm text-ink">
              ¿Aún no tienes cuenta?{' '}
              <Link to="/registro" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">
                Regístrate
              </Link>
            </p>
          )}
        </Card>
      </div>
    </PageContainer>
  )
}
