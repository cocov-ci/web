import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(req => {
    const { repositoryName, commitSha, id } = req.query

    return `/v1/repositories/${repositoryName}/commits/${commitSha}/checks/${id}`
  })
  .get()
