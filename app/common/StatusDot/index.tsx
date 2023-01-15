import classNames from 'classnames'
import React from 'react'

import styles from './StatusDot.module.scss'

type StatusDotProps = {
  className?: string
  color: 'red' | 'grey' | 'yellow' | 'green'
  onClick?: (ev: React.MouseEvent) => void
}

const StatusDot = ({ className, onClick, color }: StatusDotProps) => {
  return (
    <a href="javascript:void(0)" onClick={e => onClick && onClick(e)}>
      <div
        className={classNames(styles.dot, styles[color], className, {
          [styles.clickable]: onClick,
        })}
      />
    </a>
  )
}

export default StatusDot
