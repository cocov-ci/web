'use client'

import classNames from 'classnames'
import { ChevronFirst, ChevronLast } from 'lucide-react'
import React from 'react'

import styles from './Pagination.module.scss'

export interface PaginationProps {
  total: number
  currentPage: number
  onPageClick: (page: number) => void
  className?: string
}

interface ArrowProps {
  direction: 'previous' | 'next'
  disabled: boolean
  onClick: () => void
}

const Arrow = ({ direction, disabled, onClick }: ArrowProps) => {
  const Component = direction === 'previous' ? ChevronFirst : ChevronLast

  return (
    <Component
      className={classNames(styles.arrow, {
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
    />
  )
}

const Pagination = ({
  total,
  currentPage,
  onPageClick,
  className,
}: PaginationProps) => {
  const firstPage = currentPage === 1
  const lastPage = currentPage === total

  return (
    <div className={classNames(styles.pagination, className)}>
      <ul className={styles.pages}>
        <Arrow
          direction="previous"
          disabled={firstPage}
          onClick={() =>
            !firstPage && onPageClick && onPageClick(currentPage - 1)
          }
        />

        {[...Array(total)].map((item, index): React.ReactElement => {
          const pageNumber = index + 1

          return (
            <li
              className={classNames(styles.page, {
                [styles.active]: pageNumber === currentPage,
              })}
              key={pageNumber}
              onClick={() => onPageClick && onPageClick(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}

        <Arrow
          direction="next"
          disabled={lastPage}
          onClick={() =>
            !lastPage && onPageClick && onPageClick(currentPage + 1)
          }
        />
      </ul>
    </div>
  )
}

export default Pagination
