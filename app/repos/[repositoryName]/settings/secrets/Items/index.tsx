'use client'

import { BoxSelect, Trash } from 'lucide-react'

import AccessoryButton from 'app/common/AccessoryButton'
import Alert from 'app/common/Alert'
import Button from 'app/common/Button'
import Secret from 'app/common/Secret'
import Text from 'app/common/Text'
import { useErrorBanner } from 'hooks/useBanner'
import useModal from 'hooks/useModal'
import { SecretParams } from 'types/Secrets'

import DeleteSecret from '../Modals/DeleteSecret'
import NewSecret from '../Modals/NewSecret'

import styles from './Items.module.scss'
import Loading from './Loading'

interface ItemParams {
  repoSecrets?: SecretParams[]
  orgSecrets?: SecretParams[]
  refetch: () => void
  loading: boolean
}

const Items = ({ repoSecrets, orgSecrets, refetch, loading }: ItemParams) => {
  const { openModal } = useModal()
  const { showBanner } = useErrorBanner()

  const onDeleteSecretClick = (secret: SecretParams) => {
    openModal(
      <DeleteSecret
        onFailure={secret => {
          showBanner({
            children: `Failed deleting the secret "${secret}". Please try again.`,
            autoClose: true,
          })
        }}
        onSuccess={() => refetch()}
        secret={secret}
      />,
    )
  }

  const onNewSecretClick = () => {
    openModal(
      <NewSecret
        onFailure={secret => {
          showBanner({
            children: `Failed creating the secret "${secret}". Please try again.`,
            autoClose: true,
          })
        }}
        onSuccess={() => refetch()}
      />,
    )
  }

  const NoRepositoryAlert = ({ description }: { description: string }) => {
    return (
      <Alert
        className={styles.noRepositoryAlert}
        description={description}
        icon={BoxSelect}
        noBorder
        title="No Secrets"
      />
    )
  }

  if (loading) return <Loading />

  return (
    <>
      <div className={styles.item}>
        <div className={styles.group}>
          <Text className={styles.title}>Repository Secrets</Text>
          <Button onClick={() => onNewSecretClick()}>New Secret</Button>
        </div>
        <div className={styles.list}>
          {repoSecrets?.length === 0 && (
            <NoRepositoryAlert description="Secrets available exclusively for this repository will appear here. Use the button above to create a new." />
          )}
          {repoSecrets?.map(item => (
            <Secret
              key={item.id}
              metadata={{
                createdAt: new Date(item.created_at),
                createdBy: item.owner.login,
                ...(item.last_used_at && {
                  lastUsed: new Date(item.last_used_at),
                }),
              }}
              name={item.name}
              showDivider={true}
            >
              <AccessoryButton
                kind="squared"
                onClick={() => onDeleteSecretClick(item)}
              >
                <Trash width="18px" />
              </AccessoryButton>
            </Secret>
          ))}
        </div>
      </div>
      <div className={styles.item}>
        <Text className={styles.title}>Organization Secrets</Text>

        <div className={styles.list}>
          {orgSecrets?.length === 0 && (
            <NoRepositoryAlert description="Generally available secrets are listed here. They are available for all repositories and are setup by administrators." />
          )}
          {orgSecrets?.map(item => (
            <Secret key={item.id} name={item.name} showDivider={true} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Items
