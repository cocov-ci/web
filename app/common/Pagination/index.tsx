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

const slidingPaginationWindow = (numPages: number, current: number) => {
  const maxPerWindow = 9 // Odd is better!
  let pages: number[]

  if (current > maxPerWindow / 2 && numPages > maxPerWindow) {
    const around = (maxPerWindow - 1) / 2
    const first = Math.max(current - around, 1)
    const last = current + around

    const result = []

    for (let i = first; i <= Math.min(last, numPages); i++) {
      result.push(i)
    }

    if (result.length < maxPerWindow) {
      const upTo = result[0]

      for (let i = upTo - (maxPerWindow - result.length); i < upTo; i++) {
        result.unshift(i)
      }
    }

    pages = result
  } else {
    pages = [...Array(numPages)].map((i, idx) => idx + 1)
  }

  if (pages.length > maxPerWindow) {
    pages = pages.slice(0, maxPerWindow)
  }

  return pages
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

        {slidingPaginationWindow(total, currentPage).map(
          (page): React.ReactElement => {
            return (
              <li
                className={classNames(styles.page, {
                  [styles.active]: page === currentPage,
                })}
                key={page}
                onClick={() => onPageClick && onPageClick(page)}
              >
                {page}
              </li>
            )
          },
        )}

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
