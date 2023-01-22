'use client'

import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'

import { ChartComponentProps } from 'types/Chart'

import styles from './Chart.module.scss'
import { generateGradient, getBorderColor, options } from './Utils'

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement)

const labels = new Array(31).fill(0).map((_, i) => i + 1)

const Chart = ({
  data = [],
  type,
  width,
  height,
  className,
}: ChartComponentProps) => {
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })

  const coverage = type === 'coverage'

  useEffect(() => {
    const chart = chartRef.current

    if (!chart || data.length === 0) {
      return
    }

    setChartData({
      labels,
      datasets: [
        {
          // Convert null values to Zero
          data: data.map(item => (!item ? 0 : item)),
          borderColor: getBorderColor(coverage),
          backgroundColor: generateGradient({
            height: height,
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
      style={{ width, height }}
    >
      <Line
        data={chartData}
        height={height}
        options={options}
        ref={chartRef}
        width={width}
      />
    </div>
  )
}

export default Chart
