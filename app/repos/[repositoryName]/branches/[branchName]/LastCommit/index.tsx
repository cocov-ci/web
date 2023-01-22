import Box from 'app/common/Box'
import CommitHeader from 'app/common/CommitHeader'
import Text from 'app/common/Text'

import styles from './LastCommit.module.scss'

const commitHeader = {
  headURL: 'https://github.com/cocov-ci/web',
  avatarURL: 'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
  headSHA: '62bad0cbadbeefc0c0f',
  commitMessage: 'fix(rollout-restart): Ensure to keep watching rollout status',
  username: 'cocov-ci',
  timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
}

const LastCommit = () => (
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

export default LastCommit
