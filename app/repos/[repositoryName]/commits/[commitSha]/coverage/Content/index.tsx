import { AlertTriangle, Cog, Send } from 'lucide-react'

import Alert from 'app/common/Alert'
import FileList from 'app/common/FileList'
import FixedContent from 'app/common/FixedContent'
import { CoverageResponseProps } from 'types/Coverage'

import SectionHeader from '../../SectionHeader'

import styles from './Content.module.scss'

interface PageContentParams {
  repositoryName: string
  commitSha: string
  isFilePage?: boolean
  data: CoverageResponseProps
}

const PageContent = ({
  data,
  commitSha,
  repositoryName,
  isFilePage,
}: PageContentParams) => {
  return (
    <FixedContent>
      <SectionHeader
        activeItem="coverage"
        commit={data?.commit}
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
        {(data?.status === 'queued' || data?.status === 'in_progress') && (
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
          files={data?.status === 'completed' ? data?.files : []}
          repositoryName={repositoryName}
          resetScrollAfterPageLoad={!isFilePage}
        />
      </div>
    </FixedContent>
  )
}

export default PageContent
