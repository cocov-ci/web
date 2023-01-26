import { UserProps } from './User'

export interface AuthExchangeRequestProps {
  exchange_token: string
  code: string
  redirect: string | undefined
  state: string
}

export interface AuthExchangeResponseProps {
  token: string
  redirect: string
  code: string
  name: string
  admin: boolean
}

export interface AuthBeginReponseProps {
  redirect_to: string
}

export interface AuthPropsContext {
  loading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  user?: UserProps
}
