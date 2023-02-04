'use client'

import ListItem from 'app/common/ListItem'
import useFetch from 'hooks/useFetch'
import { RepositoryResponseProps } from 'types/Repositories'
import { StatsResponseProps } from 'types/Stats'
interface GraphsFetchResponse {
  data: StatsResponseProps
}

type ListItemProps = Pick<
  RepositoryResponseProps,
  'description' | 'issues' | 'coverage' | 'name'
> & { default_branch?: string }

const RepositoryListItem = ({
  description,
  issues,
  coverage,
  name,
  default_branch,
}: ListItemProps) => {
  const { data } = useFetch({
    url: `/api/repositories/${name}/graphs`,
    handler: [name],
  }) as GraphsFetchResponse

  return (
    <div>
      <ListItem
        description={description}
        href={
          default_branch
            ? `/repos/${name}/branches/${default_branch}`
            : `/repos/${name}`
        }
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
