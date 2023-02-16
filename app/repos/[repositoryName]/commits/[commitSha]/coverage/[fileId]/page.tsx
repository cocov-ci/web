import { redirect } from 'next/navigation'

import { CoverageResponseProps, FileIdReponseProps } from 'types/Coverage'
import fetcher from 'utils/fetchServer'

import PageContent from '../Content'

import File from './File'

interface CoverageParams {
  params: { repositoryName: string; commitSha: string; fileId: string }
}

const Coverage = async ({
  params: { repositoryName, commitSha, fileId },
}: CoverageParams) => {
  const data: CoverageResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/commits/${commitSha}/coverage`,
  )

  const dataFileId: FileIdReponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/commits/${commitSha}/coverage/file/${fileId}`,
  )

  if (!data || data?.code === 404) redirect(`/repos/${repositoryName}`)

  if (!dataFileId || dataFileId?.code === 404)
    redirect(`/repos/${repositoryName}/commits/${commitSha}/coverage`)

  return (
    <div>
      <PageContent
        commitSha={commitSha}
        data={data}
        isFilePage
        repositoryName={repositoryName}
      />
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
