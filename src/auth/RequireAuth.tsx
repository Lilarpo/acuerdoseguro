import { useEffect, type ReactElement } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router'
import { Card, PageContainer } from '../components/ui'
import { useAuth } from './useAuth'

// eslint-disable-next-line react-refresh/only-export-components -- Share one routing policy within the authorized guard file.
export function getSafeReturnPath(value: unknown): string | null {
  if (typeof value !== 'string' || /[^A-Za-z0-9/_-]/.test(value)) return null
  if (value === '/panel' || /^\/contratos\/[A-Za-z0-9_-]{1,120}$/.test(value)) return value
  return null
}

export function RequireAuth(): ReactElement {
  const { state } = useAuth()
  const location = useLocation()

  useEffect(() => {
    document.getElementById('contenido-principal')?.focus()
  }, [location.key, state.status])

  if (state.status === 'session_present') {
    // Reset local page state on account change; this does not authorize data.
    return <Outlet key={state.user.id} />
  }

  if (state.status === 'signed_out') {
    const from = getSafeReturnPath(location.pathname)
    return <Navigate to="/login" replace state={from ? { from } : null} />
  }

  return (
    <PageContainer className="py-10 sm:py-14">
      <Card className="max-w-lg">
        {state.status === 'initializing' ? (
          <p role="status" aria-busy="true" className="leading-relaxed text-ink">Comprobando tu sesión…</p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-brand">Acceso no disponible</h1>
            <p role="alert" className="mt-4 leading-relaxed text-ink">
              {state.status === 'not_configured'
                ? 'El servicio de acceso no está disponible en este momento.'
                : 'No fue posible comprobar tu sesión. Puedes volver al inicio o intentar acceder nuevamente desde la página de inicio de sesión.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link to="/" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">Volver al inicio</Link>
              <Link to="/login" className="inline-flex min-h-11 items-center rounded-control font-semibold text-accent-strong underline underline-offset-4">Ir a inicio de sesión</Link>
            </div>
          </>
        )}
      </Card>
    </PageContainer>
  )
}
