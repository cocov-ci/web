'use client'

import classNames from 'classnames'

import CodeBlock from 'app/common/CodeBlock'
import Text from 'app/common/Text'
import { IssueProps } from 'types/Commits'
import { inconsolata } from 'utils/fonts'

import styles from './List.module.scss'
import Loading from './Loading'

export const ListItem = (issue: IssueProps) => {
  return (
    <div className={styles.listItem}>
      <Text variant="description">
        <strong>{issue.check_source}</strong> reported under{' '}
        <strong>{issue.kind}</strong>
      </Text>
      <Text className={styles.message}>
        <strong>{issue.message}</strong>
      </Text>
      <div className={styles.fileRow}>
        <Text
          className={classNames(styles.file, inconsolata.className)}
          variant="description"
        >
          {issue.file}
        </Text>
        <Text className={styles.line} variant="description">
          line {issue.line_start}
        </Text>
      </div>
      <CodeBlock issue={issue.affected_file.content} />
    </div>
  )
}

const List = ({
  issues,
  loading,
}: {
  issues: IssueProps[]
  loading: boolean
}) => {
  return (
    <div className={styles.list}>
      {loading &&
        Array.from(Array(4).keys()).map(item => <Loading key={item} />)}
      {!loading && issues.map(issue => <ListItem {...issue} key={issue.id} />)}
    </div>
  )
}

export default List
