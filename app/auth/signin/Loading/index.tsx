import { RefreshCw } from 'lucide-react'

import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <RefreshCw className={styles.spinner} />
    </div>
  )
}

export default Loading
