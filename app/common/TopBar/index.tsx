import classNames from 'classnames'
import React from 'react'

import styles from './TopBar.module.scss'

interface TopBarProps {
  children?: React.ReactNode
  className?: string
  title?: string
  description?: string
  id?: string
}

const TopBar = ({
  id,
  title,
  description,
  children,
  className,
}: TopBarProps) => {
  return (
    <div className={classNames(styles.topBar, className)} id={id}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default TopBar
