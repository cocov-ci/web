'use client'

import React from 'react'

import Button from 'app/common/Button'
import SnippetBox from 'app/common/SnippetBox'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'

import styles from './NewTokenSuccess.module.scss'

interface NewTokenSuccessParams {
  token: string
}

const NewTokenSuccess = ({ token }: NewTokenSuccessParams) => {
  const { closeModal } = useModal()

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Create a Service Token
      </Text>
      <Text gutterBottom variant="description">
        The code below represents your token. Keep it safe, and take note of it,
        as you will not be able to see it again.
      </Text>
      <div className={styles.textField}>
        <SnippetBox source={token} />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => closeModal()} style="primary">
          Done
        </Button>
      </div>
    </div>
  )
}

export default NewTokenSuccess
