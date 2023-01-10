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
import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'

import Text from 'app/common/Text'
import { StatsComponentProps } from 'types/Stats'

import styles from './Stats.module.scss'
import { generateGradient, getBorderColor, options } from './Utils'

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement)

const labels = new Array(31).fill(0).map((_, i) => i + 1)

const Stats = ({ data: dataChart, type }: StatsComponentProps) => {
  const { data, value } = dataChart || {}
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })

  const chartRef = useRef<ChartJS>(null)
  const coverage = type === 'coverage'

  useEffect(() => {
    const chart = chartRef.current

    if (!chart || !data) {
      return
    }

    setChartData({
      labels,
      datasets: [
        {
          data: data,
          borderColor: getBorderColor(coverage),
          backgroundColor: generateGradient({
            ctx: chart.ctx,
            isCoverage: coverage,
          }),
        },
      ],
    })
  }, [])

  return (
    <div className={styles.stats}>
      {value && (
        <div className={styles.chart}>
          <Line
            data={chartData}
            height={80}
            options={options}
            ref={chartRef}
            width={182}
          />
        </div>
      )}
      <Text className={styles.description} variant="description">
        {coverage ? 'Coverage' : 'Issues'}
      </Text>

      <Text className={styles.value}>
        {!value ? <>&#8212;</> : coverage ? `${value}%` : value}
      </Text>
    </div>
  )
}

export default Stats
