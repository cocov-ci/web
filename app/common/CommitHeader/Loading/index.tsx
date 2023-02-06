import classNames from 'classnames'
import React from 'react'

import Loading from 'app/common/Loading'
import randomBetween from 'utils/randomBetween'

import styles from '../CommitHeader.module.scss'

export type CommitHeaderProps = {
  className?: string
}

const LoadingComponent = ({ className }: CommitHeaderProps) => {
  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.avatarWrapper}>
        <Loading
          alignment="left"
          className={styles.skeleton}
          height="25px"
          type="skeleton"
          width="25px"
        />
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.commitMeta}>
          <Loading
            alignment="left"
            height="18px"
            type="skeleton"
            width={`${randomBetween(206, 400)}px`}
          />
        </div>
        <div className={styles.commitTitle}>
          <Loading
            alignment="left"
            height="18px"
            type="skeleton"
            width={`${randomBetween(32, 400)}px`}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingComponent
