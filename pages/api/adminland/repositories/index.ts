import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapParams(req => ({
    page: req.query.page,
    search: req.query.searchTerm,
    per_page: 10,
  }))
  .get(`/v1/admin/repositories`)
