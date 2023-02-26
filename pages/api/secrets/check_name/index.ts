import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    repo_name: req.query.repo_name,
    name: req.query.name,
  }))
  .post('/v1/secrets/check_name')
