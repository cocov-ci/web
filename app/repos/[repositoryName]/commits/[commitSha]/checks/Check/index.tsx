'use client'

import { CheckCircle, Clock, MinusCircle, XOctagon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Button from 'app/common/Button'
import CodeBlock from 'app/common/CodeBlock'
import Duration from 'app/common/Duration'
import Loading from 'app/common/Loading'
import Text from 'app/common/Text'
import useLazyFetch, { UseFetchProps } from 'hooks/useLazyFetch'
import useSegments from 'hooks/useSegments'
import { CheckProps } from 'types/Checks'

import styles from './Check.module.scss'

export interface CheckComponentProps {
  check: CheckProps
  issuesCounter?: number
}

interface CheckFetchResponse {
  data: CheckProps
  (arg: UseFetchProps): void
}

const Check = ({ check, issuesCounter }: CheckComponentProps) => {
  const { status, plugin_name, started_at, finished_at, id } = check
  const [openDetails, setOpenDetails] = useState(false)
  const segments = useSegments()
  const repositoryName = useMemo(() => segments[1], [segments])
  const commitSha = useMemo(() => segments[3], [segments])

  const [getCheck, { data: dataCheck }] = useLazyFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/checks/${id}`,
  }) as CheckFetchResponse[]

  useEffect(() => {
    if (status === 'errored') getCheck({})
  }, [status])

  const getIssuesReportedMessage = useMemo(() => {
    if (status !== 'completed') return null

    let message

    if (!issuesCounter || issuesCounter > 1) {
      message = `${issuesCounter || 'No'} issues reported.`
    } else if (issuesCounter === 1) {
      message = `${issuesCounter} issue reported.`
    }

    return message
  }, [status, issuesCounter])

  const CheckDuration = useCallback(() => {
    let durationStatus

    switch (status) {
      case 'completed':
        durationStatus = 'Completed after '
        break
      case 'errored':
        durationStatus = 'Failed after '
        break
      case 'waiting':
        durationStatus = 'Waiting for '
        break
      case 'in_progress':
        durationStatus = 'In progress for '
        break
      case 'canceled':
        durationStatus = 'Canceled after'
        break
    }

    return (
      <>
        {durationStatus} <Duration fromDate={started_at} toDate={finished_at} />
        . {getIssuesReportedMessage}
      </>
    )
  }, [status, started_at, finished_at])

  return (
    <div className={styles.check}>
      <div className={styles.container}>
        {status === 'completed' && (
          <CheckCircle className={styles.completed} size="24" />
        )}
        {status === 'errored' && <XOctagon className={styles.errored} />}
        {status === 'in_progress' && (
          <Loading className={styles.in_progress} height="24px" width="24px" />
        )}
        {status === 'waiting' && <Clock className={styles.waiting} size="24" />}
        {status === 'canceled' && (
          <MinusCircle className={styles.waiting} size="24" />
        )}

        <div className={styles.content}>
          <Text className={styles.pluginName}>{plugin_name}</Text>
          <Text variant="description">
            <CheckDuration />
          </Text>
        </div>
        {status === 'errored' && (
          <Button
            onClick={() => setOpenDetails(openDetails => !openDetails)}
            style="mini"
          >
            {openDetails ? 'Less Details' : 'Details'}
          </Button>
        )}
      </div>
      {openDetails && (
        <div className={styles.details}>
          <CodeBlock plainText={dataCheck.error_output} />
        </div>
      )}
    </div>
  )
}

export default Check
