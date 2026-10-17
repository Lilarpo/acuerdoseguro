import { useContext } from 'react'
import { AuthContext } from './authContext'

export function useAuth() {
  const state = useContext(AuthContext)
  if (state === undefined) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider')
  }

  return {
    state,
    user: state.status === 'session_present' ? state.user : null,
    hasSession: state.status === 'session_present',
  }
}
