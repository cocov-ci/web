import APIProxy from 'utils/APIProxy'
export { nonGETConfig as config } from 'utils/APIProxy'

export default new APIProxy()
  .requireMethod('POST')
  .mapURL(() => '/v1/admin/sidekiq_panel_token')
  .mapResponse(data => {
    return {
      url_redirection: `${process.env.COCOV_API_URL}/admin/sidekiq_panel?token=${data.token}`,
    }
  })
  .post()
