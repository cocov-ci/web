'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import FixedContent from 'app/common/FixedContent'
import Pagination from 'app/common/Pagination'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import NavMenu from 'app/repos/[repositoryName]/commits/[commitSha]/NavMenu'
import useFetch from 'hooks/useFetch'
import { IssuesResponseProps } from 'types/Issues'
import { PagingProps } from 'types/Paging'

import CategoriesList from './CategoriesList'
import List from './List'
import styles from './Page.module.scss'
import SourcesList from './SourcesList'
import { getUpdatedUrl } from './Utils'

interface IssuesParams {
  params: { repositoryName: string; commitSha: string }
}

interface IssuesFetchResponse {
  data: IssuesResponseProps
  loading: boolean
}

const Issues = ({ params: { repositoryName, commitSha } }: IssuesParams) => {
  const searchParams = useSearchParams()
  const pathname = usePathname() as string
  const router = useRouter()
  const category = searchParams.get('category') as string
  const source = searchParams.get('source') as string
  const page = searchParams.get('page') as string
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page) || 1)

  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues`,
    params: {
      source: source,
      category: category,
      page: currentPage.toString(),
    },
    handler: [category, source, currentPage],
  }) as IssuesFetchResponse

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
    <FixedContent>
      <CommitHeader
        head={data?.commit}
        loading={pageLoading}
        repositoryName={repositoryName}
      />
      <NavMenu
        active="issues"
        commitSha={commitSha}
        counter={data?.repository?.issues}
        loading={pageLoading}
        repositoryName={repositoryName}
      />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <SourcesList
            commitSha={commitSha}
            onItemChanged={item => {
              setCurrentPage(1)
              onChangeRoute({ source: item.id === 0 ? null : item.name })
            }}
            repositoryName={repositoryName}
          />
          <CategoriesList
            commitSha={commitSha}
            onItemChanged={item => {
              setCurrentPage(1)
              onChangeRoute({ category: item.id === 0 ? null : item.name })
            }}
            repositoryName={repositoryName}
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
  )
}

export default Issues
