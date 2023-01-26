'use client'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'

import Auth from 'services/auth'
import { AuthBeginReponseProps, AuthPropsContext } from 'types/Auth'

const AuthContext = createContext<AuthPropsContext>({
  login: () => null,
  logout: () => null,
  loading: false,
  isAuthenticated: false,
})

const SigninPage = '/auth/signin'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const user = Auth.getAccount()
  const router = useRouter()

  const login = async () => {
    setLoading(true)

    try {
      const data: AuthBeginReponseProps = await Auth.begin()

      window.location.href = data.redirect_to
    } catch {
      setLoading(false)
      // TODO: HANDLE WITH THIS RESPONSE
    }
  }

  const logout = () => {
    Auth.deleteToken()
    Auth.deleteAccount()
    router.push(SigninPage)
  }

  const memoizedValue = useMemo(
    () => ({
      loading,
      login,
      logout,
      isAuthenticated: Boolean(user),
      user: user && { ...user },
    }),
    [loading, user],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
