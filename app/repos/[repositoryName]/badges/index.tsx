import { redirect } from 'next/navigation'

import Button from 'app/common/Button'
import PillNav from 'app/common/PillNav'
import TopBar from 'app/common/TopBar'
import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

interface BadgeParams {
  params: { repositoryName: string }
}

const Branch = async ({ params: { repositoryName } }: BadgeParams) => {
  const dataRepository: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  if (!dataRepository) redirect('/')

  return (
    <div>
      <TopBar description={dataRepository?.description} title={repositoryName}>
        <PillNav>
          <Button style="secondary">Summary</Button>
          <Button style="inactive">Badges</Button>
          <Button style="inactive">Settings</Button>
        </PillNav>
      </TopBar>
    </div>
  )
}

export default Branch
