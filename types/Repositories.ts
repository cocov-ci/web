export interface RepositoryResponseProps {
  id: number
  name: string
  description: string
  token: string
  coverage: number
  issues: number
}

export interface RepositoriesResponseProps {
  repositories: RepositoryResponseProps[]
  paging: [
    {
      page: number
      total_pages: number
    },
  ]
}
