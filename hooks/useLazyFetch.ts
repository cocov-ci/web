import { useCallback, useState } from 'react'

import fetcher from '../utils/fetchClient'

interface UseFetchProps {
  url: string
}

const useLazyFetch = ({ url }: UseFetchProps) => {
  const [data, setData] = useState<object | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<undefined | string>()

  const func = useCallback(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const data = await fetcher(url)

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
  }, [])

  return [func, { data, loading, error }]
}

export default useLazyFetch
