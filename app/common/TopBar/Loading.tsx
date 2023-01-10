import Loading from '../Loading'

import styles from './TopBar.module.scss'

const LoadingToolbar = () => {
  return (
    <div className={styles.topBar}>
      <Loading
        alignment="left"
        count={1}
        height="65px"
        type="skeleton"
        width="300px"
      />
      <Loading
        alignment="right"
        count={1}
        height="50px"
        type="skeleton"
        width="400px"
      />
    </div>
  )
}

export default LoadingToolbar
