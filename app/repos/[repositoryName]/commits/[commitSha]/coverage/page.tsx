'use client'

import { useRouter } from 'next/navigation'

import Box from 'app/common/Box'
import FileList from 'app/common/FileList'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import NavMenu from 'app/repos/[repositoryName]/commits/[commitSha]/NavMenu'
import useFetch from 'hooks/useFetch'
import { CommitCoverageResponseProps } from 'types/Commits'

import styles from './Page.module.scss'

interface CommitsCoverage {
  params: { repositoryName: string; commitSha: string }
}

interface CommitsFetchResponse {
  data: CommitCoverageResponseProps
  loading: boolean
}

const CommitsCoverage = ({
  params: { repositoryName, commitSha },
}: CommitsCoverage) => {
  const router = useRouter()
  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/coverage`,
    handler: [],
  }) as CommitsFetchResponse

  if (!data && !loading) router.push(`/repositories/${repositoryName}`)

  return (
    <div className={styles.main}>
      <Box className={styles.box}>
        <CommitHeader
          head={data?.commit}
          loading={loading}
          repositoryName={repositoryName}
        />
        <NavMenu
          active="coverage"
          commitSha={commitSha}
          loading={loading}
          repositoryName={repositoryName}
        />
        <div className={styles.content}>
          <FileList
            className={styles.fileList}
            commitSha={commitSha}
            files={data?.files}
            repositoryName={repositoryName}
          />
        </div>
      </Box>
    </div>
  )
}

export default CommitsCoverage
