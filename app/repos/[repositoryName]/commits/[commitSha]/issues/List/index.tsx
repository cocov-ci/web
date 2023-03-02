'use client'

import classNames from 'classnames'
import { BoxSelect, ChevronsUp, Slash, Undo2, VolumeX } from 'lucide-react'
import { useState } from 'react'

import AccessoryMenu from 'app/common/AccessoryMenu'
import Alert from 'app/common/Alert'
import Avatar from 'app/common/Avatar'
import CodeBlock from 'app/common/CodeBlock'
import { MenuItem } from 'app/common/Menu'
import RelativeTime from 'app/common/RelativeTime'
import Text from 'app/common/Text'
import useIssues from 'hooks/useIssues'
import useModal from 'hooks/useModal'
import Issues from 'services/issues'
import { IssueIgnoreMetadata, IssueProps } from 'types/Issues'
import { inconsolata } from 'utils/fonts'

import IgnoreIssue from '../Modals/IgnoreIssue'

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
              <Slash size={18} />
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
  const { repositoryName, commitSha, refetch } = useIssues()
  const { openModal } = useModal()

  const ignoreIssue = () => {
    openModal(
      <IgnoreIssue
        commitSha={commitSha}
        id={issue.id}
        mode="ephemeral"
        onSuccess={() =>
          setTimeout(() => {
            refetch()
          }, 500)
        }
        repositoryName={repositoryName}
      />,
    )
  }

  const foreverIgnoreIssue = () => {
    openModal(
      <IgnoreIssue
        commitSha={commitSha}
        id={issue.id}
        mode="permanent"
        onSuccess={() =>
          setTimeout(() => {
            refetch()
          }, 500)
        }
        repositoryName={repositoryName}
      />,
    )
  }

  const undoIgnoreIssue = async () => {
    try {
      await Issues.cancelIgnore({
        repositoryName: repositoryName,
        commitSha: commitSha,
        id: issue.id,
      })
    } catch (err) {
      // TODO
    } finally {
      refetch()
    }
  }

  const ignoreMenuActions = (
    <AccessoryMenu muted={true}>
      <MenuItem icon={VolumeX} label="Ignore..." onClick={ignoreIssue} />
      <MenuItem
        icon={Slash}
        label="Ignore Forever..."
        onClick={foreverIgnoreIssue}
      />
    </AccessoryMenu>
  )

  const cancelIgnoreMenuActions = (
    <AccessoryMenu muted={true}>
      <MenuItem icon={Undo2} label="Stop Ignoring" onClick={undoIgnoreIssue} />
    </AccessoryMenu>
  )

  return (
    <div className={styles.issueWrapper}>
      <div
        className={classNames(styles.listItem, {
          [styles.ignored]: issue.ignored,
        })}
      >
        <div className={styles.header}>
          <div className={styles.info}>
            <Text variant="description">
              <strong>{issue.check_source}</strong> reported under{' '}
              <strong>{issue.kind}</strong>
            </Text>
            <Text className={styles.message}>
              <strong>{issue.message}</strong>
            </Text>
          </div>
          <div className={styles.actions}>
            {issue.ignored === undefined
              ? ignoreMenuActions
              : cancelIgnoreMenuActions}
          </div>
        </div>
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
        <CodeBlock
          className={styles.codeBlock}
          issue={issue.affected_file.content}
        />
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
