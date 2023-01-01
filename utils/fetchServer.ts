import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const fetcher = async (url: string, args?: RequestInit) => {
  const nextCookies = cookies()

  return await fetch(`${process.env.COCOV_API_URL}${url}`, {
    headers: {
      authorization: `bearer ${nextCookies.get('cocov_auth_token')?.value}`,
      ...args?.headers,
    },
    ...args,
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.code === 'auth.invalid_token') {
        redirect('/auth/signin?invalid_token=true')
      } else {
        return resp
      }
    })
    .catch(err => {
      throw err
    })
}

export default fetcher
