'use client'

import { useRouter } from 'next/navigation'

import Button from 'app/common/Button'
import Secret from 'app/common/Secret'
import Text from 'app/common/Text'
import useLazyFetch from 'hooks/useLazyFetch'
import useModal from 'hooks/useModal'

import styles from './DeleteSecret.module.scss'

interface DeleteSecretFetchResponse {
  loading: boolean
  (): void
}

const threeMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 3))
const twoHoursAgo = new Date(new Date().setHours(new Date().getHours() - 2))

const DeleteSecret = ({ secretId }: { secretId: number }) => {
  const { closeModal } = useModal()
  const router = useRouter()

  const [deleteSecret, { loading }] = useLazyFetch({
    url: `/api/repositories/${secretId}/settings/delete`,
  }) as DeleteSecretFetchResponse[]

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Delete Secret
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
          createdAt: threeMonthsAgo,
          createdBy: 'Cocov',
          lastUsed: twoHoursAgo,
        }}
        name="GIT_CONFIG"
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
            deleteSecret()
            router.push('/')
            closeModal()
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
