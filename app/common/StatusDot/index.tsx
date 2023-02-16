import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import Url from 'types/Url'

import styles from './StatusDot.module.scss'

export type StatusDotColor = 'red' | 'grey' | 'yellow' | 'green'

type StatusDotProps = {
  className?: string
  color: StatusDotColor
  href?: Url
}

const StatusDot = ({ className, color, href }: StatusDotProps) => {
  const baseProps = {
    className: classNames(styles.dot, styles[color], className),
  }

  if (href) {
    return (
      <Link href={href}>
        <div {...baseProps} />
      </Link>
    )
  }

  return <div {...baseProps} />
}

export default StatusDot
