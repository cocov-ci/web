'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Auth from 'services/auth'
import Repositories from 'services/repositories'
import { AuthBeginReponseProps, AuthPropsContext } from 'types/Auth'

const StateContext = createContext<AuthPropsContext>({
  login: () => null,
  logout: () => null,
  loading: false,
  isAuthenticated: false,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  const unauthorizedRedirection = () => {
    if (!pathname?.includes('auth/signin')) {
      router.push(`/auth/signin?next=${pathname}`)
    }
  }

  useEffect(() => {
    const validateToken = async () => {
      try {
        const repositories = await Repositories.get()

        if (repositories.data.code === 'auth.no_authorization') {
          unauthorizedRedirection()
          Auth.deleteToken()
        } else {
          setIsAuthenticated(true)
        }
      } catch (err) {
        unauthorizedRedirection()
      }
    }

    if (Auth.getToken()) {
      validateToken()
    } else {
      unauthorizedRedirection()
    }
  }, [])

  const login = async () => {
    setLoading(true)

    try {
      const { data }: AuthBeginReponseProps = await Auth.begin()

      window.location.href = data.redirect_to
    } catch {
      setLoading(false)
      // TODO: HANDLE WITH THIS RESPONSE
    }
  }

  const logout = () => {
    Auth.deleteToken()
    router.push('/')
  }

  const memoedValue = useMemo(
    () => ({
      loading,
      login,
      logout,
      isAuthenticated,
    }),
    [isAuthenticated, loading],
  )

  return (
    <StateContext.Provider value={memoedValue}>
      {children}
    </StateContext.Provider>
  )
}

export const useAuth = () => useContext(StateContext)

export default AuthProvider
