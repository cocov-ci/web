'use client'

import Pagination from 'app/common/Pagination'

import styles from './Pagination.module.scss'

interface ReposPaginationParams {
  total: number
  currentPage: number
  onPageClick: (arg: number) => void
}

const ReposPagination = ({
  total,
  currentPage,
  onPageClick,
}: ReposPaginationParams) => {
  return (
    <div className={styles.paging}>
      <Pagination
        className={styles.paginationComponent}
        currentPage={currentPage}
        onPageClick={onPageClick}
        total={total}
      />
    </div>
  )
}

export default ReposPagination
