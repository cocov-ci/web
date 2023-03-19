import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('DELETE')
  .mapURL(req => {
    const { repositoryName, id } = req.query

    return `/v1/repositories/${repositoryName}/secrets/${id}`
  })
  .delete()
