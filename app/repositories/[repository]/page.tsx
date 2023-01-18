'use client'

import useSWR from 'swr'

import TopBar from 'app/common/TopBar'
import { RepositoryResponseProps } from 'types/Repositories'

const Repositories = ({ params }: { params: { repository: string } }) => {
  const { data, isLoading } = useSWR<RepositoryResponseProps>(
    `/api/repositories/${params.repository}`,
  )

  return (
    <div>
      <TopBar description={data?.description} title={params.repository} />
    </div>
  )
}

export default Repositories
