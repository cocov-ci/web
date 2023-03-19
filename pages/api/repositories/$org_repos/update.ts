import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .post('/v1/repositories/$org_repos/update')
