'use client'

import React, { useState } from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import Textarea from 'app/common/Textarea'
import useModal from 'hooks/useModal'
import Issues from 'services/issues'
import { IssueIgnoreModes } from 'types/Issues'

import styles from './IgnoreIssue.module.scss'

export interface SecretsCheckNameParams {
  code?: string
  message?: string
  status?: string
}

interface IgnoreIssueParams {
  onSuccess: () => void
  repositoryName: string
  commitSha: string
  mode: IssueIgnoreModes
  id: number
}

const IgnoreIssue = ({
  onSuccess,
  mode,
  repositoryName,
  commitSha,
  id,
}: IgnoreIssueParams) => {
  const { closeModal } = useModal()
  const [reason, setReason] = useState<string>()
  const [submitting, setSubmitting] = useState<boolean>()

  const onIgnoreIssue = async () => {
    setSubmitting(true)

    try {
      await Issues.ignore({
        repositoryName: repositoryName,
        commitSha: commitSha,
        id: id,
        mode: mode,
        reason: reason,
      })

      onSuccess()
    } catch (err) {
      // TODO
    } finally {
      setSubmitting(false)
      closeModal()
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Text className={styles.title} variant="title">
          {mode === 'permanent' ? 'Forever Ignore Issue' : 'Ignore Issue'}
        </Text>
        <Text variant="description">
          You may optionally provide an explanation for why this issue is being
          ignored. This message will appear alongside the issue when viewed by
          someone who has selected the appropriate filters.
        </Text>
        {mode === 'permanent' && (
          <Text className={styles.important} variant="description">
            <strong>Important:</strong> When you choose to "forever ignore" an
            issue, it will no longer appear in future commits, and the reason
            you provide for ignoring it will be used as the default for any
            similar issues that may arise in the future. To review "forever
            ignored" issues, you can go to Cocov's repository settings page.
          </Text>
        )}
      </div>

      <div className={styles.textField}>
        <Textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReason(e.target.value)
          }
          placeholder="Optionally describe the reason for ignoring this issue..."
        />
      </div>

      <div className={styles.buttons}>
        <Button
          disabled={submitting}
          onClick={() => {
            setSubmitting(true)
            onIgnoreIssue()
          }}
          style="danger"
        >
          OK
        </Button>
        <Button
          onClick={() => {
            closeModal()
          }}
          style="secondary"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default IgnoreIssue
