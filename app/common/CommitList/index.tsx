import classNames from 'classnames'
import React from 'react'

import CommitHeader, { CommitHeaderProps } from '../CommitHeader'
import Loading from '../CommitHeader/Loading'
import Pagination, { PaginationProps } from '../Pagination'

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
  }
  onClickItem?: (item: CommitListItem) => void
  onChangePage?: (requestedPage: number) => void
  loading?: boolean
}

type RowProps = {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

const Row = ({ children, className, onClick }: RowProps) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div className={classNames(styles.row, className)} onClick={onClick}>
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

const CommitList = ({
  className,
  commits,
  paginationData,
  loading,
  onChangePage,
  onClickItem,
}: CommitListProps) => {
  const commitList = () =>
    commits.map(c => (
      <Row
        key={c.commitInfo.headSHA}
        onClick={() => onClickItem && onClickItem(c)}
      >
        <div className={styles.headerWrapper}>
          <CommitHeader {...c.commitInfo} readonly={true} />
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
      <Row className={styles.loading} key={`loading_${idx}`}>
        <div className={styles.headerWrapper}>
          <Loading />
        </div>
        <div className={styles.counters}>
          <div className={styles.issuesCounter} />
          <div className={styles.coverageCounter} />
        </div>
      </Row>
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
            className={styles.paginationComponent}
            onPageClick={p => onChangePage && onChangePage(p)}
            {...paginationData}
          />
        )}
      </div>
    </div>
  )
}

export default CommitList
