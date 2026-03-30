import { createContext } from 'react'
import type { LoginForm, LoginResult, User } from '../types'

export interface AuthContextValue {
  isLoggedIn: boolean
  user: User | null
  login: (form: LoginForm) => LoginResult
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
