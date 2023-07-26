export interface AdminUser {
  user: {
    id: number
    login: string
    avatar_url: string
    admin: boolean
  }
  permissions?: {
    user: number
    admin: number
    maintainer: number
  }
}
