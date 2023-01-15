import classNames from 'classnames'

import Box from 'app/common/Box'
import styles from 'app/common/ListItem/ListItem.module.scss'
import Loading from 'app/common/Loading'
import randomBetween from 'utils/randomBetween'

const LoadingListItem = () => {
  return (
    <Box className={classNames(styles.listItem, styles.loading)}>
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

export default LoadingListItem
