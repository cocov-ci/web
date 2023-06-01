'use client'

import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import TopBar from 'app/common/TopBar'
import { useErrorBanner } from 'hooks/useBanner'
import API, { useAPI } from 'utils/api'

import Header from './Header'
import ListItems from './ListItems'
import LoadingRepositories from './LoadingRepositories'
import NoResults from './NoResults'
import styles from './Page.module.scss'
import ReposPagination from './Pagination'
import RefreshList from './RefreshList'

const NewRepository = () => {
  const { showBanner } = useErrorBanner()
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loadingPage, setLoadingPage] = useState<boolean>(true)
  const [updatingRepositories, setUpdatingRepositories] =
    useState<boolean>(false)
  const isSearching = useMemo(() => (search?.length ?? 0) > 0, [search])

  const { loading, error, result, refresh } = useAPI(API.shared.orgReposList, {
    page: currentPage,
    search_term: isSearching ? search : undefined,
  })

  let polling: ReturnType<typeof setInterval>
  const isUpdating = useMemo(
    () => (!loadingPage && !result) || result?.status === 'updating',
    [result, loadingPage],
  )
  const hasPagination = useMemo(() => (result?.total_pages ?? 0) > 1, [result])
  const isEmpty = useMemo(() => result?.items?.length === 0, [result])

  const onUpdateOrgRepositories = async () => {
    setUpdatingRepositories(true)

    try {
      await API.shared.orgRefreshReposList({})
    } catch (err) {
      showBanner({
        children: `Failed updating the repository list. Please try again.`,
      })
    } finally {
      setUpdatingRepositories(false)
      setTimeout(() => refresh(), 1000)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  useEffect(() => {
    if (result) {
      setLoadingPage(false)
    }

    if (result && !isUpdating) {
      clearInterval(polling)
    } else {
      polling = setInterval(() => refresh(), 5000)
    }

    return () => {
      clearInterval(polling)
    }
  }, [result])

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
          {!loadingPage && !isUpdating && !isEmpty && result && (
            <RefreshList
              date={result.last_updated}
              loading={updatingRepositories}
              onRefresh={() => {
                onUpdateOrgRepositories()
              }}
            />
          )}
          <div className={styles.info}>
            {isUpdating && <LoadingRepositories />}
            {isEmpty && isSearching && <NoResults />}
            {!isUpdating && result && (
              <ListItems
                data={result.items}
                loading={loadingPage}
                refetch={() => refresh()}
              />
            )}
          </div>
          {hasPagination && result && (
            <ReposPagination
              currentPage={result.current_page}
              onPageClick={page => setCurrentPage(page)}
              total={result.total_pages}
            />
          )}
        </div>
      </FixedContent>
    </>
  )
}

export default NewRepository
