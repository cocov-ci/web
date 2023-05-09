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

const SectionHeader = (params: SectionHeaderParams) => (
  <div className={styles.headerWrapper}>
    <CommitHeader head={params.commit} repositoryName={params.repositoryName} />
    <NavMenu
      active={params.activeItem}
      commitSha={params.commitSha}
      counter={params.counter}
      loading={params.loading}
      repositoryName={params.repositoryName}
    />
  </div>
)

export default SectionHeader
