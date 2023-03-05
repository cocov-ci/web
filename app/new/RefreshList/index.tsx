'use client'

import { Clock } from 'lucide-react'

import Button from 'app/common/Button'
import RelativeTime from 'app/common/RelativeTime'
import Text from 'app/common/Text'

import styles from './RefreshList.module.scss'

interface RefreshListParams {
  data: string
  onRefresh: () => void
  loading: boolean
}

const RefreshList = ({ data, onRefresh, loading }: RefreshListParams) => {
  return (
    <div className={styles.refreshList}>
      <Clock size={19} />
      <Text className={styles.description}>
        This list was last updated <RelativeTime timestamp={new Date(data)} />.
        You can refresh it in case you feel like something is missing.
      </Text>
      <Button disabled={loading} onClick={() => onRefresh()} style="mini">
        Refresh now
      </Button>
    </div>
  )
}

export default RefreshList
