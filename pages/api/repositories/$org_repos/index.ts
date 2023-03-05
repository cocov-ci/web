import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    page: req.query.page,
    search_term: req.query.search_term,
  }))
  .get('/v1/repositories/$org_repos')
