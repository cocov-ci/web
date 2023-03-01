import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(req => {
    const { repositoryName } = req.query

    return `/v1/repositories/${repositoryName}/settings/delete`
  })
  .post()
