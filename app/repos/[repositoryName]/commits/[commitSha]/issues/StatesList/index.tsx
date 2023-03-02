'use client'

import { useSearchParams } from 'next/navigation'

import { Item } from 'app/common/Sidebar'
import useFetch from 'hooks/useFetch'
import { CommitsSourcesResponseProps } from 'types/Commits'

import Sidebar from '../Sidebar'

import styles from './StatesList.module.scss'

interface CommitsStatesFetchResponse {
  data: CommitsSourcesResponseProps
  loading: boolean
}

const StatesList = ({
  commitSha,
  repositoryName,
  onItemChanged,
}: {
  commitSha: string
  repositoryName: string
  onItemChanged: (arg: Item) => void
}) => {
  const searchParams = useSearchParams()
  const state = searchParams.get('state')

  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/states`,
    handler: [],
  }) as CommitsStatesFetchResponse

  return (
    <Sidebar
      allItemsText="All issues"
      className={styles.sidebar}
      data={data}
      defaultSelectedItem={state || 'active'}
      loading={loading}
      onSelectItem={item => onItemChanged(item)}
    />
  )
}

export default StatesList
