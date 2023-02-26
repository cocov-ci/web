import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(req => {
    const { repositoryName, id } = req.query

    return `/v1/repositories/${repositoryName}/secrets/${id}`
  })
  .delete()
