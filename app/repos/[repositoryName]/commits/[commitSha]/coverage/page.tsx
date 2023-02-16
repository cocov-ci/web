import { redirect } from 'next/navigation'

import { CoverageResponseProps } from 'types/Coverage'
import fetcher from 'utils/fetchServer'

import PageContent from './Content'

interface CoverageParams {
  params: { repositoryName: string; commitSha: string; fileId: string }
}

const Coverage = async ({
  params: { repositoryName, commitSha },
}: CoverageParams) => {
  const data: CoverageResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/commits/${commitSha}/coverage`,
  )

  if (!data || data?.code === 404) redirect(`/repos/${repositoryName}`)

  return (
    <PageContent
      commitSha={commitSha}
      data={data}
      repositoryName={repositoryName}
    />
  )
}

export default Coverage
