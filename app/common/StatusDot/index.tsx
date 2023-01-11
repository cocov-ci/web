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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classNames(styles.dot, styles[color], className, {
        [styles.clickable]: onClick,
      })}
      onClick={e => onClick && onClick(e)}
    />
  )
}

export default StatusDot
