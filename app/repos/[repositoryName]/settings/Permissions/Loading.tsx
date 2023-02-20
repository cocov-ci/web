import Loading from 'app/common/Loading'
import randomBetween from 'utils/randomBetween'

import styles from './Permissions.module.scss'

const LoadingPermissions = () => {
  return (
    <>
      {Array.from(Array(3).keys()).map(item => (
        <div className={styles.item} key={item}>
          <div className={styles.titleItem}>
            <Loading
              alignment="left"
              count={1}
              height="40px"
              type="skeleton"
              width={`${randomBetween(206, 300)}px`}
            />
          </div>
          <div className={styles.listItem}>
            <Loading
              alignment="left"
              count={6}
              height="20px"
              type="skeleton"
              width="100%"
            />
          </div>

          <Loading
            alignment="left"
            count={1}
            height="40px"
            type="skeleton"
            width="140px"
          />
        </div>
      ))}
    </>
  )
}

export default LoadingPermissions
