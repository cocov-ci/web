import axios, { AxiosRequestConfig } from 'axios'

import wrapPromise from '../pages/api/wrapPromise'

const fetcher = async (url: string, args?: AxiosRequestConfig) => {
  return await axios(url, args)
    .then(resp => resp)
    .catch(err => {
      throw err
    })
}

export const fetchSuspense = (url: string) => wrapPromise(fetcher(url))

export default fetcher
