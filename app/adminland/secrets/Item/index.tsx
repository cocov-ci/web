'use client'

import classNames from 'classnames'
import { Lock, Trash } from 'lucide-react'
import React from 'react'

import { useErrorBanner } from 'hooks/useBanner'
import useModal from 'hooks/useModal'
import { SecretParams } from 'types/Secrets'

import { inconsolata } from '../../../../utils/fonts'
import AccessoryButton from '../../../common/AccessoryButton'
import RelativeTime from '../../../common/RelativeTime'
import DeleteSecret from '../Modals/DeleteSecret'

import styles from './Item.module.scss'

interface ItemProps {
  onDelete: () => void
  secret: SecretParams
}

const Item = ({ secret, onDelete }: ItemProps) => {
  const { name, created_at, owner, last_used_at } = secret
  const { showBanner } = useErrorBanner()
  const { openModal } = useModal()
  const conditionalActive = {
    [styles.active]: !!last_used_at,
  }
  const createdAtDate = new Date(created_at)
  const lastUsedDate = last_used_at ? new Date(last_used_at) : null

  const onDeleteSecretClick = () => {
    openModal(
      <DeleteSecret
        onFailure={() => {
          showBanner({
            children: `Failed deleting the secret "${name}". Please try again.`,
          })
        }}
        onSuccess={() => onDelete()}
        secret={secret}
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
          {name}
        </div>
        <div className={styles.createdAt}>
          Created <RelativeTime timestamp={createdAtDate} /> ago by{' '}
          {owner.login}
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
          <Trash onClick={() => onDeleteSecretClick()} size={17} />
        </AccessoryButton>
      </div>
    </div>
  )
}

export default Item
