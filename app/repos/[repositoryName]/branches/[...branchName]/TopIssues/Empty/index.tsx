import { PartyPopper } from 'lucide-react'

import Alert from 'app/common/Alert'

import styles from './Empty.module.scss'

const Empty = () => {
  return (
    <div className={styles.empty}>
      <Alert
        className={styles.alert}
        description="Configured checks didn't find issues on this repository's default branch! Good job!"
        icon={PartyPopper}
        title="Yay! No Issues!"
      />
    </div>
  )
}

export default Empty
