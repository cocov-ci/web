'use client'

import useSWR from 'swr'

import TopBar from 'app/common/TopBar'
import { RepositoryResponseProps } from 'types/Repositories'

const Repositories = ({
  params,
}: {
  params: { repositoryName: string; branchName: string }
}) => {
  const { data } = useSWR<RepositoryResponseProps>(
    `/api/repositories/${params.repositoryName}`,
  )

  return (
    <div>
      <TopBar description={data?.description} title={params.repositoryName} />
    </div>
  )
}

export default Repositories
