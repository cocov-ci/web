import classNames from 'classnames'
import React from 'react'

import styles from './PillNav.module.scss'

interface PillNavProps {
  children: React.ReactNode
  className?: string
  lightMode?: boolean
}

const PillNav = ({ children, lightMode = true, className }: PillNavProps) => {
  return (
    <div
      className={classNames(styles.base, className, {
        [styles.medium]: !lightMode,
      })}
    >
      {children}
    </div>
  )
}

export default PillNav
