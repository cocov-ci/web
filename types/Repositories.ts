export interface RepositoryResponseProps {
  id: number
  name: string
  description: string
  token: string
  coverage: number
  issues: number
  default_branch: string
  head: { checks_status: string; coverage_status: string }
}

export interface PagingProps {
  page: number
  total_pages: number
}

export interface RepositoriesResponseProps {
  repositories: RepositoryResponseProps[]
  paging: PagingProps[]
}
