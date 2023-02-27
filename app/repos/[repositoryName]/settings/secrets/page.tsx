'use client'

import { useEffect } from 'react'

import FixedContent from 'app/common/FixedContent'
import Text from 'app/common/Text'
import useFetch from 'hooks/useFetch'
import { SecretsFetchParams } from 'types/Secrets'

import Sidebar from '../Sidebar'

import Items from './Items'
import styles from './Page.module.scss'
interface SecretsParams {
  params: { repositoryName: string; commitSha: string }
}

interface SecretsFetchResponse {
  data: SecretsFetchParams
  loading: boolean
  refetch: () => void
}

const Secrets = ({ params: { repositoryName } }: SecretsParams) => {
  const {
    data: dataRepoSecrets,
    loading: loadingRepoSecrets,
    refetch,
  } = useFetch({
    url: `/api/repositories/${repositoryName}/secrets`,
    handler: [],
  }) as SecretsFetchResponse

  const { data: dataOrgSecrets, loading: loadingOrgSecrets } = useFetch({
    url: `/api/secrets`,
    handler: [],
  }) as SecretsFetchResponse

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="Secrets"
            loading={loadingRepoSecrets || loadingOrgSecrets}
            repositoryName={repositoryName}
            secretsCount={dataRepoSecrets?.secrets?.length}
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
            loading={loadingRepoSecrets || loadingOrgSecrets}
            orgSecrets={dataOrgSecrets?.secrets}
            refetch={refetch}
            repoSecrets={dataRepoSecrets?.secrets}
          />
        </div>
      </div>
    </FixedContent>
  )
}

export default Secrets
