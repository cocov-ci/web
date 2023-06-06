export interface AdminRepository {
  id: number
  name: string
  description: string
  cache_size: number
  commits_size: number
  created_at: string
  accessible_by_count: number
}
