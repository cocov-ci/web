import { ChartProps, ChartTypeProps } from './Chart'

export interface StatProps {
  value?: number
  data?: ChartProps
}

export interface StatsProps {
  issues: StatProps | undefined
  coverage: StatProps | undefined
}

export interface StatsComponentProps {
  data: StatProps | undefined
  type: ChartTypeProps
}
