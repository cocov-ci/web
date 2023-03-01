import Box from 'app/common/Box'
import Histogram from 'app/common/Histogram'
import Text from 'app/common/Text'
import { BranchProps } from 'types/Branches'
import fetcher from 'utils/fetchServer'

import Empty from './Empty'
import styles from './TopIssues.module.scss'

interface TopIssuesProps {
  repositoryName: string
  branch: BranchProps
}

type TopIssuesReponseProps = {
  [any: string]: number
}

const TopIssues = async ({ repositoryName, branch }: TopIssuesProps) => {
  const data: TopIssuesReponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/branches/top_issues/${branch.name}`,
  )

  if (!data || data?.code === 404) return null

  const values = Object.keys(data).map(item => ({
    value: data[item],
    label: item,
    href: `/repos/${repositoryName}/commits/${branch.head.sha}/issues?category=${item}`,
  }))

  return (
    <div>
      <Box
        backgroundTextLarge="Top Issues by"
        className={styles.lastCommit}
        gutterBottom
      >
        <Text className={styles.title} variant="title">
          Top Issues by Kind
        </Text>
        {values.length > 0 ? (
          <Histogram className={styles.histogram} values={values} />
        ) : (
          <Empty />
        )}
      </Box>
    </div>
  )
}

export default TopIssues
