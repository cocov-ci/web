'use client'

import FixedContent from 'app/common/FixedContent'
import Text from 'app/common/Text'
import API, { useAPI } from 'utils/api'

import Sidebar from '../Sidebar'

import Items from './Items'
import styles from './Page.module.scss'
interface SecretsParams {
  params: { repositoryName: string; commitSha: string }
}

const Secrets = ({ params: { repositoryName } }: SecretsParams) => {
  const {
    result: repoSecretsList,
    loading: repoSecretsLoading,
    refresh: repoSecretsRefresh,
    error: repoSecretsError,
  } = useAPI(API.shared.secretsList, { repositoryName })

  const {
    result: orgSecretsList,
    loading: orgSecretsLoading,
    error: orgSecretsError,
  } = useAPI(API.shared.secretsList, {})

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="Secrets"
            loading={repoSecretsLoading || orgSecretsLoading}
            repositoryName={repositoryName}
            secretsCount={repoSecretsList?.secrets.length ?? 0}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.item}>
            <Text className={styles.title} variant="title">
              Secrets
            </Text>
            <Text className={styles.description} variant="description">
              Secrets are secure pieces of information that can be moved into a
              Check runner in the form of an Environment Variable, or mount.
              <br />
              Organization Secrets are available across all repositories. If
              this repository defines a secret using the same name as an
              Organization Secret, the repository’s one will be preferred.
            </Text>
          </div>
          <Items
            loading={repoSecretsLoading || orgSecretsLoading}
            orgSecrets={orgSecretsList?.secrets}
            refetch={repoSecretsRefresh}
            repoSecrets={repoSecretsList?.secrets}
          />
        </div>
      </div>
    </FixedContent>
  )
}

export default Secrets
