import React from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Alert from './Alert'
import styles from './ServiceTokens.module.scss'

const Page = () => (
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
      irrestrict access to all repository and data stored on this instance.
      Handle those tokens as passwords.
    </Alert>
    <div className={styles.toolbar}>
      <Button style="primary">New Token</Button>
    </div>
    <div className={styles.list} />
  </Base>
)

export default Page
