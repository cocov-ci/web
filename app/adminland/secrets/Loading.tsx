'use client'

import Loading from 'app/common/Loading'

import styles from './Item/Item.module.scss'

const LoadingItem = () => {
  return (
    <div className={styles.base}>
      <div className={styles.iconWrapper}>
        <Loading alignment="left" height="17px" type="skeleton" width="17px" />
      </div>
      <div className={styles.infoWrapper}>
        <div>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="100px"
          />
        </div>
        <div>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="300px"
          />
        </div>
        <div>
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="150px"
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
    {new Array(6).fill(0).map(item => (
      <LoadingItem key={item} />
    ))}
  </div>
)

export default LoadingItems
