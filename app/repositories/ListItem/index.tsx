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
}: Pick<
  RepositoryResponseProps,
  'description' | 'issues' | 'coverage' | 'name'
>) => {
  const { data } = useSWR<StatsResponseProps>(
    `/api/repositories/${name}/graphs`,
  )

  return (
    <div>
      <ListItem
        description={description}
        href={`/repositories/${name}`}
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
