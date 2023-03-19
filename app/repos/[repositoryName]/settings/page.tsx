'use client'

import FixedContent from 'app/common/FixedContent'
import useFetch from 'hooks/useFetch'
import { SettingsResponseProps } from 'types/Settings'

import API, { useAPI } from '../../../../utils/api'

import styles from './Page.module.scss'
import Permissions from './Permissions'
import Sidebar from './Sidebar'
interface SettingsParams {
  params: { repositoryName: string; commitSha: string }
}

const Settings = ({ params: { repositoryName } }: SettingsParams) => {
  const { result, error, loading } = useAPI(API.shared.repositorySettings, {
    repositoryName,
  })

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="General"
            loading={loading}
            repositoryName={repositoryName}
            secretsCount={result?.secrets_count ?? 0}
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
