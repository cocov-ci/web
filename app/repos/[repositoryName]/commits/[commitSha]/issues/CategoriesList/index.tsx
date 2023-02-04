'use client'

import useFetch from 'hooks/useFetch'
import { CommitsCategoriesResponseProps } from 'types/Commits'

import Sidebar from '../Sidebar'

interface CommitsCategoriesFetchResponse {
  data: CommitsCategoriesResponseProps
  loading: boolean
}

const CategoriesList = ({
  commitSha,
  repositoryName,
}: {
  commitSha: string
  repositoryName: string
}) => {
  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/categories`,
    handler: [],
  }) as CommitsCategoriesFetchResponse

  return <Sidebar allItemsText="All categories" data={data} loading={loading} />
}

export default CategoriesList
