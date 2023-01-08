'use client'

import classNames from 'classnames'
import { LucideIcon, RefreshCw } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './Loading.module.scss'

interface LoadingProps extends SpinnerProps, SkeletonProps {
  className?: string
  alignment: 'center' | 'left' | 'right'
  type: 'spinner' | 'skeleton'
}

interface SpinnerProps {
  size: number
  spinnerIcon?: LucideIcon
}

interface SkeletonProps {
  count: number
  width: string
  height: string
}

const SkeletonComponent = ({ count, height, width }: SkeletonProps) => {
  return (
    <SkeletonTheme baseColor="#e4e4e4" highlightColor="#e9e9e9">
      <Skeleton count={count} height={height} width={width} />
    </SkeletonTheme>
  )
}

const SpinnerComponent = ({ size, spinnerIcon = RefreshCw }: SpinnerProps) => {
  const Component = spinnerIcon

  return <Component className={styles.spinner} size={size} />
}

const Loading = ({
  width,
  height,
  count,
  type,
  alignment,
  size,
  spinnerIcon,
  className,
}: LoadingProps) => {
  return (
    <div className={classNames(styles.loading, styles[alignment], className)}>
      {type === 'spinner' && (
        <SpinnerComponent size={size} spinnerIcon={spinnerIcon} />
      )}
      {type === 'skeleton' && (
        <SkeletonComponent count={count} height={height} width={width} />
      )}
    </div>
  )
}

Loading.defaultProps = {
  width: '300px',
  height: '15px',
  count: 1,
  type: 'spinner',
  alignment: 'center',
  size: 24,
}

export default Loading
