import { isEmpty, isNil, omitBy } from 'lodash'
import { useEffect, useState } from 'react'

import fetcher from '../utils/fetchClient'

interface UseFetchProps {
  url: string | null
  handler: (string | number)[]
  params?: { [arg: string]: string }
}

const useFetch = ({ url, handler, params }: UseFetchProps) => {
  const [data, setData] = useState<object | undefined>()
  const [error, setError] = useState<undefined | string>()
  const [loading, setLoading] = useState<boolean>(Boolean(url))

  const validParams = omitBy(params, isNil)

  const request = !isEmpty(validParams)
    ? `${url}?${new URLSearchParams(validParams)}`
    : url

  useEffect(() => {
    setLoading(Boolean(url))

    const fetchData = async () => {
      try {
        const data = await fetcher(request as string)

        setData(data)
        setLoading(false)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Generic error message')
        }
      }
    }

    if (url) fetchData()
  }, handler)

  return { data, loading, error }
}

export default useFetch
