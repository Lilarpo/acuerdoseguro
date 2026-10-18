import { useEffect, useState, type PropsWithChildren } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '../lib/supabaseClient'
import { AuthContext } from './authContext'
import type { AuthState } from './authTypes'

function stateFromSession(session: Session | null): AuthState {
  if (!session) return { status: 'signed_out' }

  // Stored client data is not trusted identity or data authorization.
  const user = session.user
  if (!user || typeof user !== 'object' || typeof user.id !== 'string' || !user.id.trim()) {
    return { status: 'error' }
  }
  const { id, email } = user
  return {
    status: 'session_present',
    user: { id, ...(typeof email === 'string' && email ? { email } : {}) },
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  // The existing client is shared; undefined signals an initialization error.
  const [client] = useState(() => {
    try {
      return getSupabaseClient()
    } catch {
      return undefined
    }
  })
  const [state, setState] = useState<AuthState>(() =>
    client === undefined
      ? { status: 'error' }
      : client === null
        ? { status: 'not_configured' }
        : { status: 'initializing' },
  )

  useEffect(() => {
    if (!client) return

    let active = true
    let observedChange = false
    try {
      const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
        if (!active) return

        switch (event) {
          case 'INITIAL_SESSION':
            // A delayed initial snapshot must not replace a newer Auth event.
            if (!observedChange) setState(stateFromSession(session))
            break
          case 'SIGNED_OUT':
            observedChange = true
            setState({ status: 'signed_out' })
            break
          case 'SIGNED_IN':
          case 'TOKEN_REFRESHED':
          case 'USER_UPDATED':
            observedChange = true
            setState(stateFromSession(session))
            break
          default:
            // Other SDK events do not change the observed session state here.
            break
        }
      })

      return () => {
        active = false
        subscription.unsubscribe()
      }
    } catch {
      // Do not expose SDK errors or configuration values in the UI or console.
      queueMicrotask(() => {
        if (active) setState({ status: 'error' })
      })
      return () => { active = false }
    }
  }, [client])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
