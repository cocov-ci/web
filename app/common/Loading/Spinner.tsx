'use client'

import Image from 'next/image'

export interface SVGComponent {
  size?: number
  className?: string
  dark?: boolean
}

const Spinner = ({ className, size = 26, dark = false }: SVGComponent) => {
  return (
    <Image
      alt="A spinner indicating an ongoing operation"
      className={className}
      height={size}
      src={`/icons/spinner${dark ? '-dark' : ''}.svg`}
      width={size}
    />
  )
}

export default Spinner
