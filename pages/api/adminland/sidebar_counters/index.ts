import APIProxy from 'utils/APIProxy'

export default new APIProxy().mapURL(() => `/v1/admin/sidebar_counters`).get()
