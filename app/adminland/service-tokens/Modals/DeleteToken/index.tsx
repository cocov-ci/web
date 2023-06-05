'use client'

import { useState } from 'react'

import Button from 'app/common/Button'
import Secret from 'app/common/Secret'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import { ServiceTokenParams } from 'types/ServiceTokens'
import API from 'utils/api'

import styles from './DeleteSecret.module.scss'

interface DeleteTokenParams {
  token: ServiceTokenParams
  onSuccess: () => void
  onFailure: (arg: string) => void
}

const DeleteToken = ({ token, onSuccess, onFailure }: DeleteTokenParams) => {
  const { closeModal } = useModal()
  const [loading, setLoading] = useState<boolean>()

  const onDeleteToken = async () => {
    setLoading(true)

    try {
      await API.shared.adminServiceTokenDelete({
        id: token.id,
      })

      onSuccess()
    } catch (err) {
      onFailure(token.description)
    } finally {
      closeModal()
      setLoading(false)
    }
  }

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Delete Token
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
          createdAt: new Date(token.created_at),
          createdBy: token.created_by,
          ...(token.last_used_at && {
            lastUsed: new Date(token.last_used_at),
          }),
        }}
        name={token.description}
      />

      <Text gutterBottom variant="description">
        Notice that Service Tokens are used by either internal platform
        components or external integrations. Deleting it may cause the component
        using it to stop working
      </Text>
      <Text variant="description">Do you wish to continue?</Text>

      <div className={styles.buttons}>
        <Button
          disabled={loading}
          onClick={() => {
            onDeleteToken()
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

export default DeleteToken
