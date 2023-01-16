'use client'

import useSWR from 'swr'

import ListItem from 'app/common/ListItem'
import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchClient'

const Repository = ({
  description,
  issues,
  coverage,
  name,
}: RepositoryResponseProps) => {
  const { data: dataCoverage } = useSWR(
    `/api/repositories/${name}/graph/coverage`,
    fetcher,
  )

  const { data: dataIssues } = useSWR(
    `/api/repositories/${name}/graph/issues`,
    fetcher,
  )

  return (
    <div>
      <ListItem
        description={description}
        stats={{
          issues: { value: issues, data: dataIssues },
          coverage: { value: coverage, data: dataCoverage },
        }}
        title={name}
      />
    </div>
  )
}

export default Repository
