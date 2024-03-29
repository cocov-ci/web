'use client'

import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import Pagination from 'app/common/Pagination'
import TopBar from 'app/common/TopBar'
import Empty from 'app/repos/Empty'
import ListItem from 'app/repos/ListItem'
import NoResults from 'app/repos/NoResults'
import TopBarActions from 'app/repos/TopBarActions'
import useAuth from 'hooks/useAuth'
import useBanner, { useErrorBanner } from 'hooks/useBanner'
import API, { useAPI } from 'utils/api'

import Loading from './loading'

const Repositories = () => {
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { showBanner } = useBanner()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { showBanner: showErrorBanner } = useErrorBanner()

  const isSearching = useMemo(() => search.length > 0, [search])

  const { result, loading, error, refresh } = useAPI(
    API.shared.repositoryList,
    {
      search_term: search,
      page: currentPage,
    },
  )

  const isEmpty = useMemo(
    () => result && result.repositories.length === 0,
    [result],
  )

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [isAuthenticated])

  useEffect(() => setCurrentPage(1), [search])

  useEffect(() => {
    if (error) {
      showErrorBanner({
        children: 'Ops! Something went wrong. Please try it again.',
        autoClose: false,
      })
    }
  }, [error])

  useEffect(() => {
    if (localStorage.getItem('repositoryDeleted')) {
      refresh()

      showBanner({
        icon: Trash,
        children: 'Repository successfully deleted.',
        variation: 'success',
      })
      localStorage.removeItem('repositoryDeleted')
    }
  }, [])

  const repositoryList = useMemo(
    () =>
      result &&
      result.repositories.length > 0 && (
        <>
          {result.repositories.map(item => (
            <ListItem {...item} key={item.id} />
          ))}
          {result.paging.total_pages > 1 && (
            <Pagination
              currentPage={result.paging.page}
              onPageClick={page => setCurrentPage(page)}
              total={result.paging.total_pages}
            />
          )}
        </>
      ),
    [result],
  )

  return (
    <div>
      <TopBar title="Repositories">
        <TopBarActions
          onSearchChange={term => setSearch(term)}
          searchFieldDisabled={(loading && !isSearching) || Boolean(error)}
          searchFieldLoading={loading && isSearching}
        />
      </TopBar>

      {loading && !isSearching && <Loading />}

      {isEmpty && isSearching && <NoResults />}
      {isEmpty && !isSearching && <Empty />}

      {repositoryList}
    </div>
  )
}

export default Repositories
