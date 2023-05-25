import APIProxy from 'utils/APIProxy'

export default new APIProxy().mapURL(() => `/v1/admin/service_tokens`).get()
