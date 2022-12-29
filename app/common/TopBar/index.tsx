import classNames from 'classnames'
import React from 'react'

import styles from './TopBar.module.scss'

interface TopBarProps {
  children?: React.ReactNode
  className?: string
  title?: string
  description?: string
}

const TopBar = ({ title, description, children, className }: TopBarProps) => {
  return (
    <div className={styles.topBar}>
      <div>
        <h1 className={classNames(styles.title, className)}>{title}</h1>
        <p className={classNames(styles.title, className)}>{description}</p>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default TopBar
