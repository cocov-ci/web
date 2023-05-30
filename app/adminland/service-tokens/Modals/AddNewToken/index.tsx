'use client'

import classNames from 'classnames'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'

import Button from 'app/common/Button'
import Input from 'app/common/Input'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import API from 'utils/api'
import { inconsolata } from 'utils/fonts'

import styles from './AddNewToken.module.scss'

interface NewTokenParams {
  onSuccess: (args: string) => void
  onFailure: (args?: string) => void
}

const NewToken = ({ onSuccess, onFailure }: NewTokenParams) => {
  const { closeModal } = useModal()
  const [tokenName, setTokenName] = useState<string>()
  const [submitting, setSubmitting] = useState<boolean>()

  const onAddNewToken = async () => {
    try {
      const data = await API.shared.adminServiceTokenCreate({
        description: tokenName as string,
      })

      onSuccess(data.token_value)
    } catch (err) {
      onFailure(tokenName)
      closeModal()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Create a Service Token
      </Text>
      <Text gutterBottom variant="description">
        Service Tokens allow internal and external components and applications
        to access your Cocov instance without being attached to an user, or
        having limits imposed by permissions. Please provide a descriptive name
        for the Token you are creating, and click “Save”.
      </Text>
      <div className={styles.textField}>
        <Input
          inputClassName={classNames(styles.nameInput, inconsolata.className)}
          label="Name:"
          onChange={e => setTokenName(e.target.value)}
          placeholder='E.g. "Worker Service Token"'
          type="text"
          width="310px"
        />
      </div>

      <div className={styles.buttons}>
        <Button
          disabled={submitting || isEmpty(tokenName?.trim())}
          onClick={() => {
            setSubmitting(true)
            onAddNewToken()
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

export default NewToken
