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
  makeFakePoints,
  roundValue,
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
  const dataType = useMemo(
    () => (data.length === 0 ? 'empty' : type),
    [type, data],
  )

  const dataPoints = useMemo(
    () =>
      data.length === 0 ? makeFakePoints() : data.map(item => roundValue(item)),
    [data],
  )

  useEffect(() => {
    const chart = chartRef.current

    if (!chart || (!fullChart && dataType === 'empty')) {
      return
    }

    setChartData({
      labels,
      datasets: [
        {
          data: dataPoints,
          tension: 0.1,
          fill: true,
          ...(dataType === 'empty' && { borderDash: [8, 5] }),
          borderColor: getBorderColor(dataType),
          backgroundColor: generateGradient({
            height: chartHeight,
            fullChart,
            ctx: chart.ctx,
            type: dataType,
          }),
        },
      ],
    })
  }, [dataPoints, fullChart, dataType])

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
          type: dataType,
          labels,
          maxValue: data.length === 0 ? 100 : Math.max(...dataPoints),
        })}
        plugins={[getPlugins({ fullChart })]}
        ref={chartRef}
        width={width}
      />
    </div>
  )
}

export default Chart
