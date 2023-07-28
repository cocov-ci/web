'use client'

import { useMemo, useState } from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import useSegments from 'hooks/useSegments'
import API from 'utils/api'

import styles from './DeleteCache.module.scss'

interface DeleteCacheParams {
  id: number
  name: string
  onSuccess: () => void
  onFailure: (arg: string) => void
}

const DeleteCache = ({ id, onSuccess, onFailure, name }: DeleteCacheParams) => {
  const { closeModal } = useModal()
  const segments = useSegments()
  const repositoryName = useMemo(() => segments[1], [segments])
  const [loading, setLoading] = useState<boolean>()

  const onDeleteCache = async () => {
    setLoading(true)

    try {
      await API.shared.repositoryCacheDelete({
        artifactID: id,
        repositoryName,
      })

      onSuccess()
    } catch (err) {
      onFailure(name)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Delete Cache
      </Text>
      <Text gutterBottom variant="description">
        You are about to perform a destructive action.
        <br />
        <strong>Bad things will happen if you don’t read this message!</strong>
      </Text>
      <Text gutterBottom variant="description">
        By continuing, the following cache artifact will be deleted permanently:
      </Text>
      <Text gutterBottom variant="description">
        <strong>{name}</strong>
      </Text>
      <Text gutterBottom variant="description">
        Do you wish to continue?
      </Text>

      <div className={styles.buttons}>
        <Button
          disabled={loading}
          onClick={() => {
            onDeleteCache()
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

export default DeleteCache
