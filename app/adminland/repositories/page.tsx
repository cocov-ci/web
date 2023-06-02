'use client'

import React from 'react'

import SearchField from 'app/common/SearchField'
import Text from 'app/common/Text'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Item from './Item'
import styles from './Repositories.module.scss'

const Page = () => {
  const { result, loading, error } = useAPI(API.shared.adminRepositories, {
    page: 1,
  })

  return (
    <Base currentPage="/repositories">
      <div className={styles.titleWrapper}>
        <Text className={BaseStyles.title} variant="title">
          Repositories
        </Text>
        <SearchField onSearch={() => {}} />
      </div>
      <div className={styles.list}>
        {result?.repositories.map(i => (
          <Item
            accessible_by_count={i.accessible_by_count}
            cache_size={i.cache_size}
            commits_size={i.commits_size}
            created_at={i.created_at}
            description={i.description}
            key={i.id}
            name={i.name}
          />
        ))}
      </div>
    </Base>
  )
}

export default Page
// coa_95b72c58037942ff5f25dff16e582500020c75dc962daef4c2eafe172659b0af
