'use client'

import classNames from 'classnames'
import { GitBranch } from 'lucide-react'
import React from 'react'

import Button from 'app/common/Button'
import { inconsolata } from 'utils/fonts'

import styles from './SummarySelector.module.scss'

type SummarySelectorProps = {
  className?: string
  gutterBottom?: boolean
  branchName: string
  onRequestSwitch?: (event: React.MouseEvent) => void
}

const SummarySelector = ({
  className,
  branchName,
  onRequestSwitch,
  gutterBottom,
}: SummarySelectorProps) => {
  return (
    <div
      className={classNames(styles.base, className, {
        [styles.gutterBottom]: gutterBottom,
      })}
    >
      <div className={styles.textContainer}>
        <GitBranch size={18} />
        <span className={styles.disclaimer}>
          This is a summary of the{' '}
          <span
            className={classNames(styles.branchName, inconsolata.className)}
          >
            {branchName}
          </span>{' '}
          branch.
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={onRequestSwitch} style="mini">
          Switch Branch
        </Button>
      </div>
    </div>
  )
}

export default SummarySelector
