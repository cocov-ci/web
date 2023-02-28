'use client'

import classNames from 'classnames'
import { BoxSelect, ChevronsUp, SlashIcon, VolumeX } from 'lucide-react'
import { useState } from 'react'

import Alert from 'app/common/Alert'
import CodeBlock from 'app/common/CodeBlock'
import Text from 'app/common/Text'
import { IssueIgnoreMetadata, IssueProps } from 'types/Issues'
import { inconsolata } from 'utils/fonts'

import Avatar from '../../../../../../common/Avatar'
import RelativeTime from '../../../../../../common/RelativeTime'

import styles from './List.module.scss'
import Loading from './Loading'

interface IgnoreBlockProps {
  meta: IssueIgnoreMetadata
}

export const IgnoreBlock = ({ meta }: IgnoreBlockProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.ignoreWrapper}>
      <div
        className={classNames(styles.ignoreBlock, {
          [styles.open]: open,
          [styles.close]: !open,
        })}
      >
        <a href="javascript:void(0)" onClick={() => setOpen(!open)}>
          <div className={styles.header}>
            {meta.ignore_source == 'rule' ? (
              <SlashIcon size={18} />
            ) : (
              <VolumeX size={18} />
            )}
            <span className={styles.content}>
              Ignored on this{' '}
              {meta.ignore_source == 'rule' ? 'repository' : 'commit'} by{' '}
              {meta.ignored_by.avatar && (
                <Avatar
                  avatarURL={meta.ignored_by.avatar}
                  className={styles.avatar}
                  size="15px"
                />
              )}{' '}
              <strong>{meta.ignored_by.name}</strong>{' '}
              <RelativeTime timestamp={new Date(meta.ignored_at)} />
            </span>
            <div className={styles.chevron}>
              <ChevronsUp size={18} />
            </div>
          </div>
        </a>

        <div
          className={classNames(styles.content, {
            [styles.empty]: !meta.reason,
          })}
        >
          {meta.reason || '(No reason given)'}
        </div>
      </div>
    </div>
  )
}

export const ListItem = (issue: IssueProps) => {
  return (
    <div className={styles.issueWrapper}>
      <div
        className={classNames(styles.listItem, {
          [styles.ignored]: issue.ignored,
        })}
      >
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
          <Text className={styles.line} gutterBottom variant="description">
            line {issue.line_start}
          </Text>
        </div>
        <CodeBlock issue={issue.affected_file.content} />
      </div>
      {issue.ignored && <IgnoreBlock meta={issue.ignored} />}
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
    <>
      {loading && (
        <div className={styles.list}>
          {Array.from(Array(4).keys()).map(item => (
            <Loading key={item} />
          ))}
        </div>
      )}

      {!loading && (
        <div className={styles.list}>
          {issues?.length > 0 &&
            issues?.map(issue => {
              return <ListItem {...issue} key={issue.id} />
            })}

          {issues?.length === 0 && (
            <Alert
              className={styles.noResults}
              description="We haven't found issues matching your criteria. Please update filters on the left sidebar to see issues on this panel."
              icon={BoxSelect}
              title="No Results"
            />
          )}
        </div>
      )}
    </>
  )
}

export default List
