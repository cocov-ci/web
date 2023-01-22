import { useEffect, useState } from 'react'

import fetcher from '../utils/fetchClient'

interface UseFetchProps {
  url: string
  handler: (string | number)[]
}

const useFetch = ({ url, handler }: UseFetchProps) => {
  const [data, setData] = useState<object | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      const data = await fetcher(url)

      setData(data)
      setLoading(false)
    }

    fetchData()
  }, handler)

  return { data, loading }
}

export default useFetch
