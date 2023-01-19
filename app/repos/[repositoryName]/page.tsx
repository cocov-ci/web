import { redirect } from 'next/navigation'

import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

const Page = async ({ params }: { params: { repositoryName: string } }) => {
  const data: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${params.repositoryName}`,
  )

  if (data) {
    redirect(`/repos/${params.repositoryName}/branches/${data.default_branch}`)
  }

  return <div>...</div>
}

export default Page
