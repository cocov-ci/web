'use client'

import { Trash } from 'lucide-react'

import AccessoryButton from 'app/common/AccessoryButton'
import Button from 'app/common/Button'
import Secret from 'app/common/Secret'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'

import DeleteSecret from '../Modals/DeleteSecret'
import NewSecret from '../Modals/NewSecret'

import styles from './Items.module.scss'

const threeMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 3))
const twoHoursAgo = new Date(new Date().setHours(new Date().getHours() - 2))

const Items = () => {
  const { openModal } = useModal()

  const onDeleteSecretClick = (id: number) => {
    openModal(<DeleteSecret secretId={id} />)
  }

  const onNewSecretClick = () => {
    openModal(<NewSecret />)
  }

  return (
    <>
      <div className={styles.item}>
        <div className={styles.group}>
          <Text className={styles.title}>Repository Secrets</Text>
          <Button onClick={() => onNewSecretClick()}>New Secret</Button>
        </div>
        <div className={styles.list}>
          <Secret
            metadata={{
              createdAt: threeMonthsAgo,
              createdBy: 'Cocov',
              lastUsed: twoHoursAgo,
            }}
            name="GIT_CONFIG"
            showDivider={true}
          >
            <AccessoryButton
              kind="squared"
              onClick={() => onDeleteSecretClick(1)}
            >
              <Trash width="18px" />
            </AccessoryButton>
          </Secret>
          <Secret
            metadata={{
              createdAt: threeMonthsAgo,
              createdBy: 'Cocov',
              lastUsed: twoHoursAgo,
            }}
            name="GIT_CONFIG"
            showDivider={true}
          >
            <AccessoryButton
              kind="squared"
              onClick={() => onDeleteSecretClick(1)}
            >
              <Trash width="18px" />
            </AccessoryButton>
          </Secret>
          <Secret
            metadata={{
              createdAt: threeMonthsAgo,
              createdBy: 'Cocov',
              lastUsed: twoHoursAgo,
            }}
            name="GIT_CONFIG"
            showDivider={true}
          >
            <AccessoryButton
              kind="squared"
              onClick={() => onDeleteSecretClick(1)}
            >
              <Trash width="18px" />
            </AccessoryButton>
          </Secret>
          <Secret
            metadata={{
              createdAt: threeMonthsAgo,
              createdBy: 'Cocov',
              lastUsed: twoHoursAgo,
            }}
            name="GIT_CONFIG"
            showDivider={true}
          >
            <AccessoryButton
              kind="squared"
              onClick={() => onDeleteSecretClick(1)}
            >
              <Trash width="18px" />
            </AccessoryButton>
          </Secret>
        </div>
      </div>
      <div className={styles.item}>
        <Text className={styles.title}>Organization Secrets</Text>

        <div className={styles.list}>
          <Secret name="GIT_CONFIG" showDivider={true} />
          <Secret name="GIT_CONFIG" showDivider={true} />
          <Secret name="GIT_CONFIG" showDivider={true} />
          <Secret name="GIT_CONFIG" showDivider={true} />
        </div>
      </div>
    </>
  )
}

export default Items
