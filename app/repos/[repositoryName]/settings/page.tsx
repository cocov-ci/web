'use client'

import FixedContent from 'app/common/FixedContent'
import useFetch from 'hooks/useFetch'
import { SettingsResponseProps } from 'types/Settings'

import styles from './Page.module.scss'
import Permissions from './Permissions'
import Sidebar from './Sidebar'
interface SettingsParams {
  params: { repositoryName: string; commitSha: string }
}

interface SettingsFetchResponse {
  data: SettingsResponseProps
  loading: boolean
}

const Settings = ({ params: { repositoryName } }: SettingsParams) => {
  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/settings`,
    handler: [],
  }) as SettingsFetchResponse

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="General"
            loading={loading}
            repositoryName={repositoryName}
            secretsCount={data?.secrets_count}
          />
        </div>
        <div className={styles.info}>
          <Permissions data={data} loading={loading} />
        </div>
      </div>
    </FixedContent>
  )
}

export default Settings
