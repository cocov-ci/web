import { BoxSelect } from 'lucide-react'
import { redirect } from 'next/navigation'

import Alert from 'app/common/Alert'
import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

interface PageProps {
  params: { repositoryName: string }
}

const Page = async ({ params: { repositoryName } }: PageProps) => {
  const data: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  if (data && data.default_branch) {
    redirect(`/repos/${repositoryName}/branches/${data.default_branch}`)
  }

  return (
    <div>
      <Alert
        description="This repository doesn't have a branch yet, or, if it has been recently added, its default branch is being processed. Try refreshing this page in a few seconds."
        icon={BoxSelect}
        title="Hmm. It's empty here…"
      />
    </div>
  )
}

export default Page
