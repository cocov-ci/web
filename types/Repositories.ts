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
