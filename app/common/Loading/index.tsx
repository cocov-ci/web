'use client'

import classNames from 'classnames'
import { LucideIcon, RefreshCw } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import styles from './Loading.module.scss'
import Spinner from './Spinner'

interface LoadingProps extends SpinnerProps, SkeletonProps {
  className?: string
  alignment?: 'center' | 'left' | 'right'
  type?: 'spinner' | 'skeleton'
  tiny?: boolean
}

interface SpinnerProps {
  size?: number
  spinnerIcon?: LucideIcon | typeof Spinner
}

interface SkeletonProps {
  count?: number
  width?: string
  height?: string
}

const SkeletonComponent = ({ count, height, width }: SkeletonProps) => {
  return (
    <SkeletonTheme baseColor="#e4e4e4" highlightColor="#e9e9e9">
      <Skeleton count={count} height={height} width={width} />
    </SkeletonTheme>
  )
}

const SpinnerComponent = ({ size, spinnerIcon = Spinner }: SpinnerProps) => {
  const Component = spinnerIcon

  return <Component className={styles.spinner} size={size} />
}

const Loading = ({
  width = '300px',
  height = '15px',
  count = 1,
  type = 'spinner',
  alignment = 'center',
  size = 24,
  spinnerIcon,
  className,
  tiny,
}: LoadingProps) => {
  return (
    <div
      className={classNames(styles.loading, styles[alignment], className, {
        [styles.tiny]: tiny,
      })}
    >
      {type === 'spinner' && (
        <SpinnerComponent size={size} spinnerIcon={spinnerIcon} />
      )}
      {type === 'skeleton' && (
        <SkeletonComponent count={count} height={height} width={width} />
      )}
    </div>
  )
}

export default Loading
