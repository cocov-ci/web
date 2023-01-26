'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import React, { createContext, useContext, useMemo } from 'react'

const SegmentsContext = createContext<string[]>([])

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

export const useSegments = () => useContext(SegmentsContext)

export default SegmentsProvider
