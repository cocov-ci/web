import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(req => {
    const { repositoryName } = req.query

    return `/v1/repositories/${repositoryName}/graphs`
  })
  .mapResponse(data => {
    for (const k in data) {
      data[k] = Object.values(data[k]).map(item => Number(item))
    }

    return data
  })
  .get()
