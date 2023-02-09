'use client'

import { AlertTriangle, Cog, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Alert from 'app/common/Alert'
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
          {data?.status === 'waiting' && (
            <Alert
              className={styles.alert}
              description="Information about this commit's coverage will be displayed here after this instance receives it."
              icon={Send}
              title="Waiting for Data..."
            />
          )}
          {(data?.status === 'queued' || data?.status === 'processing') && (
            <Alert
              className={styles.alert}
              description="This instance is currently processing received coverage data. It should be available here in a few seconds."
              icon={Cog}
              title="Processing Data..."
            />
          )}
          {data?.status === 'errored' && (
            <Alert
              className={styles.alert}
              description="A problem prevented this instance from successfully processing the received coverage data. Please refer to the instance's log for more information."
              icon={AlertTriangle}
              title="Internal Error"
            />
          )}
          {data?.status === 'processed' && (
            <FileList
              className={styles.fileList}
              commitSha={commitSha}
              files={data?.files}
              repositoryName={repositoryName}
            />
          )}
        </div>
      </Box>
    </div>
  )
}

export default CommitsCoverage
