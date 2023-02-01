import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ErrorHandler } from './errorHandler'

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
      const routeRedirection = ErrorHandler(resp?.code)

      if (typeof routeRedirection === 'string') {
        redirect(routeRedirection)
      }

      return resp
    })
    .catch(err => {
      throw err
    })

  return response
}

export default fetcher
