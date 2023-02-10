'use client'

import { AlertTriangle, Cog, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Alert from 'app/common/Alert'
import Box from 'app/common/Box'
import FileList from 'app/common/FileList'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import File from 'app/repos/[repositoryName]/commits/[commitSha]/coverage/File'
import NavMenu from 'app/repos/[repositoryName]/commits/[commitSha]/NavMenu'
import useFetch from 'hooks/useFetch'
import { CoverageResponseProps, FileIdReponseProps } from 'types/Coverage'

import styles from './Page.module.scss'

interface CoverageParams {
  params: { repositoryName: string; commitSha: string; fileId: string }
}

interface CoverageFetchResponse {
  data: CoverageResponseProps
  loading: boolean
  error: string
}

interface FileIdFetchResponse {
  data: FileIdReponseProps
  loading: boolean
  error: string
}

const Coverage = ({
  params: { repositoryName, commitSha, fileId },
}: CoverageParams) => {
  const router = useRouter()

  const { data, loading, error } = useFetch({
    url: !fileId
      ? `/api/repositories/${repositoryName}/commits/${commitSha}/coverage`
      : null,
    handler: [],
  }) as CoverageFetchResponse

  const { data: dataFileId, error: errorFileId } = useFetch({
    url:
      fileId &&
      `/api/repositories/${repositoryName}/commits/${commitSha}/coverage/${fileId[0]}`,
    handler: [fileId],
  }) as FileIdFetchResponse

  if (error) router.push(`/repos/${repositoryName}`)

  if (errorFileId)
    router.push(`/repos/${repositoryName}/commits/${commitSha}/coverage`)

  return (
    <div className={styles.main}>
      <Box className={styles.box}>
        <CommitHeader
          head={data?.commit}
          loading={loading || Boolean(fileId)}
          repositoryName={repositoryName}
        />
        <NavMenu
          active="coverage"
          commitSha={commitSha}
          loading={loading || Boolean(fileId)}
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
          <FileList
            className={styles.fileList}
            commitSha={commitSha}
            files={data?.status === 'processed' ? data?.files : []}
            loading={loading || Boolean(fileId)}
            repositoryName={repositoryName}
          />
        </div>
      </Box>
      {fileId && (
        <File
          commitSha={commitSha}
          data={dataFileId}
          repositoryName={repositoryName}
        />
      )}
    </div>
  )
}

export default Coverage
