'use client'

import { useEffect, useState } from 'react'

import Button from 'app/common/Button'
import SnippetBox from 'app/common/SnippetBox'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import API, { RepositorySettingsOutput } from 'utils/api'

import DeleteRepository from '../Modals/DeleteRepository'

import LoadingPermissions from './Loading'
import styles from './Permissions.module.scss'

interface SidebarProps {
  loading: boolean
  data?: RepositorySettingsOutput
}

const PermissionsComponent = ({ data, loading }: SidebarProps) => {
  const { openModal } = useModal()
  const [token, setToken] = useState<string>()
  const [resyncGithub, setResyncGithub] = useState<boolean>()
  const [loadingRegenerateToken, setLoadingRegenerateToken] =
    useState<boolean>()

  useEffect(() => {
    setToken(data?.repository?.token)
  }, [data])

  if (loading || !data) return <LoadingPermissions />

  const { permissions, repository } = data

  const onDeleteRepositoryClick = () => {
    openModal(<DeleteRepository repositoryName={repository.name} />)
  }

  const onRegenerateTokenClick = async () => {
    setLoadingRegenerateToken(true)

    try {
      const { new_token } = await API.shared.repositoryRegenerateToken({
        repositoryName: repository.name,
      })

      setToken(new_token)
    } catch (err) {
      // TODO
    } finally {
      setLoadingRegenerateToken(false)
    }
  }

  const onForceResyncClick = async () => {
    try {
      await API.shared.repositoryResync({
        repositoryName: repository.name,
      })

      setResyncGithub(true)
    } catch (err) {
      // TODO
    }
  }

  return (
    <>
      <div className={styles.item}>
        <Text className={styles.titleItem} variant="title">
          Repository Token
        </Text>
        <Text
          className={styles.descriptionItem}
          gutterBottom
          variant="description"
        >
          The Repository Token is an unique identifier of this repository across
          other repositories in this instance. Unlike other tokens, it is not
          sensitive, and can only be used to push coverage information to Cocov,
          so it is not required to keep it in a safe place.
          <br />
          If you wish, the token can be regenerated. However, make sure to
          update its value in CI pipelines after doing so.
        </Text>
        {token && <SnippetBox className={styles.snippetBox} source={token} />}
        {permissions.can_regen_token && (
          <Button
            disabled={loadingRegenerateToken}
            onClick={() => onRegenerateTokenClick()}
            style="secondary"
          >
            {loadingRegenerateToken ? 'Regenerating' : 'Regenerate Token'}
          </Button>
        )}
      </div>
      <div className={styles.item}>
        <Text className={styles.titleItem} variant="title">
          Rename
        </Text>
        <Text
          className={styles.descriptionItem}
          gutterBottom
          variant="description"
        >
          This repository’s name comes from GitHub. In case the repository name
          changed and this instance appears out-of-sync, you can force the
          update by clicking the button below.
        </Text>

        {permissions.can_sync_github && (
          <Button
            disabled={resyncGithub}
            onClick={() => onForceResyncClick()}
            style="secondary"
          >
            {resyncGithub ? 'Queued' : 'Force Resync'}
          </Button>
        )}
      </div>
      <div className={styles.item}>
        <Text className={styles.titleItem} variant="title">
          Delete Repository
        </Text>
        <Text
          className={styles.descriptionItem}
          gutterBottom
          variant="description"
        >
          Delete the repository from this instance. This will only remove data
          related to this repository from this Cocov instance, and will NOT
          delete the repository from GitHub or touch any files within it.
          <br />
          If you wish, the repository can be re-added by clicking the “Add
          Repository” button on the Repositories page.
        </Text>
        <Text className={styles.descriptionItem} variant="description">
          By performing this action, the following data will be deleted forever:
        </Text>
        <ul className={styles.listItem}>
          <li>- Issues History</li>
          <li>- Coverage History</li>
          <li>- Cached commits from this repository</li>
          <li>- Repository Secrets</li>
        </ul>
        {permissions.can_delete && (
          <Button onClick={() => onDeleteRepositoryClick()} style="danger">
            Delete Repository
          </Button>
        )}
      </div>
    </>
  )
}

export default PermissionsComponent
