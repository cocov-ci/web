'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { createContext, useMemo, useState } from 'react'

import Auth from 'services/auth'
import { AuthBeginReponseProps, AuthPropsContext } from 'types/Auth'

export const AuthContext = createContext<AuthPropsContext>({
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
  const searchParams = useSearchParams()

  const login = async () => {
    setLoading(true)

    try {
      const data: AuthBeginReponseProps = await Auth.begin()

      window.location.href = searchParams.get('next')
        ? `${data.redirect_to}?next=${searchParams.get('next')}`
        : data.redirect_to
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

export default AuthProvider
