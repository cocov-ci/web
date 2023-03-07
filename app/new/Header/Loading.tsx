import Loading from 'app/common/Loading'

import styles from './Header.module.scss'

const LoadingComponent = () => {
  return (
    <div className={styles.header}>
      <Loading
        className={styles.description}
        height="60px"
        type="skeleton"
        width="100%"
      />
      <Loading
        alignment="right"
        className={styles.searchField}
        height="40px"
        type="skeleton"
        width="200px"
      />
    </div>
  )
}

export default LoadingComponent
