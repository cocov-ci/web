'use client'

import { useMemo } from 'react'

import FixedContent from 'app/common/FixedContent'
import useFetch from 'hooks/useFetch'
import { RepositoryProps } from 'types/Repositories'
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
interface RepositoriesFetchResponse {
  data: RepositoryProps
  loading: boolean
}

const Settings = ({ params: { repositoryName } }: SettingsParams) => {
  const { data: dataRepository, loading: loadingRepository } = useFetch({
    url: `/api/repositories/${repositoryName}`,
    handler: [],
  }) as RepositoriesFetchResponse

  const { data: dataSettings, loading: loadingSettings } = useFetch({
    url: `/api/repositories/${repositoryName}/settings`,
    handler: [],
  }) as SettingsFetchResponse

  const permissionsData = useMemo(
    () => ({
      ...dataSettings,
      token: dataRepository?.token,
    }),
    [dataRepository, dataSettings],
  )

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            data={[
              {
                id: 0,
                name: 'General',
              },
              {
                id: 1,
                name: 'Secrets',
                counter: 3,
              },
            ]}
            defaultSelectedItem="General"
            loading={loadingRepository || loadingSettings}
          />
        </div>
        <div className={styles.info}>
          <Permissions
            data={permissionsData}
            loading={loadingRepository || loadingSettings}
          />
        </div>
      </div>
    </FixedContent>
  )
}

export default Settings
