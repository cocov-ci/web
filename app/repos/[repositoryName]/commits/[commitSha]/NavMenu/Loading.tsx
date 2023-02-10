import Loading from 'app/common/Loading'

import styles from './NavMenu.module.scss'

const LoadingNavMenu = () => {
  return (
    <Loading
      className={styles.loading}
      height="50px"
      type="skeleton"
      width="216px"
    />
  )
}

export default LoadingNavMenu
