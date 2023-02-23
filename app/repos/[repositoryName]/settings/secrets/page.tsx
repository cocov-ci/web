'use client'

import FixedContent from 'app/common/FixedContent'
import Text from 'app/common/Text'
import useFetch from 'hooks/useFetch'
import { SecretsResponseProps } from 'types/Settings'

import Sidebar from '../Sidebar'

import Items from './Items'
import styles from './Page.module.scss'
interface SettingsParams {
  params: { repositoryName: string; commitSha: string }
}

interface SecretsFetchResponse {
  data: SecretsResponseProps
  loading: boolean
}

const Secrets = ({ params: { repositoryName } }: SettingsParams) => {
  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/secrets`,
    handler: [],
  }) as SecretsFetchResponse

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="Secrets"
            loading={loading}
            repositoryName={repositoryName}
            secretsCount={data?.secrets_count}
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

          <Items />
        </div>
      </div>
    </FixedContent>
  )
}

export default Secrets
