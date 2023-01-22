export type ChartProps = number[]

export type ChartTypeProps = 'issues' | 'coverage'

export interface ChartComponentProps {
  data?: ChartProps
  type: ChartTypeProps
  className?: string
  width: number
  height: number
}
