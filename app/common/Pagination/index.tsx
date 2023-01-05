'use client'

import classNames from 'classnames'
import { ChevronFirst, ChevronLast } from 'lucide-react'
import React, { useState } from 'react'

import styles from './Pagination.module.scss'

interface PaginationProps {
  total: number
  currentPage: number
}

const Pagination = ({ total, currentPage }: PaginationProps) => {
  const [active, setActive] = useState<number>(currentPage)

  return (
    <div className={styles.pagination}>
      <ul className={styles.pages}>
        <ChevronFirst />
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
        <ChevronLast />
      </ul>
    </div>
  )
}

export default Pagination
