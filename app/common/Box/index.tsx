import classNames from 'classnames'
import React from 'react'

import styles from './Box.module.scss'

type BoxProps = {
  children?: React.ReactNode
  title?: string
  description?: string
  className?: string
}

const Box = ({ title, description, children, className }: BoxProps) => {
  return (
    <div className={classNames(styles.box, className)}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  )
}

export default Box
