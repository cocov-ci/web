import { HeadProps } from './Commits'

export interface BranchProps {
  id: number
  name: string
  coverage: null
  issues: number
  condensed_status: string
  head: HeadProps
  code?: number
}
