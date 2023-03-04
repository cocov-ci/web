'use client'

import Pagination from 'app/common/Pagination'

import styles from './Pagination.module.scss'

const ReposPagination = () => {
  return (
    <div className={styles.paging}>
      <Pagination
        className={styles.paginationComponent}
        currentPage={1}
        onPageClick={() => null}
        total={10}
      />
    </div>
  )
}

export default ReposPagination
