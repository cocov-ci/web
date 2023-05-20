import classNames from 'classnames'
import { Key, Trash } from 'lucide-react'
import React from 'react'

import AccessoryButton from '../../../common/AccessoryButton'
import Button from '../../../common/Button'
import RelativeTime from '../../../common/RelativeTime'

import styles from './Item.module.scss'

interface ItemProps {
  description: string
  created_at: string
  created_by: string
  last_used_at?: string
}

const Item = ({
  description,
  created_at,
  created_by,
  last_used_at,
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
        <Key size={17} />
      </div>
      <div className={styles.infoWrapper}>
        <div className={classNames(styles.title, conditionalActive)}>
          {description}
        </div>
        <div className={styles.createdAt}>
          Created <RelativeTime timestamp={createdAtDate} /> ago by {created_by}
        </div>
        <div className={classNames(styles.lastUsed, conditionalActive)}>
          {lastUsedDate ? (
            <RelativeTime timestamp={lastUsedDate} />
          ) : (
            'Never Used'
          )}
        </div>
      </div>
      <div className={styles.ButtonWrapper}>
        <AccessoryButton kind="squared">
          <Trash size={17} />
        </AccessoryButton>
      </div>
    </div>
  )
}

export default Item