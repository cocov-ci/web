'use client'

import { useEffect } from 'react'

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
  const [getChecks, { data }] = useLazyFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/checks`,
  }) as ChecksFetchResponse[]

  useEffect(() => {
    setInterval(() => getChecks(), 5000)
  }, [])

  if (!data) return null

  const allSucceeded =
    data.checks?.filter(item => item.status !== 'succeeded').length === 0

  return (
    <FixedContent>
      <Header commit={data.commit} repositoryName={repositoryName} />
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
