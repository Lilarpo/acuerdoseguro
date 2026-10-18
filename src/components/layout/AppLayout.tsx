import { Link, NavLink, Outlet } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import { PageContainer } from '../ui'

const navigation = [
  { to: '/', label: 'Inicio' },
  { to: '/panel', label: 'Panel' },
  { to: '/verificar', label: 'Verificar' },
  { to: '/login', label: 'Iniciar sesión' },
  { to: '/registro', label: 'Registrarse' },
]

export function AppLayout() {
  const { hasSession } = useAuth()
  const visibleNavigation = navigation.filter(({ to }) => to !== '/panel' || hasSession)

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:font-semibold focus:text-brand"
      >
        Saltar al contenido
      </a>
      <header className="border-b border-outline bg-surface">
        <PageContainer className="flex flex-col gap-4 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <Link to="/" className="self-start rounded-control text-xl font-semibold text-brand">
            AcuerdoSeguro
          </Link>
          <nav aria-label="Navegación principal">
            <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
              {visibleNavigation.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `inline-flex min-h-11 items-center rounded-control px-3 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-canvas text-brand underline decoration-accent-strong decoration-2 underline-offset-4'
                          : 'text-muted hover:bg-canvas hover:text-brand'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </PageContainer>
      </header>
      <main id="contenido-principal" tabIndex={-1} className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
