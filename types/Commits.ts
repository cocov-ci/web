import { PagingProps } from './Paging'
import { RepositoryProps } from './Repositories'

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

export interface IssueProps {
  affected_file: { status: StatusKind }
  check_source: string
  file: string
  id: number
  kind: string
  line_end: number
  line_start: number
  message: string
  status: StatusKind
  status_reason: string
  uid: string
}
export interface CommitsResponseProps {
  commit: HeadProps
  issues: IssueProps[]
  paging: PagingProps
  repository: Omit<RepositoryProps, 'head'>
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
