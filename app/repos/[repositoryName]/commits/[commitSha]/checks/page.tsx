'use client'

import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import { useLazyAPI } from 'hooks/useAPI'
import { CheckStatus } from 'types/Checks'
import API from 'utils/api'

import Alert from './Alert'
import Check from './Check'
import Loading from './Check/Loading'
import Header, { AccessoryButtonState } from './Header'
import styles from './Page.module.scss'

interface ChecksParams {
  params: { repositoryName: string; commitSha: string }
}

const finishedStatuses: CheckStatus[] = ['completed', 'errored', 'canceled']

const isCheckFinished = (status: CheckStatus | undefined) =>
  status && finishedStatuses.includes(status)

const ChecksPage = ({
  params: { repositoryName, commitSha },
}: ChecksParams) => {
  let polling: ReturnType<typeof setInterval>
  const [loadingPage, setLoadingPage] = useState(true)
  const { error, result, refresh } = useLazyAPI(API.shared.checksList, {
    repositoryName,
    commitSHA: commitSha,
  })

  const [accessoryButtonState, setAccessoryButtonState] =
    useState<AccessoryButtonState>('none')

  const allSucceeded = useMemo(() => isCheckFinished(result?.status), [result])

  const onReRunChecks = async () => {
    setAccessoryButtonState('restarting')
    await API.shared.checksReRun({ repositoryName, commitSHA: commitSha })
  }

  const onCancelChecks = async () => {
    setAccessoryButtonState('cancelling')
    await API.shared.checksCancel({ repositoryName, commitSHA: commitSha })
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    if (result?.status) {
      switch (result.status) {
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
  }, [result])

  useEffect(() => {
    if (allSucceeded) {
      clearInterval(polling)
    } else {
      polling = setInterval(() => refresh(), 5000)
    }

    return () => {
      clearInterval(polling)
    }
  }, [allSucceeded])

  useEffect(() => {
    setLoadingPage(result === undefined)
  }, [result])

  return (
    <FixedContent>
      <Header
        accessoryButtonState={accessoryButtonState}
        commit={result?.commit}
        loading={loadingPage}
        onCancel={onCancelChecks}
        onReRun={onReRunChecks}
        repositoryName={repositoryName}
      />
      <div className={styles.content}>
        {!loadingPage && allSucceeded && <Alert />}
        {loadingPage && <Loading />}
        {result?.checks?.map(item => (
          <Check
            check={item}
            issuesCounter={result.issues[item.plugin_name]}
            key={item.id}
          />
        ))}
      </div>
    </FixedContent>
  )
}

export default ChecksPage
