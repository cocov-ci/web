import classNames from 'classnames'
import React from 'react'

import styles from './Text.module.scss'

type TextProps = {
  children?: React.ReactNode
  className?: string
  variant: 'title' | 'description'
}

const Text = ({ children, className, variant }: TextProps) => {
  return <p className={classNames(styles[variant], className)}>{children}</p>
}

Text.defaultProps = {
  variant: 'title',
}

export default Text
