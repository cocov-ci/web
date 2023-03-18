export interface SecretParams {
  created_at: string
  id: number
  last_used_at?: string
  name: string
  owner: {
    avatar_url: string
    login: string
  }
  scope: 'repository' | 'organization'
}
