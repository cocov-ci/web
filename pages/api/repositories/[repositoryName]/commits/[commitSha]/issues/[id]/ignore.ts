import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    mode: req.query.mode,
    reason: req.query.reason,
  }))
  .mapURL(req => {
    const { repositoryName, commitSha, id } = req.query

    return `/v1/repositories/${repositoryName}/commits/${commitSha}/issues/${id}/ignore`
  })
  .post()
