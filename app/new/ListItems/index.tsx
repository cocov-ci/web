'use client'

import { Album } from 'lucide-react'
import { useState } from 'react'

import Button from 'app/common/Button'
import RelativeTime from 'app/common/RelativeTime'
import Text from 'app/common/Text'
import Repositories from 'services/repositories'
import { OrgRepositoryProps } from 'types/Repositories'

import styles from './ListItems.module.scss'
import Loading from './Loading'

interface ItemParams {
  item: OrgRepositoryProps
  onAddSuccess: () => void
}

interface ListItemsParams {
  data: OrgRepositoryProps[]
  loading: boolean
  refetch: () => void
}

const Item = ({ item, onAddSuccess }: ItemParams) => {
  const [addingRepository, setAddingRepository] = useState<boolean>(false)

  const onAddRepository = async () => {
    setAddingRepository(true)

    try {
      await Repositories.add(item.name)
    } catch (err) {
      // TODO
    } finally {
      setAddingRepository(false)
      onAddSuccess()
    }
  }

  return (
    <div className={styles.item}>
      <Album className={styles.icon} size={27} />
      <div className={styles.data}>
        <Text className={styles.name} variant="title">
          {item.name}
        </Text>
        <Text>{item.description}</Text>
        <Text className={styles.timestamp}>
          Created <RelativeTime timestamp={new Date(item.created_at)} />
          {item?.pushed_at && (
            <>
              {' '}
              • Last updated{' '}
              <RelativeTime timestamp={new Date(item.pushed_at)} />
            </>
          )}
        </Text>
      </div>
      {!addingRepository && item.status === 'absent' && (
        <Button onClick={() => onAddRepository()} style="secondary">
          Add to Cocov
        </Button>
      )}
      {!addingRepository && item.status === 'present' && (
        <Text className={styles.alreadyAddedStatus}>Already added</Text>
      )}
      {addingRepository && (
        <Button disabled style="secondary">
          Adding
        </Button>
      )}
    </div>
  )
}

const ListItems = ({ data, refetch, loading }: ListItemsParams) => {
  if (loading) return <Loading />

  return (
    <div>
      {data?.map(item => (
        <Item item={item} key={item.name} onAddSuccess={() => refetch()} />
      ))}
    </div>
  )
}

export default ListItems