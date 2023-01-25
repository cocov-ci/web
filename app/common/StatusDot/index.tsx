import classNames from 'classnames'
import React from 'react'

import styles from './StatusDot.module.scss'

export type StatusDotColor = 'red' | 'grey' | 'yellow' | 'green'

type StatusDotProps = {
  className?: string
  color: StatusDotColor
}

const StatusDot = ({ className, color }: StatusDotProps) => {
  return <div className={classNames(styles.dot, styles[color], className)} />
}

export default StatusDot
