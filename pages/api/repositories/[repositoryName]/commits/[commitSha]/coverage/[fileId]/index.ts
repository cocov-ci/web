import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(req => {
    const { repositoryName, commitSha, fileId } = req.query

    return `/v1/repositories/${repositoryName}/commits/${commitSha}/coverage/file/${fileId}`
  })
  .get()
