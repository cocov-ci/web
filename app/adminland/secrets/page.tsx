import React from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Item from './Item'
import styles from './Secrets.module.scss'

const Page = () => (
  <Base currentPage="/secrets">
    <Text className={BaseStyles.title} variant="title">
      Organization Secrets
    </Text>
    <Text className={BaseStyles.bottomMargin}>
      Secrets are secure pieces of information that can be moved into a Check
      runner in the form of an Environment Variable, or mount.
      <br />
      Organization Secrets are available across all repositories, and are listed
      on their respective Secrets settings page. However, if a repository
      defines a secret using the same name as an organizaiton secret, the local
      secret is used instead of the one provided by the organization.
    </Text>
    <div className={styles.toolbar}>
      <Button style="primary">New Secret</Button>
    </div>
    <div className={styles.list}>
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        last_used_at="2021-10-10T00:01:02Z"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
      <Item
        created_at="2021-10-10T00:01:02Z"
        created_by="Someone"
        title="Bla"
      />
    </div>
  </Base>
)

export default Page
