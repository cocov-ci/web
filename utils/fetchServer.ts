import { cookies } from 'next/headers'

const fetcher = async (url: string, args?: RequestInit) => {
  const nextCookies = cookies()

  return await fetch(`${process.env.API_URL}${url}`, {
    headers: {
      authorization: `bearer ${nextCookies.get('cocov_auth_token')?.value}`,
      ...args?.headers,
    },
    ...args,
  }).then(resp => resp.json())
}

export default fetcher
