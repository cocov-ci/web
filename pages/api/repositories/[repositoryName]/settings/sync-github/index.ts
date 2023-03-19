import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .mapURL(req => {
    const { repositoryName } = req.query

    return `/v1/repositories/${repositoryName}/settings/sync-github`
  })
  .post()
