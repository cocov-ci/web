'use client'

import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'

import { ChartComponentProps } from 'types/Chart'

import styles from './Chart.module.scss'
import {
  chartPadding,
  generateGradient,
  getBorderColor,
  getOptions,
  getPlugins,
} from './Utils'

ChartJS.register(
  CategoryScale,
  Filler,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
)

const Chart = ({
  data = [],
  labels = new Array(31).fill(0).map((_, i) => i + 1),
  type,
  width,
  height,
  className,
  fullChart = false,
}: ChartComponentProps) => {
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })

  const chartHeight = useMemo(() => height + chartPadding, [height])
  const coverage = useMemo(() => type === 'coverage', [type])

  useEffect(() => {
    const chart = chartRef.current

    if (!chart || data.length === 0) {
      return
    }

    setChartData({
      labels,
      datasets: [
        {
          data: data,
          tension: 0.1,
          fill: true,
          borderColor: getBorderColor(coverage),
          backgroundColor: generateGradient({
            height: chartHeight,
            ctx: chart.ctx,
            isCoverage: coverage,
          }),
        },
      ],
    })
  }, [data])

  return (
    <div
      className={classNames(styles.chart, className)}
      style={{ width, height: chartHeight }}
    >
      <Line
        data={chartData}
        height={chartHeight}
        options={getOptions({
          fullChart,
          coverage,
          labels,
          maxValue: Math.max(...data),
        })}
        plugins={getPlugins({ fullChart })}
        ref={chartRef}
        width={width}
      />
    </div>
  )
}

export default Chart
