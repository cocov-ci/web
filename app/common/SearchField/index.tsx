'use client'

import classNames from 'classnames'
import { Loader, Search } from 'lucide-react'
import React from 'react'

import Loading from 'app/common/Loading'

import styles from './SearchField.module.scss'

interface SearchFieldProps {
  className?: string
  loading: boolean
}

const SearchField = ({ className, loading = false }: SearchFieldProps) => {
  return (
    <label className={classNames(styles.searchField, className)}>
      {loading ? (
        <Loading
          className={styles.icon}
          size={18}
          spinnerIcon={Loader}
          tiny={true}
        />
      ) : (
        <Search className={styles.icon} size={18} />
      )}
      <input onChange={e => null} placeholder="Type to Search" type="text" />
    </label>
  )
}

export default SearchField
