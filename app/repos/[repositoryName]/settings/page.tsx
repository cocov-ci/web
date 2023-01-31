import { redirect } from 'next/navigation'

import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

interface SettingsProps {
  params: { repositoryName: string }
}

const Settings = async ({ params: { repositoryName } }: SettingsProps) => {
  const dataRepository: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  if (!dataRepository) redirect('/')

  return <div />
}

export default Settings
