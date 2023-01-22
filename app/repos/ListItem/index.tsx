'use client'

import ListItem from 'app/common/ListItem'
import useFetch from 'hooks/useFetch'
import { RepositoryResponseProps } from 'types/Repositories'
import { StatsResponseProps } from 'types/Stats'
interface GraphsFetchResponse {
  data: StatsResponseProps
}

const RepositoryListItem = ({
  description,
  issues,
  coverage,
  name,
  default_branch,
}: Pick<
  RepositoryResponseProps,
  'description' | 'issues' | 'coverage' | 'name' | 'default_branch'
>) => {
  const { data } = useFetch({
    url: `/api/repositories/${name}/graphs`,
    handler: [name],
  }) as GraphsFetchResponse

  return (
    <div>
      <ListItem
        description={description}
        href={`/repos/${name}/branches/${default_branch}`}
        stats={{
          issues: { value: issues, data: data?.issues },
          coverage: { value: coverage, data: data?.coverage },
        }}
        title={name}
      />
    </div>
  )
}

export default RepositoryListItem
