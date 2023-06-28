'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import Pagination from 'app/common/Pagination'
import { Item } from 'app/common/Sidebar'
import IssuesProvider from 'context/IssuesContext'
import { PagingProps } from 'types/Paging'
import API, { useAPI } from 'utils/api'

import SectionHeader from '../SectionHeader'

import List from './List'
import styles from './Page.module.scss'
import Sidebar from './Sidebar'
import { getUpdatedUrl } from './Utils'

interface IssuesParams {
  params: { repositoryName: string; commitSha: string }
}

const Issues = ({ params: { repositoryName, commitSha } }: IssuesParams) => {
  const searchParams = useSearchParams()
  const pathname = usePathname() as string
  const router = useRouter()
  const category = searchParams?.get('category') as string
  const source = searchParams?.get('source') as string
  const state = searchParams?.get('state') as string
  const page = searchParams?.get('page') as string
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page) || 1)

  const {
    result: issuesList,
    loading: issuesLoading,
    error: issuesError,
    refresh: issuesRefresh,
  } = useAPI(API.shared.issuesList, {
    repositoryName,
    source,
    page: currentPage,
    state,
    category,
    commitSHA: commitSha,
  })

  const {
    result: statesList,
    loading: statesLoading,
    error: statesError,
    refresh: statesRefresh,
  } = useAPI(API.shared.issuesStates, {
    commitSHA: commitSha,
    repositoryName,
  })

  const {
    result: sourcesList,
    loading: sourcesLoading,
    error: sourcesError,
    refresh: sourcesRefresh,
  } = useAPI(API.shared.issuesSources, {
    repositoryName,
    commitSHA: commitSha,
  })

  const {
    result: categoriesList,
    loading: categoriesLoading,
    error: categoriesError,
    refresh: categoriesRefresh,
  } = useAPI(API.shared.issuesCategories, {
    repositoryName,
    commitSHA: commitSha,
  })

  if (!issuesList && !issuesLoading) router.push(`/repos/${repositoryName}`)

  useEffect(() => {
    if (issuesList) setPageLoading(false)
  }, [issuesList])

  const hasPagination = useMemo(
    () => issuesList?.paging[0] && Boolean(issuesList?.paging[0].total_pages),
    [issuesList],
  )

  const paging: PagingProps = useMemo(
    () => issuesList?.paging[0] as PagingProps,
    [issuesList],
  )

  const onChangeRoute = (param: { [arg: string]: string | null }) => {
    router.replace(
      getUpdatedUrl({
        pathname,
        searchParams,
        param,
      }),
    )
  }

  return (
    <IssuesProvider
      commitSha={commitSha}
      refetch={() => {
        issuesRefresh()
        statesRefresh()
        sourcesRefresh()
        categoriesRefresh()
      }}
      repositoryName={repositoryName}
    >
      <FixedContent>
        <SectionHeader
          activeItem="issues"
          commit={issuesList?.commit}
          commitSha={commitSha}
          counter={issuesList?.repository.issues}
          loading={pageLoading || issuesLoading}
          repositoryName={repositoryName}
        />
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Sidebar
              allItemsText="All issues"
              className={styles.states}
              data={statesList}
              defaultSelectedItem={state || 'active'}
              loading={statesLoading}
              onSelectItem={item => {
                setCurrentPage(1)
                onChangeRoute({ state: item.id === 0 ? 'all' : item.name })
              }}
            />

            <Sidebar
              allItemsText="All sources"
              data={sourcesList}
              defaultSelectedItem={source}
              loading={sourcesLoading}
              onSelectItem={(item: Item) => {
                setCurrentPage(1)
                onChangeRoute({ source: item.id === 0 ? null : item.name })
              }}
            />

            <Sidebar
              allItemsText="All categories"
              data={categoriesList}
              defaultSelectedItem={category}
              loading={categoriesLoading}
              onSelectItem={(item: Item) => {
                setCurrentPage(1)
                onChangeRoute({ category: item.id === 0 ? null : item.name })
              }}
            />
          </div>
          <div className={styles.list}>
            <List issues={issuesList?.issues} loading={issuesLoading} />
            <div className={styles.paging}>
              {hasPagination && (
                <Pagination
                  className={styles.pagination}
                  currentPage={paging.page}
                  onPageClick={page => {
                    setCurrentPage(page)
                    onChangeRoute({ page: page === 1 ? null : page.toString() })
                  }}
                  total={paging.total_pages}
                />
              )}
            </div>
          </div>
        </div>
      </FixedContent>
    </IssuesProvider>
  )
}

export default Issues
