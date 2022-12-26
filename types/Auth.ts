export interface AuthExchangeRequestProps {
  exchange_token: string | undefined
  code: string | undefined
  redirect: string | undefined
  state: string | undefined
}

export interface AuthExchangeResponseProps {
  data: {
    token: string
    redirect: string
  }
}

export interface AuthBeginReponseProps {
  data: {
    redirect_to: string
  }
}

export interface AuthPropsContext {
  loading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}
