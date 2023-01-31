import { redirect } from 'next/navigation'

import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

interface BadgeProps {
  params: { repositoryName: string }
}

const Badges = async ({ params: { repositoryName } }: BadgeProps) => {
  const dataRepository: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  if (!dataRepository) redirect('/')

  return <div />
}

export default Badges
