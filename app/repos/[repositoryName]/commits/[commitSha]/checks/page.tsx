'use client'

import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import useLazyFetch, { UseFetchProps } from 'hooks/useLazyFetch'
import Checks from 'services/checks'
import { ChecksResponseProps, CheckStatus } from 'types/Checks'

import Alert from './Alert'
import Check from './Check'
import Loading from './Check/Loading'
import Header, { AccessoryButtonState } from './Header'
import styles from './Page.module.scss'

interface ChecksParams {
  params: { repositoryName: string; commitSha: string }
}

interface ChecksFetchResponse {
  data: ChecksResponseProps
  loading: boolean
  (arg: UseFetchProps): void
}

const finishedStatuses: CheckStatus[] = ['completed', 'errored', 'canceled']

const isCheckFinished = (status: CheckStatus | undefined) =>
  status && status in finishedStatuses

const ChecksPage = ({
  params: { repositoryName, commitSha },
}: ChecksParams) => {
  let polling: ReturnType<typeof setInterval>
  const [loadingPage, setLoadingPage] = useState(true)
  const [getChecks, { data }] = useLazyFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/checks`,
  }) as ChecksFetchResponse[]
  const [accessoryButtonState, setAccessoryButtonState] =
    useState<AccessoryButtonState>('none')

  const allSucceeded = useMemo(() => isCheckFinished(data?.status), [data])

  const onReRunChecks = async () => {
    setAccessoryButtonState('restarting')
    await Checks.reRun({ repositoryName, commitSha })
  }

  const onCancelChecks = async () => {
    setAccessoryButtonState('cancelling')
    await Checks.cancel({ repositoryName, commitSha })
  }

  useEffect(() => {
    getChecks({})
  }, [])

  useEffect(() => {
    if (data?.status) {
      switch (data.status) {
        case 'errored':
        case 'completed':
        case 'canceled':
          setAccessoryButtonState('rerun')
          break
        case 'in_progress':
          setAccessoryButtonState('cancel')
          break
        default:
          setAccessoryButtonState('none')
          break
      }
    }
  }, [data])

  useEffect(() => {
    if (allSucceeded) {
      clearInterval(polling)
    } else {
      polling = setInterval(() => getChecks({}), 5000)
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
        accessoryButtonState={accessoryButtonState}
        commit={data?.commit}
        loading={loadingPage}
        onCancel={onCancelChecks}
        onReRun={onReRunChecks}
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

export default ChecksPage
