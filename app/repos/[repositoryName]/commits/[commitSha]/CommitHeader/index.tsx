import classNames from 'classnames'

import CommitHeader from 'app/common/CommitHeader'
import { HeadProps } from 'types/Commits'

import styles from './CommitHeader.module.scss'

const CommitHeaderComponent = ({
  head,
  repositoryName,
  loading,
  className,
}: {
  head?: HeadProps
  repositoryName?: string
  loading?: boolean
  className?: string
}) => {
  const commitHeader = head &&
    repositoryName && {
      headURL: `https://github.com/${head.org_name}/${repositoryName}/commit/${head.sha}`,
      avatarURL: head.user?.avatar,
      headSHA: head.sha,
      commitMessage: head.message,
      username: head.user?.name || head.author_name,
      isRegisteredUser: Boolean(head.user?.name),
      timestamp: new Date(Date.parse(head.created_at)),
    }

  return (
    <CommitHeader
      className={classNames(styles.commitHeader, className)}
      loading={loading}
      {...commitHeader}
    />
  )
}

export default CommitHeaderComponent
