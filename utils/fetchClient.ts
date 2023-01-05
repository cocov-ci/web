import axios, { AxiosRequestConfig } from 'axios'

import wrapPromise from '../pages/api/wrapPromise'

import ErrorHandler from './errorHandler'

const fetcher = async (url: string, args?: AxiosRequestConfig) => {
  const response = await axios(url, args)
    .then(resp => {
      if (resp.data?.code) {
        ErrorHandler(resp.data.code)
      }

      return resp
    })
    .catch(err => {
      throw err
    })

  return response
}

export const fetchSuspense = (url: string) => wrapPromise(fetcher(url))

export default fetcher
