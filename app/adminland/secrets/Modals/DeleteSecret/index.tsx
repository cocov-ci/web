'use client'

import { useState } from 'react'

import Button from 'app/common/Button'
import Secret from 'app/common/Secret'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import { SecretParams } from 'types/Secrets'
import API from 'utils/api'

import styles from './DeleteSecret.module.scss'

interface DeleteSecretParams {
  secret: SecretParams
  onSuccess: () => void
  onFailure: () => void
}

const DeleteSecret = ({ secret, onSuccess, onFailure }: DeleteSecretParams) => {
  const { closeModal } = useModal()
  const [loading, setLoading] = useState<boolean>()

  const onDeleteSecret = async () => {
    setLoading(true)

    try {
      await API.shared.secretsDelete({
        secretID: secret.id,
      })

      onSuccess()
    } catch (err) {
      onFailure()
    } finally {
      closeModal()
      setLoading(false)
    }
  }

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        {`Delete Secret: "${secret.name}"`}
      </Text>
      <Text gutterBottom variant="description">
        You are about to perform a destructive action.
        <br />
        <strong>Bad things will happen if you don’t read this message!</strong>
      </Text>
      <Text variant="description">
        By continuing, the following secret will be deleted permanently:
      </Text>
      <Secret
        metadata={{
          createdAt: new Date(secret.created_at),
          createdBy: secret.owner.login,
          ...(secret.last_used_at && {
            lastUsed: new Date(secret.last_used_at),
          }),
        }}
        name={secret.name}
      />

      <Text gutterBottom variant="description">
        Notice that if branches are still referencing this secret in their
        .cocov.yaml files, those pipelines may begin failing after the secret is
        removed.
      </Text>
      <Text variant="description">Do you wish to continue?</Text>

      <div className={styles.buttons}>
        <Button
          disabled={loading}
          onClick={() => {
            onDeleteSecret()
          }}
          style="danger"
        >
          Yes, delete it
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            closeModal()
          }}
          style="secondary"
        >
          No, keep it
        </Button>
      </div>
    </div>
  )
}

export default DeleteSecret
