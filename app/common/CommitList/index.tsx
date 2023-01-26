'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import CommitHeader from 'app/common/CommitHeader'
import Loading from 'app/common/CommitHeader/Loading'
import Pagination from 'app/common/Pagination'
import { CommitHeaderProps } from 'types/Branches'
import Url from 'types/Url'

import styles from './CommitList.module.scss'

export type CommitListItem = {
  issues?: number
  coverage?: number
  commitInfo: CommitHeaderProps
}

type CommitListProps = {
  className?: string
  commits: Array<CommitListItem>
  paginationData?: {
    total: number
    currentPage: number
    onPageClick: () => void
  }
  onChangePage?: (requestedPage: number) => void
  loading?: boolean
}

type RowProps = {
  children?: React.ReactNode
  className?: string
  href: Url
}

type BaseRowProps = {
  children?: React.ReactNode
  className?: string
}

const BaseRow = ({ children, className }: BaseRowProps) => (
  <div className={classNames(styles.row, className)}>
    <div className={styles.rail} />
    <div className={styles.virtualSpacers}>
      <div className={styles.commitSpacer} />
      <div className={styles.countersSpacer}>
        <div className={styles.issuesSpacer} />
        <div className={styles.coverageSpacer} />
      </div>
    </div>
    <div className={styles.rowWrapper}>{children}</div>
  </div>
)

const Row = ({ children, className, href }: RowProps) => (
  <Link href={href}>
    <BaseRow className={className}>{children}</BaseRow>
  </Link>
)

const CommitList = ({
  className,
  commits,
  paginationData,
  loading,
  onChangePage,
}: CommitListProps) => {
  const searchParams = useSearchParams()
  const repositoryName = searchParams.get('repositoryName')
  const branchName = searchParams.get('branchName')

  const commitList = () =>
    commits.map(c => (
      <Row
        href={`/repos/${repositoryName}/branches/${branchName}/commits/${c.commitInfo.headSHA}`}
        key={c.commitInfo.headSHA}
      >
        <div className={styles.headerWrapper}>
          <CommitHeader {...c.commitInfo} />
        </div>
        <div className={styles.counters}>
          <div className={styles.issuesCounter}>{c.issues}</div>
          <div className={styles.coverageCounter}>{c.coverage}%</div>
        </div>
      </Row>
    ))

  const loadingList = () =>
    new Array(5).fill(0).map((e, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <BaseRow className={styles.loading} key={`loading_${idx}`}>
        <div className={styles.headerWrapper}>
          <Loading />
        </div>
        <div className={styles.counters}>
          <div className={styles.issuesCounter} />
          <div className={styles.coverageCounter} />
        </div>
      </BaseRow>
    ))

  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.header}>
        <div className={styles.commitColumn}>Commit</div>
        <div className={styles.countersColumns}>
          <div className={styles.issuesColumn}>Issues</div>
          <div className={styles.coverageColumn}>Coverage</div>
        </div>
      </div>

      <div className={styles.rows}>
        {!loading ? commitList() : loadingList()}
      </div>

      <div className={styles.paging}>
        {paginationData && (
          <Pagination
            {...paginationData}
            className={styles.paginationComponent}
            onPageClick={p => onChangePage && onChangePage(p)}
          />
        )}
      </div>
    </div>
  )
}

export default CommitList
