'use client'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type LoadingProps = {
  count?: number
  width?: string
}

const Loading = ({ width, count = 1 }: LoadingProps) => {
  return (
    <div>
      <SkeletonTheme baseColor="#eee" highlightColor="#ddd">
        <Skeleton count={count} width={width} />
      </SkeletonTheme>
    </div>
  )
}

export default Loading
