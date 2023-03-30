import classNames from 'classnames'
import { Lock } from 'lucide-react'
import React from 'react'

import { inconsolata } from 'utils/fonts'

import RelativeTime from '../RelativeTime'

import styles from './Secret.module.scss'

type SecretMeta = {
  createdAt: Date
  createdBy: string
  lastUsed?: Date
}

type SecretProps = {
  children?: React.ReactNode
  className?: string
  name: string
  metadata?: SecretMeta
  showDivider?: boolean
}

const Secret = ({
  children,
  className,
  name,
  metadata,
  showDivider,
}: SecretProps) => {
  return (
    <div
      className={classNames(styles.base, className, {
        [styles.active]: !metadata || metadata.lastUsed !== undefined,
        [styles.divider]: showDivider === true,
        [styles.withMeta]: metadata !== undefined,
      })}
    >
      <div className={styles.iconWrapper}>
        <Lock height="14.44px" width="13px" />
      </div>
      <div className={styles.infoWrapper}>
        <span className={classNames(styles.secretName, inconsolata.className)}>
          {name}
        </span>
        {metadata && (
          <>
            <span className={styles.createdAt}>
              Created <RelativeTime timestamp={metadata.createdAt} /> by{' '}
              {metadata.createdBy}
            </span>
            <span className={styles.lastUsed}>
              {metadata.lastUsed ? (
                <>
                  Last used <RelativeTime timestamp={metadata.lastUsed} />
                </>
              ) : (
                <>Never used</>
              )}
            </span>
          </>
        )}
      </div>
      <div className={styles.accessoryWrapper}>{children}</div>
    </div>
  )
}

export default Secret
