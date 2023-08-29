'use client'

import React, { useEffect, useMemo, useState } from 'react'

import Pagination from 'app/common/Pagination'
import SearchField from 'app/common/SearchField'
import Text from 'app/common/Text'
import { useErrorBanner } from 'hooks/useBanner'
import usePrevious from 'hooks/usePrevious'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Item from './Item'
import { LoadingItem } from './Loading'
import styles from './Users.module.scss'

const Page = () => {
  const { showBanner } = useErrorBanner()
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { result, loading, error } = useAPI(API.shared.adminUsers, {
    searchTerm: search,
    page: currentPage,
  })

  const previousSearch = usePrevious(search) as string

  const isSearching = useMemo(
    () => search.length > 0 || previousSearch?.length > 0,
    [search],
  )

  useEffect(() => {
    if (error) {
      showBanner({
        children: `Failed requesting the users list. Please try again.`,
        autoClose: false,
      })
    }
  }, [error])

  return (
    <Base currentPage="/users">
      <div className={styles.titleWrapper}>
        <Text className={BaseStyles.title} variant="title">
          Users
        </Text>
        <SearchField
          disabled={loading && !isSearching}
          loading={loading && isSearching}
          onSearch={term => setSearch(term)}
        />
      </div>
      <div className={styles.list}>
        {result?.users.map(item => (
          <Item item={item} key={item.user.id} />
        ))}

        {loading && new Array(4).fill(0).map(i => <LoadingItem key={i} />)}
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
