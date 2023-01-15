'use client'

import { useMemo, useState } from 'react'
import useSWR from 'swr'

import Pagination from 'app/common/Pagination'
// import { makeFakePoints } from 'app/common/Stats/Utils'
import TopBar from 'app/common/TopBar'
import Empty from 'app/repositories/Empty'
import NoResults from 'app/repositories/NoResults'
import TopBarActions from 'app/repositories/TopBarActions'
import { RepositoriesResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchClient'

import Loading from './loading'
import RepositoriesList from './RepositoriesList'

// const repositories = [
//   {
//     id: 1,
//     title: 'jps',
//     description: 'Josie Platform Server',
//     stats: {
//       issues: {
//         data: makeFakePoints(),
//         value: 5694,
//       },
//       coverage: {
//         data: makeFakePoints(),
//         value: 100,
//       },
//     },
//   },
//   {
//     id: 2,
//     title: 'josie',
//     description: 'Josie CLI for Bootstrapping Microservices Projects',
//     stats: {
//       issues: {
//         data: makeFakePoints(),
//         value: 5694,
//       },
//       coverage: undefined,
//     },
//   },
//   {
//     id: 3,
//     title: 'tagus',
//     description: undefined,
//     stats: {
//       issues: undefined,
//       coverage: undefined,
//     },
//   },
//   {
//     id: 4,
//     title: 'account-mfe-commons-monorepo',
//     description: undefined,
//     stats: {
//       issues: undefined,
//       coverage: {
//         data: makeFakePoints(),
//         value: 100,
//       },
//     },
//   },
// ]

const hasRepositoriesList = (
  data: RepositoriesResponseProps | undefined,
): data is RepositoriesResponseProps =>
  (data as RepositoriesResponseProps)?.repositories !== undefined

const Page = () => {
  const [search, setSearch] = useState<string>('')
  const { data, isLoading } = useSWR<RepositoriesResponseProps>(
    `/api/repositories?search_term=${search}`,
    fetcher,
    { keepPreviousData: true },
  )

  const isSearching = useMemo(() => search.length > 0, [search])
  const isEmpty = useMemo(
    () => hasRepositoriesList(data) && data.repositories.length === 0,
    [data],
  )

  return (
    <div>
      <TopBar title="Repositories">
        <TopBarActions
          onSearchChange={term => setSearch(term)}
          searchBarLoading={isLoading && isSearching}
        />
      </TopBar>

      {isLoading && !isSearching && <Loading />}

      {isEmpty && isSearching && <NoResults />}
      {isEmpty && !isSearching && <Empty />}

      {!isEmpty && hasRepositoriesList(data) && (
        <>
          <RepositoriesList repositories={data?.repositories} />
          {!isSearching && (
            <Pagination currentPage={1} onPageClick={() => null} total={5} />
          )}
        </>
      )}
    </div>
  )
}

export default Page
