'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import { useErrorBanner } from 'hooks/useBanner'
import useModal from 'hooks/useModal'
import API from 'utils/api'

import styles from './DeleteRepository.module.scss'

const DeleteRepository = ({ repositoryName }: { repositoryName: string }) => {
  const { showBanner } = useErrorBanner()
  const [checked, setChecked] = useState(false)
  const [submitting, setSubmitting] = useState<boolean>()
  const { closeModal } = useModal()
  const router = useRouter()

  const onDeleteRepository = async () => {
    setSubmitting(true)

    try {
      await API.shared.repositoryDelete({
        repositoryName: repositoryName,
      })

      localStorage.setItem('repositoryDeleted', repositoryName)
    } catch (err) {
      showBanner({
        children: `Failed deleting the repository "${repositoryName}". Please try again.`,
        autoClose: true,
      })
    } finally {
      setSubmitting(false)
      router.push('/')
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
          disabled={!checked || submitting}
          onClick={() => onDeleteRepository()}
          style="danger"
        >
          Yes, delete it
        </Button>
        <Button
          disabled={submitting}
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
