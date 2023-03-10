import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(req => {
    const { repositoryName, commitSha } = req.query

    return `/v1/repositories/${repositoryName}/commits/${commitSha}/checks/re_run`
  })
  .post()
