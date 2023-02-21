import { RepositoryProps } from './Repositories'

export interface SettingsResponseProps extends SettingsPermissionsProps {
  repository: Omit<RepositoryProps, 'head'>
  secrets_count: number
}

export interface SettingsPermissionsProps {
  permissions: {
    can_delete: boolean
    can_regen_token: boolean
    can_sync_github: boolean
  }
}
export interface RegenTokenResponseProps {
  new_token: string
}
