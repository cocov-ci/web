'use client'

import classNames from 'classnames'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'

import Button from 'app/common/Button'
import Input from 'app/common/Input'
import Text from 'app/common/Text'
import Textarea from 'app/common/Textarea'
import useLazyFetch, { ErrorResponse, UseFetchProps } from 'hooks/useLazyFetch'
import useModal from 'hooks/useModal'
import useSegments from 'hooks/useSegments'

import styles from './NewSecret.module.scss'
import { secretNameMap } from './Utils'

export interface SecretsCheckNameParams {
  code?: string
  message?: string
  status?: string
}
interface SecretsNameStatusParams {
  message: string
  status: string
  icon: ReactElement
}

interface SecretsCheckNameFetchResponse {
  data: SecretsCheckNameParams
  loading: boolean
  (args: UseFetchProps): void
  error: ErrorResponse
}

const DeleteSecret = () => {
  const { closeModal } = useModal()
  const segments = useSegments()
  const [secretName, setSecretName] = useState<string>()
  const [secretValue, setSecretValue] = useState<string>()
  const [secretNameResponse, setSecretNameResponse] =
    useState<SecretsCheckNameParams | null>()
  const [secretNameStatus, setSecretNameStatus] =
    useState<SecretsNameStatusParams | null>()
  const repositoryName = useMemo(() => segments[1], [segments])

  const previousController = useRef<AbortController>()

  let timer: ReturnType<typeof setTimeout>

  const [getSecret, { data, loading, error }] = useLazyFetch(
    {},
  ) as SecretsCheckNameFetchResponse[]

  const onSearch = (value: string) => {
    if (previousController.current) {
      previousController.current.abort()
    }

    const controller = new AbortController()

    previousController.current = controller

    getSecret({
      url: `/api/secrets/check_name`,
      params: {
        repo_name: repositoryName,
        name: value,
      },
      args: {
        signal: controller.signal,
      },
    })
  }

  const SearchDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (timer) {
      clearTimeout(timer)
    }

    setSecretName(value)

    timer = setTimeout(() => {
      onSearch(value)
    }, 2000)
  }

  useEffect(() => {
    if (secretNameResponse && secretName) {
      const secretNameObject = secretNameMap({
        response: secretNameResponse,
        secretName,
      })

      setSecretNameStatus(secretNameObject)
    } else {
      setSecretNameStatus(null)
    }
  }, [secretNameResponse, secretName])

  useEffect(() => {
    if (error && error.code) {
      setSecretNameResponse(error)
    } else if (data) {
      setSecretNameResponse(data)
    }
  }, [data, error])

  const searchLoading = useMemo(
    () => loading || error === ('canceled' as string),
    [loading, error],
  )

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
          errored={secretNameStatus?.status === 'error'}
          label="Name:"
          labelWidth="45px"
          loading={searchLoading}
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
            searchLoading
          }
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
