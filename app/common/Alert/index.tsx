import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'
import React from 'react'

import styles from './Alert.module.scss'

type BoxProps = {
  children?: React.ReactNode
  className?: string
  title?: string
  description?: string
  icon?: LucideIcon
}

const Alert = ({ className, icon, title, description }: BoxProps) => {
  const Icon = icon as LucideIcon

  return (
    <div className={classNames(styles.alert, className)}>
      <div className={styles.box}>
        {icon && <Icon className={styles.icon} size={40} />}
        <div className={styles.content}>
          {title && <h2>{title}</h2>}
          {description && <h3>{description}</h3>}
        </div>
      </div>
    </div>
  )
}

export default Alert
