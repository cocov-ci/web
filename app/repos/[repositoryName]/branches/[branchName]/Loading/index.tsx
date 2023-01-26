import Loading from 'app/common/Loading'
import LoadingTopBar from 'app/common/TopBar/Loading'

import styles from './Loading.module.scss'

const LoadingComponent = ({ height }: { height: string }) => (
  <Loading
    className={styles.marginBottom}
    height={height}
    type="skeleton"
    width="100%"
  />
)

const LoadingPage = () => {
  return (
    <>
      <LoadingTopBar />
      <LoadingComponent height="62px" />
      <LoadingComponent height="56px" />
      <LoadingComponent height="143px" />

      <div className={styles.columns}>
        <div className={styles.column}>
          <LoadingComponent height="249px" />
        </div>
        <div className={styles.column}>
          <LoadingComponent height="249px" />
        </div>
      </div>

      <LoadingComponent height="165px" />
    </>
  )
}

export default LoadingPage
