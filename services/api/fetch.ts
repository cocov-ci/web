import wrapPromise from './wrapPromise'

export const fetchSuspense = (url: string) => {
  const promise = fetch(url)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => {
      throw err
    })

  return wrapPromise(promise)
}

export const fetchAPI = (url: string, params?: Record<string, never>) =>
  fetch(url, { ...params })
    .then(resp => resp.json())
    .then(resp => resp.data)
    .catch(error => {
      throw error
    })
