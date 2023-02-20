'use client'

import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import useLazyFetch from 'hooks/useLazyFetch'
import { ChecksResponseProps, CheckStatus } from 'types/Checks'

import Alert from './Alert'
import Check from './Check'
import Loading from './Check/Loading'
import Header from './Header'
import styles from './Page.module.scss'

interface ChecksParams {
  params: { repositoryName: string; commitSha: string }
}

interface ChecksFetchResponse {
  data: ChecksResponseProps
  loading: boolean
  (): void
}

const finishedStatuses: CheckStatus[] = ['succeeded', 'errored', 'canceled']

const isCheckFinished = (status: CheckStatus | undefined) =>
  status && status in finishedStatuses

const Checks = ({ params: { repositoryName, commitSha } }: ChecksParams) => {
  let polling: ReturnType<typeof setInterval>
  const [loadingPage, setLoadingPage] = useState(true)
  const [getChecks, { data }] = useLazyFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/checks`,
  }) as ChecksFetchResponse[]

  const allSucceeded = useMemo(() => isCheckFinished(data?.status), [data])

  useEffect(() => {
    getChecks()
  }, [])

  useEffect(() => {
    if (allSucceeded) {
      clearInterval(polling)
    } else {
      polling = setInterval(() => getChecks(), 5000)
    }

    return () => {
      clearInterval(polling)
    }
  }, [allSucceeded])

  useEffect(() => {
    data && setLoadingPage(false)
  }, [data])

  return (
    <FixedContent>
      <Header
        commit={data?.commit}
        loading={loadingPage}
        repositoryName={repositoryName}
      />
      <div className={styles.content}>
        {!loadingPage && allSucceeded && <Alert />}
        {loadingPage && <Loading />}
        {data?.checks?.map(item => (
          <Check
            check={item}
            issuesCounter={data.issues[item.plugin_name]}
            key={item.id}
          />
        ))}
      </div>
    </FixedContent>
  )
}

export default Checks
