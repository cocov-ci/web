import APIProxy from 'utils/APIProxy'

export default new APIProxy().post('/v1/repositories/$org_repos/update')
