import 'react'
const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB']

const convertToHuman = (size: number): string => {
  const base = 1024

  if (size < base) {
    return `${size} ${units[0]}`
  }

  const exponent = Math.floor(Math.log(size) / Math.log(base))
  const unit = units[exponent]
  const value = (size / Math.pow(base, exponent))
    .toFixed(2)
    .replace(/\.00$/, '.0')

  return `${value} ${unit}`
}

interface SizeFormatterProps {
  className?: string
  size: number
}

const SizeFormatter = ({ className, size }: SizeFormatterProps) => (
  <span className={className} title={`${size} byte${size === 1 ? '' : 's'}`}>
    {convertToHuman(size)}
  </span>
)

export default SizeFormatter
