'use client'

import { Album } from 'lucide-react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'

import styles from './RepositoryItem.module.scss'

const RepositoryItem = ({ status }: { status: string }) => {
  return (
    <div className={styles.item}>
      <Album className={styles.icon} size={27} />
      <div className={styles.data}>
        <Text className={styles.name} variant="title">
          jps
        </Text>
        <Text>Josie Platform Server</Text>
        <Text className={styles.timestamp}>
          Created 1 year ago • Last updated 3 minutes ago
        </Text>
      </div>
      {status === 'new' && <Button style="secondary">Add to Cocov</Button>}
      {status === 'alreadyExists' && (
        <Text className={styles.alreadyAddedStatus}>Already added</Text>
      )}
      {status === 'adding' && (
        <Button disabled style="secondary">
          Adding
        </Button>
      )}
    </div>
  )
}

export default RepositoryItem
