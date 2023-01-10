'use client'

import classNames from 'classnames'
import Image from 'next/image'

export interface SVGComponent {
  size?: number
  className?: string
}

const Spinner = ({ className, size = 26 }: SVGComponent) => {
  return (
    <Image
      alt="A spinner indicating an ongoing operation"
      className={className}
      height={size}
      src="/icons/spinner.svg"
      width={size}
    />
  )
}

export default Spinner
