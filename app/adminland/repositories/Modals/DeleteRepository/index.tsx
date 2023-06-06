'use client'

import { useState } from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import API from 'utils/api'

import styles from './DeleteRepository.module.scss'

interface DeleteRepositoryParams {
  id: number
  onSuccess: () => void
  onFailure: () => void
}

const DeleteRepository = ({
  id,
  onFailure,
  onSuccess,
}: DeleteRepositoryParams) => {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState<boolean>()
  const { closeModal } = useModal()

  const onDeleteRepository = async () => {
    setLoading(true)

    try {
      await API.shared.adminRepositoriesDelete({
        id: id,
      })

      onSuccess()
    } catch (err) {
      onFailure()
    } finally {
      setLoading(false)
      closeModal()
    }
  }

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
          onClick={() => onDeleteRepository()}
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
