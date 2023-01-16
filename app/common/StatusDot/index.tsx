import classNames from 'classnames'
import React from 'react'

import styles from './StatusDot.module.scss'

export type StatusDotColor = 'red' | 'grey' | 'yellow' | 'green'

type StatusDotProps = {
  className?: string
  color: StatusDotColor
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
