import { Album, Trash } from 'lucide-react'
import React from 'react'

import AccessoryButton from 'app/common/AccessoryButton'
import RelativeTime from 'app/common/RelativeTime'
import SizeFormatter from 'app/common/SizeFormatter'
import { useErrorBanner } from 'hooks/useBanner'
import useModal from 'hooks/useModal'
import { AdminRepository } from 'types/AdminRepositories'

import DeleteRepository from '../Modals/DeleteRepository'

import styles from './Item.module.scss'

export interface RepositoryProps extends AdminRepository {
  onDelete: () => void
}

const Item = ({
  id,
  name,
  cache_size,
  commits_size,
  created_at,
  accessible_by_count,
  description,
  onDelete,
}: RepositoryProps) => {
  const { showBanner } = useErrorBanner()
  const { openModal } = useModal()

  const onDeleteRepositoryClick = () => {
    openModal(
      <DeleteRepository
        id={id}
        onFailure={() => {
          showBanner({
            children: `Failed deleting the repository "${name}". Please try again.`,
          })
        }}
        onSuccess={() => onDelete()}
        repositoryName={name}
      />,
    )
  }

  return (
    <div className={styles.base}>
      <div className={styles.iconWrapper}>
        <Album />
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.createdAt}>
          Added <RelativeTime timestamp={new Date(created_at)} />
        </div>
        <div className={styles.accessibleBy}>
          {accessible_by_count === 0
            ? 'Not accessible'
            : `Accessible by ${accessible_by_count} user${
                accessible_by_count === 1 ? '' : 's'
              }`}
        </div>
        <div className={styles.usageData}>
          Using <SizeFormatter size={commits_size} /> of commit storage,{' '}
          <SizeFormatter size={cache_size} /> of cache
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <AccessoryButton kind="squared" onClick={onDelete}>
          <Trash onClick={() => onDeleteRepositoryClick()} size={17} />
        </AccessoryButton>
      </div>
    </div>
  )
}

export default Item
