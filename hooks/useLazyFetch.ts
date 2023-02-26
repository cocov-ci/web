import { AxiosError } from 'axios'
import { isEmpty, isNil, omitBy } from 'lodash'
import { useCallback, useState } from 'react'

import fetcher, { FetchProps } from '../utils/fetchClient'

export interface ErrorResponse {
  code?: string
  message?: string
}
export interface UseFetchProps extends Partial<FetchProps> {
  params?: { [arg: string]: string }
  url?: string
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
          const data = await fetcher({
            url: request({
              url: fetchUrl,
              params: { ...params, ...funcParams },
            }),
            args: fetchArgs,
          })

          setData(data)
          setError(undefined)
        } catch (err) {
          setData(undefined)

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
        } finally {
          setLoading(false)
        }
      }

      if (typeof fetchUrl === 'string') fetchData()
    },
    [],
  )

  return [func, { data, loading, error }]
}

export default useLazyFetch
