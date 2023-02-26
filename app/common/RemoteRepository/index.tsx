import classNames from 'classnames'
import { Album } from 'lucide-react'
import React from 'react'

import Button from '../Button'
import RelativeTime from '../RelativeTime'

import styles from './RemoteRepository.module.scss'

type RemoteRepositoryProps = {
  children?: React.ReactNode
  className?: string
  name: string
  description?: string
  createdAt: Date
  updatedAt?: Date
  status: 'absent' | 'pending' | 'present'
  onAdd?: () => void
}

const RemoteRepository = ({
  className,
  name,
  description,
  createdAt,
  updatedAt,
  status,
  onAdd,
}: RemoteRepositoryProps) => {
  let addButton

  if (status == 'absent') {
    addButton = (
      <Button onClick={onAdd} style="secondary">
        Add to Cocov
      </Button>
    )
  } else if (status == 'pending') {
    addButton = (
      <Button disabled={true} style="secondary">
        Adding...
      </Button>
    )
  } else {
    addButton = (
      <Button disabled={true} style="inactive">
        Already Added
      </Button>
    )
  }

  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.icon}>
        <Album size={25} strokeWidth="2px" />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div
          className={classNames(styles.description, {
            [styles.empty]: !description,
          })}
        >
          {description || 'No description'}
        </div>
        <div className={styles.dates}>
          Created <RelativeTime timestamp={createdAt} />
          {updatedAt && (
            <>
              {' '}
              • Last updated <RelativeTime timestamp={updatedAt} />
            </>
          )}
        </div>
      </div>
      <div className={styles.button}>{addButton}</div>
    </div>
  )
}

export default RemoteRepository
