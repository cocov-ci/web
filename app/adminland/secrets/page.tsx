'use client'

import React from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import { SecretParams } from 'types/Secrets'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Item from './Item'
import styles from './Secrets.module.scss'

const Page = () => {
  const {
    result: secretList,
    loading: secretLoading,
    error: secretError,
    refresh: secretRefresh,
  } = useAPI(API.shared.secretsList, {})

  const onDeleteCallback = (item: SecretParams) => {
    // TODO
  }

  return (
    <Base currentPage="/secrets">
      <Text className={BaseStyles.title} variant="title">
        Organization Secrets
      </Text>
      <Text className={BaseStyles.bottomMargin}>
        Secrets are secure pieces of information that can be moved into a Check
        runner in the form of an Environment Variable, or mount.
        <br />
        Organization Secrets are available across all repositories, and are
        listed on their respective Secrets settings page. However, if a
        repository defines a secret using the same name as an organization
        secret, the local secret is used instead of the one provided by the
        organization.
      </Text>
      <div className={styles.toolbar}>
        <Button style="primary">New Secret</Button>
      </div>
      <div className={styles.list}>
        {secretList?.secrets.map(i => (
          <Item
            created_at={i.created_at}
            created_by={i.owner.login}
            key={i.id}
            last_used_at={i.last_used_at}
            onDelete={() => onDeleteCallback(i)}
            title={i.name}
          />
        ))}
      </div>
    </Base>
  )
}

export default Page
