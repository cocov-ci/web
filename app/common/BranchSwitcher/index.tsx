'use client'

import classNames from 'classnames'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import Input from 'app/common/Input'
import Kbd from 'app/common/Kbd'
import Loading from 'app/common/Loading'
import { useSegments } from 'context/SegmentsContext'
import useFetch from 'hooks/useFetch'
import useOnClickOutside from 'hooks/useOnClickOutside'
import randomBetween from 'utils/randomBetween'

import styles from './BranchSwitcher.module.scss'

type BranchSwitcherProps = {
  className?: string
  onClose: () => void
}

interface BranchesFetchResponse {
  data: string[]
  loading: boolean
}

const BranchSwitcher = ({ className, onClose }: BranchSwitcherProps) => {
  const ref = useRef(null)
  const router = useRouter()
  const segments = useSegments()
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const [results, setResults] = useState<Array<string> | undefined>()
  const repositoryName = useMemo(() => segments[1], [segments])

  useOnClickOutside(ref, onClose)

  const { data: branches, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/branches`,
    handler: [],
  }) as BranchesFetchResponse

  const onSearchChange = (term: string) => {
    setResults(branches.filter(item => item.includes(term)))
  }

  const onSelectBranch = (selectedItem: string) => {
    router.push(`repos/${repositoryName}/branches/${selectedItem}`)
    onClose && onClose()
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results || results.length === 0) {
      return
    }

    switch (event.key) {
      case 'ArrowUp':
        if (selectedItem === 0) {
          setSelectedItem(results.length - 1)
        } else {
          setSelectedItem(selectedItem - 1)
        }

        break

      case 'ArrowDown':
        if (selectedItem === results.length - 1) {
          setSelectedItem(0)
        } else {
          setSelectedItem(selectedItem + 1)
        }

        break

      case 'Escape':
        onClose && onClose()

        break

      case 'Enter':
        onSelectBranch(results[selectedItem])

        break
    }
  }

  useEffect(() => {
    setResults(branches)
  }, [branches])

  return (
    <div className={classNames(styles.base, className)} ref={ref}>
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
              <X size={24} />
            </button>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <Input
            autoFocus={true}
            className={styles.searchInput}
            icon={Search}
            onChange={event =>
              branches.length > 0 && onSearchChange(event.target.value)
            }
            onKeyUp={handleKeyUp}
            placeholder="Type to search..."
            type="text"
            variation="dark"
          />
        </div>
        <div className={styles.itemsContainer}>
          {loading &&
            new Array(randomBetween(1, 5)).fill(0).map((_, idx) => (
              <Loading
                className={styles.loading}
                height="35px"
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                type="skeleton"
                variation="dark"
                width="100%"
              />
            ))}

          {!loading &&
            results?.map((name, idx) => (
              <button
                className={classNames(styles.item, {
                  [styles.active]: selectedItem == idx,
                })}
                key={name}
                onClick={e => {
                  e.preventDefault()
                  onSelectBranch(name)
                }}
              >
                {name}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BranchSwitcher
