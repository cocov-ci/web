import { HeadProps } from './Commits'

export interface BranchResponseProps {
  id: number
  name: string
  coverage: null
  issues: number
  condensed_status: string
  head: HeadProps
}
