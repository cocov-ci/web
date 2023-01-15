'use client'

import Button from 'app/common/Button'
import SearchField from 'app/common/SearchField'

import styles from './TopBarActions.module.scss'

interface TopBarActionsProps {
  searchBarDisabled?: boolean
  searchBarLoading?: boolean
  onSearchChange: (arg: string) => void
}

const TopBarActions = ({
  searchBarLoading = false,
  onSearchChange,
}: TopBarActionsProps) => {
  return (
    <div className={styles.topBarActions}>
      <SearchField
        className={styles.searchField}
        loading={searchBarLoading}
        onSearch={onSearchChange}
      />
      <Button>Add Repository</Button>
    </div>
  )
}

export default TopBarActions
