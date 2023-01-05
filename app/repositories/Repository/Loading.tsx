import Loading from 'app/common/Loading'

import styles from './Repository.module.scss'

const LoadingRepository = () => {
  return (
    <Loading
      className={styles.repository}
      height="116px"
      type="skeleton"
      width="100%"
    />
  )
}

export default LoadingRepository
