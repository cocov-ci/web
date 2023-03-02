import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    source: req.query.source,
    category: req.query.category,
    state: req.query.state,
    page: req.query.page,
  }))
  .mapURL(req => {
    const { repositoryName, commitSha } = req.query

    return `/v1/repositories/${repositoryName}/commits/${commitSha}/issues`
  })
  .get()
