import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    page: req.query.page,
    search_term: req.query.search_term,
    per_page: 10,
  }))
  .get('/v1/repositories')
