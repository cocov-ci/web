import Box from 'app/common/Box'
import Histogram from 'app/common/Histogram'
import Text from 'app/common/Text'

import styles from './TopIssues.module.scss'

const values = ['Seventy', 'Eighty', 'Ninety', 'A Hundred']
  .map((i, idx) => ({
    value: idx * 10,
    label: i,
    href: '/',
  }))
  .reverse()

const TopIssues = () => (
  <Box
    backgroundTextLarge="Top Issues by"
    className={styles.lastCommit}
    gutterBottom
  >
    <Text className={styles.title} variant="title">
      Top Issues by Kind
    </Text>
    <Histogram className={styles.histogram} values={values} />
  </Box>
)

export default TopIssues
