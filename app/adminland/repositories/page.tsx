'use client'

import React from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import styles from './Repositories.module.scss'

const Page = () => {
  return (
    <Base currentPage="/repositories">
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
      <div className={styles.list}>
      </div>
    </Base>
  )
}

export default Page
