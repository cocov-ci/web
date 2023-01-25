export type ChartProps = number[]

export type ChartTypeProps = 'issues' | 'coverage' | 'empty'
export interface ChartComponentProps {
  data?: ChartProps
  labels?: (number | string)[]
  type: ChartTypeProps
  className?: string
  width: number
  height: number
  fullChart?: boolean
}

export interface ChartOptionsProps {
  type: ChartTypeProps
  labels: (number | string)[]
  maxValue: number
  fullChart: boolean
}

export interface ChartResponseProps {
  coverage: { [any: string]: number | null }
  issues: { [any: string]: number | null }
}

export interface ChartGradientProps {
  ctx: CanvasRenderingContext2D
  fullChart: boolean
  type: ChartTypeProps
  height: number
}
