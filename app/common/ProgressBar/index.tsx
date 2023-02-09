'use client'

import classNames from 'classnames'
import React from 'react'

import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
  width: string
  height?: string
  value: number
  className?: string
}

const ProgressBar = ({
  width,
  value,
  className,
  height = '7px',
}: ProgressBarProps) => {
  return (
    <div
      className={classNames(styles.base, className)}
      style={{ width: width, height: height }}
    >
      <div
        className={styles.progressFill}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}

export default ProgressBar
