'use client'

import classNames from 'classnames'
import { Search } from 'lucide-react'
import React from 'react'

import styles from './SearchField.module.scss'

interface SearchFieldProps {
  className?: string
}

const SearchField = ({ className }: SearchFieldProps) => {
  return (
    <label className={classNames(styles.searchField, className)}>
      <Search className={styles.icon} size={18} />
      <input onChange={e => null} placeholder="Type to Search" type="text" />
    </label>
  )
}

export default SearchField
