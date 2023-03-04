import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'
import React from 'react'

import Loading from '../Loading'

import styles from './Alert.module.scss'

type BoxProps = {
  children?: React.ReactNode
  className?: string
  title?: string
  description?: string
  noBorder?: boolean
  loading?: boolean
  icon?: LucideIcon
}

const Alert = ({
  className,
  icon,
  loading,
  title,
  description,
  noBorder,
}: BoxProps) => {
  const Icon = icon as LucideIcon

  return (
    <div className={classNames(styles.alert, className)}>
      <div
        className={classNames(styles.box, {
          [styles.noBorder]: noBorder,
        })}
      >
        {icon && <Icon className={styles.icon} size={40} />}
        {loading && (
          <Loading className={styles.loading} size={30} type="spinner" />
        )}
        <div className={styles.content}>
          {title && <h2>{title}</h2>}
          {description && <h3>{description}</h3>}
        </div>
      </div>
    </div>
  )
}

export default Alert
