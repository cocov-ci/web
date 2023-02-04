'use client'

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
}: {
  commitSha: string
  repositoryName: string
}) => {
  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/sources`,
    handler: [],
  }) as CommitsSourcesFetchResponse

  return <Sidebar allItemsText="All sources" data={data} loading={loading} />
}

export default SourcesList
