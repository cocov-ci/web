import { useCallback, useState } from 'react'

import fetcher from '../utils/fetchClient'

interface UseFetchProps {
  url: string
}

const useLazyFetch = ({ url }: UseFetchProps) => {
  const [data, setData] = useState<object | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const func = useCallback(() => {
    setLoading(true)

    const fetchData = async () => {
      const data = await fetcher(url)

      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  return [func, { data, loading }]
}

export default useLazyFetch
