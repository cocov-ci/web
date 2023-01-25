'use client'

import classNames from 'classnames'
import React from 'react'

import AccessoryButton, { HelpIcon } from 'app/common/AccessoryButton'
import Box from 'app/common/Box'
import Button from 'app/common/Button'
import StatusDot, { StatusDotColor } from 'app/common/StatusDot'
import Url from 'types/Url'

import styles from './StatusDisplay.module.scss'

type DetailsKind = 'details' | 'help'

type StatusDetails = {
  statusColor: StatusDotColor
  message?: string
  messageBold?: boolean
  detailsKind?: DetailsKind
  detailsHref?: Url
}

type StatusDisplayProps = {
  children?: React.ReactNode
  className?: string
  coverage: StatusDetails
  gutterBottom?: boolean
  checks: StatusDetails
}

interface CellProps extends StatusDetails {
  label: string
}

const StatusCell = ({
  statusColor,
  label,
  message,
  messageBold,
  detailsKind = 'details',
  detailsHref,
}: CellProps) => {
  return (
    <div className={styles.cell}>
      <span className={styles.text}>
        <StatusDot className={styles.dot} color={statusColor} />
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

const StatusDisplay = ({
  coverage,
  checks,
  gutterBottom,
}: StatusDisplayProps) => {
  return (
    <div className={styles.statusDisplay}>
      <Box className={styles.base} gutterBottom={gutterBottom}>
        <div className={styles.content}>
          <StatusCell label="Coverage:" {...coverage} />
          <StatusCell label="Checks:" {...checks} />
        </div>
      </Box>
    </div>
  )
}

export default StatusDisplay
