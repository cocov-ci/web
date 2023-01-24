import { Tooltip } from 'chart.js'

import variables from 'styles/variables.module.scss'
import { ChartGradientProps, ChartOptionsProps } from 'types/Chart'
import { inconsolata } from 'utils/fonts'

export const chartPadding = 55

// Arrays containing gradient start, gradient stop, and border
const chartColors = {
  coverage: ['rgba(17, 150, 255, 0.16)', 'rgba(17, 150, 255, 0)', '#a5d1f4'],
  issues: ['rgba(233, 172, 211, 0.42)', 'rgba(233, 172, 211, 0)', '#e4aace'],
}

const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000) + 'k'
    : Math.sign(num) * Math.abs(num)
}

// Create a custom tooltip positioner to put at the bottom of the chart area
Tooltip.positioners.top = function (items) {
  const pos = Tooltip.positioners.average(items)

  // Happens when nothing is found
  if (pos === false) {
    return false
  }

  const chart = this.chart

  return {
    x: pos.x,
    y: chart.chartArea.top,
    xAlign: 'center',
    yAlign: 'bottom',
  }
}

export const generateGradient = ({
  ctx,
  isCoverage,
  height,
}: ChartGradientProps) => {
  if (!ctx) return

  const gradient = ctx.createLinearGradient(0, height / 2, 0, height)
  const [colorStart, colorStop] = isCoverage
    ? chartColors.coverage
    : chartColors.issues

  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(0.6, colorStop)
  gradient.addColorStop(1, colorStop)

  return gradient
}

export const getBorderColor = (isCoverage: boolean) =>
  (isCoverage ? chartColors.coverage : chartColors.issues)[2]

export const getPlugins = ({
  fullChart,
}: Pick<ChartOptionsProps, 'fullChart'>) => [
  {
    ...(fullChart && {
      afterDraw: chart => {
        if (chart.tooltip?._active?.length) {
          const x = chart.tooltip._active[0].element.x
          const yAxis = chart.scales.y
          const ctx = chart.ctx
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(x, yAxis.top)
          ctx.lineTo(x, yAxis.bottom)
          ctx.lineWidth = 1
          ctx.strokeStyle = variables.colorGray
          ctx.stroke()
          ctx.restore()
        }
      },
    }),
  },
]

export const getOptions = ({
  fullChart,
  coverage,
  labels,
  maxValue,
}: ChartOptionsProps) => ({
  pointStyle: false,
  borderWidth: 1,
  font: {
    family: inconsolata.style.fontFamily,
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    tooltip: {
      enabled: fullChart,
      position: 'top',
      displayColors: false,
      bodyAlign: 'center',
      titleMarginBottom: 1,
      callbacks: {
        title: context => {
          return context[0].label.split('/').reverse().join(' ')
        },
      },
    },
  },
  layout: {
    padding: {
      top: 55,
    },
  },
  scales: {
    x: {
      display: fullChart,
      beginAtZero: true,
      ticks: {
        maxRotation: 35,
        padding: -5,
        autoSkip: false,
        color: variables.colorGrayMedium,
        font: {
          size: 15,
        },
        callback: (val: number, index: number) => {
          return index % 3 === 0 && index !== 0 ? labels[val] : ''
        },
      },
      border: {
        z: 1,
        color: variables.colorGrayMedium,
        width: 1,
      },
      grid: {
        color: null,
      },
    },
    y: {
      display: fullChart,
      min: 0,
      max: coverage ? 100 : maxValue,
      beginAtZero: true,
      ticks: {
        stepSize: coverage ? 50 : Math.round(maxValue / 2),
        color: variables.colorGrayMedium,
        callback: (val: number) => (coverage ? `${val}%` : kFormatter(val)),
        font: {
          size: 15,
        },
      },
      border: {
        color: variables.colorGrayMedium,
        width: 1,
      },
    },
  },
})

export const makeFakePoints = (): number[] =>
  new Array(31)
    .fill(0)
    .map(() => Math.random() * 100)
    .map(Math.ceil)
