import { getCookie } from 'cookies-next'

import { fetchClient } from 'pages/api/fetch'
import {
  AuthBeginReponseProps,
  AuthExchangeRequestProps,
  AuthExchangeResponseProps,
} from 'types/Auth'

const Auth = {
  exchange: (
    data: AuthExchangeRequestProps,
  ): Promise<AuthExchangeResponseProps> => {
    return fetchClient('/api/auth/exchange', {
      body: JSON.stringify(data),
      method: 'POST',
    })
  },
  begin: (): Promise<AuthBeginReponseProps> => {
    return fetchClient('/api/auth/begin', {
      method: 'POST',
      body: JSON.stringify({
        redirect: process.env.NEXT_PUBLIC_AUTH_REDIRECT,
      }),
    })
  },
  getToken: () => getCookie('cocov_auth_token'),
  deleteToken: () => getCookie('cocov_auth_token'),
}

export default Auth
