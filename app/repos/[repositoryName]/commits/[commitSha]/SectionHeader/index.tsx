import { HeadProps, NavMenuProps } from 'types/Commits'

import CommitHeader from '../CommitHeader'
import styles from '../coverage/Content/Content.module.scss'
import NavMenu from '../NavMenu'

interface SectionHeaderParams {
  repositoryName: string
  commitSha: string
  commit?: HeadProps
  activeItem: NavMenuProps
  counter?: number
  loading?: boolean
}

const SectionHeader = (params: SectionHeaderParams) => {
  const { commit, activeItem, commitSha, counter, loading, repositoryName } =
    params

  return (
    <div className={styles.headerWrapper}>
      <CommitHeader
        head={commit}
        loading={loading}
        repositoryName={repositoryName}
      />
      <NavMenu
        active={activeItem}
        commitSha={commitSha}
        counter={counter}
        loading={loading}
        repositoryName={repositoryName}
      />
    </div>
  )
}

export default SectionHeader
