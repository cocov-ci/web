import { redirect } from 'next/navigation'

import Button from 'app/common/Button'
import PillNav from 'app/common/PillNav'
import SummarySelector from 'app/common/SummarySelector'
import TopBar from 'app/common/TopBar'
import { BranchResponseProps } from 'types/Branches'
import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

import Charts from './Charts'
import Empty from './Empty'
import LastCommit from './LastCommit'
import StatusDisplay from './StatusDisplay'
import TopIssues from './TopIssues'

interface BranchParams {
  params: { repositoryName: string; branchName: string | string[] }
}

const Branch = async ({
  params: { repositoryName, branchName },
}: BranchParams) => {
  const branch = Array.isArray(branchName) ? branchName.join('/') : branchName

  const dataRepository: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )
  const dataBranch: BranchResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/branches/${branch}`,
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
      {!dataRepository.default_branch ? (
        <Empty />
      ) : (
        <>
          <SummarySelector
            branchName={dataBranch.name}
            branchesList={[]}
            gutterBottom
          />
          <StatusDisplay
            data={dataBranch.head}
            repositoryName={repositoryName}
          />
          <LastCommit head={dataBranch.head} repositoryName={repositoryName} />
          {/* @ts-expect-error Server Component */}
          <Charts
            branchName={dataBranch.name}
            repositoryName={repositoryName}
          />
          {/* @ts-expect-error Server Component */}
          <TopIssues
            branchName={dataBranch.name}
            repositoryName={repositoryName}
          />
        </>
      )}
    </div>
  )
}

export default Branch
