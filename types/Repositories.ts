import { StatsProps } from './Stats'

export interface RepositoriesResponseProps {
  repositories: string[]
  paging: [
    {
      page: number
      total_pages: number
    },
  ]
}

export interface RepositoriesProps {
  title: string
  description?: string
  stats: StatsProps
}
