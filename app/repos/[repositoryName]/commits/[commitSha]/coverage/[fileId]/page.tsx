interface FileId {
  params: { repositoryName: string; commitSha: string; fileId: string }
}

const FileId = ({ params: { repositoryName, commitSha, fileId } }: FileId) => {
  return (
    <div>
      {repositoryName} {commitSha} {fileId}
    </div>
  )
}

export default FileId
