import SearchField from 'app/common/SearchField'
import Text from 'app/common/Text'

import styles from './Header.module.scss'
import LoadingComponent from './Loading'

interface HeaderProps {
  searchFieldDisabled?: boolean
  searchFieldLoading?: boolean
  loading: boolean
  onSearchChange: (arg: string) => void
}

const Header = ({
  searchFieldDisabled,
  searchFieldLoading,
  onSearchChange,
  loading,
}: HeaderProps) => {
  if (loading) {
    return <LoadingComponent />
  }

  return (
    <div className={styles.header}>
      <Text className={styles.description}>
        Below is a list of repositories from your GitHub Organization. Use the
        button at the side of the repository you wish to add to Cocov to add it
        to this instance. As the list may be quite large, the field on the right
        can be used to filter through repositories.
      </Text>
      <SearchField
        className={styles.searchField}
        disabled={searchFieldDisabled}
        loading={searchFieldLoading}
        onSearch={onSearchChange}
      />
    </div>
  )
}

export default Header
