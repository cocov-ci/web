interface GradientProps {
  ctx: CanvasRenderingContext2D
  isCoverage: boolean
  height: number
}

// Arrays containing gradient start, gradient stop, and border
const chartColors = {
  coverage: ['rgba(17, 150, 255, 0.36)', 'rgba(255, 255, 255, 1)', '#1196FF'],
  issues: ['rgba(205,29,141,0.36)', '#E8E8E8', '#CD1D8D'],
}

export const generateGradient = ({
  ctx,
  isCoverage,
  height,
}: GradientProps) => {
  if (!ctx) return

  const gradient = ctx.createLinearGradient(0, height / 2, 0, height)
  const [colorStart, colorStop] = isCoverage
    ? chartColors.coverage
    : chartColors.issues

  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorStop)

  return gradient
}

export const getBorderColor = (isCoverage: boolean) =>
  (isCoverage ? chartColors.coverage : chartColors.issues)[2]

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

export const makeFakePoints = (): number[] =>
  new Array(31)
    .fill(0)
    .map(() => Math.random() * 100)
    .map(Math.ceil)
