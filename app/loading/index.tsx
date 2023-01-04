'use client'

import { RefreshCw } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './Loading.module.scss'

interface LoadingProps {
  count?: number
  width?: string
  height?: string
  type?: 'spinner' | 'skeleton'
}

const Loading = ({
  width = '300px',
  height = '15px',
  count = 1,
  type = 'spinner',
}: LoadingProps) => {
  return (
    <div className={styles.loading}>
      {type === 'spinner' && <RefreshCw className={styles.spinner} />}
      {type === 'skeleton' && (
        <SkeletonTheme baseColor="#e4e4e4" highlightColor="#e9e9e9">
          <Skeleton count={count} height={height} width={width} />
        </SkeletonTheme>
      )}
    </div>
  )
}

export default Loading
