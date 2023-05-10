export interface CommitHeaderProps {
  className?: string
  username?: string
  avatarURL?: string
  headSHA?: string
  headURL?: string
  timestamp?: Date
  commitMessage?: string
  isRegisteredUser?: boolean
  loading?: boolean
}

export type NavMenuProps = 'issues' | 'coverage'

export type StatusKind =
  | 'waiting'
  | 'in_progress'
  | 'completed'
  | 'queued'
  | 'errored'
  | 'not_configured'
  | 'new'
  | 'canceled'
  | 'failure'

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
