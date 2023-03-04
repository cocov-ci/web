'use client'

import SearchField from 'app/common/SearchField'
import Text from 'app/common/Text'

import styles from './Header.module.scss'

const Header = () => {
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
        disabled={false}
        loading={false}
        onSearch={() => null}
      />
    </div>
  )
}

export default Header
