'use client'

import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import styles from './Loading.module.scss'
import Spinner from './Spinner'

interface LoadingProps extends SpinnerProps, SkeletonProps {
  className?: string
  alignment?: 'center' | 'left' | 'right'
  type?: 'spinner' | 'skeleton'
  variation?: 'light' | 'dark'
  tiny?: boolean
}

interface SpinnerProps {
  size?: number
  spinnerIcon?: LucideIcon | typeof Spinner
  dark?: boolean
}

interface SkeletonProps {
  count?: number
  width?: string
  height?: string
  dark?: boolean
}

const SkeletonComponent = ({
  count,
  height,
  width,
  dark = false,
}: SkeletonProps) => {
  const baseColor = dark ? '#4d4d4d' : '#e4e4e4'
  const highlightColor = dark ? '#575757' : '#e9e9e9'

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <Skeleton count={count} height={height} width={width} />
    </SkeletonTheme>
  )
}

const SpinnerComponent = ({
  size,
  spinnerIcon = Spinner,
  dark,
}: SpinnerProps) => {
  const Component = spinnerIcon

  return <Component className={styles.spinner} dark={dark} size={size} />
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
  variation = 'light',
}: LoadingProps) => {
  return (
    <div
      className={classNames(styles.loading, styles[alignment], className, {
        [styles.tiny]: tiny,
      })}
    >
      {type === 'spinner' && (
        <SpinnerComponent
          dark={variation === 'dark'}
          size={size}
          spinnerIcon={spinnerIcon}
        />
      )}
      {type === 'skeleton' && (
        <SkeletonComponent
          count={count}
          dark={variation == 'dark'}
          height={height}
          width={width}
        />
      )}
    </div>
  )
}

export default Loading
