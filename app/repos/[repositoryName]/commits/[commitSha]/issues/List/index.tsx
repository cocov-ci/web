'use client'

import classNames from 'classnames'
import { BoxSelect, ChevronsUp, Slash, Undo2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import AccessoryMenu from 'app/common/AccessoryMenu'
import Alert from 'app/common/Alert'
import Avatar from 'app/common/Avatar'
import CodeBlock from 'app/common/CodeBlock'
import { MenuItem } from 'app/common/Menu'
import RelativeTime from 'app/common/RelativeTime'
import Text from 'app/common/Text'
import { useErrorBanner } from 'hooks/useBanner'
import useIssues from 'hooks/useIssues'
import useModal from 'hooks/useModal'
import { IssueIgnoreMetadata, IssueProps } from 'types/Issues'
import API from 'utils/api'
import { inconsolata } from 'utils/fonts'

import IgnoreIssue from '../Modals/IgnoreIssue'

import styles from './List.module.scss'
import Loading from './Loading'

interface IgnoreBlockProps {
  meta: IssueIgnoreMetadata
}

interface ListItemParams {
  issue: IssueProps
  onUpdateListCallback: () => void
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

export const ListItem = ({ issue, onUpdateListCallback }: ListItemParams) => {
  const { repositoryName, commitSha, refetch } = useIssues()
  const { openModal } = useModal()
  const { showBanner } = useErrorBanner()

  const ignoreIssue = () => {
    openModal(
      <IgnoreIssue
        commitSha={commitSha}
        id={issue.id}
        mode="ephemeral"
        onFailure={id =>
          showBanner({
            children: `We cannot proceed with your request, the issue "${id}" is not ignored yet. Please try again!`,
          })
        }
        onSuccess={() => {
          onUpdateListCallback()
          setTimeout(() => {
            refetch()
          }, 500)
        }}
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
        onFailure={id =>
          showBanner({
            children: `We cannot proceed with your request, the issue "${id}" is not ignored yet. Please try again!`,
          })
        }
        onSuccess={() => {
          onUpdateListCallback()
          setTimeout(() => {
            refetch()
          }, 500)
        }}
        repositoryName={repositoryName}
      />,
    )
  }

  const undoIgnoreIssue = async () => {
    try {
      await API.shared.issueCancelIgnore({
        repositoryName: repositoryName,
        commitSHA: commitSha,
        issueID: issue.id,
      })
    } catch (err) {
      showBanner({
        children: `We cannot proceed with your request, the issue "${issue.id}" is still being ignored. Please try again!`,
      })
    } finally {
      onUpdateListCallback()
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
  issues?: IssueProps[]
  loading: boolean
}) => {
  const { commitSha } = useIssues()
  const listRef = useRef<HTMLDivElement>(null)

  const onPreserveScrollPosition = () => {
    const list = listRef.current

    if (list) {
      localStorage.setItem(
        `issues-list-${commitSha}`,
        list.scrollTop?.toString(),
      )
    }
  }

  useEffect(() => {
    const top = localStorage.getItem(`issues-list-${commitSha}`)
    const list = listRef.current

    if (list && top !== null) {
      list.scrollTop = parseInt(top, 10)
    }

    localStorage.removeItem(`issues-list-${commitSha}`)
  }, [issues])

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
        <div className={styles.list} ref={listRef}>
          {issues &&
            issues.length > 0 &&
            issues?.map(issue => {
              return (
                <ListItem
                  issue={issue}
                  key={issue.id}
                  onUpdateListCallback={() => onPreserveScrollPosition()}
                />
              )
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
