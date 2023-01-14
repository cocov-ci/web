export interface RepositoriesResponseProps {
  data: {
    repositories: string[]
    paging: [
      {
        page: number
        total_pages: number
      },
    ]
  }
}
