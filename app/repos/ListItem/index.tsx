'use client'

import useSWR from 'swr'

import ListItem from 'app/common/ListItem'
import { RepositoryResponseProps } from 'types/Repositories'
import { StatsResponseProps } from 'types/Stats'

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
  const { data } = useSWR<StatsResponseProps>(
    `/api/repositories/${name}/graphs`,
  )

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
