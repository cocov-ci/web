export type CommitsCategoriesResponseProps = { [arg: string]: number }
export type CommitsSourcesResponseProps = { [arg: string]: number }
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
  | 'processing'
  | 'processed'
  | 'queued'
  | 'errored'
  | 'not_configured'
  | 'new'
  | 'canceled'

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
