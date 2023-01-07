export interface StatProps {
  data?: number[]
  value?: number
}

export interface StatsProps {
  issues: StatProps | undefined
  coverage: StatProps | undefined
}

export interface StatsComponentProps {
  data: StatProps | undefined
  type: 'issues' | 'coverage'
}
