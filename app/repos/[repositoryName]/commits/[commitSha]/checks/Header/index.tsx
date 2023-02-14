import Text from 'app/common/Text'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import { HeadProps } from 'types/Commits'

import styles from './Header.module.scss'

export interface HeaderProps {
  repositoryName: string
  commit: HeadProps
}

const Header = ({ commit, repositoryName }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <Text variant="title">
        <strong>Running Checks</strong>
      </Text>
      <Text variant="description">
        The list below shows which checks are being executed against the
        following commit:
      </Text>
      {commit && (
        <CommitHeader
          className={styles.commitHeader}
          head={commit}
          repositoryName={repositoryName}
        />
      )}
    </div>
  )
}

export default Header
