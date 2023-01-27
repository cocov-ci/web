'use client'

import classNames from 'classnames'
import { GitBranch } from 'lucide-react'
import React, { useState } from 'react'

import BranchSwitcher from 'app/common/BranchSwitcher'
import Button from 'app/common/Button'
import { inconsolata } from 'utils/fonts'

import styles from './SummarySelector.module.scss'

type SummarySelectorProps = {
  className?: string
  gutterBottom?: boolean
  branchName: string
  branchesList: string[]
}

const SummarySelector = ({
  className,
  branchName,
  gutterBottom,
}: SummarySelectorProps) => {
  const [showBranchSwitcher, setShowBranchSwitcher] = useState<boolean>(false)

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
        <div className={styles.buttonWrapper}>
          <Button
            onClick={() => setShowBranchSwitcher(!showBranchSwitcher)}
            style="mini"
          >
            Switch Branch
          </Button>
          <BranchSwitcher
            className={styles.branchSwitcher}
            onClose={() => setShowBranchSwitcher(false)}
            visible={showBranchSwitcher}
          />
        </div>
      </div>
    </div>
  )
}

export default SummarySelector
