'use client'

import Alert from 'app/common/Alert'

import styles from './LoadingRepositories.module.scss'

const LoadingRepositories = () => {
  return (
    <Alert
      className={styles.alert}
      description="Wait a moment while Cocov loads the repository list from GitHub. This shouldn’t take long."
      loading
      title="Loading Repositories…"
    />
  )
}

export default LoadingRepositories
