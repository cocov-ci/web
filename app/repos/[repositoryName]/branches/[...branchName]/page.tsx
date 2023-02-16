import { redirect } from 'next/navigation'

import SummarySelector from 'app/common/SummarySelector'
import { BranchResponseProps } from 'types/Branches'
import { RepositoryProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

import Charts from './Charts'
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

  const dataRepository: RepositoryProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  const dataBranch: BranchResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/branches/${branch}`,
  )

  if (!dataRepository || dataRepository?.code === 404) redirect('/')

  if (!dataBranch || dataBranch?.code === 404)
    redirect(`/repos/${repositoryName}`)

  return (
    <div>
      <SummarySelector
        branchName={dataBranch.name}
        branchesList={[]}
        gutterBottom
      />
      <StatusDisplay data={dataBranch.head} repositoryName={repositoryName} />
      <LastCommit head={dataBranch.head} repositoryName={repositoryName} />
      {/* @ts-expect-error Server Component */}
      <Charts branchName={dataBranch.name} repositoryName={repositoryName} />
      {/* @ts-expect-error Server Component */}
      <TopIssues branchName={dataBranch.name} repositoryName={repositoryName} />
    </div>
  )
}

export default Branch
