export type ChartProps = number[]

export type ChartTypeObjectProps = { [any: string]: number | null }

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
  coverage: ChartTypeObjectProps
  issues: ChartTypeObjectProps
}

export interface ChartGradientProps {
  ctx: CanvasRenderingContext2D
  fullChart: boolean
  type: ChartTypeProps
  height: number
}
