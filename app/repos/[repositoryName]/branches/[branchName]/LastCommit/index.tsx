import Box from 'app/common/Box'
import CommitHeader from 'app/common/CommitHeader'
import Text from 'app/common/Text'
import { HeadProps } from 'types/Branches'

import styles from './LastCommit.module.scss'

const LastCommit = ({
  head,
  repositoryName,
}: {
  head: HeadProps
  repositoryName: string
}) => {
  const commitHeader = {
    headURL: `https://github.com/${head.org_name}/${repositoryName}/commit/${head.sha}`,
    avatarURL: head.user?.avatar,
    headSHA: head.sha,
    commitMessage: head.message,
    username: head.user?.name || head.author_name,
    isRegisteredUser: Boolean(head.user?.name),
    timestamp: new Date(Date.parse(head.created_at)),
  }

  return (
    <Box
      backgroundTextLarge="Last Commit"
      className={styles.lastCommit}
      gutterBottom
    >
      <Text className={styles.title} variant="title">
        Last commit
      </Text>
      <CommitHeader className={styles.commitHeader} {...commitHeader} />
    </Box>
  )
}

export default LastCommit
