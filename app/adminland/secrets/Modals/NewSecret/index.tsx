'use client'

import classNames from 'classnames'
import { debounce } from 'lodash'
import React, { ReactElement, useEffect, useRef, useState } from 'react'

import Button from 'app/common/Button'
import Input from 'app/common/Input'
import Text from 'app/common/Text'
import Textarea from 'app/common/Textarea'
import useModal from 'hooks/useModal'
import API from 'utils/api'
import { inconsolata } from 'utils/fonts'

import styles from './NewSecret.module.scss'
import { secretNameMap } from './Utils'

interface SecretsNameStatusParams {
  message: string
  status: string
  icon: ReactElement
}

interface NewSecretParams {
  onSuccess: () => void
  onFailure: (arg?: string) => void
}

const NewSecret = ({ onSuccess, onFailure }: NewSecretParams) => {
  const { closeModal } = useModal()
  const [secretName, setSecretName] = useState<string>()
  const [secretValue, setSecretValue] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [secretNameStatus, setSecretNameStatus] =
    useState<SecretsNameStatusParams | null>()
  const [submitting, setSubmitting] = useState<boolean>()

  const onSearch = async (value: string) => {
    setLoading(true)

    try {
      const secretNameValidation = await API.shared.secretsCheckName({
        name: value,
      })

      return secretNameMap({
        response: secretNameValidation,
        secretName: value,
      })
    } catch (err) {
      // TODO
    } finally {
      setLoading(false)
    }
  }

  const SearchDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSecretName(value)
    setSecretNameStatus(null)

    debouncedSearch(value)
  }

  const onAddNewSecret = async () => {
    try {
      await API.shared.secretsCreate({
        data: secretValue as string,
        name: secretName as string,
      })

      onSuccess()
    } catch (err) {
      onFailure(secretName)
    } finally {
      setSubmitting(false)
      closeModal()
    }
  }

  const debouncedSearch = useRef(
    debounce(async value => setSecretNameStatus(await onSearch(value)), 1000),
  ).current

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <div className={styles.content}>
      <Text className={styles.title} variant="title">
        Create a Organization Secret
      </Text>
      <Text gutterBottom variant="description">
        This secret will be usable by the organization. Secret names are case
        insensitive.
      </Text>
      <div className={styles.textField}>
        <Input
          errored={secretNameStatus?.status === 'error'}
          inputClassName={classNames(styles.nameInput, inconsolata.className)}
          label="Name:"
          labelWidth="45px"
          loading={loading}
          onChange={SearchDebounce}
          placeholder="THE_SECRET_NAME"
          type="text"
          width="268px"
        />
        {secretNameStatus && (
          <div
            className={classNames(styles.status, [
              styles[secretNameStatus.status as string],
            ])}
          >
            {secretNameStatus.icon}
            <Text className={styles.statusMessage}>
              {secretNameStatus.message}
            </Text>
          </div>
        )}
      </div>
      <div className={styles.textField}>
        <Textarea
          height="188px"
          inputClassName={inconsolata.className}
          label="Value:"
          labelWidth="45px"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSecretValue(e.target.value)
          }
        />
      </div>

      <div className={styles.buttons}>
        <Button
          disabled={
            !secretNameStatus ||
            secretNameStatus?.status === 'error' ||
            loading ||
            submitting
          }
          onClick={() => {
            setSubmitting(true)
            onAddNewSecret()
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

export default NewSecret
