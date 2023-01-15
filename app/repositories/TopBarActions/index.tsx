import Button from 'app/common/Button'
import SearchField from 'app/common/SearchField'

import styles from './TopBarActions.module.scss'

interface TopBarActionsProps {
  searchFieldDisabled?: boolean
  searchFieldLoading?: boolean
  onSearchChange: (arg: string) => void
}

const TopBarActions = ({
  searchFieldLoading = false,
  searchFieldDisabled = false,
  onSearchChange,
}: TopBarActionsProps) => {
  return (
    <div className={styles.topBarActions}>
      <SearchField
        className={styles.searchField}
        disabled={searchFieldDisabled}
        loading={searchFieldLoading}
        onSearch={onSearchChange}
      />
      <Button>Add Repository</Button>
    </div>
  )
}

export default TopBarActions
