import Button from 'app/common/Button'
import PillNav from 'app/common/PillNav'
import SummarySelector from 'app/common/SummarySelector'
import TopBar from 'app/common/TopBar'
import { BranchResponseProps } from 'types/Branches'
import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

import Charts from './Charts'
import LastCommit from './LastCommit'
import StatusDisplay from './StatusDisplay'
import TopIssues from './TopIssues'

interface BranchParams {
  params: { repositoryName: string; branchName: string }
}

const Branch = async ({
  params: { repositoryName, branchName },
}: BranchParams) => {
  const dataRepository: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )
  const dataBranch: BranchResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/branches/${branchName}`,
  )

  if (!dataRepository) return null

  return (
    <div>
      <TopBar description={dataRepository?.description} title={repositoryName}>
        <PillNav>
          <Button style="secondary">Summary</Button>
          <Button style="inactive">Badges</Button>
          <Button style="inactive">Settings</Button>
        </PillNav>
      </TopBar>
      <SummarySelector branchName={dataBranch.name} gutterBottom />
      <StatusDisplay data={dataBranch.head} repositoryName={repositoryName} />
      <LastCommit />
      <Charts />
      <TopIssues />
    </div>
  )
}

export default Branch
