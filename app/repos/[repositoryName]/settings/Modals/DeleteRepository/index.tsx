'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import useLazyFetch from 'hooks/useLazyFetch'
import useModal from 'hooks/useModal'

import styles from './DeleteRepository.module.scss'

interface DeleteRepositoryFetchResponse {
  loading: boolean
  (): void
}

const DeleteRepository = ({ repositoryName }: { repositoryName: string }) => {
  const [checked, setChecked] = useState(false)
  const { closeModal } = useModal()
  const router = useRouter()

  const [deleteRepository, { loading }] = useLazyFetch({
    url: `/api/repositories/${repositoryName}/settings/delete`,
  }) as DeleteRepositoryFetchResponse[]

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Delete Repository
      </Text>
      <Text gutterBottom variant="description">
        You are about to perform a destructive action.
        <br />
        <strong>Bad things will happen if you don’t read this message!</strong>
      </Text>
      <Text gutterBottom variant="description">
        By continuing, the following data belonging to this repository will be
        permanently lost:
      </Text>
      <ul className={styles.list}>
        <li>- Coverage history</li>
        <li>- Past and current Issues</li>
        <li>- Ignored Issues</li>
        <li>- Checks history</li>
      </ul>
      <Text gutterBottom variant="description">
        No data will be deleted or changed from GitHub.
      </Text>
      <Text gutterBottom variant="description">
        Are you sure you want to continue?
      </Text>
      <label className={styles.label}>
        <input
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          type="checkbox"
        />{' '}
        I understand that I won’t be able to undo this operation.
      </label>
      <div className={styles.buttons}>
        <Button
          disabled={!checked || loading}
          onClick={() => {
            deleteRepository()
            router.push('/')
            closeModal()
          }}
          style="danger"
        >
          Yes, delete it
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            closeModal()
          }}
          style="secondary"
        >
          No, keep it
        </Button>
      </div>
    </div>
  )
}

export default DeleteRepository
