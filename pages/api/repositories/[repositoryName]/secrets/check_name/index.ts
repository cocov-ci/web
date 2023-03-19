import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .mapParams(req => ({
    name: req.body.name,
  }))
  .mapURL(req => {
    const { repositoryName } = req.query

    return `/v1/repositories/${repositoryName}/secrets/check_name`
  })
  .post()
