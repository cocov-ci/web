'use client'

import classNames from 'classnames'

export interface SVGComponent {
  size?: number
  className?: string
}

const Spinner = ({ className, size = 26 }: SVGComponent) => {
  return (
    <svg
      className={classNames(className)}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 25 26"
      width={`${size - 1}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
        id="Symbols"
        stroke="none"
        strokeWidth="1"
      >
        <g fill="#555555" fillRule="nonzero" id="Spinner">
          <g id="Group">
            <path
              d="M9.5,2.5 L14.5,2.5 C15.3284271,2.5 16,3.17157288 16,4 C16,4.82842712 15.3284271,5.5 14.5,5.5 L9.5,5.5 C8.67157288,5.5 8,4.82842712 8,4 C8,3.17157288 8.67157288,2.5 9.5,2.5 Z"
              id="Rectangle"
              opacity="0"
              transform="translate(12.000000, 4.000000) rotate(-90.000000) translate(-12.000000, -4.000000) "
            />
            <path
              d="M16.0889751,5.52213605 L21.0889751,5.52213605 C21.8560372,5.52213605 22.4778639,6.14396279 22.4778639,6.91102494 C22.4778639,7.67808709 21.8560372,8.29991383 21.0889751,8.29991383 L16.0889751,8.29991383 C15.3219129,8.29991383 14.7000862,7.67808709 14.7000862,6.91102494 C14.7000862,6.14396279 15.3219129,5.52213605 16.0889751,5.52213605 Z"
              id="Rectangle"
              opacity="0.125"
              transform="translate(18.588975, 6.911025) rotate(-45.000000) translate(-18.588975, -6.911025) "
            />
            <rect
              height="3"
              id="Rectangle"
              opacity="0.25"
              rx="1.5"
              width="8"
              x="17"
              y="11.5"
            />
            <path
              d="M16.0889751,17.7000862 L21.0889751,17.7000862 C21.8560372,17.7000862 22.4778639,18.3219129 22.4778639,19.0889751 C22.4778639,19.8560372 21.8560372,20.4778639 21.0889751,20.4778639 L16.0889751,20.4778639 C15.3219129,20.4778639 14.7000862,19.8560372 14.7000862,19.0889751 C14.7000862,18.3219129 15.3219129,17.7000862 16.0889751,17.7000862 Z"
              id="Rectangle"
              opacity="0.375"
              transform="translate(18.588975, 19.088975) rotate(45.000000) translate(-18.588975, -19.088975) "
            />
            <path
              d="M9.5,20.5 L14.5,20.5 C15.3284271,20.5 16,21.1715729 16,22 C16,22.8284271 15.3284271,23.5 14.5,23.5 L9.5,23.5 C8.67157288,23.5 8,22.8284271 8,22 C8,21.1715729 8.67157288,20.5 9.5,20.5 Z"
              id="Rectangle"
              opacity="0.5"
              transform="translate(12.000000, 22.000000) rotate(90.000000) translate(-12.000000, -22.000000) "
            />
            <path
              d="M3.91102494,17.7000862 L8.91102494,17.7000862 C9.67808709,17.7000862 10.2999138,18.3219129 10.2999138,19.0889751 C10.2999138,19.8560372 9.67808709,20.4778639 8.91102494,20.4778639 L3.91102494,20.4778639 C3.14396279,20.4778639 2.52213605,19.8560372 2.52213605,19.0889751 C2.52213605,18.3219129 3.14396279,17.7000862 3.91102494,17.7000862 Z"
              id="Rectangle"
              opacity="0.625"
              transform="translate(6.411025, 19.088975) rotate(135.000000) translate(-6.411025, -19.088975) "
            />
            <rect
              height="3"
              id="Rectangle"
              opacity="0.75"
              rx="1.5"
              transform="translate(4.000000, 13.000000) rotate(180.000000) translate(-4.000000, -13.000000) "
              width="8"
              x="0"
              y="11.5"
            />
            <path
              d="M3.91102494,5.52213605 L8.91102494,5.52213605 C9.67808709,5.52213605 10.2999138,6.14396279 10.2999138,6.91102494 C10.2999138,7.67808709 9.67808709,8.29991383 8.91102494,8.29991383 L3.91102494,8.29991383 C3.14396279,8.29991383 2.52213605,7.67808709 2.52213605,6.91102494 C2.52213605,6.14396279 3.14396279,5.52213605 3.91102494,5.52213605 Z"
              id="Rectangle"
              opacity="0.875"
              transform="translate(6.411025, 6.911025) rotate(-135.000000) translate(-6.411025, -6.911025) "
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Spinner
