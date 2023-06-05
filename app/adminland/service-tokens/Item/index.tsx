'use client'

import classNames from 'classnames'
import { Key, Trash } from 'lucide-react'
import React from 'react'

import { useErrorBanner } from 'hooks/useBanner'
import useModal from 'hooks/useModal'
import { ServiceTokenParams } from 'types/ServiceTokens'

import AccessoryButton from '../../../common/AccessoryButton'
import RelativeTime from '../../../common/RelativeTime'
import DeleteToken from '../Modals/DeleteToken'

import styles from './Item.module.scss'

interface ItemProps extends ServiceTokenParams {
  onDelete: () => void
}

const Item = ({
  description,
  created_at,
  created_by,
  last_used_at,
  id,
  onDelete,
}: ItemProps) => {
  const { showBanner } = useErrorBanner()
  const { openModal } = useModal()

  const conditionalActive = {
    [styles.active]: !!last_used_at,
  }
  const createdAtDate = new Date(created_at)
  const lastUsedDate = last_used_at ? new Date(last_used_at) : null

  const onDeleteTokenClick = () => {
    openModal(
      <DeleteToken
        onFailure={token => {
          showBanner({
            children: `Failed deleting the token "${token}". Please try again.`,
          })
        }}
        onSuccess={() => onDelete()}
        token={{
          description,
          created_at,
          created_by,
          last_used_at,
          id,
        }}
      />,
    )
  }

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

      <AccessoryButton kind="squared" onClick={() => onDeleteTokenClick()}>
        <Trash size={17} />
      </AccessoryButton>
    </div>
  )
}

export default Item
