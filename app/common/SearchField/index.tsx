'use client'

import classNames from 'classnames'
import { LucideSearch } from 'lucide-react'
import React from 'react'

import Input from 'app/common/Input'

import styles from './SearchField.module.scss'

interface SearchFieldProps {
  className?: string
  loading?: boolean
  onSearch: (args: string) => void
}

const SearchField = ({
  className,
  loading = false,
  onSearch,
}: SearchFieldProps) => {
  let timer: ReturnType<typeof setTimeout>

  const SearchDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      onSearch(value)
    }, 500)
  }

  return (
    <div className={classNames(styles.searchField, className)}>
      <Input
        className={styles.input}
        icon={LucideSearch}
        loading={loading}
        onChange={SearchDebounce}
        placeholder="Type to Search"
        type="text"
        width="208px"
      />
    </div>
  )
}

export default SearchField
