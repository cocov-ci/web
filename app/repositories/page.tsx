'use client'

import { useMemo, useState } from 'react'
import useSWR from 'swr'

import Pagination from 'app/common/Pagination'
import TopBar from 'app/common/TopBar'
import Empty from 'app/repositories/Empty'
import NoResults from 'app/repositories/NoResults'
import TopBarActions from 'app/repositories/TopBarActions'
import { RepositoriesResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchClient'

import ListItem from './ListItem'
import Loading from './loading'

const hasRepositoriesList = (
  data: RepositoriesResponseProps | undefined,
): data is RepositoriesResponseProps =>
  (data as RepositoriesResponseProps)?.repositories !== undefined

const Page = () => {
  const [search, setSearch] = useState<string>('')
  const { data, isLoading } = useSWR<RepositoriesResponseProps>(
    `/api/repositories?search_term=${search}`,
    fetcher,
  )

  const isSearching = useMemo(() => search.length > 0, [search])
  const isEmpty = useMemo(
    () => hasRepositoriesList(data) && data.repositories.length === 0,
    [data],
  )
  const hasPagination = useMemo(
    () =>
      hasRepositoriesList(data) &&
      !isSearching &&
      data.paging[0].total_pages > 1,
    [isSearching, data],
  )

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
            <Pagination currentPage={1} onPageClick={() => null} total={5} />
          )}
        </>
      )}
    </div>
  )
}

export default Page
