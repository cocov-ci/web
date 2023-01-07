interface GradientProps {
  ctx: CanvasRenderingContext2D
  isCoverage: boolean
}

export const generateGradient = ({ ctx, isCoverage }: GradientProps) => {
  const gradient = ctx.createLinearGradient(0, 35, 0, isCoverage ? 60 : 80)
  const chartColor = isCoverage
    ? 'rgba(17, 150, 255, 0.1)'
    : 'rgba(205, 29, 141, 0.1)'
  gradient.addColorStop(0, chartColor)
  gradient.addColorStop(1, 'rgba(232, 232, 232, 0.1)')

  return gradient
}

export const getBorderColor = (isCoverage: boolean) => {
  return isCoverage ? 'rgba(17, 150, 255, 0.23)' : 'rgba(205, 29, 141, 0.23)'
}

export const options = {
  pointStyle: false,
  fill: true,
  borderWidth: 1,
  scales: {
    x: {
      display: false,
      beginAtZero: true,
    },
    y: {
      display: false,
      beginAtZero: true,
    },
  },
}
