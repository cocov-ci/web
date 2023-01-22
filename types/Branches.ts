export type StatusKind =
  | 'waiting'
  | 'processing'
  | 'processed'
  | 'queued'
  | 'errored'
  | 'not_configured'

export interface HeadProps {
  id: number
  author_email: string
  author_name: string
  checks_status: StatusKind
  coverage_status: StatusKind
  sha: string
  coverage_percent: null
  issues_count: number
  condensed_status: string
  minimum_coverage: number | null
}

export interface BranchResponseProps {
  id: number
  name: string
  coverage: null
  issues: number
  condensed_status: string
  head: HeadProps
}
