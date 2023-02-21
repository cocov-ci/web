import { useCallback, useState } from 'react'

import fetcher from '../utils/fetchClient'

type UseFetchProps = string

const useLazyFetch = ({ url }: { url?: UseFetchProps }) => {
  const [data, setData] = useState<object | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<undefined | string>()

  const func = useCallback((funcUrl?: UseFetchProps) => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const data = await fetcher((url || funcUrl) as string)

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

    if (url || funcUrl) fetchData()
  }, [])

  return [func, { data, loading, error }]
}

export default useLazyFetch
