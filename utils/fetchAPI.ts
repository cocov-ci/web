import axios, { AxiosRequestConfig } from 'axios'
import { redirect } from 'next/navigation'

import { ErrorHandler } from './errorHandler'

const fetcher = async (url: string, args?: AxiosRequestConfig) => {
  const response = await axios(url, args)
    .then(resp => {
      if (ErrorHandler(resp.data.code)) {
        redirect(ErrorHandler(resp.data.code) as string)
      }

      return resp
    })
    .catch(err => {
      throw err
    })

  return response
}

export default fetcher
