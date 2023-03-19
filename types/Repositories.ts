export interface RepositoryProps {
  id: number
  name: string
  description: string
  token: string
  coverage: number
  issues: number
  default_branch: string
  head: { checks_status: string; coverage_status: string }
  code?: number
}

export type OrgRepositoryStatus = 'absent' | 'present' | 'adding'
export interface OrgRepositoryProps {
  name: string
  description: string
  created_at: string
  pushed_at: string
  status: OrgRepositoryStatus
}

export interface OrgRepo {
  name: string
  description: string
  created_at: string
  pushed_at: string
  status: 'absent' | 'present' | 'adding'
}
