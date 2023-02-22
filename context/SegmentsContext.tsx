'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import React, { createContext, useMemo } from 'react'

export const SegmentsContext = createContext<string[]>([])

const SegmentsProvider = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments()

  const memoizedValue = useMemo(
    () => segments,

    [segments],
  )

  return (
    <SegmentsContext.Provider value={memoizedValue}>
      {children}
    </SegmentsContext.Provider>
  )
}

export default SegmentsProvider
