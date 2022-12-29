import Button from 'app/common/Button'
import SearchField from 'app/common/SearchField'

import styles from './TopBarActions.module.scss'

const TopBarActions = () => {
  return (
    <>
      <SearchField className={styles.searchField} />
      <Button>Add Repository</Button>
    </>
  )
}

export default TopBarActions
