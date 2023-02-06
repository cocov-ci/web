import { isEmpty, isNil, omitBy } from 'lodash'
import { useEffect, useState } from 'react'

import fetcher from '../utils/fetchClient'

interface UseFetchProps {
  url: string
  handler: (string | number)[]
  params?: { [arg: string]: string }
}

const useFetch = ({ url, handler, params }: UseFetchProps) => {
  const [data, setData] = useState<object | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const validParams = omitBy(params, isNil)

  const request = !isEmpty(validParams)
    ? `${url}?${new URLSearchParams(validParams)}`
    : url

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      const data = await fetcher(request)

      setData(data)
      setLoading(false)
    }

    fetchData()
  }, handler)

  return { data, loading }
}

export default useFetch
