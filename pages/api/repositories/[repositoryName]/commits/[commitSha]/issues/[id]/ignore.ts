import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .mapParams(req => ({
    mode: req.body.mode,
    reason: req.body.reason,
  }))
  .mapURL(req => {
    const { repositoryName, commitSha, id } = req.query

    return `/v1/repositories/${repositoryName}/commits/${commitSha}/issues/${id}/ignore`
  })
  .post()
