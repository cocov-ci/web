'use client'

import React, { useMemo, useState } from 'react'

import Pagination from 'app/common/Pagination'
import SearchField from 'app/common/SearchField'
import Text from 'app/common/Text'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Item from './Item'
import styles from './Repositories.module.scss'

const Page = () => {
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { result, loading, error } = useAPI(API.shared.adminRepositories, {
    searchTerm: search,
    page: currentPage,
  })
  const isSearching = useMemo(() => search.length > 0, [search])

  return (
    <Base currentPage="/repositories">
      <div className={styles.titleWrapper}>
        <Text className={BaseStyles.title} variant="title">
          Repositories
        </Text>
        <SearchField
          disabled={loading && isSearching}
          loading={loading && !isSearching}
          onSearch={term => setSearch(term)}
        />
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
      {result && result.paging.total_pages > 1 && (
        <Pagination
          currentPage={result.paging.page}
          onPageClick={page => setCurrentPage(page)}
          total={result.paging.total_pages}
        />
      )}
    </Base>
  )
}

export default Page
// coa_95b72c58037942ff5f25dff16e582500020c75dc962daef4c2eafe172659b0af
