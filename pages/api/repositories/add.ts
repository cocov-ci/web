import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    name: req.query.name,
  }))
  .post('/v1/repositories')
