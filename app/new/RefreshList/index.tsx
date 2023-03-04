'use client'

import { Clock } from 'lucide-react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'

import styles from './RefreshList.module.scss'

const RefreshList = () => {
  return (
    <div className={styles.refreshList}>
      <Clock size={19} />
      <Text className={styles.description}>
        This list was last updated 1 minute ago. You can refresh it in case you
        feel like something is missing.
      </Text>
      <Button style="mini">Refresh now</Button>
    </div>
  )
}

export default RefreshList
