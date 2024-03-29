'use client'

import Loading from 'app/common/Loading'

import styles from './Item/Item.module.scss'

const LoadingItem = () => {
  return (
    <div className={styles.base}>
      <div className={styles.iconWrapper}>
        <Loading alignment="left" height="25px" type="skeleton" width="25px" />
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.name}>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="50px"
          />
        </div>
        <div className={styles.description}>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="100px"
          />
        </div>
        <div className={styles.createdAt}>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="130px"
          />
        </div>
        <div className={styles.accessibleBy}>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="140px"
          />
        </div>
        <div className={styles.usageData}>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="300px"
          />
        </div>
      </div>
      <div className={styles.ButtonWrapper}>
        <Loading alignment="left" height="35px" type="skeleton" width="35px" />
      </div>
    </div>
  )
}

const LoadingItems = () => (
  <div>
    {new Array(6).fill(0).map(() => (
      <LoadingItem key={Math.floor(Math.random() * 100) + 1} />
    ))}
  </div>
)

export default LoadingItems
