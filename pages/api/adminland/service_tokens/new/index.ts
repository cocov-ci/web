import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .mapParams(req => ({
    description: req.body.description,
  }))
  .mapURL(() => '/v1/admin/service_tokens')
  .post()
