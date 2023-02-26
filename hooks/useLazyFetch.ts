import { AxiosError } from 'axios'
import { isEmpty, isNil, omitBy } from 'lodash'
import { useCallback, useState } from 'react'

import fetcher from '../utils/fetchClient'

export interface ErrorResponse {
  code?: string
  message?: string
}
export interface UseFetchProps {
  url?: string
  params?: { [arg: string]: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: { [arg: string]: any }
}

const useLazyFetch = ({ url, params, args }: UseFetchProps) => {
  const [data, setData] = useState<object | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorResponse | undefined | string>()

  const request = ({ url, params }: UseFetchProps): string => {
    const validParams = omitBy(params, isNil)

    return !isEmpty(validParams)
      ? `${url}?${new URLSearchParams(validParams)}`
      : (url as string)
  }

  const func = useCallback(
    ({ url: funcUrl, params: funcParams, args: funcArgs }: UseFetchProps) => {
      setLoading(true)

      const fetchUrl = url || funcUrl
      const fetchArgs = { ...args, ...funcArgs }

      const fetchData = async () => {
        try {
          const data = await fetcher(
            request({
              url: fetchUrl,
              params: { ...params, ...funcParams },
            }),
            fetchArgs,
          )

          setData(data)
          setError(undefined)
          setLoading(false)
        } catch (err) {
          setData(undefined)
          setLoading(false)

          if (err instanceof Error) {
            if (err instanceof AxiosError) {
              if (err.response?.status === 400) {
                setError(err.response?.data)
              } else {
                setError(err.message)
              }
            }
          } else {
            setError('Generic error message')
          }
        }
      }

      if (typeof fetchUrl === 'string') fetchData()
    },
    [],
  )

  return [func, { data, loading, error }]
}

export default useLazyFetch
