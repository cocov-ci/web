import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('DELETE')
  .mapURL(req => {
    const { userID } = req.query

    return `/v1/admin/users/${userID}`
  })
  .delete()
