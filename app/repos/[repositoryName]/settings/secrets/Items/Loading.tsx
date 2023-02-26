'use client'

import Loading from 'app/common/Loading'

import styles from './Items.module.scss'

const LoadingPage = () => {
  return (
    <>
      <div className={styles.item}>
        <div className={styles.group}>
          <Loading
            alignment="left"
            className={styles.title}
            height="30px"
            type="skeleton"
            width="170px"
          />
          <Loading
            alignment="right"
            height="40px"
            type="skeleton"
            width="105px"
          />
        </div>
        <div>
          <Loading height="100px" type="skeleton" width="100%" />
        </div>
      </div>
      <div className={styles.item}>
        <Loading
          alignment="left"
          className={styles.title}
          height="30px"
          type="skeleton"
          width="170px"
        />

        <div>
          <Loading height="100px" type="skeleton" width="100%" />
        </div>
      </div>
    </>
  )
}

export default LoadingPage
