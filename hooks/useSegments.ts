import { useContext } from 'react'

import { SegmentsContext } from 'context/SegmentsContext'

export const useSegments = () => useContext(SegmentsContext)

export default useSegments
