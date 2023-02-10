import Loading from 'app/common/Loading'

import styles from './Header.module.scss'

const LoadingHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.data}>
        <div className={styles.file}>
          <Loading
            alignment="left"
            height="18px"
            type="skeleton"
            width="130px"
          />
          <Loading
            alignment="left"
            height="28px"
            type="skeleton"
            width="200px"
          />
        </div>
        <div className={styles.stats}>
          <div className={styles.progressBar}>
            <Loading
              alignment="left"
              height="18px"
              type="skeleton"
              width="280px"
            />
          </div>
          <Loading
            alignment="left"
            height="18px"
            type="skeleton"
            width="350px"
          />
        </div>
      </div>
      <div className={styles.close}>
        <Loading height="25px" type="skeleton" width="30px" />
        <Loading height="25px" type="skeleton" width="30px" />
      </div>
    </div>
  )
}

export default LoadingHeader
