import Text from 'app/common/Text'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import { HeadProps } from 'types/Commits'

import styles from './Header.module.scss'

export interface HeaderProps {
  repositoryName: string
  commit: HeadProps
  loading: boolean
}

const Header = ({ commit, repositoryName, loading }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <Text variant="title">
        <strong>Running Checks</strong>
      </Text>
      <Text gutterBottom variant="description">
        The list below shows which checks are being executed against the
        following commit:
      </Text>
      <CommitHeader
        className={styles.commitHeader}
        head={commit}
        loading={loading}
        repositoryName={repositoryName}
      />
    </div>
  )
}

export default Header
