'use client'

import useSWR from 'swr'

import ListItem from 'app/common/ListItem'
import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchClient'

const RepositoryListItem = ({
  description,
  issues,
  coverage,
  name,
}: RepositoryResponseProps) => {
  const { data } = useSWR(`/api/repositories/${name}/graphs`, fetcher)

  return (
    <div>
      <ListItem
        description={description}
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
