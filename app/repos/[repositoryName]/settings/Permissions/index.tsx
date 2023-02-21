'use client'

import Button from 'app/common/Button'
import SnippetBox from 'app/common/SnippetBox'
import Text from 'app/common/Text'
import { SettingsResponseProps } from 'types/Settings'

import LoadingPermissions from './Loading'
import styles from './Permissions.module.scss'

interface SidebarProps {
  loading: boolean
  data: SettingsResponseProps
}

const SidebarComponent = ({ data, loading }: SidebarProps) => {
  if (loading) return <LoadingPermissions />

  const { permissions, repository } = data

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
        <SnippetBox className={styles.snippetBox} source={repository?.token} />
        {permissions.can_regen_token && (
          <Button style="secondary">Regenerate Token</Button>
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
          <Button style="secondary">Force Resync</Button>
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
          <Button style="danger">Delete Repository</Button>
        )}
      </div>
    </>
  )
}

export default SidebarComponent
