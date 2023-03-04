import FixedContent from 'app/common/FixedContent'
import TopBar from 'app/common/TopBar'

import Header from './Header'
// import LoadingRepositories from './LoadingRepositories'
import styles from './Page.module.scss'
import ReposPagination from './Pagination'
import RefreshList from './RefreshList'
import RepositoryItem from './RepositoryItem'

const NewRepository = async () => {
  return (
    <>
      <TopBar title="Add Repository" />
      <FixedContent>
        <div className={styles.content}>
          <Header />
          <RefreshList />
          <div className={styles.info}>
            {/* <LoadingRepositories /> */}
            <RepositoryItem status="new" />
            <RepositoryItem status="alreadyExists" />
            <RepositoryItem status="adding" />
            <RepositoryItem status="new" />
            <RepositoryItem status="new" />
            <RepositoryItem status="new" />
          </div>
          <ReposPagination />
        </div>
      </FixedContent>
    </>
  )
}

export default NewRepository
