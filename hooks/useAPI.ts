'use client'

import _ from 'lodash'
import { useEffect, useState } from 'react'

import usePrevious from 'hooks/usePrevious'

export interface UseAPIOutput<O> {
  result?: O
  loading: boolean
  error?: string
  reFetch: () => void
}

const useAPI = <I, O>(
  fn: (param: I) => Promise<O>,
  input: I,
): UseAPIOutput<O> => {
  const [result, setResult] = useState<O | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const doFetch = () => {
    setLoading(true)
    setError(undefined)
    setResult(undefined)

    fn(input)
      .then(r => {
        setLoading(false)
        setResult(r)
      })
      .catch(ex => {
        setLoading(false)
        setError(ex.message)
      })
  }

  const previousInput = usePrevious(input)

  useEffect(() => {
    if (!_.isEqual(previousInput, input)) {
      doFetch()
    }
  }, [input])

  return { loading, result, error, reFetch: doFetch } as UseAPIOutput<O>
}

export default useAPI
