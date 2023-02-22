'use client'

import FixedContent from 'app/common/FixedContent'
import useFetch from 'hooks/useFetch'
import { SettingsResponseProps } from 'types/Settings'

import Sidebar from '../Sidebar'

import styles from './Page.module.scss'
interface SettingsParams {
  params: { repositoryName: string; commitSha: string }
}

interface SettingsFetchResponse {
  data: SettingsResponseProps
  loading: boolean
}

const Secrets = ({ params: { repositoryName } }: SettingsParams) => {
  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/settings`,
    handler: [],
  }) as SettingsFetchResponse

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="Secrets"
            loading={loading}
            repositoryName={repositoryName}
            secretsCount={data?.secrets_count}
          />
        </div>
        <div className={styles.info} />
      </div>
    </FixedContent>
  )
}

export default Secrets
