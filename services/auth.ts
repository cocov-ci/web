import { deleteCookie, getCookie, setCookie } from 'cookies-next'

import {
  AuthBeginReponseProps,
  AuthExchangeRequestProps,
  AuthExchangeResponseProps,
} from 'types/Auth'
import Fetcher from 'utils/fetchClient'

const Auth = {
  exchange: async (
    data: AuthExchangeRequestProps,
  ): Promise<AuthExchangeResponseProps> => {
    return await Fetcher('/api/auth/exchange', {
      method: 'POST',
      data: data,
    })
  },
  begin: async (): Promise<AuthBeginReponseProps> =>
    await Fetcher('/api/auth/begin', { method: 'POST' }),
  setToken: (token: string) => setCookie('cocov_auth_token', token),
  getToken: () => getCookie('cocov_auth_token'),
  deleteToken: () => deleteCookie('cocov_auth_token'),
}

export default Auth
