'use client'

import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import TopBar from 'app/common/TopBar'
import useFetch from 'hooks/useFetch'
import Repositories from 'services/repositories'
import { OrgRepositoriesResponseProps } from 'types/Repositories'

import Header from './Header'
import ListItems from './ListItems'
import LoadingRepositories from './LoadingRepositories'
import NoResults from './NoResults'
import styles from './Page.module.scss'
import ReposPagination from './Pagination'
import RefreshList from './RefreshList'

interface RepositoriesFetchResponse {
  data: OrgRepositoriesResponseProps
  loading: boolean
  refetch: () => void
}

const NewRepository = () => {
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loadingPage, setLoadingPage] = useState<boolean>(true)
  const [updatingRepositories, setUpdatingRepositories] =
    useState<boolean>(false)

  const { data, loading, refetch } = useFetch({
    url: `/api/repositories/$org_repos`,
    params: {
      page: currentPage.toString(),
      ...(search && { search_term: search }),
    },
    handler: [currentPage, search],
  }) as RepositoriesFetchResponse

  let polling: ReturnType<typeof setInterval>

  const isSearching = useMemo(() => search.length > 0, [search])
  const isUpdating = useMemo(
    () => (!loadingPage && !data) || data?.status === 'updating',
    [data, loadingPage],
  )
  const hasPagination = useMemo(() => data?.total_pages > 1, [data])
  const isEmpty = useMemo(() => data && data.items?.length === 0, [data])

  const onUpdateOrgRepositories = async () => {
    setUpdatingRepositories(true)

    try {
      await Repositories.refreshList()
    } catch (err) {
      // TODO
    } finally {
      setUpdatingRepositories(false)
      setTimeout(() => refetch(), 1000)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  useEffect(() => {
    if (data) {
      setLoadingPage(false)
    }

    if (data && !isUpdating) {
      clearInterval(polling)
    } else {
      polling = setInterval(() => refetch(), 5000)
    }

    return () => {
      clearInterval(polling)
    }
  }, [data])

  return (
    <>
      <TopBar title="Add Repository" />
      <FixedContent>
        <div className={styles.content}>
          <Header
            loading={loadingPage}
            onSearchChange={term => setSearch(term)}
            searchFieldDisabled={(loading && !isSearching) || isUpdating}
            searchFieldLoading={loading && isSearching}
          />
          {!loadingPage && !isUpdating && !isEmpty && (
            <RefreshList
              data={data?.last_updated}
              loading={updatingRepositories}
              onRefresh={() => {
                onUpdateOrgRepositories()
              }}
            />
          )}
          <div className={styles.info}>
            {isUpdating && <LoadingRepositories />}
            {isEmpty && isSearching && <NoResults />}
            {!isUpdating && (
              <ListItems
                data={data?.items}
                loading={loadingPage}
                refetch={() => refetch()}
              />
            )}
          </div>
          {hasPagination && (
            <ReposPagination
              currentPage={data?.current_page}
              onPageClick={page => setCurrentPage(page)}
              total={data?.total_pages}
            />
          )}
        </div>
      </FixedContent>
    </>
  )
}

export default NewRepository
