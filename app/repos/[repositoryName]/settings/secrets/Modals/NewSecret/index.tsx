'use client'

import { useRouter } from 'next/navigation'

import Button from 'app/common/Button'
import Input from 'app/common/Input'
import Text from 'app/common/Text'
import Textarea from 'app/common/Textarea'
import useLazyFetch from 'hooks/useLazyFetch'
import useModal from 'hooks/useModal'

import styles from './NewSecret.module.scss'

const DeleteSecret = () => {
  const { closeModal } = useModal()
  const router = useRouter()

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Create a Repository Secret
      </Text>
      <Text gutterBottom variant="description">
        This secret will only be usable by this repository. Secret names are
        case insensitive.
      </Text>
      <div className={styles.textField}>
        <Input
          label="Name:"
          labelWidth="45px"
          placeholder="THE_SECRET_NAME"
          type="text"
          width="268px"
        />
      </div>
      <div className={styles.textField}>
        <Textarea height="188px" label="Value:" labelWidth="45px" />
      </div>

      <div className={styles.buttons}>
        <Button
          onClick={() => {
            closeModal()
          }}
          style="primary"
        >
          Save
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

export default DeleteSecret
