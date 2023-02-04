'use client'

// import CodeBlock from 'app/common/CodeBlock'
// import Loading from 'app/common/Loading'
import Text from 'app/common/Text'
import { IssueProps } from 'types/Commits'

import styles from './List.module.scss'

const ListItem = (issue: IssueProps) => {
  return (
    <div className={styles.listItem}>
      <Text variant="description">
        <strong>{issue.check_source}</strong> reported under{' '}
        <strong>{issue.kind}</strong>
      </Text>
      <Text className={styles.message}>
        <strong>{issue.message}</strong>
      </Text>
    </div>
  )
}

const List = ({ issues }: { issues: IssueProps[] }) => {
  return (
    <div className={styles.list}>
      {issues && issues.map(issue => <ListItem {...issue} key={issue.id} />)}
    </div>
  )
}

export default List
