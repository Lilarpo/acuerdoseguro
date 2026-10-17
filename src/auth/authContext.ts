import { createContext } from 'react'
import type { AuthState } from './authTypes'

export const AuthContext = createContext<AuthState | undefined>(undefined)
