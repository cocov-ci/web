import { ReactNode } from 'react'

import { AuthContext } from 'context/AuthContext'
import { AuthPropsContext } from 'types/Auth'

const Mock = ({
  login,
  logout,
  loading,
  isAuthenticated,
  user,
  children,
}: AuthPropsContext & { children: ReactNode }) => (
  <AuthContext.Provider
    value={{
      login,
      logout,
      loading,
      isAuthenticated,
      user,
    }}
  >
    {children}
  </AuthContext.Provider>
)

export default Mock
