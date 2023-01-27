import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(req => {
    const { repositoryName, branchName } = req.query

    return `/v1/repositories/${repositoryName}/branches/graphs/${branchName}`
  })
  .get()
