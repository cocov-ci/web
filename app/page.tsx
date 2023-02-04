'use client'

import { useEffect, useMemo, useState } from 'react'

import Pagination from 'app/common/Pagination'
import TopBar from 'app/common/TopBar'
import Empty from 'app/repos/Empty'
import ListItem from 'app/repos/ListItem'
import NoResults from 'app/repos/NoResults'
import TopBarActions from 'app/repos/TopBarActions'
import useFetch from 'hooks/useFetch'
import { PagingProps } from 'types/Paging'
import { RepositoriesResponseProps } from 'types/Repositories'

import Loading from './loading'

interface RepositoriesFetchResponse {
  data: RepositoriesResponseProps
  loading: boolean
}

const hasRepositoriesList = (
  data: RepositoriesResponseProps | undefined,
): boolean => (data as RepositoriesResponseProps)?.repositories !== undefined

const Repositories = () => {
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const isSearching = useMemo(() => search.length > 0, [search])

  const { data, loading } = useFetch({
    url: `/api/repositories?search_term=${search}&page=${currentPage}`,
    handler: [currentPage, search],
  }) as RepositoriesFetchResponse

  const isEmpty = useMemo(
    () => hasRepositoriesList(data) && data.repositories.length === 0,
    [data],
  )
  const hasPagination = useMemo(
    () => hasRepositoriesList(data) && data.paging[0].total_pages > 1,
    [isSearching, data],
  )

  const paging: PagingProps = useMemo(
    () => data?.paging[0] as PagingProps,
    [data],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  return (
    <div>
      <TopBar title="Repositories">
        <TopBarActions
          onSearchChange={term => setSearch(term)}
          searchFieldDisabled={loading && !isSearching}
          searchFieldLoading={loading && isSearching}
        />
      </TopBar>

      {loading && !isSearching && <Loading />}

      {isEmpty && isSearching && <NoResults />}
      {isEmpty && !isSearching && <Empty />}

      {!isEmpty && hasRepositoriesList(data) && (
        <>
          {data?.repositories.map(item => (
            <ListItem {...item} key={item.id} />
          ))}
          {hasPagination && (
            <Pagination
              currentPage={paging?.page}
              onPageClick={page => setCurrentPage(page)}
              total={paging?.total_pages}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Repositories
