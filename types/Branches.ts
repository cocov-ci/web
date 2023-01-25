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
  message: string
  created_at: string
  org_name: string
  user?: {
    name: string
    avatar: string
  }
}

export interface BranchResponseProps {
  id: number
  name: string
  coverage: null
  issues: number
  condensed_status: string
  head: HeadProps
}

export interface CommitHeaderProps {
  className?: string
  username?: string
  avatarURL?: string
  headSHA: string
  headURL: string
  timestamp: Date
  commitMessage: string
  readonly?: boolean
}
