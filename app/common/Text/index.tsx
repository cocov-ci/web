import classNames from 'classnames'
import React from 'react'

import styles from './Text.module.scss'

type TextProps = {
  children?: React.ReactNode
  className?: string
  variant?: 'title' | 'description'
}

const Text = ({ children, className, variant = 'title' }: TextProps) => {
  return <p className={classNames(styles[variant], className)}>{children}</p>
}

export default Text
