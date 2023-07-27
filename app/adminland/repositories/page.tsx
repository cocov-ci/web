'use client'

import React, { useEffect, useMemo, useState } from 'react'

import Pagination from 'app/common/Pagination'
import SearchField from 'app/common/SearchField'
import Text from 'app/common/Text'
import { useErrorBanner } from 'hooks/useBanner'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Item from './Item'
import Loading from './Loading'
import styles from './Repositories.module.scss'

const Page = () => {
  const { showBanner } = useErrorBanner()
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const {
    result,
    loading,
    error,
    refresh: tokensRefresh,
  } = useAPI(API.shared.adminRepositories, {
    searchTerm: search,
    page: currentPage,
  })
  const isSearching = useMemo(() => search.length > 0, [search])

  useEffect(() => {
    if (error) {
      showBanner({
        children: `Failed requesting the repositories list. Please try again.`,
        autoClose: false,
      })
    }
  }, [error])

  return (
    <Base currentPage="/repositories">
      <div className={styles.titleWrapper}>
        <Text className={BaseStyles.title} variant="title">
          Repositories
        </Text>
        <SearchField
          disabled={loading && !isSearching}
          loading={loading && isSearching}
          onSearch={term => setSearch(term)}
        />
      </div>
      <div className={styles.list}>
        {result?.repositories.map(repository => (
          <Item
            {...repository}
            key={repository.id}
            onDelete={() => tokensRefresh()}
          />
        ))}

        {loading && <Loading />}
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
