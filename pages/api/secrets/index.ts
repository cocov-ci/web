import APIProxy from 'utils/APIProxy'

export default new APIProxy()
  .mapURL(() => {
    return `/v1/secrets`
  })
  .get()
