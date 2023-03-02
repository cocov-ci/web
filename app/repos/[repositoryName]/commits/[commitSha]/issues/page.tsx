'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import Pagination from 'app/common/Pagination'
import { Item } from 'app/common/Sidebar'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import NavMenu from 'app/repos/[repositoryName]/commits/[commitSha]/NavMenu'
import IssuesProvider from 'context/IssuesContext'
import useFetch from 'hooks/useFetch'
import {
  CommitsCategoriesResponseProps,
  CommitsSourcesResponseProps,
  CommitsStatesResponseProps,
} from 'types/Commits'
import { IssuesResponseProps } from 'types/Issues'
import { PagingProps } from 'types/Paging'

import List from './List'
import styles from './Page.module.scss'
import Sidebar from './Sidebar'
import { getUpdatedUrl } from './Utils'

interface IssuesParams {
  params: { repositoryName: string; commitSha: string }
}

interface CommitsCategoriesFetchResponse {
  data: CommitsCategoriesResponseProps
  loading: boolean
  refetch: () => void
}

interface CommitsSourcesFetchResponse {
  data: CommitsSourcesResponseProps
  loading: boolean
  refetch: () => void
}

interface IssuesFetchResponse {
  data: IssuesResponseProps
  loading: boolean
  refetch: () => void
}

interface CommitsStatesFetchResponse {
  data: CommitsStatesResponseProps
  loading: boolean
  refetch: () => void
}

const Issues = ({ params: { repositoryName, commitSha } }: IssuesParams) => {
  const searchParams = useSearchParams()
  const pathname = usePathname() as string
  const router = useRouter()
  const category = searchParams.get('category') as string
  const source = searchParams.get('source') as string
  const state = searchParams.get('state') as string
  const page = searchParams.get('page') as string
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page) || 1)

  const {
    data,
    loading,
    refetch: refetchIssues,
  } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues`,
    params: {
      source: source,
      category: category,
      state: state || 'active',
      page: currentPage.toString(),
    },
    handler: [category, source, state, currentPage],
  }) as IssuesFetchResponse

  const {
    data: dataStates,
    loading: loadingStates,
    refetch: refetchIssuesStates,
  } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/states`,
    handler: [],
  }) as CommitsStatesFetchResponse

  const {
    data: dataSources,
    loading: loadingSources,
    refetch: refetchIssuesSources,
  } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/sources`,
    handler: [],
  }) as CommitsSourcesFetchResponse

  const {
    data: dataCategories,
    loading: loadingCategories,
    refetch: refetchIssuesCategories,
  } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/categories`,
    handler: [],
  }) as CommitsCategoriesFetchResponse

  if (!data && !loading) router.push(`/repos/${repositoryName}`)

  useEffect(() => {
    if (data) setPageLoading(false)
  }, [data])

  const hasPagination = useMemo(
    () => data?.paging[0] && Boolean(data.paging[0]?.total_pages),
    [data],
  )

  const paging: PagingProps = useMemo(
    () => data?.paging[0] as PagingProps,
    [data],
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
        refetchIssues()
        refetchIssuesStates()
        refetchIssuesSources()
        refetchIssuesCategories()
      }}
      repositoryName={repositoryName}
    >
      <FixedContent>
        <CommitHeader
          head={data?.commit}
          loading={pageLoading}
          repositoryName={repositoryName}
        />
        <NavMenu
          active="issues"
          counter={data?.repository?.issues}
          loading={pageLoading}
        />
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Sidebar
              allItemsText="All issues"
              className={styles.states}
              data={dataStates}
              defaultSelectedItem={state || 'active'}
              loading={loadingStates}
              onSelectItem={item => {
                setCurrentPage(1)
                onChangeRoute({ state: item.id === 0 ? 'all' : item.name })
              }}
            />

            <Sidebar
              allItemsText="All sources"
              data={dataSources}
              defaultSelectedItem={source}
              loading={loadingSources}
              onSelectItem={(item: Item) => {
                setCurrentPage(1)
                onChangeRoute({ source: item.id === 0 ? null : item.name })
              }}
            />

            <Sidebar
              allItemsText="All categories"
              data={dataCategories}
              defaultSelectedItem={category}
              loading={loadingCategories}
              onSelectItem={(item: Item) => {
                setCurrentPage(1)
                onChangeRoute({ category: item.id === 0 ? null : item.name })
              }}
            />
          </div>
          <div className={styles.list}>
            <List issues={data?.issues} loading={loading} />
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
