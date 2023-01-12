'use client'

import classNames from 'classnames'
import { ChevronFirst, ChevronLast } from 'lucide-react'
import React, { useState } from 'react'

import styles from './Pagination.module.scss'

export interface PaginationProps {
  total: number
  currentPage: number
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

const Pagination = ({ total, currentPage }: PaginationProps) => {
  const [active, setActive] = useState<number>(currentPage)
  const firstPage = active === 1
  const lastPage = active === total

  return (
    <div className={styles.pagination}>
      <ul className={styles.pages}>
        <Arrow
          direction="previous"
          disabled={firstPage}
          onClick={() => !firstPage && setActive(active - 1)}
        />

        {[...Array(total)].map((item, index): React.ReactElement => {
          const pageNumber = index + 1

          return (
            <li
              className={classNames(styles.page, {
                [styles.active]: pageNumber === active,
              })}
              key={pageNumber}
              onClick={() => setActive(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}

        <Arrow
          direction="next"
          disabled={lastPage}
          onClick={() => !lastPage && setActive(active + 1)}
        />
      </ul>
    </div>
  )
}

export default Pagination
