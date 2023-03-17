'use client'

import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import usePrevious from 'hooks/usePrevious'

export interface UseAPIOutput<O> {
  result?: O
  loading: boolean
  error?: string
  refresh: () => void
}

const useAPIRequest = <I, O>(
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

  return { loading, result, error, refresh: doFetch } as UseAPIOutput<O>
}

const useAPI = <I, O>(
  fn: (param: I) => Promise<O>,
  input: I,
): UseAPIOutput<O> => {
  const req = useAPIRequest(fn, input)

  const previousInput = usePrevious(input)

  useEffect(() => {
    if (!_.isEqual(previousInput, input)) {
      req.refresh()
    }
  }, [input])

  return req
}

const useLazyAPI = <I, O>(
  fn: (param: I) => Promise<O>,
  input: I,
): UseAPIOutput<O> => {
  const req = useAPIRequest(fn, input)

  const previousInput = usePrevious(input)

  const deferredRequest = useCallback(() => {
    if (!_.isEqual(previousInput, input)) {
      req.refresh()
    }
  }, [])

  return {
    loading: req.loading,
    error: req.error,
    result: req.result,
    refresh: deferredRequest,
  }
}

export default useAPI
export { useLazyAPI }
