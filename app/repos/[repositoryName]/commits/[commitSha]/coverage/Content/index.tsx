import { AlertTriangle, Cog, Send } from 'lucide-react'

import Alert from 'app/common/Alert'
import Box from 'app/common/Box'
import FileList from 'app/common/FileList'
import CommitHeader from 'app/repos/[repositoryName]/commits/[commitSha]/CommitHeader'
import NavMenu from 'app/repos/[repositoryName]/commits/[commitSha]/NavMenu'
import { CoverageResponseProps } from 'types/Coverage'

import styles from './Content.module.scss'

interface PageContentParams {
  repositoryName: string
  commitSha: string
  data: CoverageResponseProps
}

const PageContent = ({
  data,
  commitSha,
  repositoryName,
}: PageContentParams) => {
  return (
    <div className={styles.main}>
      <Box className={styles.box}>
        <CommitHeader head={data?.commit} repositoryName={repositoryName} />
        <NavMenu
          active="coverage"
          commitSha={commitSha}
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
            // loading={loading || Boolean(fileId)}
            repositoryName={repositoryName}
          />
        </div>
      </Box>
    </div>
  )
}

export default PageContent
