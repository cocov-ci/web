'use client'

import { useSearchParams } from 'next/navigation'

import { Item } from 'app/common/Sidebar'
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
  onItemChanged,
}: {
  commitSha: string
  repositoryName: string
  onItemChanged: (arg: Item) => void
}) => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/categories`,
    handler: [],
  }) as CommitsCategoriesFetchResponse

  return (
    <Sidebar
      allItemsText="All categories"
      data={data}
      defaultSelectedItem={category}
      loading={loading}
      onSelectItem={item => onItemChanged(item)}
    />
  )
}

export default CategoriesList
