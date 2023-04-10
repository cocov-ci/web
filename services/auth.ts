import { deleteCookie, getCookie, setCookie } from 'cookies-next'

import {
  AuthBeginReponseProps,
  AuthExchangeRequestProps,
  AuthExchangeResponseProps,
} from 'types/Auth'
import { UserProps } from 'types/User'
import fetcher from 'utils/fetchClient'

const isClientSide = typeof window !== 'undefined'

const Auth = {
  exchange: async (
    data: AuthExchangeRequestProps,
  ): Promise<AuthExchangeResponseProps> => {
    return await fetcher({
      url: '/api/auth/exchange',
      args: {
        method: 'POST',
        data: data,
      },
    })
  },
  begin: async (): Promise<AuthBeginReponseProps> =>
    await fetcher({ url: '/api/auth/begin', args: { method: 'POST' } }),
  setToken: (token: string) => setCookie('cocov_auth_token', token),
  getToken: () => getCookie('cocov_auth_token'),
  deleteToken: () => deleteCookie('cocov_auth_token'),
  deleteAccount: () =>
    isClientSide && localStorage.removeItem('cocov_user_account'),
  setAccount: ({ isAdmin, name }: UserProps) =>
    isClientSide &&
    localStorage.setItem(
      'cocov_user_account',
      JSON.stringify({ name: name, isAdmin: isAdmin }),
    ),
  getAccount: (): UserProps | undefined => {
    const account = isClientSide && localStorage.getItem('cocov_user_account')

    if (typeof account === 'string' && getCookie('cocov_auth_token')) {
      return JSON.parse(account)
    }

    return undefined
  },
}

export default Auth
