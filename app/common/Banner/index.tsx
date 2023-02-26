import classNames from 'classnames'
import { LucideIcon, XIcon } from 'lucide-react'
import React from 'react'

import styles from './Banner.module.scss'

export type BannerProps = {
  className?: string
  variation?: 'success' | 'warning' | 'info' | 'neutral'
  children: React.ReactNode
  icon: LucideIcon
  onClose?: () => void
  open?: boolean
}

const Banner = ({
  className,
  variation = 'neutral',
  icon,
  children,
  onClose,
  open,
}: BannerProps) => {
  const IconComponent = icon

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.faces, {
          [styles.open]: open,
        })}
      >
        <div className={classNames(styles.base, className, styles[variation])}>
          <div className={styles.icon}>
            <IconComponent size={20} />
          </div>
          <div className={styles.content}>{children}</div>
          <div className={styles.close}>
            <button onClick={onClose}>
              <XIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner