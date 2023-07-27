import Loading from 'app/common/Loading'

import styles from '../Item/Item.module.scss'

export const LoadingItem = () => {
  return (
    <div className={styles.base}>
      <div className={styles.avatarWrapper}>
        <Loading alignment="left" height="25px" type="skeleton" width="25px" />
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.loginContainer}>
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
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="127px"
          />
          <Loading
            alignment="left"
            height="15px"
            type="skeleton"
            width="155px"
          />
        </div>
      </div>
      <div className={styles.ButtonWrapper}>
        <Loading alignment="left" height="35px" type="skeleton" width="35px" />
      </div>
    </div>
  )
}
