export interface SettingsResponseProps {
  permissions: {
    can_delete: boolean
    can_regen_token: boolean
    can_sync_github: boolean
  }
}
