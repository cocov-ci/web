import classNames from 'classnames'
import React from 'react'

import styles from './COMPONENTNAME.module.scss'

type COMPONENTNAMEProps = {
  children?: React.ReactNode
  className?: string
}

const COMPONENTNAME = ({ children, className }: COMPONENTNAMEProps) => {
  return <div className={classNames(styles.base, className)}>

  </div>
}

export default COMPONENTNAME
