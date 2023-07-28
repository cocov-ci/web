'use client'

import { useMemo, useState } from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import useSegments from 'hooks/useSegments'
import API from 'utils/api'

import styles from './PurgeCache.module.scss'

interface PurgeCacheParams {
  onSuccess: () => void
  onFailure: () => void
}

const PurgeCache = ({ onSuccess, onFailure }: PurgeCacheParams) => {
  const { closeModal } = useModal()
  const segments = useSegments()
  const repositoryName = useMemo(() => segments[1], [segments])
  const [loading, setLoading] = useState<boolean>()

  const onPurgeCache = async () => {
    setLoading(true)

    try {
      await API.shared.repositoryCachePurge({
        repositoryName,
      })

      onSuccess()
    } catch (err) {
      onFailure()
    } finally {
      closeModal()
      setLoading(false)
    }
  }

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Purge Cache
      </Text>
      <Text gutterBottom variant="description">
        You are about to perform a destructive action.
        <br />
        <strong>Bad things will happen if you don’t read this message!</strong>
      </Text>
      <Text gutterBottom variant="description">
        By continuing, all cache artifacts belonging to this repository will be
        permanently removed. However, plugins will be able to recreate them if
        caching is still enabled on this instance.
      </Text>

      <Text gutterBottom variant="description">
        Are you sure you want to continue?
      </Text>

      <div className={styles.buttons}>
        <Button
          disabled={loading}
          onClick={() => {
            onPurgeCache()
          }}
          style="danger"
        >
          Yes, purge it
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

export default PurgeCache
