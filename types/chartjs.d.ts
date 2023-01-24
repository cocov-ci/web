import type { TooltipPositionerFunction } from 'chart.js'

declare module 'chart.js' {
  interface TooltipPositionerMap {
    top: TooltipPositionerFunction<ChartType>
  }
}
