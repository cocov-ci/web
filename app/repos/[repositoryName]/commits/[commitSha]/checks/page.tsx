'use client'

import { useEffect, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import useLazyFetch from 'hooks/useLazyFetch'
import { ChecksResponseProps } from 'types/Checks'

import Alert from './Alert'
import Check from './Check'
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

const Checks = ({ params: { repositoryName, commitSha } }: ChecksParams) => {
  const [loadingPage, setLoadingPage] = useState(true)
  const [getChecks, { data }] = useLazyFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/checks`,
  }) as ChecksFetchResponse[]

  useEffect(() => {
    getChecks()

    setInterval(() => getChecks(), 5000)
  }, [])

  useEffect(() => {
    data && setLoadingPage(false)
  }, [data])

  if (!data) return null

  const allSucceeded =
    data.checks?.filter(item => item.status !== 'succeeded').length === 0

  return (
    <FixedContent>
      <Header
        commit={data.commit}
        loading={loadingPage}
        repositoryName={repositoryName}
      />
      <div className={styles.content}>
        {allSucceeded && <Alert />}
        {data.checks?.map(item => (
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
