'use client'

import { redirect, useSearchParams } from 'next/navigation'

import Box from 'app/common/Box'
import CommitHeader from 'app/common/CommitHeader'
import useFetch from 'hooks/useFetch'

import CategoriesList from './CategoriesList'
import styles from './Page.module.scss'
import SourcesList from './SourcesList'

interface CommitsIssues {
  params: { repositoryName: string; commitSha: string }
}

const CommitsIssues = ({
  params: { repositoryName, commitSha },
}: CommitsIssues) => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') as string
  const source = searchParams.get('category') as string

  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues`,
    handler: [category, source],
  })

  // if (!dataBadges) redirect(`/v1/repositories/${repositoryName}`)

  return (
    <div className={styles.main}>
      <Box className={styles.box}>
        {/* <CommitHeader  /> */}
        <div className={styles.sidebar}>
          <SourcesList commitSha={commitSha} repositoryName={repositoryName} />
          <CategoriesList
            commitSha={commitSha}
            repositoryName={repositoryName}
          />
        </div>
        <div>lista</div>
      </Box>
    </div>
  )
}

export default CommitsIssues
