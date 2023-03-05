import { PagingProps } from './Paging'

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

export interface RepositoriesResponseProps {
  repositories: RepositoryProps[]
  paging: PagingProps[]
}

export interface DeleteRepositoriesResponseParams {
  code?: string
}

export interface RegenTokenResponseProps {
  new_token: string
}

export interface UpdateOrgReposResponseProps {
  [arg: string]: string
}

export type OrgRepositoryStatus = 'absent' | 'present' | 'adding'
export interface OrgRepositoryProps {
  name: string
  description: string
  created_at: string
  pushed_at: string
  status: OrgRepositoryStatus
}

export interface OrgRepositoriesResponseProps {
  status: 'updating' | 'ok'
  paging: PagingProps[]
  total_pages: number
  current_page: number
  last_updated: string
  items: OrgRepositoryProps[]
}
