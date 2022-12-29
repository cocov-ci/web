'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'

import Auth from 'services/auth'
import { AuthBeginReponseProps, AuthPropsContext } from 'types/Auth'

const StateContext = createContext<AuthPropsContext>({
  login: () => null,
  logout: () => null,
  loading: false,
  isAuthenticated: false,
})

const SigninPage = '/auth/signin'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(false)
  const isAuthenticated = useMemo(() => pathname !== SigninPage, [pathname])
  const router = useRouter()

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
    router.push(SigninPage)
  }

  const memoedValue = useMemo(
    () => ({
      loading,
      login,
      logout,
      isAuthenticated,
    }),
    [loading, isAuthenticated],
  )

  return (
    <StateContext.Provider value={memoedValue}>
      {children}
    </StateContext.Provider>
  )
}

export const useAuth = () => useContext(StateContext)

export default AuthProvider
