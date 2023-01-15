import axios, { AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

import wrapPromise from '../pages/api/wrapPromise'

import { ErrorHandler } from './errorHandler'

const fetcher = async (url: string, args?: AxiosRequestConfig) => {
  const response = await axios(url, {
    headers: {
      ...args?.headers,
      Accept: 'application/json',
      ...(getCookie('cocov_auth_token') && {
        Authorization: `bearer ${getCookie('cocov_auth_token')}`,
      }),
    },
    ...args,
  })
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      if (ErrorHandler(err.response?.data?.code)) {
        window.location.href = ErrorHandler(err.response.data.code) as string
      }

      throw err
    })

  return response
}

export const fetchSuspense = (url: string) => wrapPromise(fetcher(url))

export default fetcher
