'use client'

import classNames from 'classnames'
import { ChevronFirst, ChevronLast } from 'lucide-react'
import React, { useState } from 'react'

import styles from './Pagination.module.scss'

interface PaginationProps {
  total: number
  currentPage: number
}

interface ArrowProps {
  direction: 'previous' | 'next'
}

const Pagination = ({ total, currentPage }: PaginationProps) => {
  const [active, setActive] = useState<number>(currentPage)
  const firstPage = active === 1
  const lastPage = active === total

  const Arrow = ({ direction }: ArrowProps) => {
    if (direction === 'previous') {
      return (
        <ChevronFirst
          className={classNames(styles.arrow, {
            [styles.disabled]: firstPage,
          })}
          onClick={() => !firstPage && setActive(active - 1)}
        />
      )
    } else {
      return (
        <ChevronLast
          className={classNames(styles.arrow, {
            [styles.disabled]: lastPage,
          })}
          onClick={() => !lastPage && setActive(active + 1)}
        />
      )
    }
  }

  return (
    <div className={styles.pagination}>
      <ul className={styles.pages}>
        <Arrow direction="previous" />

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

        <Arrow direction="next" />
      </ul>
    </div>
  )
}

export default Pagination
