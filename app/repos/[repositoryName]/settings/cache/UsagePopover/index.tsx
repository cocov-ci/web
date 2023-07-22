'use client'

import classNames from 'classnames'
import React from 'react'

import styles from './UsagePopover.module.scss'

type PopoverProps = {
  className?: string
}

const UsagePopover = ({ className }: PopoverProps) => {
  return (
    <div className={classNames(className, styles.base)}>
      <div className={styles.title}>Storage Usage</div>
      <div className={styles.body}>
        This indicates how much storage this repository is using. Exceeding this
        limit will cause old items to be automatically removed.
      </div>
    </div>
  )
}

export default UsagePopover
