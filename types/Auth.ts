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
}

export interface AuthBeginReponseProps {
  redirect_to: string
}

export interface AuthPropsContext {
  loading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}
