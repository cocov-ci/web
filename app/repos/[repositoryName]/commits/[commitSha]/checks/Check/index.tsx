'use client'

import { CheckCircle, XOctagon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import Button from 'app/common/Button'
import Duration from 'app/common/Duration'
import Loading from 'app/common/Loading'
import Text from 'app/common/Text'
import { CheckProps } from 'types/Checks'

import styles from './Check.module.scss'

export interface CheckComponentProps {
  check: CheckProps
  issuesCounter?: number
}

const Check = ({ check, issuesCounter }: CheckComponentProps) => {
  const { status, plugin_name, started_at, finished_at } = check
  const [openDetails, setOpenDetails] = useState(false)

  const getIssuesReportedMessage = useMemo(() => {
    if (status !== 'succeeded') return null

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
      case 'succeeded':
        durationStatus = 'Completed after '
        break
      case 'errored':
        durationStatus = 'Failed after '
        break
      case 'waiting':
      case 'running':
        durationStatus = 'In progress for '
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
        {status === 'succeeded' && (
          <CheckCircle className={styles.succeeded} size="24" />
        )}
        {status === 'errored' && <XOctagon className={styles.errored} />}
        {status === 'waiting' && (
          <Loading className={styles.waiting} height="24px" width="24px" />
        )}

        <div className={styles.content}>
          <Text className={styles.pluginName}>{plugin_name}</Text>
          <Text className={styles.statusMessage} variant="description">
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
      {openDetails && <div className={styles.details}>hey...</div>}
    </div>
  )
}

export default Check
