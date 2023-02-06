import React from 'react'

import Loading from 'app/common/Loading'
import randomBetween from 'utils/randomBetween'

import styles from '../List.module.scss'

const LoadingComponent = () => {
  return (
    <div className={styles.listItem}>
      <Loading
        alignment="left"
        height="18px"
        type="skeleton"
        width={`${randomBetween(206, 400)}px`}
      />
      <Loading
        alignment="left"
        className={styles.message}
        height="22px"
        type="skeleton"
        width={`${randomBetween(206, 400)}px`}
      />
      <Loading
        alignment="left"
        className={styles.fileRow}
        height="18px"
        type="skeleton"
        width={`${randomBetween(206, 400)}px`}
      />
      <Loading alignment="left" height="150px" type="skeleton" width="100%" />
    </div>
  )
}

export default LoadingComponent
