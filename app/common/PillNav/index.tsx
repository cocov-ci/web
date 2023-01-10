import classNames from 'classnames'
import React from 'react'

import styles from './PillNav.module.scss'

interface PillNavProps {
  children: React.ReactNode
  className?: string
}

const PillNav = ({ children, className }: PillNavProps) => {
  return <div className={classNames(styles.base, className)}>{children}</div>
}

export default PillNav
