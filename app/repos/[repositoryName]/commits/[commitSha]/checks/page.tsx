'use client'

import { isEmpty } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import { useLazyAPI } from 'hooks/useAPI'
import { CheckStatus } from 'types/Checks'
import API from 'utils/api'
import { ChecksListOutput } from 'utils/api/request_response_types'

import Alert from './Alert'
import Check from './Check'
import Loading from './Check/Loading'
import Failure from './Failure'
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
  const [data, setData] = useState<ChecksListOutput>()
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
    refresh()
  }

  const onCancelChecks = async () => {
    setAccessoryButtonState('cancelling')
    await API.shared.checksCancel({ repositoryName, commitSHA: commitSha })
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    if (result) {
      setData(result)
    }

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
        case 'cancelling':
          setAccessoryButtonState('cancelling')
          break

        case 'failure':
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
    setLoadingPage(isEmpty(data))
  }, [data])

  const checkResults = () => (
    <>
      {!loadingPage && allSucceeded && <Alert />}
      {loadingPage && <Loading />}
      {data?.checks?.map(item => (
        <Check
          check={item}
          issuesCounter={data.issues[item.plugin_name]}
          key={item.id}
        />
      ))}
    </>
  )

  const failureResult = () =>
    data &&
    data.failure_reason && (
      <Failure details={data.failure_details} reason={data.failure_reason} />
    )

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
        {data?.status == 'failure' ? failureResult() : checkResults()}
      </div>
    </FixedContent>
  )
}

export default ChecksPage
