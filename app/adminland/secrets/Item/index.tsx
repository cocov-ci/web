'use client'

import classNames from 'classnames'
import { Lock, Trash } from 'lucide-react'
import React from 'react'

import { inconsolata } from '../../../../utils/fonts'
import AccessoryButton from '../../../common/AccessoryButton'
import RelativeTime from '../../../common/RelativeTime'

import styles from './Item.module.scss'

interface ItemProps {
  title: string
  created_at: string
  created_by: string
  last_used_at?: string
  onDelete?: () => void
}

const Item = ({
  title,
  created_at,
  created_by,
  last_used_at,
  onDelete,
}: ItemProps) => {
  const conditionalActive = {
    [styles.active]: !!last_used_at,
  }
  const createdAtDate = new Date(created_at)
  const lastUsedDate = last_used_at ? new Date(last_used_at) : null

  return (
    <div className={styles.base}>
      <div
        className={classNames(styles.iconWrapper, {
          [styles.iconActive]: !!last_used_at,
        })}
      >
        <Lock size={17} />
      </div>
      <div className={styles.infoWrapper}>
        <div
          className={classNames(
            styles.title,
            inconsolata.className,
            conditionalActive,
          )}
        >
          {title}
        </div>
        <div className={styles.createdAt}>
          Created <RelativeTime timestamp={createdAtDate} /> ago by {created_by}
        </div>
        <div className={classNames(styles.lastUsed, conditionalActive)}>
          {lastUsedDate ? (
            <>
              Last used <RelativeTime timestamp={lastUsedDate} />
            </>
          ) : (
            'Never Used'
          )}
        </div>
      </div>
      <div className={styles.ButtonWrapper}>
        <AccessoryButton kind="squared" onClick={onDelete}>
          <Trash size={17} />
        </AccessoryButton>
      </div>
    </div>
  )
}

export default Item
