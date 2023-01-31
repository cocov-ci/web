import { redirect } from 'next/navigation'

import TopBar from 'app/repos/[repositoryName]/TopBar'
import { RepositoryResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

interface LayoutProps {
  params: { repositoryName: string; branchName: string }
  children: React.ReactNode
}

const Layout = async ({
  params: { repositoryName },
  children,
}: LayoutProps) => {
  const dataRepository: RepositoryResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  if (!dataRepository) redirect('/')

  return (
    <div>
      <TopBar {...dataRepository} />
      {children}
    </div>
  )
}

export default Layout
