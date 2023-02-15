'use client'

import { CheckCircle, XOctagon } from 'lucide-react'
import { useState } from 'react'

import Button from 'app/common/Button'
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

  const getRelativeTime = () => {
    switch (status) {
      case 'succeeded':
        return 'Completed after'

      case 'errored':
        return 'Failed after'

      case 'waiting':
      case 'running':
        return 'In progress for'
    }
  }

  const getIssuesReportedMessage = () => {
    if (status !== 'succeeded') return null

    let message

    if (!issuesCounter || issuesCounter > 1) {
      message = `${issuesCounter || 'No'} issues reported.`
    } else if (issuesCounter === 1) {
      message = `${issuesCounter} issue reported.`
    }

    return message
  }

  return (
    <div className={styles.check}>
      <div className={styles.content}>
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
            {getRelativeTime()}
            {/* <RelativeTime timestamp={new Date(Date.parse(dateToCompare))} /> */}
            {getIssuesReportedMessage()}
          </Text>
        </div>
        {/* {status === 'errored' && ( */}
        <Button
          onClick={() => setOpenDetails(openDetails => !openDetails)}
          style="mini"
        >
          {openDetails ? 'Less Details' : 'Details'}
        </Button>
        {/* )} */}
      </div>
      {openDetails && <div className={styles.details}>hey...</div>}
    </div>
  )
}

export default Check
