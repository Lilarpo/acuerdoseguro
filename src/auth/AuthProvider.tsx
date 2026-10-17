import { useEffect, useState, type PropsWithChildren } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '../lib/supabaseClient'
import { AuthContext } from './authContext'
import type { AuthState } from './authTypes'

function stateFromSession(session: Session | null): AuthState {
  if (!session) return { status: 'signed_out' }

  const { id, email } = session.user
  return {
    status: 'session_present',
    user: { id, ...(email ? { email } : {}) },
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
    try {
      const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
        if (!active) return

        switch (event) {
          case 'INITIAL_SESSION':
          case 'SIGNED_IN':
          case 'SIGNED_OUT':
          case 'TOKEN_REFRESHED':
          case 'USER_UPDATED':
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
