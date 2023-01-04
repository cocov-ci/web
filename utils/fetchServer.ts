import { cookies } from 'next/headers'

import ErrorHandler from './errorHandler'

const fetcher = async (url: string, args?: RequestInit) => {
  const nextCookies = cookies()

  const response = await fetch(`${process.env.COCOV_API_URL}${url}`, {
    headers: {
      authorization: `bearer ${nextCookies.get('cocov_auth_token')?.value}`,
      ...args?.headers,
    },
    ...args,
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.code) {
        ErrorHandler(resp.code)
      } else {
        return resp
      }
    })
    .catch(err => {
      throw err
    })

  return response
}

export default fetcher
