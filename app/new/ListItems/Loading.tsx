import classNames from 'classnames'

import Loading from 'app/common/Loading'
import randomBetween from 'utils/randomBetween'

import styles from './ListItems.module.scss'

const LoadingComponent = () => {
  return (
    <div>
      {Array.from(Array(7).keys()).map(item => (
        <div className={classNames(styles.item, styles.loading)} key={item}>
          <Loading
            className={styles.icon}
            height="27px"
            type="skeleton"
            width="27px"
          />
          <div className={styles.data}>
            <Loading
              alignment="left"
              height="32px"
              type="skeleton"
              width={`${randomBetween(100, 250)}px`}
            />
            <Loading
              alignment="left"
              height="20px"
              type="skeleton"
              width={`${randomBetween(250, 350)}px`}
            />
            <Loading
              alignment="left"
              className={styles.timestamp}
              height="20px"
              type="skeleton"
              width={`${randomBetween(250, 350)}px`}
            />
          </div>
          <Loading
            className={styles.button}
            height="32px"
            type="skeleton"
            width="150px"
          />
        </div>
      ))}
    </div>
  )
}

export default LoadingComponent
