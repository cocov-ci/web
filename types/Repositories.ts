export interface RepositoriesResponseProps {
  repositories: string[]
  paging: [
    {
      page: number
      total_pages: number
    },
  ]
}
