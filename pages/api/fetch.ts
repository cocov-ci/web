import Auth from 'services/auth'

import wrapPromise from './wrapPromise'

const fetchParams = (args?: RequestInit) => {
  return {
    ...args,
    headers: {
      'content-type': 'application/json',
      ...(Auth.getToken() && { Authorization: `bearer ${Auth.getToken()}` }),
      ...args?.headers,
    },
  }
}

export const fetchSuspense = async (url: string) => {
  const promise = await fetchClient(url)

  return wrapPromise(promise)
}

export const fetcher = async (url: string, args?: RequestInit) => {
  return fetch(url, fetchParams(args))
    .then(res => res.json())
    .catch(err => {
      throw err
    })
}

export const fetchServer = async (url: string, args?: RequestInit) =>
  fetcher(`${process.env.API_URL}${url}`, args)

export const fetchClient = async (url: string, args?: RequestInit) =>
  fetcher(url, args)
