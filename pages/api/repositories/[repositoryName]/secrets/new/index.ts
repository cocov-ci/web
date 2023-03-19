import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .mapParams(req => ({
    name: req.body.name,
    data: req.body.data,
  }))
  .mapURL(req => {
    const { repositoryName } = req.query

    return `/v1/repositories/${repositoryName}/secrets`
  })
  .post()
