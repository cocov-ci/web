'use client'

import classNames from 'classnames'
import { LucideSearch, LucideX } from 'lucide-react'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'

import randomBetween from '../../../utils/randomBetween'
import Input from '../Input'
import Kbd from '../Kbd'
import Loading from '../Loading'

import styles from './BranchSwitcher.module.scss'

type BranchSwitcherProps = {
  className?: string
  onClose?: () => void
  onSearchChange?: (event: ChangeEvent) => void
  loading?: boolean
  searchLoading?: boolean
  options?: Array<string>
  onSelectBranch?: (branchIndex: number) => void
}

const BranchSwitcher = ({
  options,
  className,
  searchLoading,
  onSearchChange,
  onSelectBranch,
  onClose,
  loading,
}: BranchSwitcherProps) => {
  const [selectedItem, setSelectedItem] = useState<number>(0)

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!options || options.length === 0) {
      return
    }

    switch (event.key) {
      case 'ArrowUp':
        if (selectedItem === 0) {
          setSelectedItem(options.length - 1)
        } else {
          setSelectedItem(selectedItem - 1)
        }

        break

      case 'ArrowDown':
        if (selectedItem === options.length - 1) {
          setSelectedItem(0)
        } else {
          setSelectedItem(selectedItem + 1)
        }

        break

      case 'Escape':
        onClose && onClose()

        break

      case 'Return':
        onSelectBranch && onSelectBranch(selectedItem)

        break
    }
  }

  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.background} />

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>Switch Branch</span>
          <div className={styles.close}>
            <Kbd size="mini" text="esc" variation="dark" />
            <button
              className={styles.closeButton}
              onClick={() => onClose && onClose()}
            >
              <LucideX size={24} />
            </button>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <Input
            autoFocus={true}
            className={styles.searchInput}
            icon={LucideSearch}
            loading={searchLoading}
            onChange={event => onSearchChange && onSearchChange(event)}
            onKeyUp={handleKeyUp}
            placeholder="Type to search..."
            type="text"
            variation="dark"
          />
        </div>
        <div className={styles.itemsContainer}>
          {loading &&
            new Array(randomBetween(1, 5)).fill(0).map((_, idx) => (
              // eslint-disable-next-line prettier/prettier,react/no-array-index-key
                <Loading className={styles.loading} height="35px" key={idx} type="skeleton" variation="dark" width="100%" />
            ))}
          {!loading &&
            options &&
            options.map((name, idx) => (
              <Link
                href="javascript:void(0)"
                key={name}
                onClick={() => onSelectBranch && onSelectBranch(idx)}
              >
                <div
                  className={classNames(styles.item, {
                    [styles.active]: selectedItem == idx,
                  })}
                >
                  {name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BranchSwitcher
