'use client'

import { useEffect } from 'react'

import FixedContent from 'app/common/FixedContent'
import { useModal } from 'context/ModalContext'
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

  const { open } = useModal()

  useEffect(() => {
    open(<p>teste...</p>)
  }, [])

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
                counter: data?.secrets_count,
              },
            ]}
            defaultSelectedItem="General"
            loading={loading}
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
