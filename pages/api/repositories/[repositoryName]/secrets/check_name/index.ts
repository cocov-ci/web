import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    name: req.query.name,
  }))
  .mapURL(req => {
    const { repositoryName } = req.query

    return `/v1/repositories/${repositoryName}/secrets/check_name`
  })
  .post()
