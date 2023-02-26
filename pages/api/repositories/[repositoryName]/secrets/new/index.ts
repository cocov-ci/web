import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    name: req.query.name,
    data: req.query.data,
  }))
  .mapURL(req => {
    const { repositoryName } = req.query

    return `/v1/repositories/${repositoryName}/secrets`
  })
  .post()
