import axios, { AxiosRequestConfig } from 'axios'

import wrapPromise from '../pages/api/wrapPromise'

import ErrorHandler from './errorHandler'

const fetcher = async (url: string, args?: AxiosRequestConfig) => {
  const response = await axios(url, args)
    .then(resp => resp)
    .catch(err => {
      throw err
    })

  if (response.data.code) {
    await ErrorHandler(response.data.code)
  }

  return response
}

export const fetchSuspense = (url: string) => wrapPromise(fetcher(url))

export default fetcher
