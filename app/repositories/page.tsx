'use client'

import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import Pagination from 'app/common/Pagination'
import TopBar from 'app/common/TopBar'
import Empty from 'app/repositories/Empty'
import NoResults from 'app/repositories/NoResults'
import TopBarActions from 'app/repositories/TopBarActions'
import { PagingProps, RepositoriesResponseProps } from 'types/Repositories'

import ListItem from './ListItem'
import Loading from './loading'

const hasRepositoriesList = (
  data: RepositoriesResponseProps | undefined,
): data is RepositoriesResponseProps =>
  (data as RepositoriesResponseProps)?.repositories !== undefined

const Repositories = () => {
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const isSearching = useMemo(() => search.length > 0, [search])

  const { data, isLoading } = useSWR<RepositoriesResponseProps>(
    `/api/repositories?search_term=${search}&page=${currentPage}`,
    null,
    {
      keepPreviousData: isSearching,
    },
  )

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
          searchFieldDisabled={isLoading && !isSearching}
          searchFieldLoading={isLoading && isSearching}
        />
      </TopBar>

      {isLoading && !isSearching && <Loading />}

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
