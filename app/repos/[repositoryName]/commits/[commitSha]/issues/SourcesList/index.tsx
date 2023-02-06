'use client'

import { useSearchParams } from 'next/navigation'

import { Item } from 'app/common/Sidebar'
import useFetch from 'hooks/useFetch'
import { CommitsSourcesResponseProps } from 'types/Commits'

import Sidebar from '../Sidebar'

interface CommitsSourcesFetchResponse {
  data: CommitsSourcesResponseProps
  loading: boolean
}

const SourcesList = ({
  commitSha,
  repositoryName,
  onItemChanged,
}: {
  commitSha: string
  repositoryName: string
  onItemChanged: (arg: Item) => void
}) => {
  const searchParams = useSearchParams()
  const source = searchParams.get('source')

  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/sources`,
    handler: [],
  }) as CommitsSourcesFetchResponse

  return (
    <Sidebar
      allItemsText="All sources"
      data={data}
      defaultSelectedItem={source}
      loading={loading}
      onSelectItem={item => onItemChanged(item)}
    />
  )
}

export default SourcesList
