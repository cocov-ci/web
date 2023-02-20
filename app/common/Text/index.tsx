import classNames from 'classnames'
import React from 'react'

import styles from './Text.module.scss'

type TextProps = {
  children?: React.ReactNode
  className?: string
  title?: string
  variant?: 'title' | 'description'
  gutterBottom?: boolean
}

const Text = ({
  children,
  className,
  variant = 'title',
  title,
  gutterBottom,
}: TextProps) => {
  return (
    <p
      className={classNames(styles.text, styles[variant], className, {
        [styles.gutterBottom]: gutterBottom,
      })}
      title={title}
    >
      {children}
    </p>
  )
}

export default Text
