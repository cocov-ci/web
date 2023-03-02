'use client'

import React, { useState } from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import Textarea from 'app/common/Textarea'
import useModal from 'hooks/useModal'
import Issues from 'services/issues'
import { IssueIgnoreModes } from 'types/Issues'
import { inconsolata } from 'utils/fonts'

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
      <Text className={styles.title} variant="title">
        {mode === 'permanent' ? 'Forever Ignore Issue' : 'Ignore Issue'}
      </Text>
      <Text gutterBottom variant="description">
        Here you you can optionally explain why this issue is being ignored.
        This message will be displayed along with the issue whenever someone
        sees it by selecting the right filters.
      </Text>

      <div className={styles.textField}>
        <Textarea
          height="188px"
          inputClassName={inconsolata.className}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReason(e.target.value)
          }
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
