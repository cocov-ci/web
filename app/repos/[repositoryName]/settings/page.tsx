'use client'

import { useEffect } from 'react'

import FixedContent from 'app/common/FixedContent'
import { useErrorBanner } from 'hooks/useBanner'
import API, { useAPI } from 'utils/api'

import styles from './Page.module.scss'
import Permissions from './Permissions'
import Sidebar from './Sidebar'
interface SettingsParams {
  params: { repositoryName: string; commitSha: string }
}

const Settings = ({ params: { repositoryName } }: SettingsParams) => {
  const { showBanner } = useErrorBanner()
  const { result, error, loading } = useAPI(API.shared.repositorySettings, {
    repositoryName,
  })

  useEffect(() => {
    if (error) {
      showBanner({
        children: `Failed requesting the repository settings data. Please try again.`,
        autoClose: false,
      })
    }
  }, [error])

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="General"
            repositoryName={repositoryName}
          />
        </div>
        <div className={styles.info}>
          <Permissions data={result} loading={loading} />
        </div>
      </div>
    </FixedContent>
  )
}

export default Settings
