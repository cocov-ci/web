'use client'

import React from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Alert from './Alert'
import Item from './Item'
import styles from './ServiceTokens.module.scss'

const Page = () => {
  const {
    result: secretsList,
    loading: secretsLoading,
    error: secretsError,
  } = useAPI(API.shared.serviceTokens, {})

  return (
    <Base currentPage="/service-tokens">
      <Text className={BaseStyles.title} variant="title">
        Service Tokens
      </Text>
      <Text className={BaseStyles.bottomMargin}>
        Service Tokens, unlike User Tokens, are used with integrations and other
        internal components in order to access the API without an user account.
      </Text>
      <Alert>
        <strong>Caution:</strong> Unlike User Tokens, Service Tokens have
        unrestricted access to all repository and data stored on this instance.
        Handle those tokens as passwords.
      </Alert>
      <div className={styles.toolbar}>
        <Button style="primary">New Token</Button>
      </div>
      <div className={styles.list}>
        {secretsList &&
          secretsList.tokens.map(s => (
            <Item
              created_at={s.created_at}
              created_by={s.created_by}
              description={s.description}
              key={s.id}
              last_used_at={s.last_used_at}
            />
          ))}
      </div>
    </Base>
  )
}

export default Page
