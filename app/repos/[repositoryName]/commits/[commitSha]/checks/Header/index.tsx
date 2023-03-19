'use client'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import { HeadProps } from 'types/Commits'

import styles from './Header.module.scss'

export type AccessoryButtonState =
  | 'none'
  | 'rerun'
  | 'cancel'
  | 'cancelling'
  | 'restarting'

export interface HeaderProps {
  repositoryName: string
  commit?: HeadProps
  loading: boolean
  onCancel?: () => void
  onReRun?: () => void
  accessoryButtonState: AccessoryButtonState
}

const Header = ({
  commit,
  repositoryName,
  loading,
  accessoryButtonState = 'none',
  onCancel,
  onReRun,
}: HeaderProps) => {
  let button

  switch (accessoryButtonState) {
    case 'cancel':
      button = (
        <Button onClick={onCancel} style="danger">
          Cancel Run
        </Button>
      )
      break
    case 'cancelling':
      button = (
        <Button disabled style="danger">
          Cancelling Run...
        </Button>
      )
      break
    case 'rerun':
      button = (
        <Button onClick={onReRun} style="secondary">
          Restart Checks
        </Button>
      )
      break
    case 'restarting':
      button = (
        <Button disabled style="secondary">
          Restarting...
        </Button>
      )
      break
  }

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div className={styles.text}>
          <Text variant="title">
            <strong>Running Checks</strong>
          </Text>
          <Text gutterBottom variant="description">
            The list below shows which checks are being executed against the
            following commit:
          </Text>
        </div>
        <div className={styles.accessory}>{button}</div>
      </div>
      <CommitHeader
        className={styles.commitHeader}
        head={commit}
        loading={loading}
        repositoryName={repositoryName}
      />
    </div>
  )
}

export default Header
