import { redirect } from 'next/navigation'

import TopBar from 'app/repos/[repositoryName]/TopBar'
import { RepositoryProps } from 'types/Repositories'
import fetcher from 'utils/fetchServer'

import styles from './Layout.module.scss'

interface LayoutProps {
  params: { repositoryName: string; branchName: string }
  children: React.ReactNode
}

const Layout = async ({
  params: { repositoryName },
  children,
}: LayoutProps) => {
  const dataRepository: RepositoryProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  if (!dataRepository || dataRepository?.code == 404) redirect('/')

  return (
    <div className={styles.layout}>
      <TopBar {...dataRepository} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Layout
