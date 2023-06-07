import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('DELETE')
  .mapURL(req => {
    const { id } = req.query

    return `/v1//secrets/${id}`
  })
  .delete()
