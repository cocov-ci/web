import Loading from 'app/common/Loading'

import styles from '../Content.module.scss'

const LoadingContent = () => {
  return (
    <div className={styles.content}>
      <Loading height="400px" type="skeleton" width="100%" />
    </div>
  )
}

export default LoadingContent
