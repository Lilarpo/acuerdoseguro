export type AuthUser = {
  id: string
  email?: string
}

// This describes a session observed by the client, not verified authorization.
export type AuthState =
  | { status: 'not_configured' }
  | { status: 'initializing' }
  | { status: 'signed_out' }
  | { status: 'session_present'; user: AuthUser }
  | { status: 'error' }
