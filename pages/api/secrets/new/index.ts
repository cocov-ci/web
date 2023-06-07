import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .mapParams(req => ({
    name: req.body.name,
    data: req.body.data,
  }))
  .mapURL(() => {
    return `/v1/secrets`
  })
  .post()
