'use client'

import ListItem from 'app/common/ListItem'
import { RepositoryProps } from 'types/Repositories'
import API, { useAPI } from 'utils/api'

type ListItemProps = Pick<
  RepositoryProps,
  'description' | 'issues' | 'coverage' | 'name'
> & { default_branch?: string }

const RepositoryListItem = ({
  description,
  issues,
  coverage,
  name,
  default_branch,
}: ListItemProps) => {
  const { result } = useAPI(API.shared.repositoryGraphs, {
    repositoryName: name,
  })

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
          issues: { value: issues, data: result?.issues },
          coverage: { value: coverage, data: result?.coverage },
        }}
        title={name}
      />
    </div>
  )
}

export default RepositoryListItem
