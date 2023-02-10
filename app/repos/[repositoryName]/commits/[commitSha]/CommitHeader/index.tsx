'use client'

import CommitHeader from 'app/common/CommitHeader'
import { HeadProps } from 'types/Commits'

import styles from './CommitHeader.module.scss'

const CommitHeaderComponent = ({
  head,
  repositoryName,
  loading,
}: {
  head?: HeadProps
  repositoryName?: string
  loading?: boolean
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
      className={styles.commitHeader}
      loading={loading}
      {...commitHeader}
    />
  )
}

export default CommitHeaderComponent
