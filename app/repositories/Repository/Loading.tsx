import classNames from 'classnames'

import Box from 'app/common/Box'
import Loading from 'app/common/Loading'

import styles from './Repository.module.scss'

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const LoadingRepository = () => {
  return (
    <Box className={classNames(styles.repository, styles.loading)}>
      <div className={styles.info}>
        <Loading
          alignment="left"
          height="30px"
          type="skeleton"
          width={`${randomBetween(35, 465)}px`}
        />
        <Loading
          alignment="left"
          height="19px"
          type="skeleton"
          width={`${randomBetween(35, 200)}px`}
        />
      </div>
      <div className={styles.stats}>
        <Loading
          alignment="left"
          className={styles.skeleton}
          height="116px"
          type="skeleton"
          width="173px"
        />
        <Loading
          alignment="left"
          className={styles.skeleton}
          height="116px"
          type="skeleton"
          width="173px"
        />
      </div>
    </Box>
  )
}

export default LoadingRepository
