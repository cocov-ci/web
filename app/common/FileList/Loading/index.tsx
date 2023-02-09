'use client'

import classNames from 'classnames'
import React from 'react'

import Loading from 'app/common/Loading'

import styles from '../FileList.module.scss'

export type CommitHeaderProps = {
  className?: string
}

const LoadingComponent = ({ className }: CommitHeaderProps) => {
  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.header}>
        <div className={styles.file}>
          <Loading
            alignment="left"
            height="24px"
            type="skeleton"
            width="100px"
          />
        </div>
        <div className={styles.coverage}>
          <Loading
            alignment="left"
            height="24px"
            type="skeleton"
            width="100px"
          />
        </div>
      </div>

      <div className={styles.fileList}>
        {Array.from(Array(11).keys()).map(item => (
          <div key={item}>
            <div className={styles.fileItem}>
              <Loading height="28px" type="skeleton" width="100%" />
            </div>
            <div className={styles.fileItem} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingComponent
