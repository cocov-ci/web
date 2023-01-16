import classNames from 'classnames'
import React from 'react'

import AccessoryButton, { HelpIcon } from 'app/common/AccessoryButton'
import Box from 'app/common/Box'
import StatusDot, { StatusDotColor } from 'app/common/StatusDot'
import Url from 'types/Url'

import Button from '../Button'

import styles from './StatusDisplay.module.scss'

type StatusKind = 'waiting' | 'processing' | 'processed' | 'failed'

type DetailsKind = 'details' | 'help'

type StatusDetails = {
  status: StatusKind
  message?: string
  messageBold?: boolean
  detailsKind?: DetailsKind
  detailsHref?: Url
}

type StatusDisplayProps = {
  children?: React.ReactNode
  className?: string
  coverage: StatusDetails
  checks: StatusDetails
}

interface CellProps extends StatusDetails {
  label: string
}

const orbColor = (status: StatusKind): StatusDotColor => {
  switch (status) {
    case 'waiting':
      return 'grey'
    case 'processing':
      return 'yellow'
    case 'processed':
      return 'green'
    case 'failed':
      return 'red'
  }
}

const StatusCell = ({
  status,
  label,
  message,
  messageBold,
  detailsKind = 'details',
  detailsHref,
}: CellProps) => {
  return (
    <div className={styles.cell}>
      <span className={styles.text}>
        <StatusDot className={styles.dot} color={orbColor(status)} />
        <span className={styles.label}>{label}</span>
        <span
          className={classNames(styles.message, {
            [styles.bold]: messageBold,
          })}
        >
          {message}
        </span>
      </span>
      {detailsHref &&
        (detailsKind == 'details' ? (
          <Button
            className={styles.details}
            href={detailsHref}
            style="inactive"
          >
            Details
          </Button>
        ) : (
          <AccessoryButton
            className={classNames(styles.details, styles.help)}
            href={detailsHref}
            kind="round"
          >
            <HelpIcon />
          </AccessoryButton>
        ))}
    </div>
  )
}

const StatusDisplay = ({ coverage, checks }: StatusDisplayProps) => {
  return (
    <Box className={styles.base}>
      <StatusCell label="Coverage:" {...coverage} />
      <StatusCell label="Checks:" {...checks} />
    </Box>
  )
}

export default StatusDisplay
