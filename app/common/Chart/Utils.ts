import { Chart, Plugin, Tooltip, TooltipItem } from 'chart.js'

import variables from 'styles/variables.module.scss'
import {
  ChartGradientProps,
  ChartOptionsProps,
  ChartTypeProps,
} from 'types/Chart'
import { inconsolata } from 'utils/fonts'

export const chartPadding = 55

// Arrays containing gradient start, gradient stop, and border
const chartColors = {
  coverage: ['rgba(17, 150, 255, 0.16)', 'rgba(17, 150, 255, 0)', '#a5d1f4'],
  issues: ['rgba(233, 172, 211, 0.42)', 'rgba(233, 172, 211, 0)', '#e4aace'],
  empty: ['rgba(173, 173, 173, 0.10)', 'rgba(233, 172, 211, 0)', '#CACACA'],
}

const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000) + 'k'
    : Math.sign(num) * Math.abs(num)
}

Tooltip.positioners.top = function (items) {
  if (!items.length) return false

  const topElement = items[0]
  const chart = this.chart

  return {
    x: topElement.element.x,
    y: chart.chartArea.top,
    xAlign: 'center',
    yAlign: 'bottom',
  }
}

export const roundValue = (val: number) => Math.round(val * 100) / 100

export const generateGradient = ({
  ctx,
  type,
  height,
  fullChart,
}: ChartGradientProps) => {
  if (!ctx) return

  const gradient = ctx.createLinearGradient(0, height / 2, 0, height)
  const [colorStart, colorStop] =
    type === 'empty'
      ? chartColors.empty
      : type === 'coverage'
      ? chartColors.coverage
      : chartColors.issues

  gradient.addColorStop(0, colorStart)
  fullChart && gradient.addColorStop(0.6, colorStop)
  gradient.addColorStop(1, colorStop)

  return gradient
}

export const getBorderColor = (type: ChartTypeProps) =>
  (type === 'empty'
    ? chartColors.empty
    : type === 'coverage'
    ? chartColors.coverage
    : chartColors.issues)[2]

export const getPlugins = ({
  fullChart,
}: Pick<ChartOptionsProps, 'fullChart'>): Plugin<'line'> => ({
  id: 'line',
  ...(fullChart && {
    afterDraw: (chart: Chart) => {
      const active = chart?.tooltip?.getActiveElements()

      if (chart?.tooltip && active?.length) {
        const x = chart.tooltip?.caretX
        const yAxis = chart.scales.y
        const ctx = chart.ctx
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, yAxis.top)
        ctx.lineTo(x, yAxis.bottom)
        ctx.lineWidth = 1
        ctx.strokeStyle = variables.color_gray

        ctx.stroke()
        ctx.restore()
      }
    },
  }),
})

export const getOptions = ({
  fullChart,
  type,
  labels,
  maxValue,
}: ChartOptionsProps) => {
  const coverage = type === 'coverage'
  const empty = type === 'empty'
  const max = maxValue > 0 ? maxValue : 2

  return {
    pointStyle: false,
    borderWidth: 1,
    font: {
      family: inconsolata.style.fontFamily,
    },
    plugins: {
      tooltip: {
        interaction: {
          intersect: false,
          axis: 'x',
          mode: 'index',
        },
        enabled: fullChart && !empty,
        position: 'top' as const,
        displayColors: false,
        bodyAlign: 'center' as const,
        titleMarginBottom: 1,
        callbacks: {
          title: (items: TooltipItem<'line'>[]) => {
            return items[0].label.split('/').reverse().join(' ')
          },
          label: (item: TooltipItem<'line'>) => {
            return coverage ? `${item.formattedValue}%` : item.formattedValue
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
          color: !empty ? variables.color_gray_medium : variables.color_gray,
          font: {
            size: 15,
          },
          callback: (val: string | number, index: number) => {
            return index % 3 === 0 && index !== 0 ? labels[val as number] : ''
          },
        },
        border: {
          z: 1,
          color: !empty ? variables.color_gray_medium : variables.color_gray,
          width: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: fullChart,
        min: 0,
        max: coverage ? 100 : max,
        beginAtZero: true,
        ticks: {
          stepSize: coverage ? 50 : Math.round(max / 2),
          color: !empty ? variables.color_gray_medium : variables.color_gray,
          callback: (val: string | number) => {
            if (empty) return ''

            if (coverage) {
              return `${val}%`
            } else {
              return kFormatter(val as number)
            }
          },
          font: {
            size: 15,
          },
        },
        border: {
          color: !empty ? variables.color_gray_medium : variables.color_gray,
          width: 1,
        },
        grid: {
          display: !empty,
        },
      },
    },
  }
}

export const makeFakePoints = (): number[] =>
  new Array(32)
    .fill(0)
    .map(() => Math.random() * (80 - 60) + 60)
    .map(Math.ceil)
