'use client'

import { deleteCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { fetchAPI } from 'services/api/fetch'
import { fetchUser } from 'services/api/users'
import { UserProps } from 'types/User'

type AuthState = {
  loading: boolean
  login: () => void
  logout: () => void
  user: UserProps
}

const StateContext = createContext<AuthState>({
  user: null,
  login: () => null,
  logout: () => null,
  loading: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => await fetchUser()

    fetchData()
      .then((data: UserProps) => setUser(data))
      .catch(error => {
        console.error(error)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async () => {
    setLoading(true)

    await fetchAPI(
      'https://run.mocky.io/v3/d6ac91ac-6dab-4ff0-a08e-9348d7deed51',
    )
      .then((data: UserProps) => {
        // TODO: IMPLEMENT SESSIONS
        setCookie('cocov_auth_token', data?.id)

        router.push('/')

        setUser(data)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const logout = () => {
    deleteCookie('cocov_auth_token')
    setUser(null)
    router.push('/')
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading],
  )

  return (
    <StateContext.Provider value={memoedValue}>
      {children}
    </StateContext.Provider>
  )
}

export const useAuth = () => useContext(StateContext)
